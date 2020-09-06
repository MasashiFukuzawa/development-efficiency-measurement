import { Migration } from '../spreadsheet/migration';

function createTablesInSpreadsheet(): void {
  const migration = new Migration();
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  const targetTableNames = migration.tableNames.filter((e) => {
    return spreadsheet.getSheetByName(e);
  });

  targetTableNames.forEach((e, i) => {
    const sheet = spreadsheet.insertSheet(e, i);
    const columns = migration.tableList[e];
    sheet.getRange(1, 1, 1, columns.length).setValues([columns]);
  });
}
