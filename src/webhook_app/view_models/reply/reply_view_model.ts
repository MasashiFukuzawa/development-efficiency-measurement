import { ReplyView } from '../../views/reply/reply_view';

export class ReplyViewModel {
  reply(message: string): string {
    const slack = new ReplyView();
    return slack.reply(message);
  }
}
