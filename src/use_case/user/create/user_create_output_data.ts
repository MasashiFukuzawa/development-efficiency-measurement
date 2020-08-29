import { User } from '../../../domain/models/user/user';
import { UserSetting } from '../../../domain/models/user_setting/user_setting';

export class UserCreateOutputData {
  getMessage(user: User, userSetting: UserSetting): string {
    const userId = user.getUserId().toString();
    const name = user.getName().toString();
    const googleCalendarId = userSetting.getGoogleCalendarId().toString();
    const createdAt = Moment.moment(user.getCreatedAt()).format(
      'YYYY/MM/DD HH:mm:ss',
    );
    return `新規ユーザーを作成しました。
UserInfo: { UserId: ${userId}, UserName: ${name}, GoogleCalendarId: ${googleCalendarId}, CreatedAt: ${createdAt} }`;
  }

  getUserNotUniqueErrorMessage(UserName: string): string {
    return `Unique制約に引っ掛かりました。${UserName} さんは既に登録されています`;
  }

  getGoogleCalendarIdNotUniqueErrorMessage(googleCalendarId: string): string {
    return `Unique制約に引っ掛かりました。${googleCalendarId} は既に登録されています`;
  }
}
