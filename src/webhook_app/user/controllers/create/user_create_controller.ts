import { UserCreateInputData } from '../../../../use_case/user/create/user_create_input_data';
import { UserCreateUseCaseInterface } from '../../../../use_case/user/create/user_create_use_case_interface';
import TextOutput = GoogleAppsScript.Content.TextOutput;

export class UserCreateController {
  constructor(private readonly userCreateUseCase: UserCreateUseCaseInterface) {}

  create(slackFormatGmail: string, userId: string, userName: string): TextOutput {
    const googleCalendarId = new UserCreateInputData().parseText(slackFormatGmail);
    return this.userCreateUseCase.handle(userId, userName, googleCalendarId);
  }
}
