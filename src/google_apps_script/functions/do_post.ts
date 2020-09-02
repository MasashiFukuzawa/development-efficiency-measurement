import { MeasurementStartInteractor } from '../../domain/applications/measurement/measurement_start_interactor';
import { UserCreateInteractor } from '../../domain/applications/user/user_create_interactor';
import { MeasurementRepository } from '../../infrastructure/measurements/measurement_repository';
import { UserRepository } from '../../infrastructure/users/user_repository';
import { UserSettingRepository } from '../../infrastructure/user_settings/user_setting_repository';
import { ReplyPresenter } from '../../app/presenters/reply/reply_presenter';
import { UserCreateController } from '../../app/controllers/user/create/user_create_controller';
import { MeasurementStartController } from '../../app/controllers/measurement/start/measurement_start_controller';
import { MeasurementStopController } from '../../app/controllers/measurement/stop/measurement_stop_controller';
import { MeasurementStopInteractor } from '../../domain/applications/measurement/measurement_stop_interactor';
import { IsoWeekRepository } from '../../infrastructure/iso_weeks/iso_week_repository';
import { HelpController } from '../../app/controllers/help_controller';
import TextOutput = GoogleAppsScript.Content.TextOutput;

function doPost(e: any): TextOutput {
  if (typeof e.parameter === 'undefined') throw new Error('Bad Request');

  const receivedToken = e.parameter.token;
  if (SlackDoPost.isSlackToken(receivedToken) || CliDoPost.isCliToken(receivedToken)) {
    const text = e.parameter.text;
    const userId = e.parameter.user_id;
    const userName = e.parameter.user_name;
    const message = DoPost.execControllerAction(text, userId, userName);
    return ContentService.createTextOutput(JSON.stringify({ text: message })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } else {
    throw new Error('Invalid Token');
  }
}

class SlackDoPost {
  static isSlackToken(token: string): boolean {
    return token === this.getSlackToken();
  }

  private static getSlackToken(): string | null {
    return PropertiesService.getScriptProperties().getProperty('SLACK_VERIFICATION_TOKEN');
  }
}

class CliDoPost {
  static isCliToken(token: string): boolean {
    return token === this.getCliToken();
  }

  private static getCliToken(): string | null {
    return PropertiesService.getScriptProperties().getProperty('CLI_VERIFICATION_TOKEN');
  }
}

class DoPost {
  static execControllerAction(text: string, userId: string, userName: string): string {
    const contents = text.split(' ');
    const [action, arg] = contents;
    switch (action) {
      case 'user':
        if (!arg)
          return `\`/measurement user xxx@finc.com\` のようにメールアドレスを入力して下さい`;
        return this.execUserCreateAction(arg, userId, userName);
      case 'start':
        return this.execMeasurementStartAction(userId, userName);
      case 'stop':
        return this.execMeasurementStopAction(userId, userName);
      default:
        return this.execHelpAction(userId);
    }
  }

  private static execUserCreateAction(
    slackFormatGmail: string,
    userId: string,
    userName: string,
  ): string {
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

  private static execMeasurementStartAction(userId: string, userName: string): string {
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

  private static execMeasurementStopAction(userId: string, userName: string): string {
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

  private static execHelpAction(userId: string): string {
    const helpController = new HelpController();
    return helpController.help(userId);
  }
}
