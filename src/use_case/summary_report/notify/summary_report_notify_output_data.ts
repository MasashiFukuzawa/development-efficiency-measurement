import { StandardValue } from '../../../domain/models/standard_value/standard_value';
import { SummaryReport } from '../../../domain/models/summary_report/summary_report';

export class SummaryReportNotifyOutputData {
  getMessage(
    summaryReport: SummaryReport,
    standardValue: StandardValue,
  ): string {
    return `<@${summaryReport.getUserId().toString()}>
今週もお疲れ様でした！今週の開発効率の計測結果をお知らせします！

======================================================
開発効率指標: ${summaryReport.getKpiValue().toNumber()}

開発効率指標 = 実装時間合計 * 平均実装時間 * (1 - 差し込み率)

内訳:
  実装時間合計: ${summaryReport.getTotalImplementHour().toNumber()}h
  計測回数: ${summaryReport.getMeasurementCount().toNumber()}回
  平均実装時間: ${summaryReport.getAverageImplementHour().toNumber()}h
  カレンダー上での空き時間合計: ${summaryReport
    .getTheoreticalAvailableHour()
    .toNumber()}h
  差し込み率: ${1 - summaryReport.getAvailableRate().toNumber()}

-----

(参考) 今週のユーザー全体の平均値:
  開発効率指標: ${standardValue.getKpiValue().toNumber()}
  実装時間合計: ${standardValue.getTotalImplementHour().toNumber()}h
  計測回数: ${standardValue.getMeasurementCount().toNumber()}回
  平均実装時間: ${standardValue.getAverageImplementHour().toNumber()}h
  カレンダー上での空き時間合計: ${standardValue
    .getTheoreticalAvailableHour()
    .toNumber()}h
  差し込み率: ${1 - standardValue.getAvailableRate().toNumber()}
======================================================`;
  }
}
