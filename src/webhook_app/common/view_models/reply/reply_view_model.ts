import { ReplySubscriber } from '../../reply_subscriber';

export class ReplyViewModel {
  reply(message: string): void {
    const subscribers = ReplySubscriber.subscribers;
    subscribers.forEach((e) => {
      e.reply(message);
      console.log(`${e.getWebhookAppName()} にメッセージを送信しました`);
    });
  }
}
