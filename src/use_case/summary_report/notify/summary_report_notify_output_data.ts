import { StandardValue } from '../../../domain/models/standard_value/standard_value';
import { SummaryReport } from '../../../domain/models/summary_report/summary_report';

export class SummaryReportNotifyOutputData {
  getMessage(summaryReport: SummaryReport, standardValue: StandardValue): string {
    const developmentEfficiency = Math.round(summaryReport.getKpiValue().toNumber() * 100) / 100;
    const totalImplementHour =
      Math.round(summaryReport.getTotalImplementHour().toNumber() * 100) / 100;
    const averageImplementHour =
      Math.round(summaryReport.getAverageImplementHour().toNumber() * 100) / 100;
    const slotRate = 1 - Math.round(summaryReport.getAvailableRate().toNumber() * 100) / 100;

    const avgOfDevelopmentEfficiency =
      Math.round(standardValue.getKpiValue().toNumber() * 100) / 100;
    const avgOfTotalImplementHour =
      Math.round(standardValue.getTotalImplementHour().toNumber() * 100) / 100;
    const avgOfAverageImplementHour =
      Math.round(standardValue.getAverageImplementHour().toNumber() * 100) / 100;
    const avgOfSlotRate = 1 - Math.round(standardValue.getAvailableRate().toNumber() * 100) / 100;

    return `<@${summaryReport.getUserId().toString()}>

今週もお疲れ様でした！今週の開発効率の計測結果をお知らせします！

======================================================
*開発効率指数: ${developmentEfficiency}（全体平均${avgOfDevelopmentEfficiency}）*


(※) 開発効率指数 = 実装時間合計 × 平均実装時間 × (1 - 差し込み率)


内訳:
    実装時間合計: ${totalImplementHour}h（全体平均${avgOfTotalImplementHour}h）
    平均実装時間: ${averageImplementHour}h（全体平均${avgOfAverageImplementHour}h）
    差し込み率: ${slotRate}（全体平均${avgOfSlotRate}）
======================================================`;
  }
}
