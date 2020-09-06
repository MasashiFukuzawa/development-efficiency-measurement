export interface YearAndIsoWeek {
  year: number;
  isoWeek: number;
}

export class IsoWeekCreateInputData {
  getYearAndIsoWeek(): YearAndIsoWeek {
    const now = Moment.moment();
    return { year: now.get('year'), isoWeek: now.isoWeek() };
  }
}
