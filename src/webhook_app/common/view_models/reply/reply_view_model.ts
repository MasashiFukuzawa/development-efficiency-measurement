import { UserSlackReplyView } from '../../../user/views/slack/reply/user_slack_reply_view';

export class ReplyViewModel {
  reply(message: string): string {
    const slack = new UserSlackReplyView();
    return slack.reply(message);
  }
}
