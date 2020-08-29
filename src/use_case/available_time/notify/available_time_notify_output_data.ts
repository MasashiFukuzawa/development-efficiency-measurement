export class AvailableTimeNotifyOutputData {
  getMessage(userId: string, todaysAvailableTime: number): string {
    return `<@${userId}>
本日の実装可能時間は ${todaysAvailableTime / (60 * 60 * 1000)}h です。`;
  }
}
