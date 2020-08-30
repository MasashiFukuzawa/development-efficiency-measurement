import { NotifyPresenterInterface } from '../../../use_case/common/notify_presenter_interface';
import { NotifyViewModel } from '../../view_models/notify/notify_view_model';

export class NotifyPresenter implements NotifyPresenterInterface {
  notify(message: string): void {
    const publisher = new NotifyViewModel();
    publisher.notify(message);
  }
}
