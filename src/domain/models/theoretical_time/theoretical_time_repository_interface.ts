import { TheoreticalTime } from './theoretical_time';

export interface TheoreticalTimeRepositoryInterface {
  getAll(): readonly TheoreticalTime[];
  getRawData(): readonly any[][];
  map(data: any[][]): readonly TheoreticalTime[];
  create(userId: string, isoWeekId: number, theoreticalImplementTime: number): TheoreticalTime;
}
