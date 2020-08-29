import { AvailableTimeCalculateInputData } from '../../../use_case/available_time/calculate/available_time_calculate_input_data';
import { AvailableTimeCalculateUseCaseInterface } from '../../../use_case/available_time/calculate/available_time_calculate_use_case_interface';
import { AvailableTime } from '../../models/available_time/available_time';
import { AvailableTimeRepositoryInterface } from '../../models/available_time/available_time_repository_interface';
import { UserSettingRepositoryInterface } from '../../models/user_setting/user_setting_repository_interface';

export class AvailableTimeCalculateInteractor
  implements AvailableTimeCalculateUseCaseInterface {
  constructor(
    private readonly availableTimeRepository: AvailableTimeRepositoryInterface,
    private readonly userSettingRepository: UserSettingRepositoryInterface,
  ) {}

  handle(): void {
    const userSettings = this.userSettingRepository.getAll();
    const inputData = new AvailableTimeCalculateInputData();
    const isoWeek = Moment.moment().isoWeek();
    userSettings.forEach((e) => {
      const userId = e.getUserId().toString();
      if (this.isNotUnique(userId, isoWeek)) return;

      const googleCalendarId = e.getGoogleCalendarId().toString();
      const workStartHour = e.getWorkStartHour().toNumber();
      const workStartMinute = e.getWorkStartMinute().toNumber();
      const workEndHour = e.getWorkEndHour().toNumber();
      const workEndMinute = e.getWorkEndMinute().toNumber();

      const weeklyEvents = inputData.mapEvents(
        inputData.getEvents(googleCalendarId),
      );
      const availableTime = AvailableTime.calculateAvailableTime(
        weeklyEvents,
        workStartHour,
        workStartMinute,
        workEndHour,
        workEndMinute,
        AvailableTime.WORK_HOURS_PER_WEEK,
      );

      this.availableTimeRepository.create(userId, isoWeek, availableTime);

      console.log(
        `userId: ${userId} のAvailableTimeを記録しました。availableHours: ${
          availableTime / (60 * 60 * 1000)
        } hours`,
      );
    });
  }

  private isNotUnique(userId: string, isoWeek: number): boolean {
    const userDataForTheIsoWeek = this.availableTimeRepository
      .getAll()
      .find((e) => {
        return (
          e.getUserId().toString() === userId &&
          e.getAvailableTimeIsoWeek().toNumber() === isoWeek
        );
      });
    return !!userDataForTheIsoWeek;
  }
}
