import { Measurement } from '../../../src/domain/models/measurement/measurement';
import { MeasurementRepository } from '../../../src/infrastructure/measurements/measurement_repository';

describe('MeasurementRepository', () => {
  SpreadsheetApp.openById = jest.fn(() => ({
    getSheetByName: jest.fn(() => ({
      getLastRow: jest.fn(() => 6),
      getLastColumn: jest.fn(() => 5),
      getRange: jest.fn(() => ({
        getValues: jest.fn(() => [
          [
            1,
            'IM1234',
            new Date(2020, 1, 1, 10, 0, 0, 0),
            new Date(2020, 1, 1, 11, 0, 0, 0),
            void 0,
          ],
          [
            2,
            'KB5678',
            new Date(2020, 2, 1, 10, 0, 0, 0),
            new Date(2020, 2, 1, 11, 0, 0, 0),
            void 0,
          ],
          [
            3,
            'IM1234',
            new Date(2020, 3, 1, 10, 0, 0, 0),
            new Date(2020, 3, 1, 11, 0, 0, 0),
            void 0,
          ],
          [
            4,
            'ST5678',
            new Date(2020, 4, 1, 10, 0, 0, 0),
            new Date(2020, 4, 1, 11, 0, 0, 0),
            void 0,
          ],
          [
            5,
            'IM1234',
            new Date(2020, 5, 1, 10, 0, 0, 0),
            new Date(2020, 5, 1, 11, 0, 0, 0),
            void 0,
          ],
        ]),
        setValues: jest.fn(),
      })),
    })),
  })) as any;

  PropertiesService.getScriptProperties = jest.fn(() => ({
    getProperty: jest.fn(() => 'SPREAD_SHEET_ID'),
  })) as any;

  const measurementRepository = new MeasurementRepository();

  describe('#last', () => {
    describe('when data exist', () => {
      it('returns a measurement resource', () => {
        const lastMeasurement = measurementRepository.last('IM1234');
        const id = lastMeasurement.getMeasurementId().toNumber();
        const userId = lastMeasurement.getUserId().toString();
        const startAt = lastMeasurement.getMeasurementStartAt().toDate();
        const stopAt = lastMeasurement.getMeasurementStopAt().toDate();
        const description = lastMeasurement.getDescription();
        expect(id).toBe(5);
        expect(userId).toBe('IM1234');
        expect(startAt).toStrictEqual(new Date(2020, 5, 1, 10, 0, 0, 0));
        expect(stopAt).toStrictEqual(new Date(2020, 5, 1, 11, 0, 0, 0));
        expect(typeof description).toBe('undefined');
      });
    });

    describe('when data do not exist', () => {
      it('returns null', () => {
        const measurement = measurementRepository.last('MY1234');
        expect(measurement).toBe(null);
      });
    });
  });

  describe('#stampStartAt', () => {
    it('returns measurement resource', () => {
      jest.spyOn(global, 'Date').mockImplementation();

      const measurement = measurementRepository.stampStartAt('IM1234');
      const id = measurement.getMeasurementId().toNumber();
      const userId = measurement.getUserId().toString();
      const startAt = measurement.getMeasurementStartAt().toDate();
      const stopAt = measurement.getMeasurementStopAt()?.toDate();
      const description = measurement.getDescription()?.toString();
      expect(id).toBe(6);
      expect(userId).toBe('IM1234');
      expect(startAt).toStrictEqual(new Date());
      expect(typeof stopAt).toBe('undefined');
      expect(typeof description).toBe('undefined');
    });
  });

  describe('#stampStopAt', () => {
    it('returns measurement resource', () => {
      const lastMeasurement = new Measurement(
        5,
        'IM1234',
        new Date(2020, 5, 1, 10, 0, 0, 0),
        new Date(2020, 5, 1, 11, 0, 0, 0),
        void 0,
      );
      const measurement = measurementRepository.stampStopAt(
        'IM1234',
        lastMeasurement,
      );
      const id = measurement.getMeasurementId().toNumber();
      const userId = measurement.getUserId().toString();
      const startAt = measurement.getMeasurementStartAt().toDate();
      const stopAt = measurement.getMeasurementStopAt().toDate();
      const description = measurement.getDescription()?.toString();
      expect(id).toBe(5);
      expect(userId).toBe('IM1234');
      expect(startAt).toStrictEqual(new Date(2020, 5, 1, 10, 0, 0, 0));
      expect(stopAt).toStrictEqual(new Date(2020, 5, 1, 11, 0, 0, 0));
      expect(typeof description).toBe('undefined');
    });
  });
});
