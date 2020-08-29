import { AvailableTime } from './available_time';

export interface AvailableTimeRepositoryInterface {
  create(
    userId: string,
    isoWeekId: number,
    theoreticalImplementTime: number,
  ): AvailableTime;
  getAll(): readonly AvailableTime[];
}
