import { IsoWeekId } from '../iso_week/domain_objects/ios_week_id';
import { StandardValueAverageHour } from './value_objects/standard_value_average_hour';
import { StandardValueKpiValue } from './value_objects/standard_value_kpi_value';
import { StandardValueMeasurementCount } from './value_objects/standard_value_measurement_count';
import { StandardValueTheoreticalAvailableHour } from './value_objects/standard_value_theoretical_available_hour';
import { StandardValueAvailableRate } from './value_objects/standard_value_available_rate';
import { StandardValueTotalImplementHour } from './value_objects/standard_value_total_implement_hour';

export class StandardValue {
  private readonly isoWeekId: IsoWeekId;
  private readonly totalImplementHour: StandardValueTotalImplementHour;
  private readonly measurementCount: StandardValueMeasurementCount;
  private readonly averageHour: StandardValueAverageHour;
  private readonly theoreticalAvailableHour: StandardValueTheoreticalAvailableHour;
  private readonly availableRate: StandardValueAvailableRate;
  private readonly kpiValue: StandardValueKpiValue;
  constructor(
    isoWeekId: number,
    totalImplementHour: number,
    measurementCount: number,
    averageHour: number,
    theoreticalAvailableHour: number,
    availableRate: number,
    kpiValue: number,
  ) {
    this.isoWeekId = new IsoWeekId(isoWeekId);
    this.totalImplementHour = new StandardValueTotalImplementHour(
      totalImplementHour,
    );
    this.measurementCount = new StandardValueMeasurementCount(measurementCount);
    this.averageHour = new StandardValueAverageHour(averageHour);
    this.theoreticalAvailableHour = new StandardValueTheoreticalAvailableHour(
      theoreticalAvailableHour,
    );
    this.availableRate = new StandardValueAvailableRate(availableRate);
    this.kpiValue = new StandardValueKpiValue(kpiValue);
  }

  getIsoWeekId(): IsoWeekId {
    return this.isoWeekId;
  }

  getTotalHour(): StandardValueTotalImplementHour {
    return this.totalImplementHour;
  }

  getMeasurementCount(): StandardValueMeasurementCount {
    return this.measurementCount;
  }

  getAverageHour(): StandardValueAverageHour {
    return this.averageHour;
  }

  getTheoreticalHour(): StandardValueTheoreticalAvailableHour {
    return this.theoreticalAvailableHour;
  }

  getTheoreticalRate(): StandardValueAvailableRate {
    return this.availableRate;
  }

  getKpiValue(): StandardValueKpiValue {
    return this.kpiValue;
  }
}
