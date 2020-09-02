# 概要

- 業務時間における開発効率を数値化し、改善するためのアプリケーション
- Google Apps Script × TypeScript でクリーンアーキテクチャライクに実装
- 開発効率に関わると考えられる下記 KPI を計測し、Slack に定期的に状況を通知
  - 定時内で開発に費やすことができた時間の合計 (単位: hour)
  - 1 回の実装で集中できた時間の平均 (単位: hour/回)
  - 差し込み率
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

## (WIP) データベース (スプレッドシート) のマイグレーション

- テーブルを自動的にマイグレーションできるスクリプトを用意する予定です

## (WIP) 環境変数の設定

- 更新予定

## (WIP) GAS のトリガーの設定

- 更新予定

## (WIP) Slack の設定

- Slack アプリを作成
- Slash コマンド設定
- Webhook 設定

## (Optional) GCP Stackdriver によるログ監視設定

- 更新予定

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
    -d "" -H "Content-Type: application/json"
}
```
