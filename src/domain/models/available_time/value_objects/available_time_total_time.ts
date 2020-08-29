export class AvailableTimeTotalTime {
  availableTimeTotalTime: number;
  constructor(totalTime: number) {
    if (!totalTime) {
      throw new Error('AvailableTimeTotalTimeが存在しません');
    }

    if (isNaN(totalTime)) {
      throw new Error('AvailableTimeTotalTimeはnumber型でなければなりません');
    }

    this.availableTimeTotalTime = totalTime;
  }

  toNumber(): number {
    return this.availableTimeTotalTime;
  }
}
