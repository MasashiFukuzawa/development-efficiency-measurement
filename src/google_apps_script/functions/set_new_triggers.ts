import { GasTrigger } from '../triggers/gas_trigger';
import Trigger = GoogleAppsScript.Script.Trigger;

function setNewTriggers(): void {
  const triggerService = new SetTriggerService();
  triggerService.setEveryDaysTrigger();
  triggerService.setEveryHoursTrigger();
  triggerService.setOnWeekDayTrigger();
  triggerService.setOnEditTrigger();
}

class SetTriggerService {
  private readonly triggers: GasTrigger;
  private readonly projectTriggers: Trigger[];
  constructor() {
    this.triggers = new GasTrigger();
    this.projectTriggers = ScriptApp.getProjectTriggers();
  }

  setEveryDaysTrigger(): void {
    const projectTriggers = this.projectTriggers.filter((e) => this.isClockEvent(e));
    const projectTriggerNames = projectTriggers.map((e) => e.getHandlerFunction());
    const targetTriggerNames = this.triggers.everyDaysTriggerNames.filter((e) => {
      return !projectTriggerNames.includes(e);
    });

    targetTriggerNames.forEach((name) => {
      const newTrigger = this.triggers.everyDaysTriggerList[name];
      ScriptApp.newTrigger(name)
        .timeBased()
        .everyDays(newTrigger.everyDays)
        .atHour(newTrigger.atHour)
        .create();
      console.log(
        `新規トリガー: ${name}関数, ${newTrigger.everyDays}日毎に実行, ${newTrigger.atHour}頃に実行`,
      );
    });
  }

  setEveryHoursTrigger(): void {
    const projectTriggers = this.projectTriggers.filter((e) => this.isClockEvent(e));
    const projectTriggerNames = projectTriggers.map((e) => e.getHandlerFunction());
    const targetTriggerNames = this.triggers.everyHoursTriggerNames.filter((e) => {
      return !projectTriggerNames.includes(e);
    });

    targetTriggerNames.forEach((name) => {
      const newTrigger = this.triggers.everyHoursTriggerList[name];
      ScriptApp.newTrigger(name).timeBased().everyHours(newTrigger.everyHours).create();
      console.log(`新規トリガー: ${name}関数, ${newTrigger.everyHours}時間毎に実行`);
    });
  }

  setOnWeekDayTrigger(): void {
    const projectTriggers = this.projectTriggers.filter((e) => this.isClockEvent(e));
    const projectTriggerNames = projectTriggers.map((e) => e.getHandlerFunction());
    const targetTriggerNames = this.triggers.onWeekDayTriggerNames.filter((e) => {
      return !projectTriggerNames.includes(e);
    });

    targetTriggerNames.forEach((name) => {
      const newTrigger = this.triggers.onWeekDayTriggerList[name];
      ScriptApp.newTrigger(name)
        .timeBased()
        .onWeekDay(newTrigger.onWeekDay)
        .atHour(newTrigger.atHour)
        .create();
      console.log(
        `新規トリガー: ${name}関数, 毎週${newTrigger.onWeekDay}の${newTrigger.atHour}頃に実行`,
      );
    });
  }

  setOnEditTrigger(): void {
    const projectTriggers = this.projectTriggers.filter((e) => this.isOnEditEvent(e));
    const projectTriggerNames = projectTriggers.map((e) => e.getHandlerFunction());
    const targetTriggerNames = this.triggers.onEditTriggerNames.filter((e) => {
      return !projectTriggerNames.includes(e);
    });

    const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREAD_SHEET_ID');
    if (!spreadsheetId) throw new Error('SPREAD_SHEET_ID is not found.');

    targetTriggerNames.forEach((name) => {
      ScriptApp.newTrigger(name).forSpreadsheet(spreadsheetId).onEdit().create();
      console.log(`新規トリガー: ${name}関数, スプレッドシートが編集される度に実行`);
    });
  }

  private isClockEvent(projectTrigger: Trigger): boolean {
    return projectTrigger.getEventType() === ScriptApp.EventType.CLOCK;
  }

  private isOnEditEvent(projectTrigger: Trigger): boolean {
    return projectTrigger.getEventType() === ScriptApp.EventType.ON_EDIT;
  }
}
