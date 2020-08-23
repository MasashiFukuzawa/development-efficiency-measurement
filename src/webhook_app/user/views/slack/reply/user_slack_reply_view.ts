import TextOutput = GoogleAppsScript.Content.TextOutput;

export class UserSlackReplyView {
  reply(message: string): TextOutput {
    return ContentService.createTextOutput(
      JSON.stringify({ text: message }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
