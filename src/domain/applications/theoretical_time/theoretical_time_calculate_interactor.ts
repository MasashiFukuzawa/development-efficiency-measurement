import { TheoreticalTimeCalculateInputData } from '../../../use_case/theoretical_time/calculate/theoretical_time_calculate_input_data';
import { TheoreticalTimeCalculateUseCaseInterface } from '../../../use_case/theoretical_time/calculate/theoretical_time_calculate_use_case_interface';
import { TheoreticalTime } from '../../models/theoretical_time/theoretical_time';
import { TheoreticalTimeRepositoryInterface } from '../../models/theoretical_time/theoretical_time_repository_interface';
import { IsoWeekRepositoryInterface } from '../../models/iso_week/iso_week_repository_interface';
import { UserSettingRepositoryInterface } from '../../models/user_setting/user_setting_repository_interface';

export class TheoreticalTimeCalculateInteractor
  implements TheoreticalTimeCalculateUseCaseInterface {
  constructor(
    private readonly theoreticalTimeRepository: TheoreticalTimeRepositoryInterface,
    private readonly userSettingRepository: UserSettingRepositoryInterface,
    private readonly isoWeekRepository: IsoWeekRepositoryInterface,
  ) {}

  handle(): void {
    const inputData = new TheoreticalTimeCalculateInputData();

    const userSettings = this.userSettingRepository.getAll();

    const now = Moment.moment();
    const isoWeek = this.isoWeekRepository.find(now.get('year'), now.isoWeek());
    if (!isoWeek) throw new Error('Target IsoWeek is not found.');
    const isoWeekId = isoWeek.getIsoWeekId().toNumber();

    userSettings.forEach((e) => {
      const userId = e.getUserId().toString();
      if (this.isNotUnique(userId, isoWeekId)) return;

      const googleCalendarId = e.getGoogleCalendarId().toString();
      const workStartHour = e.getWorkStartHour().toNumber();
      const workStartMinute = e.getWorkStartMinute().toNumber();
      const workEndHour = e.getWorkEndHour().toNumber();
      const workEndMinute = e.getWorkEndMinute().toNumber();

      const weeklyEvents = inputData.mapEvents(inputData.getEvents(googleCalendarId));
      const theoreticalTime = TheoreticalTime.calculateTheoreticalTime(
        weeklyEvents,
        workStartHour,
        workStartMinute,
        workEndHour,
        workEndMinute,
        TheoreticalTime.WORK_HOURS_PER_WEEK,
      );

      this.theoreticalTimeRepository.create(userId, isoWeekId, theoreticalTime);

      console.log(
        `userId: ${userId}のTheoreticalTimeを記録しました。availableHours: ${TheoreticalTime.convertMilliSecToHour(
          theoreticalTime,
        )} hours`,
      );
    });
  }

  private isNotUnique(userId: string, isoWeek: number): boolean {
    const userDataForTheIsoWeek = this.theoreticalTimeRepository.getAll().find((e) => {
      return e.getUserId().toString() === userId && e.getIsoWeekId().toNumber() === isoWeek;
    });
    return !!userDataForTheIsoWeek;
  }
}
