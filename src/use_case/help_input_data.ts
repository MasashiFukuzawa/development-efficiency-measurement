import { GlobalConstants } from '../constants';
import SpreadSheet = GoogleAppsScript.Spreadsheet.Spreadsheet;

export class HelpInputData {
  private spreadsheetId: string;
  private spreadsheet: SpreadSheet;
  private url: string;
  constructor() {
    this.spreadsheetId = this.getSpreadSheetId();
    this.spreadsheet = this.getSpreadSheet();
    this.url = this.getUrl();
  }

  getMessage(userId: string): string {
    return `*【開発効率計測botにおけるSlashコマンドの使い方】*


(1) 開発効率計測botを初めて使用する時

    \`/measurement user xxx@finc.com\` と打つことでユーザーが登録されます。

    ユーザー登録すると、以下の機能が使えるようになります。
        - 実装時間の計測
        - Googleカレンダー連携による実装可能時間の通知（平日の7~8時頃）
        - 実装効率の計測レポートの通知（毎週金曜日の19~20時頃）


(2) 実装開始時間の打刻をしたい時

    \`/measurement start\` と打つことで実装開始時間が登録されます。


(3) 実装終了時間の打刻をしたい時

    \`/measurement stop\` と打つことで実装終了時間が登録されます。


(4) 打刻した時間を修正したい時

    現在、修正用のSlashコマンドは用意していません。
    下記スプレッドシートにアクセスし、UserId: \`${userId}\` のデータを直接修正して下さい。
    ${this.getSpreadSheetUrl('measurements')}


(5) 通知をOFFにしたい時 / 業務時間をカスタマイズしたい時

    通知設定はデフォルトONに、業務時間はデフォルトで10:00~19:00に設定されています。
    もし修正したい場合は、下記スプレッドシートにアクセスし、UserId: \`${userId}\` のデータを直接修正して下さい。
    ${this.getSpreadSheetUrl('user_settings')}


(6) CLIから実行したい時

    下記リンクを参考に自身のターミナルで実行できるように設定してみて下さい。
    エンドポイントおよびトークンについては管理者にお問い合わせ下さい。
    ${GlobalConstants.GITHUB_README_URL}

(7) その他要望やバグについて

    お手数ですが、下記リンクからIssueをご記入いただければ幸いです。
    ${GlobalConstants.GITHUB_ISSUE_URL}`;
  }

  private getSpreadSheetUrl(sheetName: string): string {
    const sheet = this.spreadsheet.getSheetByName(sheetName);
    if (!sheet) throw new Error('Target table is not found.');
    return `${this.url}#gid=${sheet.getSheetId()}`;
  }

  private getSpreadSheetId(): string {
    if (this.spreadsheetId) return this.spreadsheetId;
    const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREAD_SHEET_ID');
    if (!spreadsheetId) throw new Error('SPREAD_SHEET_ID is not found.');
    return (this.spreadsheetId = spreadsheetId);
  }

  private getSpreadSheet(): SpreadSheet {
    if (this.spreadsheet) return this.spreadsheet;
    const spreadsheet = SpreadsheetApp.openById(this.spreadsheetId);
    return (this.spreadsheet = spreadsheet);
  }

  private getUrl(): string {
    if (this.url) return this.url;
    return (this.url = this.spreadsheet.getUrl());
  }
}
