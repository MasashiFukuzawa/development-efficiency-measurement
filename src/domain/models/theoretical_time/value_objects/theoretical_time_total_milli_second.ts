export class TheoreticalTimeTotalMilliSecond {
  theoreticalTimeTotalMilliSecond: number;
  constructor(totalMilliSecond: number) {
    if (!totalMilliSecond) {
      throw new Error('TheoreticalTimeTotalMilliSecondが存在しません');
    }

    if (isNaN(totalMilliSecond)) {
      throw new Error(
        'TheoreticalTimeTotalMilliSecondはnumber型でなければなりません',
      );
    }

    this.theoreticalTimeTotalMilliSecond = totalMilliSecond;
  }

  toNumber(): number {
    return this.theoreticalTimeTotalMilliSecond;
  }
}
