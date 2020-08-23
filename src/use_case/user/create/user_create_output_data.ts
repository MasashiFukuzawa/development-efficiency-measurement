import { User } from '../../../domain/models/user/user';
import { UserSetting } from '../../../domain/models/user_setting/user_setting';

export class UserCreateOutputData {
  getMessage(user: User, userSetting: UserSetting): string {
    const userId = user.getId().toString();
    const name = user.getName().toString();
    const googleCalendarId = userSetting.getGoogleCalendarId().toString();
    const createdAt = Moment.moment(user.getCreatedAt()).format(
      'YYYY/MM/DD HH:mm:ss',
    );
    return `新規ユーザーを作成しました。
user_id: ${userId}, user_name: ${name}, google_calendar_id: ${googleCalendarId}, created_at: ${createdAt}`;
  }
}
