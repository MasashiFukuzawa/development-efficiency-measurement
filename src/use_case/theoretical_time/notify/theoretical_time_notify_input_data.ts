import { TheoreticalTimeInputDataBase } from '../base/theoretical_time_input_data_base';
import CalendarEvent = GoogleAppsScript.Calendar.CalendarEvent;

export class TheoreticalTimeNotifyInputData extends TheoreticalTimeInputDataBase {
  getEvents(googleCalendarId: string): CalendarEvent[] {
    const calendar = CalendarApp.getCalendarById(googleCalendarId);
    const beginningOfDay = Moment.moment().startOf('day').toDate();
    const endOfDay = Moment.moment().endOf('day').toDate();
    return calendar.getEvents(beginningOfDay, endOfDay);
  }
}
