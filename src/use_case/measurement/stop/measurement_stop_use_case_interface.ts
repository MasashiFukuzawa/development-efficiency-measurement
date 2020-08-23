import TextOutput = GoogleAppsScript.Content.TextOutput;

export interface MeasurementStopUseCaseInterface {
  handle(userId: string, userName: string): TextOutput;
}
