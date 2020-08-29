import { AvailableTimeNotifyInteractor } from '../../domain/applications/available_time/available_time_notify_interactor';
import { UserSettingRepository } from '../../infrastructure/user_settings/user_setting_repository';
import { AvailableTimeNotifyController } from '../../webhook_app/available_time/controllers/notify/available_time_notify_controller';
import { NotifyPresenter } from '../../webhook_app/common/presenters/notify/notify_presenter';

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
