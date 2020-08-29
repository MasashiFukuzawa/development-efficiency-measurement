import { AvailableTimeCalculateInteractor } from '../../domain/applications/available_time/available_time_calculate_interactor';
import { AvailableTimeRepository } from '../../infrastructure/available_times/available_time_repository';
import { UserSettingRepository } from '../../infrastructure/user_settings/user_setting_repository';
import { AvailableTimeCalculateController } from '../../webhook_app/available_time/controllers/calculate/available_time_calculate_controller';

function calculateAvailableTime(): void {
  const availableTimeRepository = new AvailableTimeRepository();
  const userSettingRepository = new UserSettingRepository();
  const availableTimeCalculateInteractor = new AvailableTimeCalculateInteractor(
    availableTimeRepository,
    userSettingRepository,
  );
  const availableTimeCalculateController = new AvailableTimeCalculateController(
    availableTimeCalculateInteractor,
  );
  availableTimeCalculateController.calculate();
}
