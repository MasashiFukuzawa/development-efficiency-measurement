import { UserId } from '../user/value_objects/user_id';
import { TheoreticalTimeIsoWeek } from './value_objects/theoretical_time_iso_week';
import { TheoreticalTimeTotalTime } from './value_objects/theoretical_time_total_time';

export interface WeeklyEvent {
  willAttend: boolean;
  eventStartAt: Date;
  eventEndAt: Date;
}

export class TheoreticalTime {
  private static readonly WORK_HOURS_PER_WEEK = 40;

  private readonly userId: UserId;
  private readonly isoWeek: TheoreticalTimeIsoWeek;
  private readonly totalTime: TheoreticalTimeTotalTime;
  constructor(userId: string, isoWeek: number, totalTime: number) {
    this.userId = new UserId(userId);
    this.isoWeek = new TheoreticalTimeIsoWeek(isoWeek);
    this.totalTime = new TheoreticalTimeTotalTime(totalTime);
  }

  getUserId(): UserId {
    return this.userId;
  }

  getTheoreticalTimeIsoWeek(): TheoreticalTimeIsoWeek {
    return this.isoWeek;
  }

  getTheoreticalTimeTotalTime(): TheoreticalTimeTotalTime {
    return this.totalTime;
  }

  static calculateTheoreticalTime(
    weeklyEvents: WeeklyEvent[],
    workStartHour: number,
    workStartMinute: number,
    workEndHour: number,
    workEndMinute: number,
  ): number {
    const attendEvents = this.cutOffNotAttendEvents(weeklyEvents);

    const sortedEvents = this.sortEvent(attendEvents);

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

    const totalTime = eventTimeLists.reduce(
      (accumulator: number, currentValue: number) => accumulator + currentValue,
    );

    const maxTime = this.WORK_HOURS_PER_WEEK * 60 * 60 * 1000;

    return maxTime - totalTime;
  }

  private static cutOffNotAttendEvents(
    weeklyEvents: WeeklyEvent[],
  ): WeeklyEvent[] {
    return weeklyEvents.filter((e) => {
      return e.willAttend;
    });
  }

  private static sortEvent(attendEvents: WeeklyEvent[]): WeeklyEvent[] {
    return attendEvents
      .sort((a, b) => {
        return a.eventEndAt.getTime() - b.eventEndAt.getTime();
      })
      .sort((a, b) => {
        return a.eventStartAt.getTime() - b.eventStartAt.getTime();
      });
  }

  private static trimTimeOverlapping(
    sortedEvents: WeeklyEvent[],
  ): { start: Date; end: Date }[] {
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

      if (block.end < end) {
        block.end = end;
      }
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
      const workTime = TheoreticalTime.getWorkTime(
        e,
        workStartHour,
        workStartMinute,
        workEndHour,
        workEndMinute,
      );

      return workTime.start < e.end && e.start < workTime.end;
    });

    return filteredEvents.map((e) => {
      const workTime = TheoreticalTime.getWorkTime(
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
