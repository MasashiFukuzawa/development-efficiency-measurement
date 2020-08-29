export class IsoWeekIsoWeek {
  private static readonly MAX_ISO_WEEKS_IN_YEAR = 53;

  isoWeek: number;
  constructor(iosWeek: number) {
    if (!iosWeek) throw new Error('IsoWeekIsoWeekが存在しません');

    if (isNaN(iosWeek)) {
      throw new Error('IsoWeekIsoWeekはnumber型でなければなりません');
    }

    if (IsoWeekIsoWeek.MAX_ISO_WEEKS_IN_YEAR < iosWeek) {
      throw new Error(
        `IsoWeekIsoWeekは${IsoWeekIsoWeek.MAX_ISO_WEEKS_IN_YEAR}以下の数値でなければなりません`,
      );
    }

    this.isoWeek = iosWeek;
  }

  toNumber(): number {
    return this.isoWeek;
  }
}
