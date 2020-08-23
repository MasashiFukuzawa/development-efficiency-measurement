export class UserSettingWorkStartMinute {
  workStartMinute: number;
  constructor(workStartMinute: number) {
    if (workStartMinute === null) {
      throw new Error('UserSettingWorkStartMinuteが存在しません');
    }
    if (isNaN(workStartMinute)) {
      throw new Error(
        'UserSettingWorkStartMinuteはnumber型でなければなりません',
      );
    }
    this.workStartMinute = workStartMinute;
  }

  toNumber(): number {
    return this.workStartMinute;
  }
}
