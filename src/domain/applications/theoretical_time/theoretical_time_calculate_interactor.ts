import { TheoreticalTimeCalculateInputData } from '../../../use_case/theoretical_time/calculate/theoretical_time_calculate_input_data';
import { TheoreticalTimeCalculateUseCaseInterface } from '../../../use_case/theoretical_time/calculate/theoretical_time_calculate_use_case_interface';
import { TheoreticalTime } from '../../models/theoretical_time/theoretical_time';
import { TheoreticalTimeRepositoryInterface } from '../../models/theoretical_time/theoretical_time_repository_interface';
import { UserSettingRepositoryInterface } from '../../models/user_setting/user_setting_repository_interface';

export class TheoreticalTimeCalculateInteractor
  implements TheoreticalTimeCalculateUseCaseInterface {
  constructor(
    private readonly theoreticalTimeRepository: TheoreticalTimeRepositoryInterface,
    private readonly userSettingRepository: UserSettingRepositoryInterface,
  ) {}

  handle(): void {
    const userSettings = this.userSettingRepository.getAll();
    const inputData = new TheoreticalTimeCalculateInputData();
    const isoWeek = Moment.moment().isoWeek();
    userSettings.forEach((e) => {
      const userId = e.getUserId().toString();
      const googleCalendarId = e.getGoogleCalendarId().toString();
      const workStartHour = e.getWorkStartHour().toNumber();
      const workStartMinute = e.getWorkStartMinute().toNumber();
      const workEndHour = e.getWorkEndHour().toNumber();
      const workEndMinute = e.getWorkEndMinute().toNumber();

      const weeklyEvents = inputData.mapWeeklyEvents(googleCalendarId);
      const theoreticalTime = TheoreticalTime.calculateTheoreticalTime(
        weeklyEvents,
        workStartHour,
        workStartMinute,
        workEndHour,
        workEndMinute,
      );

      this.theoreticalTimeRepository.create(userId, isoWeek, theoreticalTime);

      console.log(
        `userId: ${userId} のTheoreticalTimeを記録しました。theoreticalHours: ${
          theoreticalTime / (60 * 60 * 1000)
        } hours`,
      );
    });
  }
}
