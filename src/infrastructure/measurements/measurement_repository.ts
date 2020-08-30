import { Measurement } from '../../domain/models/measurement/measurement';
import { MeasurementRepositoryInterface } from '../../domain/models/measurement/measurement_repository_interface';
import { BaseRepository } from '../base_repository';

export class MeasurementRepository extends BaseRepository
  implements MeasurementRepositoryInterface {
  constructor(sheetName = 'measurements') {
    super(sheetName);
  }

  map(data: any[][]): readonly Measurement[] {
    return data.map((e) => {
      return new Measurement(e[0], e[1], e[2], e[3], e[4] || void 0, e[5] || void 0);
    });
  }

  last(userId: string): Measurement | null {
    const measurement = this.fullData.filter((e) => e.isTargetUser(userId));
    const lastMeasurement = measurement[measurement.length - 1];
    return !!lastMeasurement ? lastMeasurement : null;
  }

  stampStartAt(userId: string, isoWeekId: number, description?: string): Measurement {
    const id = this.lastRow;
    const now = new Date();
    const measurement = new Measurement(id, userId, isoWeekId, now, void 0, description);
    this.sheet
      .getRange(this.lastRow + 1, 1, 1, this.lastCol)
      .setValues([[id, userId, isoWeekId, now, void 0, description]]);
    return measurement;
  }

  stampStopAt(lastMeasurement: Measurement): Measurement {
    const id = lastMeasurement.getMeasurementId().toNumber();
    const userId = lastMeasurement.getUserId().toString();
    const isoWeekId = lastMeasurement.getIsoWeekId().toNumber();
    const startAt = lastMeasurement.getMeasurementStartAt().toDate();
    const now = new Date();
    const description =
      typeof lastMeasurement.getDescription() === 'undefined'
        ? void 0
        : lastMeasurement.getDescription()?.toString();
    const measurement = new Measurement(id, userId, isoWeekId, startAt, now, description);
    this.sheet
      .getRange(id + 1, 1, 1, this.lastCol)
      .setValues([[id, userId, isoWeekId, startAt, now, description]]);
    return measurement;
  }
}
