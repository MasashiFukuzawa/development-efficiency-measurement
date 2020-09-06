import { IsoWeekCreateInputData } from '../../../../use_case/iso_week/create/iso_week_create_input_data';
import { IsoWeekCreateUseCaseInterface } from '../../../../use_case/iso_week/create/iso_week_create_use_case_interface';

export class IsoWeekCreateController {
  constructor(private readonly isoWeekCreateUseCase: IsoWeekCreateUseCaseInterface) {}

  create(): string {
    const inputData = new IsoWeekCreateInputData();
    const yearAndIsoWeek = inputData.getYearAndIsoWeek();
    return this.isoWeekCreateUseCase.handle(yearAndIsoWeek.year, yearAndIsoWeek.isoWeek);
  }
}
