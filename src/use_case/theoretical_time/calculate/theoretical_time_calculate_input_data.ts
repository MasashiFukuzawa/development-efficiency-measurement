import { AvailableTimeInputDataBase } from '../theoretical_time_input_data_base';
import CalendarEvent = GoogleAppsScript.Calendar.CalendarEvent;

export class AvailableTimeCalculateInputData extends AvailableTimeInputDataBase {
  getEvents(googleCalendarId: string): CalendarEvent[] {
    const calendar = CalendarApp.getCalendarById(googleCalendarId);
    const thisMonday = Moment.moment().day(1).toDate();
    const thisFriday = Moment.moment().day(5).toDate();
    return calendar.getEvents(thisMonday, thisFriday);
  }
}
