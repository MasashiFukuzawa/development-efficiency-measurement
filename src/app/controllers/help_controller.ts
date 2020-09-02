import { HelpInputData } from '../../use_case/help_input_data';

export class HelpController {
  help(userId: string): string {
    const message = new HelpInputData().getMessage(userId);
    return message;
  }
}
