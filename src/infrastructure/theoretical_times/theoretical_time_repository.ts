import { TheoreticalTimeRepositoryInterface } from '../../domain/models/theoretical_time/theoretical_time_repository_interface';
import { TheoreticalTime } from '../../domain/models/theoretical_time/theoretical_time';
import { BaseRepository } from '../base_repository';

export class TheoreticalTimeRepository extends BaseRepository
  implements TheoreticalTimeRepositoryInterface {
  constructor(sheetName = 'theoretical_times') {
    super(sheetName);
  }

  map(data: any[][]): readonly TheoreticalTime[] {
    return data.map((e) => {
      return new TheoreticalTime(e[0], e[1], e[2]);
    });
  }

  create(userId: string, isoWeekId: number, theoreticalTime: number): TheoreticalTime {
    this.sheet
      .getRange(this.lastRow + 1, 1, 1, this.lastCol)
      .setValues([[userId, isoWeekId, theoreticalTime]]);
    return new TheoreticalTime(userId, isoWeekId, theoreticalTime);
  }
}
