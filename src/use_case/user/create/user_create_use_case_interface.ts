export interface UserCreateUseCaseInterface {
  handle(userId: string, userName: string, googleCalendarId: string): string;
}
