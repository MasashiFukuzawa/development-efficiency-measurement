import { AvailableTimeRepositoryInterface } from '../../domain/models/available_time/available_time_repository_interface';
import { AvailableTime } from '../../domain/models/available_time/available_time';
import { BaseRepository } from '../base_repository';

export class AvailableTimeRepository extends BaseRepository
  implements AvailableTimeRepositoryInterface {
  constructor(sheetName = 'available_times') {
    super(sheetName);
  }

  map(data: any[][]): readonly AvailableTime[] {
    return data.map((e) => {
      return new AvailableTime(e[0], e[1], e[2]);
    });
  }

  create(
    userId: string,
    isoWeekId: number,
    availableTime: number,
  ): AvailableTime {
    this.sheet
      .getRange(this.lastRow + 1, 1, 1, this.lastCol)
      .setValues([[userId, isoWeekId, availableTime]]);
    return new AvailableTime(userId, isoWeekId, availableTime);
  }
}
