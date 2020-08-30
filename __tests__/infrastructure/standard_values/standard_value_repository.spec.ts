import { StandardValue } from '../../../src/domain/models/standard_value/standard_value';
import { StandardValueRepository } from '../../../src/infrastructure/standard_values/standard_value_repository';

describe('StandardValueRepository', () => {
  SpreadsheetApp.openById = jest.fn(() => ({
    getSheetByName: jest.fn(() => ({
      getLastRow: jest.fn(() => 1),
      getLastColumn: jest.fn(() => 7),
      getRange: jest.fn(() => ({
        getValues: jest.fn(() => [[]]),
        setValues: jest.fn(),
      })),
    })),
  })) as any;

  PropertiesService.getScriptProperties = jest.fn(() => ({
    getProperty: jest.fn(() => 'SPREAD_SHEET_ID'),
  })) as any;

  const standardValueRepository = new StandardValueRepository();

  describe('#create', () => {
    it('returns a summaryReport resource', () => {
      const standardValue = new StandardValue(36, 10, 10, 1, 20, 0.5, 5);
      const createdStandardValue = standardValueRepository.create(
        standardValue,
      );
      expect(createdStandardValue).toStrictEqual(
        new StandardValue(36, 10, 10, 1, 20, 0.5, 5),
      );
    });
  });
});
