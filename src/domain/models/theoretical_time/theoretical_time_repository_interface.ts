import { AvailableTime } from './theoretical_time';

export interface AvailableTimeRepositoryInterface {
  getAll(): readonly AvailableTime[];
  getRawData(): readonly any[][];
  map(data: any[][]): readonly AvailableTime[];
  create(userId: string, isoWeekId: number, theoreticalImplementTime: number): AvailableTime;
}
