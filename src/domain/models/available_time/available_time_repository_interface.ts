import { AvailableTime } from './available_time';

export interface AvailableTimeRepositoryInterface {
  getAll(): readonly AvailableTime[];
  map(data: any[][]): readonly AvailableTime[];
  create(
    userId: string,
    isoWeekId: number,
    theoreticalImplementTime: number,
  ): AvailableTime;
}
