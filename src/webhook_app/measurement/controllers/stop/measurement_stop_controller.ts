import { MeasurementStopUseCaseInterface } from '../../../../use_case/measurement/stop/measurement_stop_use_case_interface';
import TextOutput = GoogleAppsScript.Content.TextOutput;

export class MeasurementStopController {
  constructor(
    private readonly measurementStopUseCase: MeasurementStopUseCaseInterface,
  ) {}

  stop(userId: string, userName: string): TextOutput {
    return this.measurementStopUseCase.handle(userId, userName);
  }
}
