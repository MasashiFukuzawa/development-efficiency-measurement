import { UserCreateUseCaseInterface } from '../../../use_case/user/create/user_create_use_case_interface';
import { UserRepositoryInterface } from '../../models/user/user_repository_interface';
import { UserSettingRepositoryInterface } from '../../models/user_setting/user_setting_repository_interface';
import { ReplyPresenterInterface } from '../../../use_case/common/reply_presenter_interface';
import { User } from '../../models/user/user';
import { UserSetting } from '../../models/user_setting/user_setting';
import { UserCreateOutputData } from '../../../use_case/user/create/user_create_output_data';

export class UserCreateInteractor implements UserCreateUseCaseInterface {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly userSettingRepository: UserSettingRepositoryInterface,
    private readonly replyPresenter: ReplyPresenterInterface,
  ) {}

  handle(userId: string, userName: string, googleCalendarId: string): void {
    if (!this.userValidation(userId, userName)) {
      throw new Error('User Validation Error');
    }
    if (!this.userSettingValidation(userId, googleCalendarId)) {
      throw new Error('UserSetting Validation Error');
    }

    const user = this.userRepository.create(userId, userName);
    const userSetting = this.userSettingRepository.create(
      userId,
      googleCalendarId,
    );

    this.replyPresenter.reply(
      new UserCreateOutputData().getMessage(user, userSetting),
    );
  }

  private userValidation(userId: string, userName: string): boolean {
    const user = this.userRepository.findByUserId(userId);
    if (user) {
      const errorMessage = user.getRecordNotUniqueErrorMessage();
      this.replyPresenter.reply(errorMessage);
      return false;
    }

    const userValidationErrorMessage = User.validate(userId, userName);
    if (userValidationErrorMessage) {
      this.replyPresenter.reply(userValidationErrorMessage);
      return false;
    }

    return true;
  }

  private userSettingValidation(
    userId: string,
    googleCalendarId: string,
  ): boolean {
    const userSetting = this.userSettingRepository.findByUserId(userId);
    if (userSetting) {
      const errorMessage = userSetting.getRecordNotUniqueErrorMessage();
      this.replyPresenter.reply(errorMessage);
      return false;
    }

    const userSettingValidationErrorMessage = UserSetting.validate(
      googleCalendarId,
    );
    if (userSettingValidationErrorMessage) {
      this.replyPresenter.reply(userSettingValidationErrorMessage);
      return false;
    }

    return true;
  }
}
