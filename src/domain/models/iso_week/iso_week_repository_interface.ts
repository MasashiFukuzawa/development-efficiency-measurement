import { IsoWeek } from './iso_week';

export interface IsoWeekRepositoryInterface {
  find(year: number, isoWeekId: number): IsoWeek | null;
}
