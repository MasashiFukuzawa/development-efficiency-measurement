import { AvailableTimeNotifyUseCaseInterface } from '../../../../use_case/available_time/notify/available_time_notify_use_case_interface';

export class AvailableTimeNotifyController {
  constructor(
    private readonly availableTimeNotifyUseCase: AvailableTimeNotifyUseCaseInterface,
  ) {}

  notify(): void {
    this.availableTimeNotifyUseCase.handle();
  }
}
