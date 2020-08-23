import { UserRepository } from '../../../src/infrastructure/users/user_repository';

describe('UserRepository', () => {
  SpreadsheetApp.openById = jest.fn(() => ({
    getSheetByName: jest.fn(() => ({
      getLastRow: jest.fn(() => 4),
      getLastColumn: jest.fn(() => 3),
      getRange: jest.fn(() => ({
        getValues: jest.fn(() => [
          ['IM1234', 'izuku.midoriya', new Date()],
          ['KB5678', 'katsuki.bakugo', new Date()],
          ['OU1234', 'ochako.uraraka', new Date()],
          ['ST5678', 'shoto.todoroki', new Date()],
        ]),
        setValues: jest.fn(),
      })),
    })),
  })) as any;

  PropertiesService.getScriptProperties = jest.fn(() => ({
    getProperty: jest.fn(() => 'SPREAD_SHEET_ID'),
  })) as any;

  const userRepository = new UserRepository();

  describe('#findByUserId', () => {
    describe('when valid', () => {
      it('returns a user resource', () => {
        const user = userRepository.findByUserId('IM1234');
        const userId = user.getId().toString();
        const userName = user.getName().toString();
        expect(userId).toBe('IM1234');
        expect(userName).toBe('izuku.midoriya');
      });
    });

    describe('when invalid', () => {
      it('returns null', () => {
        const user = userRepository.findByUserId('momo.yaoyorozu');
        expect(user).toBe(null);
      });
    });
  });

  describe('#create', () => {
    it('creates successfully', () => {
      const user = userRepository.create('MY1234', 'momo.yaoyorozu');
      const userId = user.getId().toString();
      const userName = user.getName().toString();
      expect(userId).toBe('MY1234');
      expect(userName).toBe('momo.yaoyorozu');
    });
  });
});
