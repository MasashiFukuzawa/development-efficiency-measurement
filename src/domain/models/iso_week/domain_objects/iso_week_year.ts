export class IsoWeekYear {
  year: number;
  constructor(year: number) {
    if (!year) throw new Error('IsoWeekYearが存在しません');
    if (isNaN(year)) {
      throw new Error('IsoWeekYearはnumber型でなければなりません');
    }
    this.year = year;
  }

  toNumber(): number {
    return this.year;
  }
}
