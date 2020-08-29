import { NotifyPresenterInterface } from '../../../use_case/common/notify_presenter_interface';
import { AvailableTimeNotifyInputData } from '../../../use_case/available_time/notify/available_time_notify_input_data';
import { AvailableTimeNotifyOutputData } from '../../../use_case/available_time/notify/available_time_notify_output_data';
import { AvailableTimeNotifyUseCaseInterface } from '../../../use_case/available_time/notify/available_time_notify_use_case_interface';
import { AvailableTime } from '../../models/available_time/available_time';
import { UserSettingRepositoryInterface } from '../../models/user_setting/user_setting_repository_interface';

export class AvailableTimeNotifyInteractor
  implements AvailableTimeNotifyUseCaseInterface {
  constructor(
    private readonly userSettingRepository: UserSettingRepositoryInterface,
    private readonly notifyPresenter: NotifyPresenterInterface,
  ) {}

  handle(): void {
    const userSettings = this.userSettingRepository.getAll();
    const inputData = new AvailableTimeNotifyInputData();
    const outputData = new AvailableTimeNotifyOutputData();
    userSettings.forEach((e) => {
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
      const todaysAvailableTime = AvailableTime.calculateAvailableTime(
        weeklyEvents,
        workStartHour,
        workStartMinute,
        workEndHour,
        workEndMinute,
        AvailableTime.WORK_HOURS_PER_DAY,
      );

      const message = outputData.getMessage(userId, todaysAvailableTime);

      this.notifyPresenter.notify(message);
    });
  }
}
