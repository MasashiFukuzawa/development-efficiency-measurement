import { GoogleAppsScriptConstants } from '../../constants';
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
      return new Measurement(
        e[0],
        e[1],
        e[2],
        typeof e[3] === 'string' ? Moment.moment(e[3]).toDate() : e[3],
        typeof e[4] === 'string' ? Moment.moment(e[4]).toDate() : e[4] || void 0,
      );
    });
  }

  last(userId: string): Measurement | null {
    const measurement = this.fullData.filter((e) => e.isTargetUser(userId));
    const lastMeasurement = measurement[measurement.length - 1];
    return !!lastMeasurement ? lastMeasurement : null;
  }

  stampStartAt(userId: string, isoWeekId: number): Measurement {
    const id = this.lastRow;
    const now = new Date();
    const measurement = new Measurement(id, userId, isoWeekId, now, void 0);
    this.sheet
      .getRange(this.lastRow + 1, 1, 1, this.lastCol)
      .setValues([[id, userId, isoWeekId, now, void 0]]);

    this.putCache(id, userId, isoWeekId, now, void 0);

    return measurement;
  }

  stampStopAt(lastMeasurement: Measurement): Measurement {
    const id = lastMeasurement.getMeasurementId().toNumber();
    const userId = lastMeasurement.getUserId().toString();
    const isoWeekId = lastMeasurement.getIsoWeekId().toNumber();
    const startAt = lastMeasurement.getMeasurementStartAt().toDate();
    const now = new Date();
    const measurement = new Measurement(id, userId, isoWeekId, startAt, now);
    this.sheet
      .getRange(id + 1, 1, 1, this.lastCol)
      .setValues([[id, userId, isoWeekId, startAt, now]]);

    this.putCache(id, userId, isoWeekId, startAt, now);

    return measurement;
  }

  putCache(
    id: number,
    userId: string,
    isoWeekId: number,
    startAt: Date,
    stopAt: Date | undefined,
  ): void {
    const measurementsCache: readonly any[][] = !this.dbCache
      ? this.getRawData()
      : JSON.parse(this.dbCache);

    const measurementsCacheClone = [...measurementsCache];

    if (!stopAt) {
      measurementsCacheClone.push([id, userId, isoWeekId, startAt, void 0]);
    } else {
      measurementsCacheClone.filter((e) => e[0] === id)[0][4] = stopAt;
    }

    this.cache?.put(
      'data:measurements',
      JSON.stringify(measurementsCacheClone),
      GoogleAppsScriptConstants.MAX_CACHE_EXPIRATION_IN_SECONDS,
    );
  }
}
