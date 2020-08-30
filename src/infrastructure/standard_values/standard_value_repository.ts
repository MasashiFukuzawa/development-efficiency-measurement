import { StandardValue } from '../../domain/models/standard_value/standard_value';
import { StandardValueRepositoryInterface } from '../../domain/models/standard_value/standard_value_repository_interface';
import { BaseRepository } from '../base_repository';

export class StandardValueRepository extends BaseRepository
  implements StandardValueRepositoryInterface {
  constructor(sheetName = 'standard_values') {
    super(sheetName);
  }

  map(data: any[][]): readonly StandardValue[] {
    return data.map((e) => {
      return new StandardValue(e[0], e[1], e[2], e[3], e[4], e[5], e[6]);
    });
  }

  create(standardValue: StandardValue): StandardValue {
    this.sheet
      .getRange(this.lastRow + 1, 1, 1, this.lastCol)
      .setValues([
        [
          standardValue.getIsoWeekId().toNumber(),
          standardValue.getTotalImplementHour().toNumber(),
          standardValue.getMeasurementCount().toNumber(),
          standardValue.getAverageImplementHour().toNumber(),
          standardValue.getTheoreticalAvailableHour().toNumber(),
          standardValue.getAvailableRate().toNumber(),
          standardValue.getKpiValue().toNumber(),
        ],
      ]);
    return standardValue;
  }
}
