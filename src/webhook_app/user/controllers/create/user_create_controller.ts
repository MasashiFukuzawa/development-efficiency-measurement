import { UserCreateInputData } from '../../../../use_case/user/create/user_create_input_data';
import { UserCreateUseCaseInterface } from '../../../../use_case/user/create/user_create_use_case_interface';

export class UserCreateController {
  constructor(private readonly userCreateUseCase: UserCreateUseCaseInterface) {}

  create(text: string, userId: string, userName: string): void {
    const googleCalendarId = new UserCreateInputData().parseText(text);
    this.userCreateUseCase.handle(userId, userName, googleCalendarId);
  }
}
