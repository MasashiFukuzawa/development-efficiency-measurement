import { TheoreticalTimeCalculateInteractor } from '../../domain/applications/theoretical_time/theoretical_time_calculate_interactor';
import { TheoreticalTimeRepository } from '../../infrastructure/theoretical_times/theoretical_time_repository';
import { IsoWeekRepository } from '../../infrastructure/iso_weeks/iso_week_repository';
import { UserSettingRepository } from '../../infrastructure/user_settings/user_setting_repository';
import { TheoreticalTimeCalculateController } from '../../app/controllers/theoretical_time/calculate/theoretical_time_calculate_controller';

function calculateTheoreticalTime(): void {
  const theoreticalTimeRepository = new TheoreticalTimeRepository();
  const userSettingRepository = new UserSettingRepository();
  const isoWeekRepository = new IsoWeekRepository();
  const theoreticalTimeCalculateInteractor = new TheoreticalTimeCalculateInteractor(
    theoreticalTimeRepository,
    userSettingRepository,
    isoWeekRepository,
  );
  const theoreticalTimeCalculateController = new TheoreticalTimeCalculateController(
    theoreticalTimeCalculateInteractor,
  );
  theoreticalTimeCalculateController.calculate();
}
