import { TheoreticalTime } from './theoretical_time';

export interface TheoreticalTimeRepositoryInterface {
  create(
    userId: string,
    theoreticalMilliSecond: number,
    isoWeek: number,
  ): TheoreticalTime;
}
