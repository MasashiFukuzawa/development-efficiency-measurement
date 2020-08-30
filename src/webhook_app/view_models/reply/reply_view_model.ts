import { SlackReplyView } from '../../views/slack/reply/slack_reply_view';

export class ReplyViewModel {
  reply(message: string): string {
    const slack = new SlackReplyView();
    return slack.reply(message);
  }
}
