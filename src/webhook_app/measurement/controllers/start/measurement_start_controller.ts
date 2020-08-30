import { MeasurementStartUseCaseInterface } from '../../../../use_case/measurement/start/measurement_start_use_case_interface';
import TextOutput = GoogleAppsScript.Content.TextOutput;

export class MeasurementStartController {
  constructor(private readonly measurementStartUseCase: MeasurementStartUseCaseInterface) {}

  start(userId: string, userName: string, description?: string): TextOutput {
    return this.measurementStartUseCase.handle(userId, userName, description);
  }
}
