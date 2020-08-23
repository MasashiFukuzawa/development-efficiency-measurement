import { UserCreateInteractor } from '../../domain/applications/user/user_create_interactor';
import { UserRepository } from '../../infrastructure/users/user_repository';
import { UserSettingRepository } from '../../infrastructure/user_settings/user_setting_repository';
import { ReplyPresenter } from '../../webhook_app/common/presenters/reply/reply_presenter';
import { UserCreateController } from '../../webhook_app/user/controllers/create/user_create_controller';
import TextOutput = GoogleAppsScript.Content.TextOutput;

function doPost(e: any): TextOutput {
  const token = PropertiesService.getScriptProperties().getProperty(
    'SLACK_VERIFICATION_TOKEN',
  );
  if (token !== e.parameter.token) throw new Error('Invalid Token');
  const text: string = e.parameter.text;
  const userId: string = e.parameter.user_id;
  const userName: string = e.parameter.user_name;
  const doPost = new SlackDoPost();
  return doPost.execControllerAction(text, userId, userName);
}

class SlackDoPost {
  execControllerAction(
    text: string,
    userId: string,
    userName: string,
  ): TextOutput {
    const contents = text.split(' ');
    const [action, arg] = contents;
    if (!action) {
      return this.getArgumentErrorMessage(
        '実行したいコマンドが指定されていません',
      );
    } else if (action === 'create_user') {
      if (arg) return this.execUserCreateAction(arg, userId, userName);
      return this.getArgumentErrorMessage(
        '`/kaihatsu create_user xxx@finc.com` のようにメールアドレスを入力して下さい',
      );
    } else {
      return this.getArgumentErrorMessage(
        `/kaihatsu ${text} は設定されていないコマンドです`,
      );
    }
  }

  private execUserCreateAction(
    text: string,
    userId: string,
    userName: string,
  ): TextOutput {
    const userRepository = new UserRepository();
    const userSettingRepository = new UserSettingRepository();
    const replyPresenter = new ReplyPresenter();
    const userCreateInteractor = new UserCreateInteractor(
      userRepository,
      userSettingRepository,
      replyPresenter,
    );
    const userCreateController = new UserCreateController(userCreateInteractor);
    return userCreateController.create(text, userId, userName);
  }

  private getArgumentErrorMessage(errorMessage: string): TextOutput {
    return ContentService.createTextOutput(
      JSON.stringify({ text: errorMessage }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
