import { UserId } from '../user/value_objects/user_id';
import { MeasurementDescription } from './value_objects/measurement_description';
import { MeasurementStartAt } from './value_objects/measurement_start_at';
import { MeasurementStopAt } from './value_objects/measurement_stop_at';

export class Measurement {
  private readonly userId: UserId;
  private readonly startAt: MeasurementStartAt;
  private readonly stopAt?: MeasurementStopAt;
  private readonly description?: MeasurementDescription;
  constructor(
    userId: string,
    startAt: Date,
    stopAt?: Date,
    description?: string,
  ) {
    this.userId = new UserId(userId);
    this.startAt = new MeasurementStartAt(startAt);
    this.stopAt = new MeasurementStopAt(stopAt);
    this.description = new MeasurementDescription(description);
  }

  getUserId(): UserId {
    return this.userId;
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

  static isConflicting(lastMeasurement: Measurement | null): boolean {
    return (
      lastMeasurement !== null &&
      lastMeasurement.getMeasurementStopAt() === undefined
    );
  }
}
