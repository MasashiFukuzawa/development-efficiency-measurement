import { UserRepositoryInterface } from '../../domain/models/user/user_repository_interface';
import { User } from '../../domain/models/user/user';
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class UserRepository implements UserRepositoryInterface {
  private readonly sheet: Sheet;
  private readonly lastRow: number;
  private readonly lastCol: number;
  private readonly fullData: readonly User[];
  constructor() {
    this.sheet = this.getSheet();
    this.lastRow = this.getLastRow();
    this.lastCol = this.getLastColumn();
    this.fullData = this.getAll();
  }

  findByUserId(userId: string): User | null {
    const user = this.fullData.filter((e) => {
      return e.getId().toString() === userId;
    })[0];
    return !!user ? user : null;
  }

  create(userId: string, userName: string): User {
    const user = new User(userId, userName);
    this.sheet
      .getRange(this.lastRow + 1, 1, 1, this.lastCol)
      .setValues([[userId, userName, user.getRegisteredAt().toDate()]]);
    return user;
  }

  private getAll(): readonly User[] {
    if (this.fullData) return this.fullData;
    const rawData = this.sheet
      .getRange(2, 1, this.lastRow - 1, this.lastCol)
      .getValues();
    const fullData = rawData.filter((e) => !!e[0]);
    return this.map(fullData);
  }

  private getSheet(): Sheet {
    if (this.sheet) return this.sheet;

    const spreadsheetId = PropertiesService.getScriptProperties().getProperty(
      'SPREAD_SHEET_ID',
    );

    if (!spreadsheetId) throw new Error('SPREAD_SHEET_ID is not found.');
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

    if (!spreadsheet) throw new Error('Target spreadsheet is not found.');
    const sheet = spreadsheet.getSheetByName('users');

    if (!sheet) throw new Error('Target table is not found.');
    return sheet;
  }

  private getLastRow(): number {
    if (this.lastRow) return this.lastRow;
    return this.sheet.getLastRow();
  }

  private getLastColumn(): number {
    if (this.lastCol) return this.lastCol;
    return this.sheet.getLastColumn();
  }

  private map(fullData: any[][]): readonly User[] {
    return fullData.map((e) => {
      return new User(e[0], e[1], e[2]);
    });
  }
}
