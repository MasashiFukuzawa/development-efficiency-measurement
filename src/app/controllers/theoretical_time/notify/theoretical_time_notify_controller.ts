import { TheoreticalTimeNotifyUseCaseInterface } from '../../../../use_case/theoretical_time/notify/theoretical_time_notify_use_case_interface';

export class TheoreticalTimeNotifyController {
  constructor(
    private readonly theoreticalTimeNotifyUseCase: TheoreticalTimeNotifyUseCaseInterface,
  ) {}

  notify(): void {
    this.theoreticalTimeNotifyUseCase.handle();
  }
}
