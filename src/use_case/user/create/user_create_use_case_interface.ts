import TextOutput = GoogleAppsScript.Content.TextOutput;

export interface UserCreateUseCaseInterface {
  handle(userId: string, userName: string, googleCalendarId: string): TextOutput;
}
