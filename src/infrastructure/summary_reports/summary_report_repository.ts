import { SummaryReport } from '../../domain/models/summary_report/summary_report';
import { SummaryReportRepositoryInterface } from '../../domain/models/summary_report/summary_report_repository_interface';
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class SummaryReportRepository
  implements SummaryReportRepositoryInterface {
  private readonly sheet: Sheet;
  private readonly lastRow: number;
  private readonly lastCol: number;
  private readonly fullData: readonly SummaryReport[];
  constructor() {
    this.sheet = this.getSheet();
    this.lastRow = this.getLastRow();
    this.lastCol = this.getLastColumn();
    this.fullData = this.getAll();
  }

  last(): SummaryReport | null {
    const lastSummaryReport = this.fullData[this.fullData.length - 1];
    return !!lastSummaryReport ? lastSummaryReport : null;
  }

  bulkInsert(summaryReports: SummaryReport[]): number[] {
    const count = summaryReports.length;
    const params = summaryReports.map((e) => {
      return [
        e.getSummaryReportId().toNumber(),
        e.getUserId().toString(),
        e.getIsoWeekId().toNumber(),
        e.getTotalImplementHour().toNumber(),
        e.getMeasurementCount().toNumber(),
        e.getAverageImplementHour().toNumber(),
        e.getTheoreticalAvailableHour().toNumber(),
        e.getAvailableRate().toNumber(),
        e.getKpiValue().toNumber(),
        e.getNotifiedAt().toDate(),
      ];
    });
    this.sheet
      .getRange(this.lastRow + 1, 1, count, this.lastCol)
      .setValues(params);
    return summaryReports.map((e) => e.getSummaryReportId().toNumber());
  }

  private getAll(): readonly SummaryReport[] {
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
    const sheet = spreadsheet.getSheetByName('summary_reports');

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

  private map(fullData: any[][]): readonly SummaryReport[] {
    return fullData.map((e) => {
      return new SummaryReport(
        e[0],
        e[1],
        e[2],
        e[3],
        e[4],
        e[5],
        e[6],
        e[7],
        e[8],
        e[9],
        e[10],
      );
    });
  }
}
