import { IsoWeekCreateController } from '../../app/controllers/iso_week/create/iso_week_create_controller';
import { IsoWeekCreateInteractor } from '../../domain/applications/iso_week/iso_week_create_interactor';
import { IsoWeekRepository } from '../../infrastructure/iso_weeks/iso_week_repository';

function createIsoWeek(): void {
  const isoWeekRepository = new IsoWeekRepository();
  const isoWeekCreateInteractor = new IsoWeekCreateInteractor(isoWeekRepository);
  const isoWeekCreateController = new IsoWeekCreateController(isoWeekCreateInteractor);
  isoWeekCreateController.create();
}
