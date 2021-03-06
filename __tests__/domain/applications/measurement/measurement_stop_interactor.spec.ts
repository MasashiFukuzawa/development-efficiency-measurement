import { Measurement } from '../../../../src/domain/models/measurement/measurement';
import { UserRepository } from '../../../../src/infrastructure/users/user_repository';
import { MeasurementRepository } from '../../../../src/infrastructure/measurements/measurement_repository';
import { IsoWeekRepository } from '../../../../src/infrastructure/iso_weeks/iso_week_repository';
import { User } from '../../../../src/domain/models/user/user';
import { ReplyPresenter } from '../../../../src/app/presenters/reply/reply_presenter';
import { MeasurementStopInteractor } from '../../../../src/domain/applications/measurement/measurement_stop_interactor';
import { IsoWeek } from '../../../../src/domain/models/iso_week/iso_week';

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

  CacheService.getScriptCache = jest.fn(() => ({
    get: jest.fn(() => null),
    put: jest.fn(),
  })) as any;

  Moment.moment = jest.fn(() => ({
    get: jest.fn(() => 2020),
    isoWeek: jest.fn(() => 35),
  }));

  const userRepository = new UserRepository();
  const measurementRepository = new MeasurementRepository();
  const isoWeekRepository = new IsoWeekRepository();
  const replyPresenter = new ReplyPresenter();
  const measurementStopInteractor = new MeasurementStopInteractor(
    userRepository,
    measurementRepository,
    isoWeekRepository,
    replyPresenter,
  );

  describe('#handle', () => {
    describe('when valid', () => {
      describe('when user exists', () => {
        it('sends a stop message successfully', () => {
          const userId = 'IM1234';
          const userName = 'izuku.midoriya';
          const user = new User(userId, userName);
          const isoWeek = new IsoWeek(1, 2020, 10);
          const measurement = new Measurement(1, userId, 1, new Date(), void 0);

          jest.spyOn(UserRepository.prototype, 'findByUserId').mockReturnValue(user);
          jest.spyOn(IsoWeekRepository.prototype, 'find').mockReturnValue(isoWeek);
          jest.spyOn(MeasurementRepository.prototype, 'last').mockReturnValue(measurement);
          jest.spyOn(MeasurementRepository.prototype, 'getRawData').mockReturnValue([
            [1, 'IM1234', 6, new Date(2020, 1, 1, 10, 0, 0, 0), new Date(2020, 1, 1, 11, 0, 0, 0)],
            [2, 'KB5678', 7, new Date(2020, 2, 1, 10, 0, 0, 0), new Date(2020, 2, 1, 11, 0, 0, 0)],
            [3, 'IM1234', 8, new Date(2020, 3, 1, 10, 0, 0, 0), new Date(2020, 3, 1, 11, 0, 0, 0)],
            [4, 'ST5678', 9, new Date(2020, 4, 1, 10, 0, 0, 0), new Date(2020, 4, 1, 11, 0, 0, 0)],
            [5, 'IM1234', 10, new Date(2020, 5, 1, 10, 0, 0, 0), new Date(2020, 5, 1, 11, 0, 0, 0)],
          ]);
          jest.spyOn(Measurement.prototype, 'calculateImplementTime').mockReturnValue(1800000);

          const result = measurementStopInteractor.handle(userId, userName);
          expect(result.indexOf(`${userName} さんの実装終了時間を打刻しました`) !== -1).toBe(true);
        });
      });
    });

    describe('when invalid', () => {
      describe('when target user does not exist', () => {
        it('sends an error message', () => {
          jest.spyOn(UserRepository.prototype, 'findByUserId').mockReturnValue(null);

          const userId = 'IM1234';
          const userName = 'izuku.midoriya';
          const result = measurementStopInteractor.handle(userId, userName);
          expect(result.indexOf(`${userName} さんのユーザーデータは存在しません。`) !== -1).toBe(
            true,
          );
        });
      });

      describe('when user use app for the first time', () => {
        it('sends a message for beginners', () => {
          const userId = 'IM1234';
          const userName = 'izuku.midoriya';
          const user = new User(userId, userName);
          const isoWeek = new IsoWeek(1, 2020, 10);
          const measurement = null;

          jest.spyOn(UserRepository.prototype, 'findByUserId').mockReturnValue(user);
          jest.spyOn(IsoWeekRepository.prototype, 'find').mockReturnValue(isoWeek);
          jest.spyOn(MeasurementRepository.prototype, 'last').mockReturnValue(measurement);

          const result = measurementStopInteractor.handle(userId, userName);
          expect(result.indexOf(`${userName} さんはこれが初めての計測のようです。`) !== -1).toBe(
            true,
          );
        });
      });

      describe('when user already stopped previous timer', () => {
        it('sends an error message', () => {
          const userId = 'IM1234';
          const userName = 'izuku.midoriya';
          const user = new User(userId, userName);
          const isoWeek = new IsoWeek(1, 2020, 10);
          const measurement = new Measurement(1, userId, 1, new Date(), new Date());
          jest.spyOn(UserRepository.prototype, 'findByUserId').mockReturnValue(user);
          jest.spyOn(IsoWeekRepository.prototype, 'find').mockReturnValue(isoWeek);
          jest.spyOn(MeasurementRepository.prototype, 'last').mockReturnValue(measurement);

          const result = measurementStopInteractor.handle(userId, userName);
          expect(result.indexOf('現在計測中のデータが見つかりませんでした') !== -1).toBe(true);
        });
      });
    });
  });
});
