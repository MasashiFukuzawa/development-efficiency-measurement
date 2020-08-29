import { IsoWeek } from '../../domain/models/iso_week/iso_week';
import { IsoWeekRepositoryInterface } from '../../domain/models/iso_week/iso_week_repository_interface';
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class IsoWeekRepository implements IsoWeekRepositoryInterface {
  private readonly sheet: Sheet;
  private readonly lastRow: number;
  private readonly lastCol: number;
  private readonly fullData: readonly IsoWeek[];
  constructor() {
    this.sheet = this.getSheet();
    this.lastRow = this.getLastRow();
    this.lastCol = this.getLastColumn();
    this.fullData = this.getAll();
  }

  find(year: number, isoWeek: number): IsoWeek | null {
    const isoWeekObj = this.fullData.find((e) => {
      return (
        e.getIsoWeekYear().toNumber() === year &&
        e.getIsoWeekIsoWeek().toNumber() === isoWeek
      );
    });
    return !!isoWeekObj ? isoWeekObj : null;
  }

  private getAll(): readonly IsoWeek[] {
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
    const sheet = spreadsheet.getSheetByName('iso_weeks');

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

  private map(fullData: any[][]): readonly IsoWeek[] {
    return fullData.map((e) => {
      return new IsoWeek(e[0], e[1], e[2]);
    });
  }
}
