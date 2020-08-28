import { Event } from '../../../domain/models/theoretical_time/theoretical_time';
import CalendarEvent = GoogleAppsScript.Calendar.CalendarEvent;

export abstract class TheoreticalTimeInputDataBase {
  abstract getEvents(googleCalendarId: string): CalendarEvent[];

  mapEvents(calendarEvents: CalendarEvent[]): Event[] {
    return calendarEvents.map((e) => {
      const willAttend = this.willAttend(e.getMyStatus());
      const eventStartAt: Date = Moment.moment(e.getStartTime()).toDate();
      const eventEndAt: Date = Moment.moment(e.getEndTime()).toDate();
      return { willAttend, eventStartAt, eventEndAt };
    });
  }

  private willAttend(attendStatus: any): boolean {
    return attendStatus !== 'NO';
  }
}
