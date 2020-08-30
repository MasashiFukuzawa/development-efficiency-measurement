import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export abstract class BaseRepository {
  readonly sheet: Sheet;
  readonly lastRow: number;
  readonly lastCol: number;
  readonly fullData: readonly any[];
  constructor(sheetName: string) {
    this.sheet = this.getSheet(sheetName);
    this.lastRow = this.getLastRow();
    this.lastCol = this.getLastColumn();
    this.fullData = this.getAll();
  }

  getAll(): readonly any[] {
    if (this.fullData) return this.fullData;
    const rawData = this.sheet
      .getRange(2, 1, this.lastRow - 1, this.lastCol)
      .getValues();
    const data = rawData.filter((e) => !!e[0]);
    return this.map(data);
  }

  abstract map(data: any[][]): readonly any[];

  private getSheet(sheetName: string): Sheet {
    if (this.sheet) return this.sheet;

    const spreadsheetId = PropertiesService.getScriptProperties().getProperty(
      'SPREAD_SHEET_ID',
    );

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
