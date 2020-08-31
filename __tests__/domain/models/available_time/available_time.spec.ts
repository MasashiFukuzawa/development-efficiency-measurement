import { AvailableTime } from '../../../../src/domain/models/available_time/available_time';

describe('AvailableTime', () => {
  describe('#isTargetWeek', () => {
    const availableTime = new AvailableTime('xxx', 35, 1000000);

    it('returns true', () => {
      const result = availableTime.isTargetWeek(35);
      expect(result).toBe(true);
    });

    it('returns false', () => {
      const result = availableTime.isTargetWeek(36);
      expect(result).toBe(false);
    });
  });

  describe('#isAssociatedWithUser', () => {
    const availableTime = new AvailableTime('xxx', 35, 1000000);

    it('returns true', () => {
      const result = availableTime.isAssociatedWithUser(['xxx', 'yyy', 'zzz']);
      expect(result).toBe(true);
    });

    it('returns false', () => {
      const result = availableTime.isAssociatedWithUser(['aaa', 'bbb', 'ccc']);
      expect(result).toBe(false);
    });
  });

  describe('#isTargetUser', () => {
    const availableTime = new AvailableTime('xxx', 35, 1000000);

    it('returns true', () => {
      const result = availableTime.isTargetUser('xxx');
      expect(result).toBe(true);
    });

    it('returns false', () => {
      const result = availableTime.isTargetUser('aaa');
      expect(result).toBe(false);
    });
  });

  describe('.convertMilliSecToHour', () => {
    it('returns hour', () => {
      const result = AvailableTime.convertMilliSecToHour(10800000);
      expect(result).toBe(3);
    });
  });

  describe('.calculateAvailableTime', () => {
    const workStartHour = 10;
    const workStartMinute = 0;
    const workEndHour = 19;
    const workEndMinute = 0;

    describe('when normal', () => {
      it('calculates available time by ms', () => {
        const weeklyEvents = [
          {
            title: 'meeting',
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 18, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 19, 0, 0, 0),
          },
          {
            title: 'meeting',
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 11, 30, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 12, 30, 0, 0),
          },
          {
            title: 'meeting',
            willAttend: false,
            eventStartAt: new Date(2020, 8, 25, 15, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 16, 0, 0, 0),
          },
        ];

        const availableWorkHours = AvailableTime.WORK_HOURS_PER_WEEK;
        const maxTime = (availableWorkHours + 1) * 60 * 60 * 1000;

        const result = AvailableTime.calculateAvailableTime(
          weeklyEvents,
          workStartHour,
          workStartMinute,
          workEndHour,
          workEndMinute,
          availableWorkHours,
        );
        expect(result).toBe(maxTime - 2 * 60 * 60 * 1000);
      });
    });

    describe('when exists break time', () => {
      it('calculates available time by ms', () => {
        const weeklyEvents = [
          {
            title: 'meeting',
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 18, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 19, 0, 0, 0),
          },
          {
            title: 'meeting',
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 11, 30, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 12, 30, 0, 0),
          },
          {
            title: 'break',
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 13, 30, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 14, 30, 0, 0),
          },
          {
            title: 'meeting',
            willAttend: false,
            eventStartAt: new Date(2020, 8, 25, 15, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 16, 0, 0, 0),
          },
        ];

        const availableWorkHours = AvailableTime.WORK_HOURS_PER_WEEK;
        const maxTime = (availableWorkHours + 1) * 60 * 60 * 1000;

        const result = AvailableTime.calculateAvailableTime(
          weeklyEvents,
          workStartHour,
          workStartMinute,
          workEndHour,
          workEndMinute,
          availableWorkHours,
        );
        expect(result).toBe(maxTime - 2 * 60 * 60 * 1000);
      });
    });

    describe('when exists time overlapping', () => {
      it('calculates available time by ms', () => {
        const weeklyEvents = [
          {
            title: 'meeting',
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 18, 30, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 19, 0, 0, 0),
          },
          {
            title: 'meeting',
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 18, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 19, 0, 0, 0),
          },
          {
            title: 'meeting',
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 11, 30, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 12, 30, 0, 0),
          },
          {
            title: 'meeting',
            willAttend: false,
            eventStartAt: new Date(2020, 8, 25, 15, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 16, 0, 0, 0),
          },
        ];

        const availableWorkHours = AvailableTime.WORK_HOURS_PER_WEEK;
        const maxTime = (availableWorkHours + 1) * 60 * 60 * 1000;

        const result = AvailableTime.calculateAvailableTime(
          weeklyEvents,
          workStartHour,
          workStartMinute,
          workEndHour,
          workEndMinute,
          availableWorkHours,
        );
        expect(result).toBe(maxTime - 2 * 60 * 60 * 1000);
      });
    });

    describe('when exists overtime', () => {
      it('calculates available time by ms', () => {
        const weeklyEvents = [
          {
            title: 'meeting',
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 18, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 19, 0, 0, 0),
          },
          {
            title: 'meeting',
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 11, 30, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 12, 30, 0, 0),
          },
          {
            title: 'meeting',
            willAttend: false,
            eventStartAt: new Date(2020, 8, 25, 15, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 16, 0, 0, 0),
          },
          {
            title: 'meeting',
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 18, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 21, 0, 0, 0),
          },
        ];

        const availableWorkHours = AvailableTime.WORK_HOURS_PER_WEEK;
        const maxTime = (availableWorkHours + 1) * 60 * 60 * 1000;

        const result = AvailableTime.calculateAvailableTime(
          weeklyEvents,
          workStartHour,
          workStartMinute,
          workEndHour,
          workEndMinute,
          availableWorkHours,
        );
        expect(result).toBe(maxTime - 2 * 60 * 60 * 1000);
      });
    });

    describe('when exists event before work starts', () => {
      it('calculates available time by ms', () => {
        const weeklyEvents = [
          {
            title: 'meeting',
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 18, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 19, 0, 0, 0),
          },
          {
            title: 'meeting',
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 11, 30, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 12, 30, 0, 0),
          },
          {
            title: 'meeting',
            willAttend: false,
            eventStartAt: new Date(2020, 8, 25, 15, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 16, 0, 0, 0),
          },
          {
            title: 'meeting',
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 8, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 10, 0, 0, 0),
          },
        ];

        const availableWorkHours = AvailableTime.WORK_HOURS_PER_WEEK;
        const maxTime = (availableWorkHours + 1) * 60 * 60 * 1000;

        const result = AvailableTime.calculateAvailableTime(
          weeklyEvents,
          workStartHour,
          workStartMinute,
          workEndHour,
          workEndMinute,
          availableWorkHours,
        );
        expect(result).toBe(maxTime - 2 * 60 * 60 * 1000);
      });
    });

    describe("when notify today's available time", () => {
      it('calculates available time by ms', () => {
        const weeklyEvents = [
          {
            title: 'meeting',
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 18, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 19, 0, 0, 0),
          },
          {
            title: 'meeting',
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 11, 30, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 12, 30, 0, 0),
          },
          {
            title: 'meeting',
            willAttend: false,
            eventStartAt: new Date(2020, 8, 25, 15, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 16, 0, 0, 0),
          },
          {
            title: 'meeting',
            willAttend: true,
            eventStartAt: new Date(2020, 8, 25, 8, 0, 0, 0),
            eventEndAt: new Date(2020, 8, 25, 10, 0, 0, 0),
          },
        ];

        const availableWorkHours = AvailableTime.WORK_HOURS_PER_DAY;
        const maxTime = (availableWorkHours + 1) * 60 * 60 * 1000;

        const result = AvailableTime.calculateAvailableTime(
          weeklyEvents,
          workStartHour,
          workStartMinute,
          workEndHour,
          workEndMinute,
          availableWorkHours,
        );
        expect(result).toBe(maxTime - 2 * 60 * 60 * 1000);
      });
    });
  });
});
