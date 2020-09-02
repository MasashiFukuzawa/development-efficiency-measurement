import { MeasurementStartUseCaseInterface } from '../../../../use_case/measurement/start/measurement_start_use_case_interface';

export class MeasurementStartController {
  constructor(private readonly measurementStartUseCase: MeasurementStartUseCaseInterface) {}

  start(userId: string, userName: string): string {
    return this.measurementStartUseCase.handle(userId, userName);
  }
}
