import { TheoreticalTimeId } from '../theoretical_time/value_objects/theoretical_time_id';
import { UserId } from '../user/value_objects/user_id';
import { MeasurementDescription } from './value_objects/measurement_description';
import { MeasurementId } from './value_objects/measurement_id';
import { MeasurementStartAt } from './value_objects/measurement_start_at';
import { MeasurementStopAt } from './value_objects/measurement_stop_at';

export class Measurement {
  private readonly id: MeasurementId;
  private readonly userId: UserId;
  private readonly theoreticalTimeId: TheoreticalTimeId;
  private readonly startAt: MeasurementStartAt;
  private readonly stopAt?: MeasurementStopAt;
  private readonly description?: MeasurementDescription;
  constructor(
    id: number,
    userId: string,
    theoreticalTimeId: number,
    startAt: Date,
    stopAt?: Date,
    description?: string,
  ) {
    this.id = new MeasurementId(id);
    this.userId = new UserId(userId);
    this.theoreticalTimeId = new TheoreticalTimeId(theoreticalTimeId);
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

  getTheoreticalTimeId(): TheoreticalTimeId {
    return this.theoreticalTimeId;
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

  calculateImplementTime(): number {
    const startAt = Moment.moment(this.getMeasurementStartAt().toDate());
    const stopAt = Moment.moment(this.getMeasurementStopAt()?.toDate());
    return Math.abs(startAt.diff(stopAt));
  }

  isAssociatedWithTheoreticalTime(theoreticalTimeIds: number[]): boolean {
    return (
      theoreticalTimeIds.indexOf(this.getTheoreticalTimeId().toNumber()) !== 1
    );
  }

  isAssociatedWithUser(userIds: string[]): boolean {
    return userIds.indexOf(this.getUserId().toString()) !== 1;
  }

  isTargetUser(userId: string): boolean {
    return this.getUserId().toString() === userId;
  }

  static isConflicting(lastMeasurement: Measurement | null): boolean {
    if (lastMeasurement === null) return false;
    return this.isAlreadyStarted(lastMeasurement);
  }

  static isAlreadyStarted(lastMeasurement: Measurement): boolean {
    return typeof lastMeasurement.getMeasurementStopAt() === 'undefined';
  }
}
