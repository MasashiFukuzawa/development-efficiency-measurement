import { MeasurementStopOutputData } from '../../../use_case/measurement/stop/measurement_stop_output_data';
import { MeasurementStopUseCaseInterface } from '../../../use_case/measurement/stop/measurement_stop_use_case_interface';
import { ReplyPresenter } from '../../../app/presenters/reply/reply_presenter';
import { IsoWeekRepositoryInterface } from '../../models/iso_week/iso_week_repository_interface';
import { Measurement } from '../../models/measurement/measurement';
import { MeasurementRepositoryInterface } from '../../models/measurement/measurement_repository_interface';
import { UserRepositoryInterface } from '../../models/user/user_repository_interface';

export class MeasurementStopInteractor implements MeasurementStopUseCaseInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly measurementRepository: MeasurementRepositoryInterface,
    private readonly isoWeekRepository: IsoWeekRepositoryInterface,
    private readonly replyPresenter: ReplyPresenter,
  ) {}

  handle(userId: string, userName: string): string {
    const outputData = new MeasurementStopOutputData();

    const user = this.userRepository.findByUserId(userId);
    if (!user) {
      const errorMessage = outputData.getUserNotFoundErrorMessage(userName);
      return this.replyPresenter.reply(errorMessage);
    }

    const now = Moment.moment();
    const isoWeek = this.isoWeekRepository.find(now.get('year'), now.isoWeek());
    if (!isoWeek) throw new Error('Target IsoWeek is not found.');
    const isoWeekId = isoWeek.getIsoWeekId().toNumber();

    const lastMeasurement = this.measurementRepository.last(userId, isoWeekId);
    if (!lastMeasurement) {
      const errorMessage = outputData.getFirstTimeMeasurementMessage(userName);
      return this.replyPresenter.reply(errorMessage);
    }

    if (!Measurement.isAlreadyStarted(lastMeasurement)) {
      const errorMessage = outputData.getMeasurementNotStartedErrorMessage();
      return this.replyPresenter.reply(errorMessage);
    }

    const measurement = this.measurementRepository.stampStopAt(lastMeasurement);

    const startMessage = outputData.getStopMessage(userName, measurement.calculateImplementTime());
    return this.replyPresenter.reply(startMessage);
  }
}
