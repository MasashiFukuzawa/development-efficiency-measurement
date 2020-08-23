export class UserCreateInputData {
  parseText(text: string): string {
    // text: '<mailto:xxx@finc.com|xxx@finc.com>'
    const parsedText = text.split('|')[1];
    return !parsedText ? text : parsedText.replace('>', '');
  }
}
