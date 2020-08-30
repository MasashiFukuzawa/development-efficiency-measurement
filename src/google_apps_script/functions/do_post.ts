import { MeasurementStartInteractor } from '../../domain/applications/measurement/measurement_start_interactor';
import { UserCreateInteractor } from '../../domain/applications/user/user_create_interactor';
import { MeasurementRepository } from '../../infrastructure/measurements/measurement_repository';
import { UserRepository } from '../../infrastructure/users/user_repository';
import { UserSettingRepository } from '../../infrastructure/user_settings/user_setting_repository';
import { ReplyPresenter } from '../../webhook_app/presenters/reply/reply_presenter';
import { UserCreateController } from '../../webhook_app/controllers/user/create/user_create_controller';
import { MeasurementStartController } from '../../webhook_app/controllers/measurement/start/measurement_start_controller';
import { MeasurementStopController } from '../../webhook_app/controllers/measurement/stop/measurement_stop_controller';
import { MeasurementStopInteractor } from '../../domain/applications/measurement/measurement_stop_interactor';
import { IsoWeekRepository } from '../../infrastructure/iso_weeks/iso_week_repository';
import TextOutput = GoogleAppsScript.Content.TextOutput;
import { HelpController } from '../../webhook_app/controllers/help_controller';

function doPost(e: any): TextOutput {
  const token = PropertiesService.getScriptProperties().getProperty('SLACK_VERIFICATION_TOKEN');
  if (token !== e.parameter.token) throw new Error('Invalid Token');
  const text: string = e.parameter.text;
  const userId: string = e.parameter.user_id;
  const userName: string = e.parameter.user_name;
  const doPost = new SlackDoPost();
  const message = doPost.execControllerAction(text, userId, userName);
  return ContentService.createTextOutput(JSON.stringify({ text: message })).setMimeType(
    ContentService.MimeType.JSON,
  );
}

class SlackDoPost {
  execControllerAction(text: string, userId: string, userName: string): string {
    const contents = text.split(' ');
    const [action, arg] = contents;
    switch (action) {
      case 'create_user':
        if (!arg)
          return `\`/kaihatsu create_user xxx@finc.com\` のようにメールアドレスを入力して下さい`;
        return this.execUserCreateAction(arg, userId, userName);
      case 'start':
        return this.execMeasurementStartAction(userId, userName);
      case 'stop':
        return this.execMeasurementStopAction(userId, userName);
      default:
        return this.execHelpAction(userId);
    }
  }

  private execUserCreateAction(slackFormatGmail: string, userId: string, userName: string): string {
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

  private execMeasurementStartAction(userId: string, userName: string): string {
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
    const measurementStartController = new MeasurementStartController(measurementStartInteractor);
    return measurementStartController.start(userId, userName);
  }

  private execMeasurementStopAction(userId: string, userName: string): string {
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
    const measurementStartController = new MeasurementStopController(measurementStopInteractor);
    return measurementStartController.stop(userId, userName);
  }

  private execHelpAction(userId: string): string {
    const helpController = new HelpController();
    return helpController.help(userId);
  }
}
