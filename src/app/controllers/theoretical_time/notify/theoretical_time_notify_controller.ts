import { AvailableTimeNotifyUseCaseInterface } from '../../../../use_case/theoretical_time/notify/theoretical_time_notify_use_case_interface';

export class AvailableTimeNotifyController {
  constructor(private readonly availableTimeNotifyUseCase: AvailableTimeNotifyUseCaseInterface) {}

  notify(): void {
    this.availableTimeNotifyUseCase.handle();
  }
}
