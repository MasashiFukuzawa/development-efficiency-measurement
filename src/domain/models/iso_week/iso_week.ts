import { IsoWeekId } from './domain_objects/ios_week_id';
import { IsoWeekIsoWeek } from './domain_objects/iso_week_iso_week';
import { IsoWeekYear } from './domain_objects/iso_week_year';

export class IsoWeek {
  private readonly id: IsoWeekId;
  private readonly year: IsoWeekYear;
  private readonly isoWeek: IsoWeekIsoWeek;
  constructor(id: number, year: number, isoWeek: number) {
    this.id = new IsoWeekId(id);
    this.year = new IsoWeekYear(year);
    this.isoWeek = new IsoWeekIsoWeek(isoWeek);
  }

  getIsoWeekId(): IsoWeekId {
    return this.id;
  }

  getIsoWeekYear(): IsoWeekYear {
    return this.year;
  }

  getIsoWeekIsoWeek(): IsoWeekIsoWeek {
    return this.isoWeek;
  }
}
