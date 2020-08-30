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
    this.totalImplementHour = new StandardValueTotalImplementHour(totalImplementHour);
    this.measurementCount = new StandardValueMeasurementCount(measurementCount);
    this.averageImplementHour = new StandardValueAverageImplementHour(averageImplementHour);
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
  static calculateAverage(summaryReports: SummaryReport[]): StandardValue {
    const count = summaryReports.length;
    return new StandardValue(
      summaryReports[0].getIsoWeekId().toNumber(),
      this.sumTotalImplementHour(summaryReports) / count,
      this.sumMeasurementCount(summaryReports) / count,
      this.sumAverageImplementHour(summaryReports) / count,
      this.sumTheoreticalAvailableHour(summaryReports) / count,
      this.sumAvailableRate(summaryReports) / count,
      this.sumKpiValue(summaryReports) / count,
    );
  }

  private static sumTotalImplementHour(summaryReports: SummaryReport[]): number {
    return summaryReports
      .map((e) => {
        return e.getTotalImplementHour().toNumber();
      })
      .reduce((a: number, b: number) => {
        return a + b;
      });
  }

  private static sumMeasurementCount(summaryReports: SummaryReport[]): number {
    return summaryReports
      .map((e) => {
        return e.getMeasurementCount().toNumber();
      })
      .reduce((a: number, b: number) => {
        return a + b;
      });
  }

  private static sumAverageImplementHour(summaryReports: SummaryReport[]): number {
    return summaryReports
      .map((e) => {
        return e.getAverageImplementHour().toNumber();
      })
      .reduce((a: number, b: number) => {
        return a + b;
      });
  }

  private static sumTheoreticalAvailableHour(summaryReports: SummaryReport[]): number {
    return summaryReports
      .map((e) => {
        return e.getTheoreticalAvailableHour().toNumber();
      })
      .reduce((a: number, b: number) => {
        return a + b;
      });
  }

  private static sumAvailableRate(summaryReports: SummaryReport[]): number {
    return summaryReports
      .map((e) => {
        return e.getAvailableRate().toNumber();
      })
      .reduce((a: number, b: number) => {
        return a + b;
      });
  }

  private static sumKpiValue(summaryReports: SummaryReport[]): number {
    return summaryReports
      .map((e) => {
        return e.getKpiValue().toNumber();
      })
      .reduce((a: number, b: number) => {
        return a + b;
      });
  }
}
