import { NotifyPresenterInterface } from '../../../use_case/common/notify_presenter_interface';
import { SummaryReportNotifyUseCaseInterface } from '../../../use_case/summary_report/notify/summary_report_notify_use_case_interface';
import { MeasurementRepositoryInterface } from '../../models/measurement/measurement_repository_interface';
import { SummaryReportRepositoryInterface } from '../../models/summary_report/summary_report_repository_interface';
import { TheoreticalTimeRepositoryInterface } from '../../models/theoretical_time/theoretical_time_repository_interface';
import { UserSettingRepositoryInterface } from '../../models/user_setting/user_setting_repository_interface';
import { SummaryReportNotifyOutputData } from '../../../use_case/summary_report/notify/summary_report_notify_output_data';
import { SummaryReport } from '../../models/summary_report/summary_report';
import { TheoreticalTime } from '../../models/theoretical_time/theoretical_time';
import { Measurement } from '../../models/measurement/measurement';

export class SummaryReportNotifyInteractor
  implements SummaryReportNotifyUseCaseInterface {
  constructor(
    private readonly userSettingRepository: UserSettingRepositoryInterface,
    private readonly theoreticalTimeRepository: TheoreticalTimeRepositoryInterface,
    private readonly measurementRepository: MeasurementRepositoryInterface,
    private readonly summaryReportRepository: SummaryReportRepositoryInterface,
    private readonly notifyPresenter: NotifyPresenterInterface,
  ) {}

  handle(): void {
    const isoWeek = Moment.moment().isoWeek;
    const outputData = new SummaryReportNotifyOutputData();

    const targetUserIds = this.getNotifiedUserIds();
    if (targetUserIds.length === 0) return;

    const targetTheoreticalTimes = this.filterTheoreticalTimesBy(
      targetUserIds,
      isoWeek,
    );
    if (targetTheoreticalTimes.length === 0) return;

    const targetMeasurements = this.filterMeasurementsBy(
      this.getTheoreticalTimeIds(targetTheoreticalTimes),
      targetUserIds,
    );
    if (targetMeasurements.length === 0) return;

    const summaryReports = this.getSummaryReports(
      targetUserIds,
      targetTheoreticalTimes,
      targetMeasurements,
      isoWeek,
    );

    const createdSummaryReportIds = this.summaryReportRepository.bulkInsert(
      summaryReports,
    );

    // TODO: 今週と全体の基準値を更新

    // TODO: 今週と全体の基準値を添えて通知
    summaryReports.forEach((e) => {
      const message = outputData.getMessage(e);
      this.notifyPresenter.notify(message);
    });

    console.log(createdSummaryReportIds.join(', '));
  }

  private getSummaryReports(
    userIds: string[],
    theoreticalTimes: TheoreticalTime[],
    measurements: Measurement[],
    isoWeek = Moment.moment().isoWeek,
  ): SummaryReport[] {
    const lastSummaryReportId = this.getLastSummaryReportId();

    return userIds.map((userId, i) => {
      const userTheoreticalTime = this.getTheoreticalTimeAssociatedWithUser(
        theoreticalTimes,
        userId,
      );
      const userMeasurements = this.getMeasurementsAssociatedWithUser(
        measurements,
        userId,
        theoreticalTimes[0].getTheoreticalTimeId().theoreticalTimeId,
      );

      const measurementCount = SummaryReport.count(userMeasurements);
      const totalImplementHour = SummaryReport.sum(userMeasurements);
      const averageHour = SummaryReport.average(
        measurementCount,
        totalImplementHour,
      );
      const theoreticalHour = SummaryReport.calculateTheoreticalHour(
        userTheoreticalTime.getTheoreticalTimeTotalTime().toNumber(),
      );
      const theoreticalRate = SummaryReport.calculateTheoreticalRate(
        theoreticalHour,
        totalImplementHour,
      );
      const kpiValue = SummaryReport.calculateKpiValue(
        totalImplementHour,
        averageHour,
        theoreticalRate,
      );

      return new SummaryReport(
        lastSummaryReportId + i + 1,
        userId,
        totalImplementHour,
        measurementCount,
        averageHour,
        theoreticalHour,
        theoreticalRate,
        kpiValue,
        isoWeek,
      );
    });
  }

  private getNotifiedUserIds(): string[] {
    return this.userSettingRepository
      .getAll()
      .filter((e) => e.canNotify())
      .map((e) => e.getUserId().toString());
  }

  private filterTheoreticalTimesBy(
    userIds: string[],
    isoWeek: number = Moment.moment().isoWeek(),
  ): TheoreticalTime[] {
    return this.theoreticalTimeRepository.getAll().filter((e) => {
      return e.isThisWeekData(isoWeek) && e.isAssociatedWithUser(userIds);
    });
  }

  private filterMeasurementsBy(
    theoreticalTimeIds: number[],
    userIds: string[],
  ): Measurement[] {
    return this.measurementRepository.getAll().filter((e) => {
      return (
        e.isAssociatedWithTheoreticalTime(theoreticalTimeIds) &&
        e.isAssociatedWithUser(userIds)
      );
    });
  }

  private getTheoreticalTimeIds(theoreticalTimes: TheoreticalTime[]): number[] {
    return theoreticalTimes.map((e) => {
      return e.getTheoreticalTimeId().toNumber();
    });
  }

  private getLastSummaryReportId(): number {
    return this.summaryReportRepository.last().getSummaryReportId().toNumber();
  }

  private getTheoreticalTimeAssociatedWithUser(
    theoreticalTimes: TheoreticalTime[],
    userId: string,
  ): TheoreticalTime {
    return theoreticalTimes
      .filter((e) => {
        return e.isTargetUser(userId);
      })
      .map((e) => {
        return new TheoreticalTime(
          e.getTheoreticalTimeId().toNumber(),
          userId,
          e.getTheoreticalTimeIsoWeek().toNumber(),
          e.getTheoreticalTimeTotalTime().toNumber(),
        );
      })[0];
  }

  private getMeasurementsAssociatedWithUser(
    measurements: Measurement[],
    userId: string,
    theoreticalTimeId: number,
  ): Measurement[] {
    return measurements
      .filter((e) => {
        return e.isTargetUser(userId);
      })
      .map((e) => {
        return new Measurement(
          e.getMeasurementId().toNumber(),
          userId,
          theoreticalTimeId,
          e.getMeasurementStartAt().toDate(),
          e.getMeasurementStopAt()?.toDate(),
        );
      });
  }
}
