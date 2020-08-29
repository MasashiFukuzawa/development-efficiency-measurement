import { AvailableTimeInputDataBase } from '../available_time_input_data_base';
import CalendarEvent = GoogleAppsScript.Calendar.CalendarEvent;

export class AvailableTimeCalculateInputData extends AvailableTimeInputDataBase {
  getEvents(googleCalendarId: string): CalendarEvent[] {
    const calendar = CalendarApp.getCalendarById(googleCalendarId);
    const nextMonday = Moment.moment()
      .day(1 + 7)
      .toDate();
    const nextFriday = Moment.moment()
      .day(5 + 7)
      .toDate();
    return calendar.getEvents(nextMonday, nextFriday);
  }
}
