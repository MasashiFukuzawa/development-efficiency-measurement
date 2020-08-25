import { TheoreticalTimeCalculateInteractor } from '../../domain/applications/theoretical_time/theoretical_time_calculate_interactor';
import { TheoreticalTimeRepository } from '../../infrastructure/theoretical_times/theoretical_time_repository';
import { UserSettingRepository } from '../../infrastructure/user_settings/user_setting_repository';
import { TheoreticalTimeCalculateController } from '../../tasks/theoretical_time/controllers/calculate/theoretical_time_calculate_controller';

function calculateTheoreticalTime(): void {
  const theoreticalTimeRepository = new TheoreticalTimeRepository();
  const userSettingRepository = new UserSettingRepository();
  const theoreticalTimeCalculateInteractor = new TheoreticalTimeCalculateInteractor(
    theoreticalTimeRepository,
    userSettingRepository,
  );
  const theoreticalTimeCalculateController = new TheoreticalTimeCalculateController(
    theoreticalTimeCalculateInteractor,
  );
  theoreticalTimeCalculateController.calculate();
}
