import { ReplyPresenterInterface } from '../../../../use_case/common/reply_presenter_interface';
import { ReplyViewModel } from '../../view_models/reply/reply_view_model';
import TextOutput = GoogleAppsScript.Content.TextOutput;

export class ReplyPresenter implements ReplyPresenterInterface {
  reply(message: string): TextOutput {
    const publisher = new ReplyViewModel();
    return publisher.reply(message);
  }
}
