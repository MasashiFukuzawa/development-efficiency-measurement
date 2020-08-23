import { MeasurementStartOutputData } from '../../../use_case/measurement/start/measurement_start_output_data';
import { MeasurementStartUseCaseInterface } from '../../../use_case/measurement/start/measurement_start_use_case_interface';
import { ReplyPresenter } from '../../../webhook_app/common/presenters/reply/reply_presenter';
import { Measurement } from '../../models/measurement/measurement';
import { MeasurementRepositoryInterface } from '../../models/measurement/measurement_repository_interface';
import { UserRepositoryInterface } from '../../models/user/user_repository_interface';
import TextOutput = GoogleAppsScript.Content.TextOutput;

export class MeasurementStartInteractor
  implements MeasurementStartUseCaseInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly measurementRepository: MeasurementRepositoryInterface,
    private readonly replyPresenter: ReplyPresenter,
  ) {}

  handle(userId: string, userName: string, description?: string): TextOutput {
    const outputData = new MeasurementStartOutputData();

    const user = this.userRepository.findByUserId(userId);
    if (!user) {
      const errorMessage = outputData.getUserNotFoundErrorMessage(userName);
      return this.replyPresenter.reply(errorMessage);
    }

    const lastMeasurement = this.measurementRepository.last(userId);
    if (Measurement.isConflicting(lastMeasurement)) {
      const errorMessage = outputData.getConflictErrorMessage();
      return this.replyPresenter.reply(errorMessage);
    }

    this.measurementRepository.stampStartAt(userId, description);

    const startMessage = outputData.getStartMessage(userName, description);
    return this.replyPresenter.reply(startMessage);
  }
}
