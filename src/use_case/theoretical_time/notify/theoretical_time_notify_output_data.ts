export class TheoreticalTimeNotifyOutputData {
  getMessage(userId: string, todaysTheoreticalTime: number): string {
    return `<@${userId}>
本日の実装可能時間は ${todaysTheoreticalTime / (60 * 60 * 1000)}h です。`;
  }
}
