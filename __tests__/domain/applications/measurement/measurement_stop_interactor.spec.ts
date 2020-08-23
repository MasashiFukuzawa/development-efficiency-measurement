import { Measurement } from '../../../../src/domain/models/measurement/measurement';
import { UserRepository } from '../../../../src/infrastructure/users/user_repository';
import { MeasurementRepository } from '../../../../src/infrastructure/measurements/measurement_repository';
import { User } from '../../../../src/domain/models/user/user';
import { ReplyPresenter } from '../../../../src/webhook_app/common/presenters/reply/reply_presenter';
import { MeasurementStopInteractor } from '../../../../src/domain/applications/measurement/measurement_stop_interactor';

describe('MeasurementStopInteractor', () => {
  SpreadsheetApp.openById = jest.fn(() => ({
    getSheetByName: jest.fn(() => ({
      getLastRow: jest.fn(() => 1),
      getLastColumn: jest.fn(() => 1),
      getRange: jest.fn(() => ({
        getValues: jest.fn(() => [[]]),
        setValues: jest.fn(),
      })),
    })),
  })) as any;

  PropertiesService.getScriptProperties = jest.fn(() => ({
    getProperty: jest.fn(() => 'xxxxxxx'),
  })) as any;

  ContentService.createTextOutput = jest.fn(() => ({
    setMimeType: jest.fn(),
  })) as any;

  ContentService.MimeType = jest.fn() as any;

  const userRepository = new UserRepository();
  const measurementRepository = new MeasurementRepository();
  const replyPresenter = new ReplyPresenter();
  const measurementStopInteractor = new MeasurementStopInteractor(
    userRepository,
    measurementRepository,
    replyPresenter,
  );

  describe('#handle', () => {
    describe('when valid', () => {
      describe('when user exists', () => {
        it('sends a stop message successfully', () => {
          const userId = 'IM1234';
          const userName = 'izuku.midoriya';
          const user = new User(userId, userName);
          const measurement = new Measurement(userId, new Date(), undefined);

          jest
            .spyOn(UserRepository.prototype, 'findByUserId')
            .mockReturnValue(user);
          jest
            .spyOn(MeasurementRepository.prototype, 'last')
            .mockReturnValue(measurement);

          measurementStopInteractor.handle(userId, userName);
          expect(ContentService.createTextOutput).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('when invalid', () => {
      describe('when target user does not exist', () => {
        it('sends an error message', () => {
          jest
            .spyOn(UserRepository.prototype, 'findByUserId')
            .mockReturnValue(null);

          const userId = 'IM1234';
          const userName = 'izuku.midoriya';
          measurementStopInteractor.handle(userId, userName);
          expect(ContentService.createTextOutput).toHaveBeenCalledTimes(1);
        });
      });

      describe('when user use app for the first time', () => {
        it('sends a message for beginners', () => {
          const userId = 'IM1234';
          const userName = 'izuku.midoriya';
          const user = new User(userId, userName);
          const measurement = null;

          jest
            .spyOn(UserRepository.prototype, 'findByUserId')
            .mockReturnValue(user);
          jest
            .spyOn(MeasurementRepository.prototype, 'last')
            .mockReturnValue(measurement);

          measurementStopInteractor.handle(userId, userName);
          expect(ContentService.createTextOutput).toHaveBeenCalledTimes(1);
        });
      });

      describe('when user already stopped previous timer', () => {
        it('sends an error message', () => {
          const userId = 'IM1234';
          const userName = 'izuku.midoriya';
          const user = new User(userId, userName);
          const measurement = new Measurement(userId, new Date(), new Date());
          jest
            .spyOn(UserRepository.prototype, 'findByUserId')
            .mockReturnValue(user);
          jest
            .spyOn(MeasurementRepository.prototype, 'last')
            .mockReturnValue(measurement);

          measurementStopInteractor.handle(userId, userName);
          expect(ContentService.createTextOutput).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});