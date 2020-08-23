import { Measurement } from '../../../../src/domain/models/measurement/measurement';
import { UserRepository } from '../../../../src/infrastructure/users/user_repository';
import { MeasurementRepository } from '../../../../src/infrastructure/measurements/measurement_repository';
import { User } from '../../../../src/domain/models/user/user';
import { ReplyPresenter } from '../../../../src/webhook_app/common/presenters/reply/reply_presenter';
import { MeasurementStartInteractor } from '../../../../src/domain/applications/measurement/measurement_start_interactor';

describe('MeasurementStartInteractor', () => {
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
  const measurementStartInteractor = new MeasurementStartInteractor(
    userRepository,
    measurementRepository,
    replyPresenter,
  );

  describe('#handle', () => {
    describe('when valid', () => {
      describe('when user exists', () => {
        it('sends a start message successfully', () => {
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

          measurementStartInteractor.handle(userId, userName, 'description');
          expect(ContentService.createTextOutput).toHaveBeenCalledTimes(1);
        });
      });

      describe('when user stamp start timer for the first time', () => {
        it('sends a start message successfully', () => {
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

          measurementStartInteractor.handle(userId, userName, 'description');
          expect(ContentService.createTextOutput).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('when invalid', () => {
      describe('when target user does not exist', () => {
        it('sends an error message successfully', () => {
          jest
            .spyOn(UserRepository.prototype, 'findByUserId')
            .mockReturnValue(null);

          const userId = 'IM1234';
          const userName = 'izuku.midoriya';
          measurementStartInteractor.handle(userId, userName);
          expect(ContentService.createTextOutput).toHaveBeenCalledTimes(1);
        });
      });

      describe('when user does not stop previous timer', () => {
        it('sends an error message successfully', () => {
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

          measurementStartInteractor.handle(userId, userName);
          expect(ContentService.createTextOutput).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
