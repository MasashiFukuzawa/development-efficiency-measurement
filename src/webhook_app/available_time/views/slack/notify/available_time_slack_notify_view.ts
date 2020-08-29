export class AvailableTimeSlackNotifyView {
  private webhookUrl: string | null;
  constructor() {
    this.webhookUrl = null;
  }

  notify(message: string): void {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      payload: JSON.stringify({ text: message }),
    } as any;

    UrlFetchApp.fetch(this.getWebhookUrl(), options);
  }

  private getWebhookUrl(): string {
    if (this.webhookUrl) return this.webhookUrl;

    const url = PropertiesService.getScriptProperties().getProperty(
      'SLACK_WEBHOOK_URL',
    );

    if (!url) throw new Error('SLACK_WEBHOOK_URL is not found.');
    return url;
  }
}
