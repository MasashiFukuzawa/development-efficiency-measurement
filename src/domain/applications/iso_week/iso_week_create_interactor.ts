import { IsoWeekCreateUseCaseInterface } from '../../../use_case/iso_week/create/iso_week_create_use_case_interface';
import { IsoWeekRepositoryInterface } from '../../models/iso_week/iso_week_repository_interface';

export class IsoWeekCreateInteractor implements IsoWeekCreateUseCaseInterface {
  constructor(private readonly isoWeekRepository: IsoWeekRepositoryInterface) {}

  handle(year: number, isoWeek: number): void {
    const targetIsoWeek = this.isoWeekRepository.find(year, isoWeek);
    if (targetIsoWeek) return;
    const createdIsoWeek = this.isoWeekRepository.create(year, isoWeek);
    console.log(`今週分のIsoWeekを登録しました。IsoWeek: ${JSON.stringify(createdIsoWeek)}`);
  }
}
