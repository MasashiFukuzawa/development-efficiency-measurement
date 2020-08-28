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
