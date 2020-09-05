import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import Cache = GoogleAppsScript.Cache.Cache;

export abstract class BaseRepository {
  readonly cache: Cache | null;
  readonly dbCache: string | null | undefined;
  private readonly spreadsheet: Spreadsheet;
  readonly sheet: Sheet;
  readonly lastRow: number;
  readonly lastCol: number;
  readonly fullData: readonly any[];
  constructor(sheetName: string) {
    this.cache = this.getCache();
    this.dbCache = this.cache?.get(`data:${sheetName}`);
    this.spreadsheet = this.getSpreadsheet();
    this.sheet = this.getSheet(sheetName);
    this.lastRow = this.getLastRow();
    this.lastCol = this.getLastColumn();
    this.fullData = this.getAll();
  }

  getAll(): readonly any[] {
    if (this.fullData) return this.fullData;
    const data: any[][] = !this.dbCache ? this.getRawData() : JSON.parse(this.dbCache);
    return this.map(data);
  }

  getRawData(): readonly any[][] {
    return this.sheet
      .getRange(2, 1, this.lastRow - 1, this.lastCol)
      .getValues()
      .filter((e) => !!e[0]);
  }

  abstract map(data: any[][]): readonly any[];

  private getCache(): Cache | null {
    if (this.cache) return this.cache;
    return CacheService.getScriptCache();
  }

  private getSpreadsheet(): Spreadsheet {
    if (this.spreadsheet) return this.spreadsheet;

    const spreadsheetIdCache = this.cache?.get('spreadsheetId');
    const spreadsheetId = !spreadsheetIdCache
      ? PropertiesService.getScriptProperties().getProperty('SPREAD_SHEET_ID')
      : spreadsheetIdCache;
    if (!spreadsheetId) throw new Error('SPREAD_SHEET_ID is not found.');

    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    if (!spreadsheet) throw new Error('Target spreadsheet is not found.');

    return spreadsheet;
  }

  private getSheet(sheetName: string): Sheet {
    const sheet = this.spreadsheet.getSheetByName(sheetName);
    if (!sheet) throw new Error('Target table is not found.');
    return sheet;
  }

  private getLastRow(): number {
    return !this.dbCache ? this.sheet.getLastRow() : JSON.parse(this.dbCache).length + 1;
  }

  private getLastColumn(): number {
    return !this.dbCache ? this.sheet.getLastColumn() : JSON.parse(this.dbCache)[0].length;
  }
}
