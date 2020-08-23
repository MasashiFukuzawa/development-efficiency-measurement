import { Measurement } from '../../../../src/domain/models/measurement/measurement';

describe('Measurement', () => {
  describe('.isConflicting', () => {
    describe('when valid', () => {
      it('returns false', () => {
        const lastMeasurement = new Measurement(
          1,
          'xxx',
          new Date(),
          new Date(),
        );
        const result = Measurement.isConflicting(lastMeasurement);
        expect(result).toBe(false);
      });

      it('returns false', () => {
        const lastMeasurement = null;
        const result = Measurement.isConflicting(lastMeasurement);
        expect(result).toBe(false);
      });
    });

    describe('when invalid', () => {
      it('returns true', () => {
        const lastMeasurement = new Measurement(1, 'xxx', new Date(), void 0);
        const result = Measurement.isConflicting(lastMeasurement);
        expect(result).toBe(true);
      });
    });
  });

  describe('.isAlreadyStarted', () => {
    describe('when measurement is already started', () => {
      it('returns true', () => {
        const lastMeasurement = new Measurement(1, 'xxx', new Date(), void 0);
        const result = Measurement.isAlreadyStarted(lastMeasurement);
        expect(result).toBe(true);
      });
    });

    describe('when invalid', () => {
      it('returns measurement is not started yet', () => {
        const lastMeasurement = new Measurement(
          1,
          'xxx',
          new Date(),
          new Date(),
        );
        const result = Measurement.isAlreadyStarted(lastMeasurement);
        expect(result).toBe(false);
      });
    });
  });
});
