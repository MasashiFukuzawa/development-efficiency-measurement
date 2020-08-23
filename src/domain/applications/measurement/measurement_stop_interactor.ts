import { MeasurementStopOutputData } from '../../../use_case/measurement/stop/measurement_stop_output_data';
import { MeasurementStopUseCaseInterface } from '../../../use_case/measurement/stop/measurement_stop_use_case_interface';
import { ReplyPresenter } from '../../../webhook_app/common/presenters/reply/reply_presenter';
import { Measurement } from '../../models/measurement/measurement';
import { MeasurementRepositoryInterface } from '../../models/measurement/measurement_repository_interface';
import { UserRepositoryInterface } from '../../models/user/user_repository_interface';
import TextOutput = GoogleAppsScript.Content.TextOutput;

export class MeasurementStopInteractor
  implements MeasurementStopUseCaseInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly measurementRepository: MeasurementRepositoryInterface,
    private readonly replyPresenter: ReplyPresenter,
  ) {}

  handle(userId: string, userName: string): TextOutput {
    const outputData = new MeasurementStopOutputData();

    const user = this.userRepository.findByUserId(userId);
    if (!user) {
      const errorMessage = outputData.getUserNotFoundErrorMessage(userName);
      return this.replyPresenter.reply(errorMessage);
    }

    const lastMeasurement = this.measurementRepository.last(userId);
    if (!lastMeasurement) {
      const errorMessage = outputData.getFirstTimeMeasurementMessage(userName);
      return this.replyPresenter.reply(errorMessage);
    }

    if (!Measurement.isAlreadyStarted(lastMeasurement)) {
      const errorMessage = outputData.getMeasurementNotStartedErrorMessage();
      return this.replyPresenter.reply(errorMessage);
    }

    this.measurementRepository.stampStopAt(userId, lastMeasurement);

    const startMessage = outputData.getStopMessage(userName);
    return this.replyPresenter.reply(startMessage);
  }
}
