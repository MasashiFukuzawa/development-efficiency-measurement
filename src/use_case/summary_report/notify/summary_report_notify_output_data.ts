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
開発効率指数: ${Math.round(summaryReport.getKpiValue().toNumber())}


    内訳:
        実装時間合計: ${Math.round(
          summaryReport.getTotalImplementHour().toNumber(),
        )}h
        計測回数: ${summaryReport.getMeasurementCount().toNumber()}回
        平均実装時間: ${Math.round(
          summaryReport.getAverageImplementHour().toNumber(),
        )}h
        カレンダー上での空き時間合計: ${Math.round(
          summaryReport.getTheoreticalAvailableHour().toNumber(),
        )}h
        差し込み率: ${
          1 - Math.round(summaryReport.getAvailableRate().toNumber())
        }


-----


(参考) 今週のユーザー全体の平均値:


    開発効率指標: ${Math.round(standardValue.getKpiValue().toNumber())}
    実装時間合計: ${Math.round(
      standardValue.getTotalImplementHour().toNumber(),
    )}h
    計測回数: ${Math.round(standardValue.getMeasurementCount().toNumber())}回
    平均実装時間: ${Math.round(
      standardValue.getAverageImplementHour().toNumber(),
    )}h
    カレンダー上での空き時間合計: ${Math.round(
      standardValue.getTheoreticalAvailableHour().toNumber(),
    )}h
    差し込み率: ${1 - Math.round(standardValue.getAvailableRate().toNumber())}
======================================================`;
  }
}
