export class TheoreticalTimeIsoWeek {
  private static readonly MAX_ISO_WEEKS_IN_YEAR = 53;

  theoreticalTimeIsoWeek: number;
  constructor(iosWeek: number) {
    if (iosWeek === null) {
      throw new Error('TheoreticalTimeIsoWeekが存在しません');
    }

    if (isNaN(iosWeek)) {
      throw new Error('TheoreticalTimeIsoWeekはnumber型でなければなりません');
    }

    if (TheoreticalTimeIsoWeek.MAX_ISO_WEEKS_IN_YEAR < iosWeek) {
      throw new Error(
        `TheoreticalTimeIsoWeekは${TheoreticalTimeIsoWeek.MAX_ISO_WEEKS_IN_YEAR}以下の数値でなければなりません`,
      );
    }

    this.theoreticalTimeIsoWeek = iosWeek;
  }

  toNumber(): number {
    return this.theoreticalTimeIsoWeek;
  }
}
