import { AvailableTimeCalculateInteractor } from '../../domain/applications/available_time/available_time_calculate_interactor';
import { AvailableTimeRepository } from '../../infrastructure/available_times/available_time_repository';
import { IsoWeekRepository } from '../../infrastructure/iso_weeks/iso_week_repository';
import { UserSettingRepository } from '../../infrastructure/user_settings/user_setting_repository';
import { AvailableTimeCalculateController } from '../../app/controllers/available_time/calculate/available_time_calculate_controller';

function calculateAvailableTime(): void {
  const availableTimeRepository = new AvailableTimeRepository();
  const userSettingRepository = new UserSettingRepository();
  const isoWeekRepository = new IsoWeekRepository();
  const availableTimeCalculateInteractor = new AvailableTimeCalculateInteractor(
    availableTimeRepository,
    userSettingRepository,
    isoWeekRepository,
  );
  const availableTimeCalculateController = new AvailableTimeCalculateController(
    availableTimeCalculateInteractor,
  );
  availableTimeCalculateController.calculate();
}
