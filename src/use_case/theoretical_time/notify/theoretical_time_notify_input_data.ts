import { WeeklyEvent } from '../../../domain/models/theoretical_time/theoretical_time';
import CalendarEvent = GoogleAppsScript.Calendar.CalendarEvent;

export class TheoreticalTimeNotifyInputData {
  mapDailyEvents(googleCalendarId: string): WeeklyEvent[] {
    const weeklyEvents = this.getDailyEvents(googleCalendarId);
    return weeklyEvents.map((e) => {
      const willAttend = this.willAttend(e.getMyStatus());
      const eventStartAt: Date = Moment.moment(e.getStartTime()).toDate();
      const eventEndAt: Date = Moment.moment(e.getEndTime()).toDate();
      return { willAttend, eventStartAt, eventEndAt };
    });
  }

  private getDailyEvents(googleCalendarId: string): CalendarEvent[] {
    const calendar = CalendarApp.getCalendarById(googleCalendarId);
    const beginningOfDay = Moment.moment().startOf('day').toDate();
    const endOfDay = Moment.moment().endOf('day').toDate();
    return calendar.getEvents(beginningOfDay, endOfDay);
  }

  private willAttend(attendStatus: any): boolean {
    return attendStatus !== 'NO';
  }
}
