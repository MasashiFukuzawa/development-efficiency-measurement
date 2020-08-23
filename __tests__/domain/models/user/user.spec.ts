import { User } from '../../../../src/domain/models/user/user';

describe('User', () => {
  describe('.validate', () => {
    describe('when valid', () => {
      it('returns null', () => {
        const id = 'IM1234';
        const name = 'izuku.midoriya';
        const result = User.validate(id, name);
        expect(result).toBe(null);
      });
    });

    describe('when invalid', () => {
      it('returns error message', () => {
        const id = null;
        const name = 'izuku.midoriya';
        const result = User.validate(id, name);
        expect(result).toBe('UserIdが存在しません');
      });

      it('returns error message', () => {
        const id = 'IM1234';
        const name = null;
        const result = User.validate(id, name);
        expect(result).toBe('UserNameが存在しません');
      });
    });
  });
});
