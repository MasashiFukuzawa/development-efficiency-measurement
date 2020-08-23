import { SlackConstants } from '../../../../../constants/slack_constants';
import TextOutput = GoogleAppsScript.Content.TextOutput;

export class UserSlackReplyView {
  reply(message: string): TextOutput {
    return ContentService.createTextOutput(
      JSON.stringify({ text: message }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  getWebhookAppName(): string {
    return SlackConstants.PROVIDER_NAME;
  }
}
