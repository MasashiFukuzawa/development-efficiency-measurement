import { IsoWeekId } from '../iso_week/domain_objects/ios_week_id';
import { UserId } from '../user/value_objects/user_id';
import { MeasurementDescription } from './value_objects/measurement_description';
import { MeasurementId } from './value_objects/measurement_id';
import { MeasurementStartAt } from './value_objects/measurement_start_at';
import { MeasurementStopAt } from './value_objects/measurement_stop_at';

export class Measurement {
  private readonly id: MeasurementId;
  private readonly userId: UserId;
  private readonly isoWeekId: IsoWeekId;
  private readonly startAt: MeasurementStartAt;
  private readonly stopAt?: MeasurementStopAt;
  private readonly description?: MeasurementDescription;
  constructor(
    id: number,
    userId: string,
    isoWeekId: number,
    startAt: Date,
    stopAt?: Date,
    description?: string,
  ) {
    this.id = new MeasurementId(id);
    this.userId = new UserId(userId);
    this.isoWeekId = new IsoWeekId(isoWeekId);
    this.startAt = new MeasurementStartAt(startAt);
    if (typeof stopAt !== 'undefined') {
      this.stopAt = new MeasurementStopAt(stopAt);
    }
    if (typeof description !== 'undefined') {
      this.description = new MeasurementDescription(description);
    }
  }

  getMeasurementId(): MeasurementId {
    return this.id;
  }

  getUserId(): UserId {
    return this.userId;
  }

  getIsoWeekId(): IsoWeekId {
    return this.isoWeekId;
  }

  getMeasurementStartAt(): MeasurementStartAt {
    return this.startAt;
  }

  getMeasurementStopAt(): MeasurementStopAt | undefined {
    return this.stopAt;
  }

  getDescription(): MeasurementDescription | undefined {
    return this.description;
  }

  calculateImplementTime() {
    const startAt = Moment.moment(this.getMeasurementStartAt().toDate());
    const stopAt = Moment.moment(this.getMeasurementStopAt()?.toDate());
    return Math.abs(startAt.diff(stopAt));
  }

  static isConflicting(lastMeasurement: Measurement | null): boolean {
    if (lastMeasurement === null) return false;
    return this.isAlreadyStarted(lastMeasurement);
  }

  static isAlreadyStarted(lastMeasurement: Measurement): boolean {
    return typeof lastMeasurement.getMeasurementStopAt() === 'undefined';
  }
}
