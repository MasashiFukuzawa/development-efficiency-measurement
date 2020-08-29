import { SummaryReport } from '../../../domain/models/summary_report/summary_report';

export class SummaryReportNotifyOutputData {
  // TODO: 基準値も添えてレポートを送る
  getMessage(summaryReport: SummaryReport): string {
    return `<@${summaryReport.getUserId().toString()}>
今週もお疲れ様でした！今週の開発効率の計測結果をお知らせします！

======================================================
開発効率指標: ${summaryReport.getKpiValue().toNumber()}

開発効率指標 = 実装時間合計 * 平均実装時間 * (1 - 差し込み率)

内訳:
  実装時間合計: ${summaryReport.getTotalHour().toNumber()}h
  計測回数: ${summaryReport.getMeasurementCount().toNumber()}回
  平均実装時間: ${summaryReport.getAverageHour().toNumber()}h
  カレンダー上での空き時間合計: ${summaryReport
    .getTheoreticalHour()
    .toNumber()}h
  差し込み率: ${1 - summaryReport.getTheoreticalRate().toNumber()}
======================================================`;
  }
}
