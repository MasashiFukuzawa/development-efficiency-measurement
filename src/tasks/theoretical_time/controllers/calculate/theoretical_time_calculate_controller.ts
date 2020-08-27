import { TheoreticalTimeCalculateInputData } from '../../../../use_case/theoretical_time/calculate/theoretical_time_calculate_input_data';
import { TheoreticalTimeCalculateUseCaseInterface } from '../../../../use_case/theoretical_time/calculate/theoretical_time_calculate_use_case_interface';

export class TheoreticalTimeCalculateController {
  constructor(
    private readonly theoreticalTimeCalculateUseCase: TheoreticalTimeCalculateUseCaseInterface,
  ) {}

  calculate(): void {
    this.theoreticalTimeCalculateUseCase.handle();
  }
}
