export class AvailableTimeTheoreticalImplementTime {
  theoreticalImplementTime: number;
  constructor(theoreticalImplementTime: number) {
    if (!theoreticalImplementTime) {
      throw new Error('AvailableTimeTheoreticalImplementTimeが存在しません');
    }

    if (isNaN(theoreticalImplementTime)) {
      throw new Error(
        'AvailableTimeTheoreticalImplementTimeはnumber型でなければなりません',
      );
    }

    this.theoreticalImplementTime = theoreticalImplementTime;
  }

  toNumber(): number {
    return this.theoreticalImplementTime;
  }
}
