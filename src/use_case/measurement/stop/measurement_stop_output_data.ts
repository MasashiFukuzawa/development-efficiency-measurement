export class MeasurementStopOutputData {
  getStopMessage(userName: string, implementTime: number): string {
    const implementMinutes = implementTime / (60 * 1000);
    return `${userName} さんの実装終了時間を打刻しました！実装時間は ${Math.round(
      implementMinutes,
    )}分 でした！`;
  }

  getUserNotFoundErrorMessage(userName: string): string {
    return `${userName} さんのユーザーデータは存在しません。
\`/kaihatsu create_user xxx@finc.com\` コマンドを実行し、ユーザー登録を行ってからご利用下さい。`;
  }

  getFirstTimeMeasurementMessage(userName: string): string {
    return `${userName} さんはこれが初めての計測のようです。
まずは \`/kaihatsu start\` コマンドを実行し、計測を開始しましょう。`;
  }

  getMeasurementNotStartedErrorMessage(): string {
    return '現在計測中のデータが見つかりませんでした';
  }
}
