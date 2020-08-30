import { AvailableTimeCalculateUseCaseInterface } from '../../../../use_case/available_time/calculate/available_time_calculate_use_case_interface';

export class AvailableTimeCalculateController {
  constructor(
    private readonly availableTimeCalculateUseCase: AvailableTimeCalculateUseCaseInterface,
  ) {}

  calculate(): void {
    this.availableTimeCalculateUseCase.handle();
  }
}
