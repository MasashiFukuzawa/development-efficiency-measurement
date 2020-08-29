import { IsoWeekId } from '../iso_week/domain_objects/ios_week_id';
import { StandardValueAverageImplementHour } from './value_objects/standard_value_average_implement_hour';
import { StandardValueKpiValue } from './value_objects/standard_value_kpi_value';
import { StandardValueMeasurementCount } from './value_objects/standard_value_measurement_count';
import { StandardValueTheoreticalAvailableHour } from './value_objects/standard_value_theoretical_available_hour';
import { StandardValueAvailableRate } from './value_objects/standard_value_available_rate';
import { StandardValueTotalImplementHour } from './value_objects/standard_value_total_implement_hour';
import { SummaryReport } from '../summary_report/summary_report';

export class StandardValue {
  private readonly isoWeekId: IsoWeekId;
  private readonly totalImplementHour: StandardValueTotalImplementHour;
  private readonly measurementCount: StandardValueMeasurementCount;
  private readonly averageImplementHour: StandardValueAverageImplementHour;
  private readonly theoreticalAvailableHour: StandardValueTheoreticalAvailableHour;
  private readonly availableRate: StandardValueAvailableRate;
  private readonly kpiValue: StandardValueKpiValue;
  constructor(
    isoWeekId: number,
    totalImplementHour: number,
    measurementCount: number,
    averageImplementHour: number,
    theoreticalAvailableHour: number,
    availableRate: number,
    kpiValue: number,
  ) {
    this.isoWeekId = new IsoWeekId(isoWeekId);
    this.totalImplementHour = new StandardValueTotalImplementHour(
      totalImplementHour,
    );
    this.measurementCount = new StandardValueMeasurementCount(measurementCount);
    this.averageImplementHour = new StandardValueAverageImplementHour(
      averageImplementHour,
    );
    this.theoreticalAvailableHour = new StandardValueTheoreticalAvailableHour(
      theoreticalAvailableHour,
    );
    this.availableRate = new StandardValueAvailableRate(availableRate);
    this.kpiValue = new StandardValueKpiValue(kpiValue);
  }

  getIsoWeekId(): IsoWeekId {
    return this.isoWeekId;
  }

  getTotalImplementHour(): StandardValueTotalImplementHour {
    return this.totalImplementHour;
  }

  getMeasurementCount(): StandardValueMeasurementCount {
    return this.measurementCount;
  }

  getAverageImplementHour(): StandardValueAverageImplementHour {
    return this.averageImplementHour;
  }

  getTheoreticalAvailableHour(): StandardValueTheoreticalAvailableHour {
    return this.theoreticalAvailableHour;
  }

  getAvailableRate(): StandardValueAvailableRate {
    return this.availableRate;
  }

  getKpiValue(): StandardValueKpiValue {
    return this.kpiValue;
  }

  // TODO: もっと効率の良いロジックに修正する
  static calculateAverage(
    isoWeekId: number,
    summaryReports: SummaryReport[],
  ): StandardValue {
    return new StandardValue(
      isoWeekId,
      this.calculateTotalImplementHourAverage(summaryReports),
      this.calculateMeasurementCountAverage(summaryReports),
      this.calculateAverageImplementHourAverage(summaryReports),
      this.calculateTheoreticalAvailableHourAverage(summaryReports),
      this.calculateAvailableRateAverage(summaryReports),
      this.calculateKpiValueAverage(summaryReports),
    );
  }

  private static calculateTotalImplementHourAverage(
    summaryReports: SummaryReport[],
  ): number {
    return summaryReports
      .map((e) => {
        return e.getTotalImplementHour().toNumber();
      })
      .reduce((accumulator: number, currentValue: number) => {
        return accumulator + currentValue;
      });
  }

  private static calculateMeasurementCountAverage(
    summaryReports: SummaryReport[],
  ): number {
    return summaryReports
      .map((e) => {
        return e.getMeasurementCount().toNumber();
      })
      .reduce((accumulator: number, currentValue: number) => {
        return accumulator + currentValue;
      });
  }

  private static calculateAverageImplementHourAverage(
    summaryReports: SummaryReport[],
  ): number {
    return summaryReports
      .map((e) => {
        return e.getAverageImplementHour().toNumber();
      })
      .reduce((accumulator: number, currentValue: number) => {
        return accumulator + currentValue;
      });
  }

  private static calculateTheoreticalAvailableHourAverage(
    summaryReports: SummaryReport[],
  ): number {
    return summaryReports
      .map((e) => {
        return e.getTheoreticalAvailableHour().toNumber();
      })
      .reduce((accumulator: number, currentValue: number) => {
        return accumulator + currentValue;
      });
  }

  private static calculateAvailableRateAverage(
    summaryReports: SummaryReport[],
  ): number {
    return summaryReports
      .map((e) => {
        return e.getAvailableRate().toNumber();
      })
      .reduce((accumulator: number, currentValue: number) => {
        return accumulator + currentValue;
      });
  }

  private static calculateKpiValueAverage(
    summaryReports: SummaryReport[],
  ): number {
    return summaryReports
      .map((e) => {
        return e.getKpiValue().toNumber();
      })
      .reduce((accumulator: number, currentValue: number) => {
        return accumulator + currentValue;
      });
  }
}
