import { IsoWeek } from './iso_week';

export interface IsoWeekRepositoryInterface {
  getAll(): readonly IsoWeek[];
  map(data: any[][]): readonly IsoWeek[];
  find(year: number, isoWeekId: number): IsoWeek | null;
  create(year: number, isoWeekId: number): IsoWeek;
}
