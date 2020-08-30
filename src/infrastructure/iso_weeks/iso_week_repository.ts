import { IsoWeek } from '../../domain/models/iso_week/iso_week';
import { IsoWeekRepositoryInterface } from '../../domain/models/iso_week/iso_week_repository_interface';
import { BaseRepository } from '../base_repository';

export class IsoWeekRepository extends BaseRepository
  implements IsoWeekRepositoryInterface {
  constructor(sheetName = 'iso_weeks') {
    super(sheetName);
  }

  map(data: any[][]): readonly IsoWeek[] {
    return data.map((e) => {
      return new IsoWeek(e[0], e[1], e[2]);
    });
  }

  find(year: number, isoWeek: number): IsoWeek | null {
    const isoWeekObj = this.fullData.find((e) => e.isTargetWeek(year, isoWeek));
    return !!isoWeekObj ? isoWeekObj : null;
  }
}
