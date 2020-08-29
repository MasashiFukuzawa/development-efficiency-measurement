export class StandardValueTheoreticalAvailableHour {
  theoreticalAvailableHour: number;
  constructor(theoreticalAvailableHour: number) {
    if (theoreticalAvailableHour === null) {
      throw new Error('StandardValueTheoreticalAvailableHourが存在しません');
    }
    if (isNaN(theoreticalAvailableHour)) {
      throw new Error(
        'StandardValueTheoreticalAvailableHourはnumber型でなければなりません',
      );
    }
    this.theoreticalAvailableHour = theoreticalAvailableHour;
  }

  toNumber(): number {
    return this.theoreticalAvailableHour;
  }
}
