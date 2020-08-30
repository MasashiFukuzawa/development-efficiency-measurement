import TextOutput = GoogleAppsScript.Content.TextOutput;

export interface MeasurementStartUseCaseInterface {
  handle(userId: string, userName: string): TextOutput;
}
