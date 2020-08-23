import { Measurement } from '../../domain/models/measurement/measurement';
import { MeasurementRepositoryInterface } from '../../domain/models/measurement/measurement_repository_interface';
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class MeasurementRepository implements MeasurementRepositoryInterface {
  private readonly sheet: Sheet;
  private readonly lastRow: number;
  private readonly lastCol: number;
  private readonly fullData: readonly Measurement[];
  constructor() {
    this.sheet = this.getSheet();
    this.lastRow = this.getLastRow();
    this.lastCol = this.getLastColumn();
    this.fullData = this.getAll();
  }

  last(userId: string): Measurement | null {
    const measurement = this.fullData.filter((e) => {
      return e.getUserId().toString() === userId;
    });
    const lastMeasurement = measurement[measurement.length - 1];
    return !!lastMeasurement ? lastMeasurement : null;
  }

  stampStartAt(userId: string, description?: string): Measurement {
    const now = new Date();
    const measurement = new Measurement(userId, now, undefined, description);
    this.sheet
      .getRange(this.lastRow + 1, 1, 1, this.lastCol)
      .setValues([[userId, now, undefined, description]]);
    return measurement;
  }

  private getAll(): readonly Measurement[] {
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
    const sheet = spreadsheet.getSheetByName('measurements');

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

  private map(fullData: any[][]): readonly Measurement[] {
    return fullData.map((e) => {
      return new Measurement(e[0], e[1], e[2] || undefined, e[3] || undefined);
    });
  }
}
