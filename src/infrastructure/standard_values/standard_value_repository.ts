import { StandardValue } from '../../domain/models/standard_value/standard_value';
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class StandardValueRepository {
  private readonly sheet: Sheet;
  private readonly lastRow: number;
  private readonly lastCol: number;
  private readonly fullData: readonly StandardValue[];
  constructor() {
    this.sheet = this.getSheet();
    this.lastRow = this.getLastRow();
    this.lastCol = this.getLastColumn();
    this.fullData = this.getAll();
  }

  create(standardValue: StandardValue): StandardValue {
    this.sheet
      .getRange(this.lastRow + 1, 1, 1, this.lastCol)
      .setValues([
        [
          standardValue.getIsoWeekId().toNumber(),
          standardValue.getTotalImplementHour().toNumber(),
          standardValue.getMeasurementCount().toNumber(),
          standardValue.getAverageImplementHour().toNumber(),
          standardValue.getTheoreticalAvailableHour().toNumber(),
          standardValue.getAvailableRate().toNumber(),
          standardValue.getKpiValue().toNumber(),
        ],
      ]);
    return standardValue;
  }

  private getAll(): readonly StandardValue[] {
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
    const sheet = spreadsheet.getSheetByName('standard_values');

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

  private map(fullData: any[][]): readonly StandardValue[] {
    return fullData.map((e) => {
      return new StandardValue(e[0], e[1], e[2], e[3], e[4], e[5], e[6]);
    });
  }
}
