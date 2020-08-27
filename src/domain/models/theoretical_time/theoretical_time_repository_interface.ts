import { TheoreticalTime } from './theoretical_time';

export interface TheoreticalTimeRepositoryInterface {
  create(
    userId: string,
    theoreticalTime: number,
    isoWeek: number,
  ): TheoreticalTime;
  getAll(): readonly TheoreticalTime[];
}
