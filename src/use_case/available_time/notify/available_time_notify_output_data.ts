export class AvailableTimeNotifyOutputData {
  getMessage(userId: string, availableHour: number): string {
    return `<@${userId}>
本日の実装可能時間は ${Math.round(availableHour * 100) / 100}h です。`;
  }
}
