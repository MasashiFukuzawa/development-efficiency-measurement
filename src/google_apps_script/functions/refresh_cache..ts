import { GoogleAppsScriptConstants } from '../../constants';

function refreshCache(): void {
  const keys = [
    // secrets
    'cli_token',
    'slack_token',
    'slack_webhook_url',
    'spreadsheet_id',
    // database
    'data:users',
    'data:user_settings',
    'data:iso_weeks',
    'data:measurements',
    // for help command
    'spreadsheet_url',
    'sheet_id:measurements',
    'sheet_id:user_settings',
  ];
  const cache = CacheService.getScriptCache();
  cache?.removeAll(keys);

  // secrets
  const cliToken = PropertiesService.getScriptProperties().getProperty('CLI_VERIFICATION_TOKEN');
  if (!cliToken) throw new Error('CLI_VERIFICATION_TOKEN is not found.');

  const slackToken = PropertiesService.getScriptProperties().getProperty(
    'SLACK_VERIFICATION_TOKEN',
  );
  if (!slackToken) throw new Error('SLACK_VERIFICATION_TOKEN is not found.');

  const slackWebhookUrl = PropertiesService.getScriptProperties().getProperty('SLACK_WEBHOOK_URL');
  if (!slackWebhookUrl) throw new Error('SLACK_WEBHOOK_URL is not found.');

  const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREAD_SHEET_ID');
  if (!spreadsheetId) throw new Error('SPREAD_SHEET_ID is not found.');

  // database
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  const usersSheet = spreadsheet.getSheetByName('users');
  if (!usersSheet) throw new Error('users table is not found.');
  const usersSheetRawData = usersSheet
    .getRange(2, 1, usersSheet.getLastRow() - 1, usersSheet.getLastColumn())
    .getValues();
  const usersSheetData = usersSheetRawData.filter((e) => !!e[0]);

  const userSettingsSheet = spreadsheet.getSheetByName('user_settings');
  if (!userSettingsSheet) throw new Error('user_settings table is not found.');
  const userSettingsSheetRawData = userSettingsSheet
    .getRange(2, 1, userSettingsSheet.getLastRow() - 1, userSettingsSheet.getLastColumn())
    .getValues();
  const userSettingsSheetData = userSettingsSheetRawData.filter((e) => !!e[0]);

  const isoWeeksSheet = spreadsheet.getSheetByName('iso_weeks');
  if (!isoWeeksSheet) throw new Error('iso_weeks table is not found.');
  const isoWeeksSheetRawData = isoWeeksSheet
    .getRange(2, 1, isoWeeksSheet.getLastRow() - 1, isoWeeksSheet.getLastColumn())
    .getValues();
  const isoWeeksSheetData = isoWeeksSheetRawData.filter((e) => !!e[0]);

  const measurementsSheet = spreadsheet.getSheetByName('measurements');
  if (!measurementsSheet) throw new Error('measurements table is not found.');
  const measurementsSheetRawData = measurementsSheet
    .getRange(2, 1, measurementsSheet.getLastRow() - 1, measurementsSheet.getLastColumn())
    .getValues();
  const measurementsSheetData = measurementsSheetRawData.filter((e) => !!e[0]);

  // for help command
  const spreadsheetUrl = spreadsheet.getUrl();
  const measurementsSheetId = measurementsSheet.getSheetId();
  const userSettingsSheetId = userSettingsSheet.getSheetId();

  // cue
  const max = GoogleAppsScriptConstants.MAX_CACHE_EXPIRATION_IN_SECONDS;
  cache?.put('cli_token', cliToken, max);
  cache?.put('slack_token', slackToken, max);
  cache?.put('slack_webhook_url', slackWebhookUrl, max);
  cache?.put('spreadsheet_id', spreadsheetId, max);
  cache?.put('data:users', JSON.stringify(usersSheetData), max);
  cache?.put('data:user_settings', JSON.stringify(userSettingsSheetData), max);
  cache?.put('data:iso_weeks', JSON.stringify(isoWeeksSheetData), max);
  cache?.put('data:measurements', JSON.stringify(measurementsSheetData), max);
  cache?.put('spreadsheet_url', spreadsheetUrl, max);
  cache?.put('sheet_id:measurements', measurementsSheetId.toString(), max);
  cache?.put('sheet_id:user_settings', userSettingsSheetId.toString(), max);

  console.log('cache refreshed!');
}
