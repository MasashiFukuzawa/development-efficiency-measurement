import { AvailableTimeNotifyInteractor } from '../../domain/applications/theoretical_time/theoretical_time_notify_interactor';
import { UserSettingRepository } from '../../infrastructure/user_settings/user_setting_repository';
import { AvailableTimeNotifyController } from '../../app/controllers/theoretical_time/notify/theoretical_time_notify_controller';
import { NotifyPresenter } from '../../app/presenters/notify/notify_presenter';

function notifyAvailableTime(): void {
  const userSettingRepository = new UserSettingRepository();
  const notifyPresenter = new NotifyPresenter();
  const availableTimeNotifyInteractor = new AvailableTimeNotifyInteractor(
    userSettingRepository,
    notifyPresenter,
  );
  const availableTimeNotifyController = new AvailableTimeNotifyController(
    availableTimeNotifyInteractor,
  );
  availableTimeNotifyController.notify();
}
