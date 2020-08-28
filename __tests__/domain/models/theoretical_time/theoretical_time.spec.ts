import { TheoreticalTime } from '../../../../src/domain/models/theoretical_time/theoretical_time';

describe('TheoreticalTime', () => {
  describe('.calculateTheoreticalTime', () => {
    const workStartHour = 10;
    const workStartMinute = 0;
    const workEndHour = 19;
    const workEndMinute = 0;

    describe('when normal', () => {
      it('calculates theoretical time by ms', () => {
        const weeklyEvents = [
          {
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 18, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 19, 0, 0, 0),
          },
          {
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 11, 30, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 12, 30, 0, 0),
          },
          {
            willAttend: false,
            eventStartAt: new Date(2020, 8, 25, 15, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 16, 0, 0, 0),
          },
        ];

        const theoreticalWorkHours = TheoreticalTime.WORK_HOURS_PER_WEEK;
        const maxTime = theoreticalWorkHours * 60 * 60 * 1000;

        const result = TheoreticalTime.calculateTheoreticalTime(
          weeklyEvents,
          workStartHour,
          workStartMinute,
          workEndHour,
          workEndMinute,
          theoreticalWorkHours,
        );
        expect(result).toBe(maxTime - 2 * 60 * 60 * 1000);
      });
    });

    describe('when exists time overlapping', () => {
      it('calculates theoretical time by ms', () => {
        const weeklyEvents = [
          {
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 18, 30, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 19, 0, 0, 0),
          },
          {
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 18, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 19, 0, 0, 0),
          },
          {
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 11, 30, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 12, 30, 0, 0),
          },
          {
            willAttend: false,
            eventStartAt: new Date(2020, 8, 25, 15, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 16, 0, 0, 0),
          },
        ];

        const theoreticalWorkHours = TheoreticalTime.WORK_HOURS_PER_WEEK;
        const maxTime = theoreticalWorkHours * 60 * 60 * 1000;

        const result = TheoreticalTime.calculateTheoreticalTime(
          weeklyEvents,
          workStartHour,
          workStartMinute,
          workEndHour,
          workEndMinute,
          theoreticalWorkHours,
        );
        expect(result).toBe(maxTime - 2 * 60 * 60 * 1000);
      });
    });

    describe('when exists overtime', () => {
      it('calculates theoretical time by ms', () => {
        const weeklyEvents = [
          {
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 18, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 19, 0, 0, 0),
          },
          {
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 11, 30, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 12, 30, 0, 0),
          },
          {
            willAttend: false,
            eventStartAt: new Date(2020, 8, 25, 15, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 16, 0, 0, 0),
          },
          {
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 18, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 21, 0, 0, 0),
          },
        ];

        const theoreticalWorkHours = TheoreticalTime.WORK_HOURS_PER_WEEK;
        const maxTime = theoreticalWorkHours * 60 * 60 * 1000;

        const result = TheoreticalTime.calculateTheoreticalTime(
          weeklyEvents,
          workStartHour,
          workStartMinute,
          workEndHour,
          workEndMinute,
          theoreticalWorkHours,
        );
        expect(result).toBe(maxTime - 2 * 60 * 60 * 1000);
      });
    });

    describe('when exists event before work starts', () => {
      it('calculates theoretical time by ms', () => {
        const weeklyEvents = [
          {
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 18, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 19, 0, 0, 0),
          },
          {
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 11, 30, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 12, 30, 0, 0),
          },
          {
            willAttend: false,
            eventStartAt: new Date(2020, 8, 25, 15, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 16, 0, 0, 0),
          },
          {
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 8, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 10, 0, 0, 0),
          },
        ];

        const theoreticalWorkHours = TheoreticalTime.WORK_HOURS_PER_WEEK;
        const maxTime = theoreticalWorkHours * 60 * 60 * 1000;

        const result = TheoreticalTime.calculateTheoreticalTime(
          weeklyEvents,
          workStartHour,
          workStartMinute,
          workEndHour,
          workEndMinute,
          theoreticalWorkHours,
        );
        expect(result).toBe(maxTime - 2 * 60 * 60 * 1000);
      });
    });

    describe("when notify today's theoretical time", () => {
      it('calculates theoretical time by ms', () => {
        const weeklyEvents = [
          {
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 18, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 19, 0, 0, 0),
          },
          {
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 11, 30, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 12, 30, 0, 0),
          },
          {
            willAttend: false,
            eventStartAt: new Date(2020, 8, 25, 15, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 16, 0, 0, 0),
          },
          {
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 8, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 10, 0, 0, 0),
          },
        ];

        const theoreticalWorkHours = TheoreticalTime.WORK_HOURS_PER_DAY;
        const maxTime = theoreticalWorkHours * 60 * 60 * 1000;

        const result = TheoreticalTime.calculateTheoreticalTime(
          weeklyEvents,
          workStartHour,
          workStartMinute,
          workEndHour,
          workEndMinute,
          theoreticalWorkHours,
        );
        expect(result).toBe(maxTime - 2 * 60 * 60 * 1000);
      });
    });
  });
});
