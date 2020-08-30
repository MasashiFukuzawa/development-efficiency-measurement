import { Measurement } from '../../../../src/domain/models/measurement/measurement';

describe('Measurement', () => {
  describe('#isTargetWeek', () => {
    const measurement = new Measurement(1, 'xxx', 35, new Date(), new Date());

    it('returns true', () => {
      const result = measurement.isTargetWeek(35);
      expect(result).toBe(true);
    });

    it('returns false', () => {
      const result = measurement.isTargetWeek(36);
      expect(result).toBe(false);
    });
  });

  describe('#isAssociatedWithUser', () => {
    const measurement = new Measurement(1, 'xxx', 35, new Date(), new Date());

    it('returns true', () => {
      const result = measurement.isAssociatedWithUser(['xxx', 'yyy', 'zzz']);
      expect(result).toBe(true);
    });

    it('returns false', () => {
      const result = measurement.isAssociatedWithUser(['aaa', 'bbb', 'ccc']);
      expect(result).toBe(false);
    });
  });

  describe('#isTargetUser', () => {
    const measurement = new Measurement(1, 'xxx', 35, new Date(), new Date());

    it('returns true', () => {
      const result = measurement.isTargetUser('xxx');
      expect(result).toBe(true);
    });

    it('returns false', () => {
      const result = measurement.isTargetUser('aaa');
      expect(result).toBe(false);
    });
  });

  describe('.cutOffBeforeAndAfterWorkHour', () => {
    describe('when normal', () => {
      it('calculates available time by ms', () => {
        const measurements = [
          new Measurement(
            1,
            'xxx',
            35,
            new Date(2020, 8, 25, 18, 0, 0, 0),
            new Date(2020, 8, 25, 19, 0, 0, 0),
          ),
          new Measurement(
            2,
            'xxx',
            35,
            new Date(2020, 8, 25, 11, 30, 0, 0),
            new Date(2020, 8, 25, 12, 30, 0, 0),
          ),
          new Measurement(
            3,
            'xxx',
            35,
            new Date(2020, 8, 25, 15, 0, 0, 0),
            new Date(2020, 8, 25, 16, 0, 0, 0),
          ),
        ];

        const result = Measurement.cutOffBeforeAndAfterWorkHour(measurements);
        expect(result).toStrictEqual([
          {
            start: new Date(2020, 8, 25, 18, 0, 0, 0),
            stop: new Date(2020, 8, 25, 19, 0, 0, 0),
          },
          {
            start: new Date(2020, 8, 25, 11, 30, 0, 0),
            stop: new Date(2020, 8, 25, 12, 30, 0, 0),
          },
          {
            start: new Date(2020, 8, 25, 15, 0, 0, 0),
            stop: new Date(2020, 8, 25, 16, 0, 0, 0),
          },
        ]);
      });
    });

    describe('when exists overtime', () => {
      it('calculates available time by ms', () => {
        const measurements = [
          new Measurement(
            1,
            'xxx',
            35,
            new Date(2020, 8, 25, 18, 0, 0, 0),
            new Date(2020, 8, 25, 19, 0, 0, 0),
          ),
          new Measurement(
            2,
            'xxx',
            35,
            new Date(2020, 8, 25, 11, 30, 0, 0),
            new Date(2020, 8, 25, 12, 30, 0, 0),
          ),
          new Measurement(
            3,
            'xxx',
            35,
            new Date(2020, 8, 25, 15, 0, 0, 0),
            new Date(2020, 8, 25, 16, 0, 0, 0),
          ),
          new Measurement(
            4,
            'xxx',
            35,
            new Date(2020, 8, 25, 18, 0, 0, 0),
            new Date(2020, 8, 25, 21, 0, 0, 0),
          ),
        ];

        const result = Measurement.cutOffBeforeAndAfterWorkHour(measurements);
        expect(result).toStrictEqual([
          {
            start: new Date(2020, 8, 25, 18, 0, 0, 0),
            stop: new Date(2020, 8, 25, 19, 0, 0, 0),
          },
          {
            start: new Date(2020, 8, 25, 11, 30, 0, 0),
            stop: new Date(2020, 8, 25, 12, 30, 0, 0),
          },
          {
            start: new Date(2020, 8, 25, 15, 0, 0, 0),
            stop: new Date(2020, 8, 25, 16, 0, 0, 0),
          },
          {
            start: new Date(2020, 8, 25, 18, 0, 0, 0),
            stop: new Date(2020, 8, 25, 19, 0, 0, 0),
          },
        ]);
      });
    });

    describe('when exists event before work starts', () => {
      it('calculates available time by ms', () => {
        const measurements = [
          new Measurement(
            1,
            'xxx',
            35,
            new Date(2020, 8, 25, 18, 0, 0, 0),
            new Date(2020, 8, 25, 19, 0, 0, 0),
          ),
          new Measurement(
            2,
            'xxx',
            35,
            new Date(2020, 8, 25, 11, 30, 0, 0),
            new Date(2020, 8, 25, 12, 30, 0, 0),
          ),
          new Measurement(
            3,
            'xxx',
            35,
            new Date(2020, 8, 25, 15, 0, 0, 0),
            new Date(2020, 8, 25, 16, 0, 0, 0),
          ),
          new Measurement(
            4,
            'xxx',
            35,
            new Date(2020, 8, 25, 8, 0, 0, 0),
            new Date(2020, 8, 25, 10, 0, 0, 0),
          ),
        ];

        const result = Measurement.cutOffBeforeAndAfterWorkHour(measurements);
        expect(result).toStrictEqual([
          {
            start: new Date(2020, 8, 25, 18, 0, 0, 0),
            stop: new Date(2020, 8, 25, 19, 0, 0, 0),
          },
          {
            start: new Date(2020, 8, 25, 11, 30, 0, 0),
            stop: new Date(2020, 8, 25, 12, 30, 0, 0),
          },
          {
            start: new Date(2020, 8, 25, 15, 0, 0, 0),
            stop: new Date(2020, 8, 25, 16, 0, 0, 0),
          },
        ]);
      });
    });
  });

  describe('.isConflicting', () => {
    describe('when valid', () => {
      it('returns false', () => {
        const lastMeasurement = new Measurement(1, 'xxx', 10, new Date(), new Date());
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
        const lastMeasurement = new Measurement(1, 'xxx', 10, new Date(), void 0);
        const result = Measurement.isConflicting(lastMeasurement);
        expect(result).toBe(true);
      });
    });
  });

  describe('.isAlreadyStarted', () => {
    describe('when measurement is already started', () => {
      it('returns true', () => {
        const lastMeasurement = new Measurement(1, 'xxx', 10, new Date(), void 0);
        const result = Measurement.isAlreadyStarted(lastMeasurement);
        expect(result).toBe(true);
      });
    });

    describe('when invalid', () => {
      it('returns measurement is not started yet', () => {
        const lastMeasurement = new Measurement(1, 'xxx', 10, new Date(), new Date());
        const result = Measurement.isAlreadyStarted(lastMeasurement);
        expect(result).toBe(false);
      });
    });
  });
});
