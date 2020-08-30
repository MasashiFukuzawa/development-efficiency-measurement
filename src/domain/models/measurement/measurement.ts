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

  calculateImplementTime(): number {
    const startAt = Moment.moment(this.getMeasurementStartAt().toDate());
    const stopAt = Moment.moment(this.getMeasurementStopAt()?.toDate());
    return Math.abs(startAt.diff(stopAt));
  }

  isTargetWeek(isoWeekId: number): boolean {
    return this.getIsoWeekId().toNumber() === isoWeekId;
  }

  isAssociatedWithUser(userIds: string[]): boolean {
    return userIds.indexOf(this.getUserId().toString()) !== -1;
  }

  isTargetUser(userId: string): boolean {
    return this.getUserId().toString() === userId;
  }

  static cutOffBeforeAndAfterWorkHour(
    measurements: Measurement[],
    workStartHour = 10,
    workStartMinute = 0,
    workEndHour = 19,
    workEndMinute = 0,
  ): { start: Date; stop: Date }[] {
    const filteredMeasurements = measurements.filter((e) => {
      const start = e.getMeasurementStartAt().toDate();
      const stop = e.getMeasurementStopAt()?.toDate();
      if (typeof stop === 'undefined') {
        throw new Error(
          `MeasurementStopAt is undefined. measurementId=${e.getMeasurementId().toNumber()}`,
        );
      }

      const workTime = this.getWorkTime(
        { start, stop },
        workStartHour,
        workStartMinute,
        workEndHour,
        workEndMinute,
      );

      return workTime.start < stop && start < workTime.stop;
    });

    return filteredMeasurements.map((e) => {
      const start = e.getMeasurementStartAt().toDate();
      const stop = e.getMeasurementStopAt()?.toDate();
      if (typeof stop === 'undefined') {
        throw new Error(
          `MeasurementStopAt is undefined. measurementId=${e.getMeasurementId().toNumber()}`,
        );
      }

      const workTime = this.getWorkTime(
        { start, stop },
        workStartHour,
        workStartMinute,
        workEndHour,
        workEndMinute,
      );

      const mStart = start < workTime.start ? workTime.start : start;
      const mStop = workTime.stop < stop ? workTime.stop : stop;

      return { start: mStart, stop: mStop };
    });
  }

  private static getWorkTime(
    event: { start: Date; stop: Date },
    workStartHour = 10,
    workStartMinute = 0,
    workEndHour = 19,
    workEndMinute = 0,
  ): { start: Date; stop: Date } {
    const start = new Date(
      event.start.getFullYear(),
      event.start.getMonth(),
      event.start.getDate(),
      workStartHour,
      workStartMinute,
    );
    const stop = new Date(
      event.stop.getFullYear(),
      event.stop.getMonth(),
      event.stop.getDate(),
      workEndHour,
      workEndMinute,
    );
    return { start, stop };
  }

  static isConflicting(lastMeasurement: Measurement | null): boolean {
    if (lastMeasurement === null) return false;
    return this.isAlreadyStarted(lastMeasurement);
  }

  static isAlreadyStarted(lastMeasurement: Measurement): boolean {
    return typeof lastMeasurement.getMeasurementStopAt() === 'undefined';
  }
}
