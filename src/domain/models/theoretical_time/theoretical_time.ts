import { UserId } from '../user/value_objects/user_id';
import { TheoreticalTimeIsoWeek } from './value_objects/theoretical_time_iso_week';
import { TheoreticalTimeTotalMilliSecond } from './value_objects/theoretical_time_total_milli_second';

export class TheoreticalTime {
  private readonly userId: UserId;
  private readonly isoWeek: TheoreticalTimeIsoWeek;
  private readonly totalMilliSecond: TheoreticalTimeTotalMilliSecond;
  constructor(userId: string, isoWeek: number, totalMilliSecond: number) {
    this.userId = new UserId(userId);
    this.isoWeek = new TheoreticalTimeIsoWeek(isoWeek);
    this.totalMilliSecond = new TheoreticalTimeTotalMilliSecond(
      totalMilliSecond,
    );
  }

  getUserId(): UserId {
    return this.userId;
  }

  getTheoreticalTimeIsoWeek(): TheoreticalTimeIsoWeek {
    return this.isoWeek;
  }

  getTheoreticalTimeTotalMilliSecond(): TheoreticalTimeTotalMilliSecond {
    return this.totalMilliSecond;
  }
}
