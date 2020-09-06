import { TheoreticalTimeNotifyInteractor } from '../../domain/applications/theoretical_time/theoretical_time_notify_interactor';
import { UserSettingRepository } from '../../infrastructure/user_settings/user_setting_repository';
import { TheoreticalTimeNotifyController } from '../../app/controllers/theoretical_time/notify/theoretical_time_notify_controller';
import { NotifyPresenter } from '../../app/presenters/notify/notify_presenter';

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
