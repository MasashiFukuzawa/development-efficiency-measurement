import { NotifyPresenterInterface } from '../../../use_case/common/notify_presenter_interface';
import { TheoreticalTimeNotifyInputData } from '../../../use_case/theoretical_time/notify/theoretical_time_notify_input_data';
import { TheoreticalTimeNotifyOutputData } from '../../../use_case/theoretical_time/notify/theoretical_time_notify_output_data';
import { TheoreticalTimeNotifyUseCaseInterface } from '../../../use_case/theoretical_time/notify/theoretical_time_notify_use_case_interface';
import { TheoreticalTime } from '../../models/theoretical_time/theoretical_time';
import { UserSettingRepositoryInterface } from '../../models/user_setting/user_setting_repository_interface';

export class TheoreticalTimeNotifyInteractor
  implements TheoreticalTimeNotifyUseCaseInterface {
  constructor(
    private readonly userSettingRepository: UserSettingRepositoryInterface,
    private readonly notifyPresenter: NotifyPresenterInterface,
  ) {}

  handle(): void {
    const userSettings = this.userSettingRepository.getAll();
    const inputData = new TheoreticalTimeNotifyInputData();
    const outputData = new TheoreticalTimeNotifyOutputData();
    const day: number = Moment.moment().isoWeekday();
    userSettings.forEach((e) => {
      if (day === 6 || day === 7) return; // 6: Saturday, 7: Sunday
      if (e.getNotificationStatus().toString() === 'off') return;

      const userId = e.getUserId().toString();
      const googleCalendarId = e.getGoogleCalendarId().toString();
      const workStartHour = e.getWorkStartHour().toNumber();
      const workStartMinute = e.getWorkStartMinute().toNumber();
      const workEndHour = e.getWorkEndHour().toNumber();
      const workEndMinute = e.getWorkEndMinute().toNumber();

      const weeklyEvents = inputData.mapEvents(
        inputData.getEvents(googleCalendarId),
      );
      const todaysTheoreticalHour = TheoreticalTime.convertMilliSecToHour(
        weeklyEvents,
        workStartHour,
        workStartMinute,
        workEndHour,
        workEndMinute,
        TheoreticalTime.WORK_HOURS_PER_DAY,
      );

      const message = outputData.getMessage(userId, todaysTheoreticalHour);

      this.notifyPresenter.notify(message);
    });
  }
}
