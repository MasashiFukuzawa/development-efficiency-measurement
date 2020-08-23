import { UserCreateInteractor } from '../../domain/applications/user/user_create_interactor';
import { UserRepository } from '../../infrastructure/users/user_repository';
import { UserSettingRepository } from '../../infrastructure/user_settings/user_setting_repository';
import { ReplyPresenter } from '../../webhook_app/common/presenters/reply/reply_presenter';
import { UserCreateController } from '../../webhook_app/user/controllers/create/user_create_controller';

function doPost(e: any): void {
  const token = PropertiesService.getScriptProperties().getProperty(
    'SLACK_VERIFICATION_TOKEN',
  );
  if (token !== e.parameter.token) throw new Error('Invalid Token');
  const text: string = e.parameter.text;
  const userId: string = e.parameter.user_id;
  const userName: string = e.parameter.user_name;
  const doPost = new DoPost();
  doPost.execControllerAction(text, userId, userName);
}

class DoPost {
  execControllerAction(text: string, userId: string, userName: string): void {
    if (text.indexOf('user_create') !== -1) {
      return this.execUserCreateAction(text, userId, userName);
    }
  }

  private execUserCreateAction(
    text: string,
    userId: string,
    userName: string,
  ): void {
    const userRepository = new UserRepository();
    const userSettingRepository = new UserSettingRepository();
    const replyPresenter = new ReplyPresenter();
    const userCreateInteractor = new UserCreateInteractor(
      userRepository,
      userSettingRepository,
      replyPresenter,
    );
    const userCreateController = new UserCreateController(userCreateInteractor);
    userCreateController.create(text, userId, userName);
  }
}
