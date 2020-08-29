import { AvailableTimeRepositoryInterface } from '../../domain/models/available_time/available_time_repository_interface';
import { AvailableTime } from '../../domain/models/available_time/available_time';
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class AvailableTimeRepository
  implements AvailableTimeRepositoryInterface {
  private readonly sheet: Sheet;
  private readonly lastRow: number;
  private readonly lastCol: number;
  private readonly fullData: readonly AvailableTime[];
  constructor() {
    this.sheet = this.getSheet();
    this.lastRow = this.getLastRow();
    this.lastCol = this.getLastColumn();
    this.fullData = this.getAll();
  }

  create(
    userId: string,
    isoWeek: number,
    availableTime: number,
  ): AvailableTime {
    this.sheet
      .getRange(this.lastRow + 1, 1, 1, this.lastCol)
      .setValues([[userId, isoWeek, availableTime]]);
    return new AvailableTime(userId, isoWeek, availableTime);
  }

  getAll(): readonly AvailableTime[] {
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
    const sheet = spreadsheet.getSheetByName('available_times');

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

  private map(fullData: any[][]): readonly AvailableTime[] {
    return fullData.map((e) => {
      return new AvailableTime(e[0], e[1], e[2]);
    });
  }
}
