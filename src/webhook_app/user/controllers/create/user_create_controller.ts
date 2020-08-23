import { UserCreateInputData } from '../../../../use_case/user/create/user_create_input_data';
import { UserCreateUseCaseInterface } from '../../../../use_case/user/create/user_create_use_case_interface';
import TextOutput = GoogleAppsScript.Content.TextOutput;

export class UserCreateController {
  constructor(private readonly userCreateUseCase: UserCreateUseCaseInterface) {}

  create(text: string, userId: string, userName: string): TextOutput {
    const googleCalendarId = new UserCreateInputData().parseText(text);
    return this.userCreateUseCase.handle(userId, userName, googleCalendarId);
  }
}
