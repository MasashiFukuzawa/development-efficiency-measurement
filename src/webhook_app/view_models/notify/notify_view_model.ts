import { SlackNotifyView } from '../../views/slack/notify/slack_notify_view';

export class NotifyViewModel {
  notify(message: string): void {
    const slack = new SlackNotifyView();
    slack.notify(message);
  }
}
