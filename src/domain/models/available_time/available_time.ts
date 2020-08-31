import { IsoWeekId } from '../iso_week/domain_objects/ios_week_id';
import { UserId } from '../user/value_objects/user_id';
import { AvailableTimeTheoreticalImplementTime } from './value_objects/available_time_theoretical_implement_time';

export interface Event {
  title: string;
  willAttend: boolean;
  eventStartAt: Date;
  eventEndAt: Date;
}

export class AvailableTime {
  static readonly WORK_HOURS_PER_DAY = 8;
  static readonly WORK_HOURS_PER_WEEK = 40;

  private readonly userId: UserId;
  private readonly isoWeekId: IsoWeekId;
  private readonly theoreticalImplementTime: AvailableTimeTheoreticalImplementTime;
  constructor(userId: string, isoWeekId: number, theoreticalImplementTime: number) {
    this.userId = new UserId(userId);
    this.isoWeekId = new IsoWeekId(isoWeekId);
    this.theoreticalImplementTime = new AvailableTimeTheoreticalImplementTime(
      theoreticalImplementTime,
    );
  }

  getUserId(): UserId {
    return this.userId;
  }

  getIsoWeekId(): IsoWeekId {
    return this.isoWeekId;
  }

  getTheoreticalImplementTime(): AvailableTimeTheoreticalImplementTime {
    return this.theoreticalImplementTime;
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

  static convertMilliSecToHour(ms: number): number {
    return ms / (60 * 60 * 1000);
  }

  static calculateAvailableTime(
    weeklyEvents: Event[],
    workStartHour: number,
    workStartMinute: number,
    workEndHour: number,
    workEndMinute: number,
    availableWorkHours: 8 | 40,
  ): number {
    const attendEvents = this.cutOffNotAttendEvents(weeklyEvents);

    const eventsWithoutBreakTime = this.trimBreakTime(attendEvents);

    const sortedEvents = this.sortEvent(eventsWithoutBreakTime);

    const eventsWithoutTimeOverlapping = this.trimTimeOverlapping(sortedEvents);

    const trimmedBeforeAndAfterWorkHour = this.cutOffBeforeAndAfterWorkHour(
      eventsWithoutTimeOverlapping,
      workStartHour,
      workStartMinute,
      workEndHour,
      workEndMinute,
    );

    const eventTimeLists = trimmedBeforeAndAfterWorkHour.map((e) => {
      return e.end.getTime() - e.start.getTime();
    });

    const theoreticalImplementTime = eventTimeLists.reduce((a: number, b: number) => a + b);

    // NOTE: trimBreakTime関数で休憩イベントをトリミングしたので、最終的にここで休憩時間を1時間分付与して帳尻を合わせている
    const maxTime = (availableWorkHours + 1) * 60 * 60 * 1000;

    return maxTime - theoreticalImplementTime;
  }

  private static cutOffNotAttendEvents(weeklyEvents: Event[]): Event[] {
    return weeklyEvents.filter((e) => e.willAttend);
  }

  private static trimBreakTime(attendEvents: Event[]): Event[] {
    const breakKeyWords = ['休憩', 'ランチ', 'ご飯', 'ごはん', 'Lunch', 'lunch', 'Break', 'break'];
    return attendEvents.filter((e) => !breakKeyWords.includes(e.title));
  }

  private static sortEvent(attendEvents: Event[]): Event[] {
    return attendEvents
      .sort((a, b) => a.eventEndAt.getTime() - b.eventEndAt.getTime())
      .sort((a, b) => a.eventStartAt.getTime() - b.eventStartAt.getTime());
  }

  private static trimTimeOverlapping(sortedEvents: Event[]): { start: Date; end: Date }[] {
    const blocks = [];
    const block = {
      start: sortedEvents[0].eventStartAt,
      end: sortedEvents[0].eventEndAt,
    };

    sortedEvents.forEach((e) => {
      const start = e.eventStartAt;
      const end = e.eventEndAt;

      if (block.end < start) {
        blocks.push({
          start: block.start,
          end: block.end,
        });
        block.start = start;
        block.end = end;
      }

      if (block.end < end) return (block.end = end);
    });

    blocks.push({
      start: block.start,
      end: block.end,
    });

    return blocks;
  }

  private static cutOffBeforeAndAfterWorkHour(
    eventsWithoutTimeOverlapping: { start: Date; end: Date }[],
    workStartHour: number,
    workStartMinute: number,
    workEndHour: number,
    workEndMinute: number,
  ): { start: Date; end: Date }[] {
    const filteredEvents = eventsWithoutTimeOverlapping.filter((e) => {
      const workTime = AvailableTime.getWorkTime(
        e,
        workStartHour,
        workStartMinute,
        workEndHour,
        workEndMinute,
      );

      return workTime.start < e.end && e.start < workTime.end;
    });

    return filteredEvents.map((e) => {
      const workTime = AvailableTime.getWorkTime(
        e,
        workStartHour,
        workStartMinute,
        workEndHour,
        workEndMinute,
      );

      if (e.start < workTime.start) e.start = workTime.start;
      if (workTime.end < e.end) e.end = workTime.end;

      return { start: e.start, end: e.end };
    });
  }

  private static getWorkTime(
    event: { start: Date; end: Date },
    workStartHour: number,
    workStartMinute: number,
    workEndHour: number,
    workEndMinute: number,
  ): { start: Date; end: Date } {
    const start = new Date(
      event.start.getFullYear(),
      event.start.getMonth(),
      event.start.getDate(),
      workStartHour,
      workStartMinute,
    );
    const end = new Date(
      event.end.getFullYear(),
      event.end.getMonth(),
      event.end.getDate(),
      workEndHour,
      workEndMinute,
    );
    return { start, end };
  }
}
