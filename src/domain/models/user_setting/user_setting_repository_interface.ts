import { UserSetting } from './user_setting';

export interface UserSettingRepositoryInterface {
  getAll(): readonly UserSetting[];
  findByUserId(userId: string): UserSetting | null;
  create(userId: string, googleCalendarId: string): UserSetting;
}
