import { Measurement } from '../measurement/measurement';
import { TheoreticalTimeIsoWeek } from '../theoretical_time/value_objects/theoretical_time_iso_week';
import { UserId } from '../user/value_objects/user_id';
import { StandardValueId } from '../standard_value/value_objects/standard_value_id';
import { SummaryReportNotifiedAt } from './value_objects/summary_report_notified_at';
import { SummaryReportAverageHour } from './value_objects/summary_report_average_hour';
import { SummaryReportKpiValue } from './value_objects/summary_report_kpi_value';
import { SummaryReportMeasurementCount } from './value_objects/summary_report_measurement_count';
import { SummaryReportTheoreticalHour } from './value_objects/summary_report_theoretical_hour';
import { SummaryReportTheoreticalRate } from './value_objects/summary_report_theoretical_rate';
import { SummaryReportTotalHour } from './value_objects/summary_report_total_hour';
import { SummaryReportId } from './value_objects/summary_report_id';

export class SummaryReport {
  private readonly id: SummaryReportId;
  private readonly userId: UserId;
  private readonly standardValueId: StandardValueId;
  private readonly totalHour: SummaryReportTotalHour;
  private readonly measurementCount: SummaryReportMeasurementCount;
  private readonly averageHour: SummaryReportAverageHour;
  private readonly theoreticalHour: SummaryReportTheoreticalHour;
  private readonly theoreticalRate: SummaryReportTheoreticalRate;
  private readonly kpiValue: SummaryReportKpiValue;
  private readonly isoWeek: TheoreticalTimeIsoWeek;
  private readonly notifiedAt: SummaryReportNotifiedAt;
  constructor(
    id: number,
    userId: string,
    standardValueId: number,
    totalHour: number,
    measurementCount: number,
    averageHour: number,
    theoreticalHour: number,
    theoreticalRate: number,
    kpiValue: number,
    isoWeek: number = Moment.moment().isoWeek(),
    notifiedAt = new Date(),
  ) {
    this.id = new SummaryReportId(id);
    this.userId = new UserId(userId);
    this.standardValueId = new StandardValueId(standardValueId);
    this.totalHour = new SummaryReportTotalHour(totalHour);
    this.measurementCount = new SummaryReportMeasurementCount(measurementCount);
    this.averageHour = new SummaryReportAverageHour(averageHour);
    this.theoreticalHour = new SummaryReportTheoreticalHour(theoreticalHour);
    this.theoreticalRate = new SummaryReportTheoreticalRate(theoreticalRate);
    this.kpiValue = new SummaryReportKpiValue(kpiValue);
    this.isoWeek = new TheoreticalTimeIsoWeek(isoWeek);
    this.notifiedAt = new SummaryReportNotifiedAt(notifiedAt);
  }

  getSummaryReportId(): SummaryReportId {
    return this.id;
  }

  getUserId(): UserId {
    return this.userId;
  }

  getStandardValueId(): StandardValueId {
    return this.standardValueId;
  }

  getTotalHour(): SummaryReportTotalHour {
    return this.totalHour;
  }

  getMeasurementCount(): SummaryReportMeasurementCount {
    return this.measurementCount;
  }

  getAverageHour(): SummaryReportAverageHour {
    return this.averageHour;
  }

  getTheoreticalHour(): SummaryReportTheoreticalHour {
    return this.theoreticalHour;
  }

  getTheoreticalRate(): SummaryReportTheoreticalRate {
    return this.theoreticalRate;
  }

  getKpiValue(): SummaryReportKpiValue {
    return this.kpiValue;
  }

  getIsoWeek(): TheoreticalTimeIsoWeek {
    return this.isoWeek;
  }

  getNotifiedAt(): SummaryReportNotifiedAt {
    return this.notifiedAt;
  }

  static count(measurements: Measurement[]): number {
    return measurements.length;
  }

  static sum(measurements: Measurement[]): number {
    return measurements
      .map((e) => {
        return e.calculateImplementTime();
      })
      .reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
      );
  }

  static average(measurementCount: number, totalImplementHour: number): number {
    return measurementCount === 0 ? 0 : totalImplementHour / measurementCount;
  }

  static calculateTheoreticalHour(theoreticalTotalTime: number): number {
    return theoreticalTotalTime / (60 * 60 * 1000);
  }

  static calculateTheoreticalRate(
    theoreticalHour: number,
    totalImplementHour: number,
  ): number {
    return theoreticalHour === 0 ? 0 : totalImplementHour / theoreticalHour;
  }

  static calculateKpiValue(
    totalImplementHour: number,
    averageHour: number,
    theoreticalRate: number,
  ): number {
    return totalImplementHour * averageHour * theoreticalRate;
  }
}
