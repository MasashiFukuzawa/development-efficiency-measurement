import { UserSlackReplyView } from '../user/views/slack/reply/user_slack_reply_view';

export class ReplySubscriber {
  static readonly subscribers = [new UserSlackReplyView()];
}
