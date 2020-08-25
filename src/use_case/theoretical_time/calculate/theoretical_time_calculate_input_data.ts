import { WeeklyEvent } from '../../../domain/models/theoretical_time/theoretical_time';
import CalendarEvent = GoogleAppsScript.Calendar.CalendarEvent;
import GuestStatus = GoogleAppsScript.Calendar.GuestStatus;

export class TheoreticalTimeCalculateInputData {
  mapWeeklyEvents(googleCalendarId: string): WeeklyEvent[] {
    const weeklyEvents = this.getWeeklyEvents(googleCalendarId);
    return weeklyEvents.map((e) => {
      const willAttend = this.willAttend(e.getMyStatus());
      const eventStartAt: Date = Moment.moment(e.getStartTime()).toDate();
      const eventEndAt: Date = Moment.moment(e.getEndTime()).toDate();
      return { willAttend, eventStartAt, eventEndAt };
    });
  }

  private getWeeklyEvents(googleCalendarId: string): CalendarEvent[] {
    const calendar = CalendarApp.getCalendarById(googleCalendarId);
    const nextMonday = Moment.moment()
      .day(1 + 7)
      .toDate();
    const nextFriday = Moment.moment()
      .day(5 + 7)
      .toDate();
    return calendar.getEvents(nextMonday, nextFriday);
  }

  private willAttend(attendStatus: GuestStatus): boolean {
    return attendStatus !== GuestStatus.NO;
  }
}
