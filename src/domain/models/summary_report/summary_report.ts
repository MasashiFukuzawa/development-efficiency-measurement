import { UserId } from '../user/value_objects/user_id';
import { IsoWeekId } from '../iso_week/domain_objects/ios_week_id';
import { SummaryReportNotifiedAt } from './value_objects/summary_report_notified_at';
import { SummaryReportAverageImplementHour } from './value_objects/summary_report_average_implement_hour';
import { SummaryReportKpiValue } from './value_objects/summary_report_kpi_value';
import { SummaryReportMeasurementCount } from './value_objects/summary_report_measurement_count';
import { SummaryReportTheoreticalAvailableHour } from './value_objects/summary_report_theoretical_available_hour';
import { SummaryReportAvailableRate } from './value_objects/summary_report_available_rate';
import { SummaryReportTotalImplementHour } from './value_objects/summary_report_total_implement_hour';
import { SummaryReportId } from './value_objects/summary_report_id';
import { Measurement } from '../measurement/measurement';

export class SummaryReport {
  private readonly id: SummaryReportId;
  private readonly userId: UserId;
  private readonly isoWeekId: IsoWeekId;
  private readonly totalImplementHour: SummaryReportTotalImplementHour;
  private readonly measurementCount: SummaryReportMeasurementCount;
  private readonly averageImplementHour: SummaryReportAverageImplementHour;
  private readonly theoreticalAvailableHour: SummaryReportTheoreticalAvailableHour;
  private readonly availableRate: SummaryReportAvailableRate;
  private readonly kpiValue: SummaryReportKpiValue;
  private readonly notifiedAt: SummaryReportNotifiedAt;
  constructor(
    id: number,
    userId: string,
    isoWeekId: number,
    totalImplementHour: number,
    measurementCount: number,
    averageImplementHour: number,
    theoreticalAvailableHour: number,
    availableRate: number,
    kpiValue: number,
    notifiedAt = new Date(),
  ) {
    this.id = new SummaryReportId(id);
    this.userId = new UserId(userId);
    this.isoWeekId = new IsoWeekId(isoWeekId);
    this.totalImplementHour = new SummaryReportTotalImplementHour(
      totalImplementHour,
    );
    this.measurementCount = new SummaryReportMeasurementCount(measurementCount);
    this.averageImplementHour = new SummaryReportAverageImplementHour(
      averageImplementHour,
    );
    this.theoreticalAvailableHour = new SummaryReportTheoreticalAvailableHour(
      theoreticalAvailableHour,
    );
    this.availableRate = new SummaryReportAvailableRate(availableRate);
    this.kpiValue = new SummaryReportKpiValue(kpiValue);
    this.notifiedAt = new SummaryReportNotifiedAt(notifiedAt);
  }

  getSummaryReportId(): SummaryReportId {
    return this.id;
  }

  getUserId(): UserId {
    return this.userId;
  }

  getIsoWeekId(): IsoWeekId {
    return this.isoWeekId;
  }

  getTotalImplementHour(): SummaryReportTotalImplementHour {
    return this.totalImplementHour;
  }

  getMeasurementCount(): SummaryReportMeasurementCount {
    return this.measurementCount;
  }

  getAverageImplementHour(): SummaryReportAverageImplementHour {
    return this.averageImplementHour;
  }

  getTheoreticalAvailableHour(): SummaryReportTheoreticalAvailableHour {
    return this.theoreticalAvailableHour;
  }

  getAvailableRate(): SummaryReportAvailableRate {
    return this.availableRate;
  }

  getKpiValue(): SummaryReportKpiValue {
    return this.kpiValue;
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

  static calculateTheoreticalAvailableHour(
    theoreticalAvailableTime: number,
  ): number {
    return theoreticalAvailableTime / (60 * 60 * 1000);
  }

  static calculateAvailableRate(
    theoreticalHour: number,
    totalImplementHour: number,
  ): number {
    return theoreticalHour === 0 ? 0 : totalImplementHour / theoreticalHour;
  }

  static calculateKpiValue(
    totalImplementHour: number,
    averageImplementHour: number,
    theoreticalRate: number,
  ): number {
    return totalImplementHour * averageImplementHour * theoreticalRate;
  }
}
