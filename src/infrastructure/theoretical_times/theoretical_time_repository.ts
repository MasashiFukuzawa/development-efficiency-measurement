import { TheoreticalTimeRepositoryInterface } from '../../domain/models/theoretical_time/theoretical_time_repository_interface';
import { TheoreticalTime } from '../../domain/models/theoretical_time/theoretical_time';
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class TheoreticalTimeRepository
  implements TheoreticalTimeRepositoryInterface {
  private readonly sheet: Sheet;
  private readonly lastRow: number;
  private readonly lastCol: number;
  private readonly fullData: readonly TheoreticalTime[];
  constructor() {
    this.sheet = this.getSheet();
    this.lastRow = this.getLastRow();
    this.lastCol = this.getLastColumn();
    this.fullData = this.getAll();
  }

  create(
    userId: string,
    isoWeek: number,
    theoreticalTime: number,
  ): TheoreticalTime {
    this.sheet
      .getRange(this.lastRow + 1, 1, 1, this.lastCol)
      .setValues([[userId, isoWeek, theoreticalTime]]);
    return new TheoreticalTime(userId, isoWeek, theoreticalTime);
  }

  getAll(): readonly TheoreticalTime[] {
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
    const sheet = spreadsheet.getSheetByName('theoretical_times');

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

  private map(fullData: any[][]): readonly TheoreticalTime[] {
    return fullData.map((e) => {
      return new TheoreticalTime(e[0], e[1], e[2]);
    });
  }
}
