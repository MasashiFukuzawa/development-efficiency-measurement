import { UserCreateUseCaseInterface } from '../../../use_case/user/create/user_create_use_case_interface';
import { UserRepositoryInterface } from '../../models/user/user_repository_interface';
import { UserSettingRepositoryInterface } from '../../models/user_setting/user_setting_repository_interface';
import { ReplyPresenterInterface } from '../../../use_case/common/reply_presenter_interface';
import { User } from '../../models/user/user';
import { UserSetting } from '../../models/user_setting/user_setting';
import { UserCreateOutputData } from '../../../use_case/user/create/user_create_output_data';
import TextOutput = GoogleAppsScript.Content.TextOutput;

export class UserCreateInteractor implements UserCreateUseCaseInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly userSettingRepository: UserSettingRepositoryInterface,
    private readonly replyPresenter: ReplyPresenterInterface,
  ) {}

  handle(
    userId: string,
    userName: string,
    googleCalendarId: string,
  ): TextOutput {
    const outputData = new UserCreateOutputData();

    const user = this.userRepository.findByUserId(userId);
    if (user) {
      const errorMessage = outputData.getUserNotUniqueErrorMessage(userName);
      return this.replyPresenter.reply(errorMessage);
    }

    const userValidationErrorMessage = User.validate(userId, userName);
    if (userValidationErrorMessage) {
      return this.replyPresenter.reply(userValidationErrorMessage);
    }

    const userSetting = this.userSettingRepository.findByUserId(userId);
    if (userSetting) {
      const errorMessage = outputData.getGoogleCalendarIdNotUniqueErrorMessage(
        googleCalendarId,
      );
      return this.replyPresenter.reply(errorMessage);
    }

    const userSettingValidationErrorMessage = UserSetting.validate(
      googleCalendarId,
    );
    if (userSettingValidationErrorMessage) {
      return this.replyPresenter.reply(userSettingValidationErrorMessage);
    }

    const createdUser = this.userRepository.create(userId, userName);
    const createdUserSetting = this.userSettingRepository.create(
      userId,
      googleCalendarId,
    );

    return this.replyPresenter.reply(
      outputData.getMessage(createdUser, createdUserSetting),
    );
  }
}
