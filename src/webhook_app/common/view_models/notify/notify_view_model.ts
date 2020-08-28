import { TheoreticalTimeSlackNotifyView } from '../../../theoretical_time/views/slack/notify/theoretical_time_slack_notify_view';

export class NotifyViewModel {
  notify(message: string): void {
    const slack = new TheoreticalTimeSlackNotifyView();
    slack.notify(message);
  }
}
