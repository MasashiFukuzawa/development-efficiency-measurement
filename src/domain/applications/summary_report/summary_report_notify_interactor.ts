import { NotifyPresenterInterface } from '../../../use_case/common/notify_presenter_interface';
import { SummaryReportNotifyUseCaseInterface } from '../../../use_case/summary_report/notify/summary_report_notify_use_case_interface';
import { MeasurementRepositoryInterface } from '../../models/measurement/measurement_repository_interface';
import { SummaryReportRepositoryInterface } from '../../models/summary_report/summary_report_repository_interface';
import { AvailableTimeRepositoryInterface } from '../../models/available_time/available_time_repository_interface';
import { UserSettingRepositoryInterface } from '../../models/user_setting/user_setting_repository_interface';
import { SummaryReportNotifyOutputData } from '../../../use_case/summary_report/notify/summary_report_notify_output_data';
import { SummaryReport } from '../../models/summary_report/summary_report';
import { AvailableTime } from '../../models/available_time/available_time';
import { Measurement } from '../../models/measurement/measurement';
import { IsoWeekRepositoryInterface } from '../../models/iso_week/iso_week_repository_interface';
import { StandardValueRepositoryInterface } from '../../models/standard_value/standard_value_repository_interface';
import { StandardValue } from '../../models/standard_value/standard_value';

export class SummaryReportNotifyInteractor
  implements SummaryReportNotifyUseCaseInterface {
  constructor(
    private readonly isoWeekRepository: IsoWeekRepositoryInterface,
    private readonly userSettingRepository: UserSettingRepositoryInterface,
    private readonly availableTimeRepository: AvailableTimeRepositoryInterface,
    private readonly measurementRepository: MeasurementRepositoryInterface,
    private readonly summaryReportRepository: SummaryReportRepositoryInterface,
    private readonly standardValueRepository: StandardValueRepositoryInterface,
    private readonly notifyPresenter: NotifyPresenterInterface,
  ) {}

  handle(): void {
    const now = Moment.moment();
    const isoWeek = this.isoWeekRepository.find(now.get('year'), now.isoWeek());
    if (!isoWeek) throw new Error('Target IsoWeek is not found.');
    const targetIsoWeekId = isoWeek.getIsoWeekId().toNumber();

    const targetUserIds = this.getNotifiedUserIds();
    if (targetUserIds.length === 0) return;

    const targetAvailableTimes = this.filterAvailableTimesBy(
      targetUserIds,
      targetIsoWeekId,
    );
    if (targetAvailableTimes.length === 0) return;

    const targetMeasurements = this.filterMeasurementsBy(
      targetUserIds,
      targetIsoWeekId,
    );
    if (targetMeasurements.length === 0) return;

    const summaryReports = this.getSummaryReports(
      targetUserIds,
      targetAvailableTimes,
      targetMeasurements,
      targetIsoWeekId,
    );

    this.summaryReportRepository.bulkInsert(summaryReports);

    const standardValue = StandardValue.calculateAverage(
      targetIsoWeekId,
      summaryReports,
    );
    this.standardValueRepository.create(standardValue);

    const outputData = new SummaryReportNotifyOutputData();
    summaryReports.forEach((e) => {
      const message = outputData.getMessage(e, standardValue);
      this.notifyPresenter.notify(message);
    });
  }

  // TODO: ロジックが適当なので、後からリファクタリングする
  private getSummaryReports(
    userIds: string[],
    availableTimes: AvailableTime[],
    measurements: Measurement[],
    isoWeekId: number,
  ): SummaryReport[] {
    const lastSummaryReportId = this.getLastSummaryReportId();

    return userIds.map((userId, i) => {
      const userAvailableTime = this.getAvailableTimeAssociatedWithUser(
        availableTimes,
        userId,
      );
      const userMeasurements = this.getMeasurementsAssociatedWithUser(
        measurements,
        userId,
        isoWeekId,
      );

      const targetMeasurements = Measurement.cutOffBeforeAndAfterWorkHour(
        userMeasurements,
      );
      const totalImplementMilliSec = SummaryReport.sum(targetMeasurements);
      const totalImplementHour = SummaryReport.convertMilliSecToHour(
        totalImplementMilliSec,
      );
      const measurementCount = SummaryReport.count(targetMeasurements);
      const averageImplementHour = SummaryReport.average(
        measurementCount,
        totalImplementHour,
      );
      const theoreticalAvailableHour = SummaryReport.calculateTheoreticalAvailableHour(
        userAvailableTime.getTheoreticalImplementTime().toNumber(),
      );
      const availableRate = SummaryReport.calculateAvailableRate(
        theoreticalAvailableHour,
        totalImplementHour,
      );
      const kpiValue = SummaryReport.calculateKpiValue(
        totalImplementHour,
        averageImplementHour,
        availableRate,
      );

      return new SummaryReport(
        lastSummaryReportId + i + 1,
        userId,
        isoWeekId,
        totalImplementHour,
        measurementCount,
        averageImplementHour,
        theoreticalAvailableHour,
        availableRate,
        kpiValue,
      );
    });
  }

  private getNotifiedUserIds(): string[] {
    return this.userSettingRepository
      .getAll()
      .filter((e) => e.canNotify())
      .map((e) => e.getUserId().toString());
  }

  private filterAvailableTimesBy(
    userIds: string[],
    isoWeekId: number,
  ): AvailableTime[] {
    return this.availableTimeRepository.getAll().filter((e) => {
      return e.isTargetWeek(isoWeekId) && e.isAssociatedWithUser(userIds);
    });
  }

  private filterMeasurementsBy(
    userIds: string[],
    isoWeekId: number,
  ): Measurement[] {
    return this.measurementRepository.getAll().filter((e) => {
      return e.isTargetWeek(isoWeekId) && e.isAssociatedWithUser(userIds);
    });
  }

  private getLastSummaryReportId(): number {
    const lastSummaryReport = this.summaryReportRepository.last();
    if (lastSummaryReport) {
      return lastSummaryReport.getSummaryReportId().toNumber();
    } else {
      return 0;
    }
  }

  private getAvailableTimeAssociatedWithUser(
    availableTimes: AvailableTime[],
    userId: string,
  ): AvailableTime {
    return availableTimes
      .filter((e) => {
        return e.isTargetUser(userId);
      })
      .map((e) => {
        return new AvailableTime(
          userId,
          e.getIsoWeekId().toNumber(),
          e.getTheoreticalImplementTime().toNumber(),
        );
      })[0];
  }

  private getMeasurementsAssociatedWithUser(
    measurements: Measurement[],
    userId: string,
    isoWeekId: number,
  ): Measurement[] {
    return measurements
      .filter((e) => {
        return e.isTargetUser(userId);
      })
      .map((e) => {
        return new Measurement(
          e.getMeasurementId().toNumber(),
          userId,
          isoWeekId,
          e.getMeasurementStartAt().toDate(),
          e.getMeasurementStopAt()?.toDate(),
        );
      });
  }
}
