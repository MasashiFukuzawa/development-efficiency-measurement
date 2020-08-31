import { AvailableTimeRepositoryInterface } from '../../domain/models/available_time/available_time_repository_interface';
import { AvailableTime } from '../../domain/models/available_time/available_time';
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

// NOTE: BaseRepositoryを継承するとなぜかこのファイルにおいてだけGAS上で動作できなかったので継承を使ずに実装
// TODO: 原因調査してBaseRepositoryを継承できるようにする
// https://github.com/MasashiFukuzawa/development-efficiency-measurement/pull/38/files
export class AvailableTimeRepository implements AvailableTimeRepositoryInterface {
  readonly sheet: Sheet;
  readonly lastRow: number;
  readonly lastCol: number;
  readonly fullData: readonly any[];
  constructor(sheetName = 'available_times') {
    this.sheet = this.getSheet(sheetName);
    this.lastRow = this.getLastRow();
    this.lastCol = this.getLastColumn();
    this.fullData = this.getAll();
  }

  getAll(): readonly any[] {
    if (this.fullData) return this.fullData;
    const rawData = this.sheet.getRange(2, 1, this.lastRow - 1, this.lastCol).getValues();
    const data = rawData.filter((e) => !!e[0]);
    return this.map(data);
  }

  map(data: any[][]): readonly AvailableTime[] {
    return data.map((e) => {
      return new AvailableTime(e[0], e[1], e[2]);
    });
  }

  create(userId: string, isoWeekId: number, availableTime: number): AvailableTime {
    this.sheet
      .getRange(this.lastRow + 1, 1, 1, this.lastCol)
      .setValues([[userId, isoWeekId, availableTime]]);
    return new AvailableTime(userId, isoWeekId, availableTime);
  }

  private getSheet(sheetName: string): Sheet {
    if (this.sheet) return this.sheet;

    const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREAD_SHEET_ID');

    if (!spreadsheetId) throw new Error('SPREAD_SHEET_ID is not found.');
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

    if (!spreadsheet) throw new Error('Target spreadsheet is not found.');
    const sheet = spreadsheet.getSheetByName(sheetName);

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
}
