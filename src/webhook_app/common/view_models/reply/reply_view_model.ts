import { UserSlackReplyView } from '../../../user/views/slack/reply/user_slack_reply_view';
import TextOutput = GoogleAppsScript.Content.TextOutput;

export class ReplyViewModel {
  reply(message: string): TextOutput {
    const slack = new UserSlackReplyView();
    return slack.reply(message);
  }
}
