export class TheoreticalTimeTotalTime {
  theoreticalTimeTotalTime: number;
  constructor(totalTime: number) {
    if (!totalTime) {
      throw new Error('TheoreticalTimeTotalTimeが存在しません');
    }

    if (isNaN(totalTime)) {
      throw new Error('TheoreticalTimeTotalTimeはnumber型でなければなりません');
    }

    this.theoreticalTimeTotalTime = totalTime;
  }

  toNumber(): number {
    return this.theoreticalTimeTotalTime;
  }
}
