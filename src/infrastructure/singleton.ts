import Cache = GoogleAppsScript.Cache.Cache;
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;

export class Singleton {
  private static singleton = new Singleton();

  readonly cache: Cache | null;
  readonly spreadsheet: Spreadsheet;
  private constructor() {
    this.cache = CacheService.getScriptCache();

    const spreadsheetIdCache = this.cache.get('spreadsheet_id');
    const spreadsheetId = !spreadsheetIdCache
      ? PropertiesService.getScriptProperties().getProperty('SPREAD_SHEET_ID')
      : spreadsheetIdCache;
    if (!spreadsheetId) throw new Error('SPREAD_SHEET_ID is not found.');

    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    if (!spreadsheet) throw new Error('Target spreadsheet is not found.');

    this.spreadsheet = spreadsheet;
  }

  static getInstance(): Singleton {
    return this.singleton;
  }
}
