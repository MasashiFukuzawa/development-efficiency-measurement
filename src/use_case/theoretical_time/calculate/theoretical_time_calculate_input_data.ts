import { TheoreticalTimeInputDataBase } from '../base_input_data';
import CalendarEvent = GoogleAppsScript.Calendar.CalendarEvent;

export class TheoreticalTimeCalculateInputData extends TheoreticalTimeInputDataBase {
  getEvents(googleCalendarId: string): CalendarEvent[] {
    const calendar = CalendarApp.getCalendarById(googleCalendarId);
    const thisMonday = Moment.moment().day(1).toDate();
    const thisFriday = Moment.moment().day(5).toDate();
    return calendar.getEvents(thisMonday, thisFriday);
  }
}
