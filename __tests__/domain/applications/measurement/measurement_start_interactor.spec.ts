import { Measurement } from '../../../../src/domain/models/measurement/measurement';
import { UserRepository } from '../../../../src/infrastructure/users/user_repository';
import { MeasurementRepository } from '../../../../src/infrastructure/measurements/measurement_repository';
import { IsoWeekRepository } from '../../../../src/infrastructure/iso_weeks/iso_week_repository';
import { User } from '../../../../src/domain/models/user/user';
import { ReplyPresenter } from '../../../../src/app/presenters/reply/reply_presenter';
import { MeasurementStartInteractor } from '../../../../src/domain/applications/measurement/measurement_start_interactor';
import { IsoWeek } from '../../../../src/domain/models/iso_week/iso_week';

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

  Moment.moment = jest.fn(() => ({
    get: jest.fn(() => 2020),
    isoWeek: jest.fn(() => 35),
  }));

  const userRepository = new UserRepository();
  const measurementRepository = new MeasurementRepository();
  const isoWeekRepository = new IsoWeekRepository();
  const replyPresenter = new ReplyPresenter();
  const measurementStartInteractor = new MeasurementStartInteractor(
    userRepository,
    measurementRepository,
    isoWeekRepository,
    replyPresenter,
  );

  describe('#handle', () => {
    describe('when valid', () => {
      describe('when user exists', () => {
        it('sends a start message successfully', () => {
          const userId = 'IM1234';
          const userName = 'izuku.midoriya';
          const user = new User(userId, userName);
          const isoWeek = new IsoWeek(1, 2020, 10);
          const measurement = new Measurement(
            1,
            userId,
            isoWeek.getIsoWeekId().toNumber(),
            new Date(),
            new Date(),
          );

          jest.spyOn(UserRepository.prototype, 'findByUserId').mockReturnValue(user);
          jest.spyOn(IsoWeekRepository.prototype, 'find').mockReturnValue(isoWeek);
          jest.spyOn(MeasurementRepository.prototype, 'last').mockReturnValue(measurement);

          const result = measurementStartInteractor.handle(userId, userName);
          expect(result.indexOf(`${userName} さんの実装開始時間を打刻しました！`) !== -1).toBe(
            true,
          );
        });
      });

      describe('when user use app for the first time', () => {
        it('sends a start message successfully', () => {
          const userId = 'IM1234';
          const userName = 'izuku.midoriya';
          const user = new User(userId, userName);
          const isoWeek = new IsoWeek(1, 2020, 10);
          const measurement = null;

          jest.spyOn(UserRepository.prototype, 'findByUserId').mockReturnValue(user);
          jest.spyOn(IsoWeekRepository.prototype, 'find').mockReturnValue(isoWeek);
          jest.spyOn(MeasurementRepository.prototype, 'last').mockReturnValue(measurement);

          const result = measurementStartInteractor.handle(userId, userName);
          expect(result.indexOf(`${userName} さんの実装開始時間を打刻しました！`) !== -1).toBe(
            true,
          );
        });
      });
    });

    describe('when invalid', () => {
      describe('when target user does not exist', () => {
        it('sends an error message', () => {
          jest.spyOn(UserRepository.prototype, 'findByUserId').mockReturnValue(null);

          const userId = 'IM1234';
          const userName = 'izuku.midoriya';
          const result = measurementStartInteractor.handle(userId, userName);
          expect(result.indexOf(`${userName} さんのユーザーデータは存在しません。`) !== -1).toBe(
            true,
          );
        });
      });

      describe('when user does not stop previous timer', () => {
        it('sends an error message', () => {
          const userId = 'IM1234';
          const userName = 'izuku.midoriya';
          const user = new User(userId, userName);
          const isoWeek = new IsoWeek(1, 2020, 10);
          const measurement = new Measurement(
            1,
            userId,
            isoWeek.getIsoWeekId().toNumber(),
            new Date(),
            void 0,
          );

          jest.spyOn(UserRepository.prototype, 'findByUserId').mockReturnValue(user);
          jest.spyOn(IsoWeekRepository.prototype, 'find').mockReturnValue(isoWeek);
          jest.spyOn(MeasurementRepository.prototype, 'last').mockReturnValue(measurement);

          const result = measurementStartInteractor.handle(userId, userName);
          expect(result.indexOf('前回の測定が続いたままになっています。') !== -1).toBe(true);
        });
      });
    });
  });
});
