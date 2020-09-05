import { Singleton } from './singleton';
import Cache = GoogleAppsScript.Cache.Cache;
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export abstract class BaseRepository {
  readonly cache: Cache | null;
  readonly dbCache: string | null | undefined;
  private readonly spreadsheet: Spreadsheet;
  readonly sheet: Sheet;
  readonly lastRow: number;
  readonly lastCol: number;
  readonly fullData: readonly any[];
  constructor(sheetName: string) {
    const singleton = Singleton.getInstance();
    this.cache = singleton.cache;
    this.spreadsheet = singleton.spreadsheet;

    this.dbCache = this.cache?.get(`data:${sheetName}`);

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
