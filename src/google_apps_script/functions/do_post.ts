import { MeasurementStartInteractor } from '../../domain/applications/measurement/measurement_start_interactor';
import { UserCreateInteractor } from '../../domain/applications/user/user_create_interactor';
import { MeasurementRepository } from '../../infrastructure/measurements/measurement_repository';
import { UserRepository } from '../../infrastructure/users/user_repository';
import { UserSettingRepository } from '../../infrastructure/user_settings/user_setting_repository';
import { ReplyPresenter } from '../../webhook_app/common/presenters/reply/reply_presenter';
import { UserCreateController } from '../../webhook_app/user/controllers/create/user_create_controller';
import { MeasurementStartController } from '../../webhook_app/measurement/controllers/start/measurement_start_controller';
import { MeasurementStopController } from '../../webhook_app/measurement/controllers/stop/measurement_stop_controller';
import { MeasurementStopInteractor } from '../../domain/applications/measurement/measurement_stop_interactor';
import TextOutput = GoogleAppsScript.Content.TextOutput;
import { IsoWeekRepository } from '../../infrastructure/iso_weeks/iso_week_repository';

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
    }

    switch (action) {
      case 'create_user':
        if (arg) return this.execUserCreateAction(arg, userId, userName);
        return this.getArgumentErrorMessage(
          '`/kaihatsu create_user xxx@finc.com` のようにメールアドレスを入力して下さい',
        );
      case 'start':
        return this.execMeasurementStartAction(userId, userName, arg);
      case 'stop':
        return this.execMeasurementStopAction(userId, userName);
      default:
        return this.getArgumentErrorMessage(
          `/kaihatsu ${text} は設定されていないコマンドです`,
        );
    }
  }

  private execUserCreateAction(
    slackFormatGmail: string,
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
    return userCreateController.create(slackFormatGmail, userId, userName);
  }

  private execMeasurementStartAction(
    userId: string,
    userName: string,
    description?: string,
  ): TextOutput {
    const userRepository = new UserRepository();
    const measurementRepository = new MeasurementRepository();
    const isoWeekRepository = new IsoWeekRepository();
    const replyPresenter = new ReplyPresenter();
    const measurementStartInteractor = new MeasurementStartInteractor(
      userRepository,
      measurementRepository,
      isoWeekRepository,
      replyPresenter,
    );
    const measurementStartController = new MeasurementStartController(
      measurementStartInteractor,
    );
    return measurementStartController.start(userId, userName, description);
  }

  private execMeasurementStopAction(
    userId: string,
    userName: string,
  ): TextOutput {
    const userRepository = new UserRepository();
    const measurementRepository = new MeasurementRepository();
    const isoWeekRepository = new IsoWeekRepository();
    const replyPresenter = new ReplyPresenter();
    const measurementStopInteractor = new MeasurementStopInteractor(
      userRepository,
      measurementRepository,
      isoWeekRepository,
      replyPresenter,
    );
    const measurementStartController = new MeasurementStopController(
      measurementStopInteractor,
    );
    return measurementStartController.stop(userId, userName);
  }

  private getArgumentErrorMessage(errorMessage: string): TextOutput {
    return ContentService.createTextOutput(
      JSON.stringify({ text: errorMessage }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
