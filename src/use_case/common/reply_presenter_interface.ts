import TextOutput = GoogleAppsScript.Content.TextOutput;

export interface ReplyPresenterInterface {
  reply(message: string): TextOutput;
}
