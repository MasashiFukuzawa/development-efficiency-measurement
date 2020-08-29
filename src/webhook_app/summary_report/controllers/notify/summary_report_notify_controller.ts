import { SummaryReportNotifyUseCaseInterface } from '../../../../use_case/summary_report/notify/summary_report_notify_use_case_interface';

export class SummaryReportNotifyController {
  constructor(
    private readonly summaryReportNotifyUseCase: SummaryReportNotifyUseCaseInterface,
  ) {}

  notify(): void {
    this.summaryReportNotifyUseCase.handle();
  }
}
