export class UserSettingWorkStartHour {
  workStartHour: number;
  constructor(workStartHour: number) {
    if (workStartHour === null) {
      throw new Error('UserSettingWorkStartHourが存在しません');
    }
    if (isNaN(workStartHour)) {
      throw new Error('UserSettingWorkStartHourはnumber型でなければなりません');
    }
    this.workStartHour = workStartHour;
  }

  toNumber(): number {
    return this.workStartHour;
  }
}
