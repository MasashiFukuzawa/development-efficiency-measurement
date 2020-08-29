export class AvailableTimeIsoWeek {
  private static readonly MAX_ISO_WEEKS_IN_YEAR = 53;

  availableTimeIsoWeek: number;
  constructor(iosWeek: number) {
    if (!iosWeek) throw new Error('AvailableTimeIsoWeekが存在しません');

    if (isNaN(iosWeek)) {
      throw new Error('AvailableTimeIsoWeekはnumber型でなければなりません');
    }

    if (AvailableTimeIsoWeek.MAX_ISO_WEEKS_IN_YEAR < iosWeek) {
      throw new Error(
        `AvailableTimeIsoWeekは${AvailableTimeIsoWeek.MAX_ISO_WEEKS_IN_YEAR}以下の数値でなければなりません`,
      );
    }

    this.availableTimeIsoWeek = iosWeek;
  }

  toNumber(): number {
    return this.availableTimeIsoWeek;
  }
}
