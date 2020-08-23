export class MeasurementStartOutputData {
  getStartMessage(userName: string, description?: string): string {
    if (description === undefined) {
      return `${userName} さんの実装開始時間を打刻しました！`;
    } else {
      return `${userName} さんの実装開始時間を打刻しました！ 作業名: ${description}`;
    }
  }

  getUserNotFoundErrorMessage(userName: string): string {
    return `${userName} さんのユーザーデータは存在しません。
\`/kaihatsu create_user xxx@finc.com\` コマンドを実行し、ユーザー登録を行ってからご利用下さい。`;
  }

  getConflictErrorMessage(): string {
    return `前回の測定が続いたままになっています。
実装開始時間の打刻をしたい場合は、一度 \`/kaihatsu stop\` コマンドを実行し、前回の測定を停止して下さい。
もし計測データを修正したい場合は \`/kaihatsu help\` コマンドからドキュメントをご参照下さい。
`;
  }
}
