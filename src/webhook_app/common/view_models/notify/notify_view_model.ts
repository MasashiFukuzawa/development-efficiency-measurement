import { AvailableTimeSlackNotifyView } from '../../../available_time/views/slack/notify/available_time_slack_notify_view';

export class NotifyViewModel {
  notify(message: string): void {
    const slack = new AvailableTimeSlackNotifyView();
    slack.notify(message);
  }
}
