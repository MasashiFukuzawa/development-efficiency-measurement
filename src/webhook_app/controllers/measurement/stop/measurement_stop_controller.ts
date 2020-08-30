import { MeasurementStopUseCaseInterface } from '../../../../use_case/measurement/stop/measurement_stop_use_case_interface';

export class MeasurementStopController {
  constructor(private readonly measurementStopUseCase: MeasurementStopUseCaseInterface) {}

  stop(userId: string, userName: string): string {
    return this.measurementStopUseCase.handle(userId, userName);
  }
}
