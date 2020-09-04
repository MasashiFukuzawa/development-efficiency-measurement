import { UserSetting } from './user_setting';

export interface UserSettingRepositoryInterface {
  getAll(): readonly UserSetting[];
  getRawData(): readonly any[][];
  map(data: any[][]): readonly UserSetting[];
  putCache(...attributes: any): void;
  findByUserId(userId: string): UserSetting | null;
  create(userId: string, googleCalendarId: string): UserSetting;
}
