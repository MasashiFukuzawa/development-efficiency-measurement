export class UserSettingWorkEndHour {
  workEndHour: number;
  constructor(workEndHour: number) {
    if (workEndHour === null) {
      throw new Error('UserSettingWorkEndHourが存在しません');
    }
    if (isNaN(workEndHour))
      throw new Error('UserSettingWorkEndHourはnumber型でなければなりません');

    this.workEndHour = workEndHour;
  }
  toNumber(): number {
    return this.workEndHour;
  }
}
