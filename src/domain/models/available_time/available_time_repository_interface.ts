import { AvailableTime } from './available_time';

export interface AvailableTimeRepositoryInterface {
  create(userId: string, availableTime: number, isoWeek: number): AvailableTime;
  getAll(): readonly AvailableTime[];
}
