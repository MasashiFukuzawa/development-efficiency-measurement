export class TheoreticalTimeNotifyOutputData {
  getMessage(userId: string, todaysTheoreticalHour: number): string {
    return `<@${userId}>
本日の実装可能時間は ${todaysTheoreticalHour}h です。`;
  }
}
