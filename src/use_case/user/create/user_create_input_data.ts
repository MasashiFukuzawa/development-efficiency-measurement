export class UserCreateInputData {
  parseText(slackFormatGmail: string): string {
    // slackFormatGmail: '<mailto:xxx@finc.com|xxx@finc.com>'
    const parsedText = slackFormatGmail.split('|')[1];
    return !parsedText ? slackFormatGmail : parsedText.replace('>', '');
  }
}
