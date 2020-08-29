export class StandardValueAvailableRate {
  availableRate: number;
  constructor(availableRate: number) {
    if (availableRate === null) {
      throw new Error('StandardValueAvailableRateが存在しません');
    }
    if (isNaN(availableRate)) {
      throw new Error(
        'StandardValueAvailableRateはnumber型でなければなりません',
      );
    }
    this.availableRate = availableRate;
  }

  toNumber(): number {
    return this.availableRate;
  }
}
