export class TheoreticalTimeTheoreticalImplementTime {
  theoreticalImplementTime: number;
  constructor(theoreticalImplementTime: number) {
    if (!theoreticalImplementTime) {
      throw new Error('TheoreticalTimeTheoreticalImplementTimeが存在しません');
    }

    if (isNaN(theoreticalImplementTime)) {
      throw new Error('TheoreticalTimeTheoreticalImplementTimeはnumber型でなければなりません');
    }

    this.theoreticalImplementTime = theoreticalImplementTime;
  }

  toNumber(): number {
    return this.theoreticalImplementTime;
  }
}
