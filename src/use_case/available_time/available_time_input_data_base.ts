import { Event } from '../../domain/models/available_time/available_time';
import CalendarEvent = GoogleAppsScript.Calendar.CalendarEvent;

export abstract class AvailableTimeInputDataBase {
  abstract getEvents(googleCalendarId: string): CalendarEvent[];

  mapEvents(calendarEvents: CalendarEvent[]): Event[] {
    return calendarEvents.map((e) => {
      const title = e.getTitle();
      const willAttend = this.willAttend(e.getMyStatus());
      const eventStartAt: Date = Moment.moment(e.getStartTime()).toDate();
      const eventEndAt: Date = Moment.moment(e.getEndTime()).toDate();
      return { title, willAttend, eventStartAt, eventEndAt };
    });
  }

  private willAttend(attendStatus: any): boolean {
    return attendStatus !== 'NO';
  }
}
