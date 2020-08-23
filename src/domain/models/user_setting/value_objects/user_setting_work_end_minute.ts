export class UserSettingWorkEndMinute {
  workEndMinute: number;
  constructor(workEndMinute: number) {
    if (workEndMinute === null) {
      throw new Error('UserSettingWorkEndMinuteが存在しません');
    }
    if (isNaN(workEndMinute)) {
      throw new Error('UserSettingWorkEndMinuteはnumber型でなければなりません');
    }
    this.workEndMinute = workEndMinute;
  }

  toNumber(): number {
    return this.workEndMinute;
  }
}
