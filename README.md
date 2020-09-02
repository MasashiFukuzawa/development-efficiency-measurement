# 概要

- 業務時間における開発効率を数値化し、改善するためのアプリケーション
- Google Apps Script × TypeScript でクリーンアーキテクチャライクに実装
- 開発効率に関わると考えられる下記 KPI を計測し、Slack に定期的に状況を通知
  - 定時内で開発に費やすことができた時間の合計（単位: hour）
  - 平均実装時間（単位: hour/回）
    - 平均時間が短い => 開発に費やせた時間が短い or 実装以外の作業で実装から離れる回数が多い
  - カレンダーの空き時間のうち、実際に開発に費やすことができた時間の割合（単位：なし）
    - 差し込まれなかった割合を意味する
- 毎朝、その日の実装可能時間を Slack に通知
- 自身のターミナルに設定情報を書くことで、CLI からも実行可能

# 動作環境

- npm: 6.14.7
- node: v13.12.0
- TypeScript: 4.0.2
- @google/clasp: 2.3.0
- jest: 26.1.10

# 環境構築

## Install

```sh:
 $ mkdir development-efficiency-measurement
 $ cd development-efficiency-measurement
 $ git init .
 $ hub create
 $ npm init -y
 $ yarn add --dev typescript
                  @google/clasp \
                  @types/google-apps-script \
                  @types/jest \
                  jest \
                  ts-jest \
                  @types/eslint \
                  @types/eslint-plugin-prettier \
                  @types/prettier \
                  @types/stylelint \
                  @typescript-eslint/eslint-plugin \
                  @typescript-eslint/parser \
                  eslint \
                  eslint-config-airbnb \
                  eslint-config-prettier \
                  eslint-plugin-import \
                  eslint-plugin-jest \
                  eslint-plugin-prefer-arrow \
                  eslint-plugin-prettier \
                  prettier \
                  prettier-stylelint \
                  stylelint \
                  stylelint-config-prettier \
                  stylelint-config-standard \
                  stylelint-order
  $ jest --init
```

## Settings

- 下記の設定ファイルを作成し、良しなに設定を記述
  - `tsconfig.json`
  - `jest.config.js`
  - `.eslint`
  - `.prettierrc`
  - `.stylelintrc.js`
  - `.eslintignore`
  - `.gitignore`

## GAS

```sh:
$ clasp login
$ clasp create --title "development-efficiency-measurement" --type sheets --rootDir ./src
$ clasp pull
```

src/appscript.json を編集

```json:src/appscript.json
{
  "timeZone": "Asia/Tokyo",
  "dependencies": {
    "libraries": [
      {
        "userSymbol": "Moment",
        "libraryId": "15hgNOjKHUG4UtyZl9clqBbl23sDvWMS8pfDJOyIapZk5RBqwL3i-rlCo",
        "version": "9"
      }
    ]
  },
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8"
}
```

```sh:
$ clasp push
```

# CLI Setting

以下のように設定することで CLI からコマンドを実行することが可能になります。

## config file

```zsh
$ mkdir ~/.development_efficiency_measurement
$ vim ~/.development_efficiency_measurement/config
```

config ファイルを作成し、以下のように curl するのに必要な情報を管理して下さい。
以下に注意点を記載します。

- GAS の特性上、URL を知っている人は誰でも curl できてしまうので、安易に公開しないようにご注意下さい。
- `TOKEN_FOR_CLI`はアプリ管理者が作成した任意の文字列が入ります。

```text
url={YOUR_GOOGLE_APPS_SCRIPT_ENDPOINT}
token={TOKEN_FOR_CLI}
user_id={SLACK_USER_ID}
user_name={SLACK_USER_NAME}
```

## zshrc

一例ですが、~/.zshrc に関数を用意し、以下のように alias を貼っておくと便利です。

```sh
alias start='kaihatsu start'
alias stop='kaihatsu stop'

function kaihatsu() {
  config_path="${HOME}/.development_efficiency_measurement/config"
  url=`cat ${config_path} | grep url | sed s/url=// | awk '{ print }'`
  token=`cat ${config_path} | grep token | sed s/token=// | awk '{ print }'`
  user_id=`cat ${config_path} | grep user_id | sed s/user_id=// | awk '{ print }'`
  user_name=`cat ${config_path} | grep user_name | sed s/user_name=// | awk '{ print }'`
  curl -L "${url}?token=${token}&user_id=${user_id}&user_name=${user_name}&text=$1" \
    -d "" -H "Content-Type: application/json"
}
```
