# 概要

- 業務時間における開発効率を数値化し、改善するためのアプリケーション
- Google Apps Script × TypeScript でクリーンアーキテクチャライクに実装
- 開発効率に関わると考えられる下記 KPI を計測し、Slack に定期的に状況を通知
  - 定時内で開発に費やすことができた時間の合計 (単位: hour)
  - 1 回の実装で集中できた時間の平均 (単位: hour/回)
  - 差し込み率 (定時内で開発に費やすことができた時間の合計 / 定時時間における Google カレンダー上での空き時間)
- 毎朝、その日の実装可能時間を Slack に通知
- 自身のターミナルに設定情報を書くことで、Slack 上だけでなく CLI からも実行可能

# 動作環境

- TypeScript: 4.0.2
- @google/clasp: 2.3.0
- jest: 26.1.10

# 環境構築

以下のように環境構築することで、自身の手元で開発効率計測 bot の利用およびカスタマイズができるようになります。

## Install

```sh:
$ mkdir development-efficiency-measurement
$ cd development-efficiency-measurement
$ git clone git@github.com:MasashiFukuzawa/development-efficiency-measurement.git
$ yarn install

# 一度別ディレクトリに退避
$ mkdir ../gas-tmp
$ cd ../gas-tmp
$ clasp login
$ clasp create --title "development-efficiency-measurement" --type sheets --rootDir ./src
$ clasp pull

# 作成された.clasp.jsonを上記で作成したディレクトリにコピーしていく
$ cp .clasp.json ../development-efficiency-measurement
$ cd ../development-efficiency-measurement
$ clasp push --force
$ clasp open # GASファイルを開いてコードがpushされているか確認
```

## データベース (スプレッドシート) の用意

下記 2 通りのいずれかで自動的に必要なシートおよびカラムを作成できます。

1. CLI から`$ clasp run 'createTablesInSpreadsheet'`を実行（CLI から`$ clasp run`コマンドを実行するには、事前に Google Cloud Console から諸々の設定をする必要があります。）
2. `$ clasp open`した後、`google_apps_script/functions/create_tables_in_spreadsheet.gs`を開き、`createTablesInSpreadsheet`関数を実行

## Slack の設定

Slack 上でのコマンドの実行や、bot 通知の受信機能をご利用したい場合は、公式ドキュメントまたは解説記事などから Slack の設定をして下さい。

## secrets の設定

`$ clasp open`した後、ファイル > プロジェクトのプロパティ > スクリプトのプロパティ から以下の情報を入れていきます。

![image](https://user-images.githubusercontent.com/44726460/92320126-19469380-f05a-11ea-8d68-0ef4005dc94b.png)

### CLI_VERIFICATION_TOKEN

- CLI から実行する際に必要な認証用の任意の文字列です。

### SLACK_VERIFICATION_TOKEN

- SLACK から slash コマンドを実行する際に必要な認証用の文字列です。Slack でアプリを作成すると発行されます。

### SPREAD_SHEET_ID

- 対象のスプレッドシートの URL の中に含まれます。下記の`{SPREAD_SHEET_ID}`の部分に該当します。
  - `https://docs.google.com/spreadsheets/d/{SPREAD_SHEET_ID}/edit#gid=xxxxxxxx`

### SLACK_WEBHOOK_URL

- SLACK から bot を送信する実行する際に必要な認証用の文字列です。Slack でアプリを作成すると発行されます。

## GAS のトリガーの設定

下記 3 通りのいずれかで GAS のトリガー (= cron) を設定できます。

1. CLI から`$ clasp run 'setNewTriggers'`を実行（CLI から`$ clasp run`コマンドを実行するには、事前に Google Cloud Console から諸々の設定をする必要があります。）
2. `$ clasp open`した後、`google_apps_script/functions/set_new_triggers.gs`を開き、`setNewTriggers`関数を実行
3. `$ clasp open`した後、編集 > 現在のプロジェクトのトリガー からトリガー追加画面に行き、GUI で新規トリガーを作成

## (Optional) CLI Setting

以下のように設定することで CLI からコマンドを実行することが可能になります。

### config file

```zsh
$ mkdir ~/.development_efficiency_measurement
$ vim ~/.development_efficiency_measurement/config
```

config ファイルを作成し、以下のように curl するのに必要な情報を管理して下さい。
以下に注意点を記載します。

- GAS の特性上、URL を知っている人は誰でも curl できてしまうので、安易に公開しないようにご注意下さい。
- `TOKEN_FOR_CLI`はアプリ管理者が作成した任意の文字列を指定します。

```text
url={YOUR_GOOGLE_APPS_SCRIPT_ENDPOINT}
token={TOKEN_FOR_CLI}
user_id={SLACK_USER_ID}
user_name={SLACK_USER_NAME}
```

### .zshrc

一例ですが、~/.zshrc に関数を用意し、以下のように alias を貼っておくと便利です。

```sh
alias start='measurement start'
alias stop='measurement stop'

function measurement() {
  config_path="${HOME}/.development_efficiency_measurement/config"
  url=`cat ${config_path} | grep url | sed s/url=// | awk '{ print }'`
  token=`cat ${config_path} | grep token | sed s/token=// | awk '{ print }'`
  user_id=`cat ${config_path} | grep user_id | sed s/user_id=// | awk '{ print }'`
  user_name=`cat ${config_path} | grep user_name | sed s/user_name=// | awk '{ print }'`
  curl -L "${url}?token=${token}&user_id=${user_id}&user_name=${user_name}&text=$1" \
    -sS -d "" -H "Content-Type: application/json"
}
```

## (Optional) GCP Stackdriver によるログ監視設定

- Google Cloud Console から設定可能です。
- doPost 関数のデバッグなどで重宝するので設定しておくことをオススメします。
- 詳細は Google の公式ドキュメントや解説記事等を参照下さい。
