export class UserCreateInputData {
  parseText(text: string): string | null {
    // text => user_create {googleCalendarId}
    const contents = text.split(' ');
    return contents[1];
  }
}
