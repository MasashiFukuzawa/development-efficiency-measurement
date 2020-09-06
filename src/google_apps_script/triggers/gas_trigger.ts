interface EveryDaysTrigger {
  everyDays: number;
  atHour: number;
}

interface EveryHoursTrigger {
  everyHours: number;
}

interface OnWeekDayTrigger {
  onWeekDay: number;
  atHour: number;
}

export class GasTrigger {
  readonly everyDaysTriggerNames: string[];
  readonly everyDaysTriggerList: { [key: string]: EveryDaysTrigger };

  readonly everyHoursTriggerNames: string[];
  readonly everyHoursTriggerList: { [key: string]: EveryHoursTrigger };

  readonly onWeekDayTriggerNames: string[];
  readonly onWeekDayTriggerList: { [key: string]: OnWeekDayTrigger };

  readonly onEditTriggerNames: string[];

  constructor() {
    this.everyDaysTriggerNames = ['calculateTheoreticalTime', 'notifyTheoreticalTime'];
    this.everyDaysTriggerList = {
      calculateTheoreticalTime: { everyDays: 1, atHour: 0 },
      notifyTheoreticalTime: { everyDays: 1, atHour: 7 },
    };

    this.everyHoursTriggerNames = ['refreshCache'];
    this.everyHoursTriggerList = {
      refreshCache: { everyHours: 4 },
    };

    this.onWeekDayTriggerNames = ['notifySummaryReports'];
    this.onWeekDayTriggerList = {
      notifySummaryReports: { onWeekDay: ScriptApp.WeekDay.FRIDAY, atHour: 20 },
    };

    this.onEditTriggerNames = ['refreshCache'];
  }
}
