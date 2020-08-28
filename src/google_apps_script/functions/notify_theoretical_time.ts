import { TheoreticalTimeNotifyInteractor } from '../../domain/applications/theoretical_time/theoretical_time_notify_interactor';
import { UserSettingRepository } from '../../infrastructure/user_settings/user_setting_repository';
import { TheoreticalTimeNotifyController } from '../../webhook_app/theoretical_time/controllers/notify/theoretical_time_notify_controller';
import { NotifyPresenter } from '../../webhook_app/common/presenters/notify/notify_presenter';

function notifyTheoreticalTime(): void {
  const userSettingRepository = new UserSettingRepository();
  const notifyPresenter = new NotifyPresenter();
  const theoreticalTimeNotifyInteractor = new TheoreticalTimeNotifyInteractor(
    userSettingRepository,
    notifyPresenter,
  );
  const theoreticalTimeNotifyController = new TheoreticalTimeNotifyController(
    theoreticalTimeNotifyInteractor,
  );
  theoreticalTimeNotifyController.notify();
}
