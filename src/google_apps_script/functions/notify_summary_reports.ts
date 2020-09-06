import { SummaryReportNotifyInteractor } from '../../domain/applications/summary_report/summary_report_notify_interactor';
import { TheoreticalTimeRepository } from '../../infrastructure/theoretical_times/theoretical_time_repository';
import { IsoWeekRepository } from '../../infrastructure/iso_weeks/iso_week_repository';
import { MeasurementRepository } from '../../infrastructure/measurements/measurement_repository';
import { StandardValueRepository } from '../../infrastructure/standard_values/standard_value_repository';
import { SummaryReportRepository } from '../../infrastructure/summary_reports/summary_report_repository';
import { UserSettingRepository } from '../../infrastructure/user_settings/user_setting_repository';
import { NotifyPresenter } from '../../app/presenters/notify/notify_presenter';
import { SummaryReportNotifyController } from '../../app/controllers/summary_report/notify/summary_report_notify_controller';

function notifySummaryReports(): void {
  const isoWeekRepository = new IsoWeekRepository();
  const userSettingRepository = new UserSettingRepository();
  const theoreticalTimeRepository = new TheoreticalTimeRepository();
  const measurementRepository = new MeasurementRepository();
  const summaryReportRepository = new SummaryReportRepository();
  const standardValueRepository = new StandardValueRepository();
  const notifyPresenter = new NotifyPresenter();

  const summaryReportNotifyInteractor = new SummaryReportNotifyInteractor(
    isoWeekRepository,
    userSettingRepository,
    theoreticalTimeRepository,
    measurementRepository,
    summaryReportRepository,
    standardValueRepository,
    notifyPresenter,
  );
  const summaryReportNotifyController = new SummaryReportNotifyController(
    summaryReportNotifyInteractor,
  );
  summaryReportNotifyController.notify();
}
