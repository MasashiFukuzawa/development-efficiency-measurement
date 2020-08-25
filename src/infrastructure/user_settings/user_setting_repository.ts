import { UserSettingRepositoryInterface } from '../../domain/models/user_setting/user_setting_repository_interface';
import { UserSetting } from '../../domain/models/user_setting/user_setting';
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

export class UserSettingRepository implements UserSettingRepositoryInterface {
  private readonly sheet: Sheet;
  private readonly lastRow: number;
  private readonly lastCol: number;
  private readonly fullData: readonly UserSetting[];
  constructor() {
    this.sheet = this.getSheet();
    this.lastRow = this.getLastRow();
    this.lastCol = this.getLastColumn();
    this.fullData = this.getAll();
  }

  findByUserId(userId: string): UserSetting | null {
    const user = this.fullData.filter((e) => {
      return e.getUserId().toString() === userId;
    })[0];
    return !!user ? user : null;
  }

  create(userId: string, googleCalendarId: string): UserSetting {
    const userSetting = new UserSetting(userId, googleCalendarId);
    this.sheet
      .getRange(this.lastRow + 1, 1, 1, this.lastCol)
      .setValues([
        [
          userId,
          googleCalendarId,
          userSetting.getWorkStartHour().toNumber(),
          userSetting.getWorkStartMinute().toNumber(),
          userSetting.getWorkEndHour().toNumber(),
          userSetting.getWorkEndMinute().toNumber(),
          userSetting.getNotificationStatus().toString(),
          userSetting.getUpdatedAt(),
        ],
      ]);
    return userSetting;
  }

  getAll(): readonly UserSetting[] {
    if (this.fullData) return this.fullData;
    const rawData = this.sheet
      .getRange(2, 1, this.lastRow - 1, this.lastCol)
      .getValues();
    const fullData = rawData.filter((e) => !!e[0]);
    return this.map(fullData);
  }

  private getSheet(): Sheet {
    if (this.sheet) return this.sheet;

    const spreadsheetId = PropertiesService.getScriptProperties().getProperty(
      'SPREAD_SHEET_ID',
    );

    if (!spreadsheetId) throw new Error('SPREAD_SHEET_ID is not found.');
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

    if (!spreadsheet) throw new Error('Target spreadsheet is not found.');
    const sheet = spreadsheet.getSheetByName('user_settings');

    if (!sheet) throw new Error('Target table is not found.');
    return sheet;
  }

  private getLastRow(): number {
    if (this.lastRow) return this.lastRow;
    return this.sheet.getLastRow();
  }

  private getLastColumn(): number {
    if (this.lastCol) return this.lastCol;
    return this.sheet.getLastColumn();
  }

  private map(fullData: any[][]): readonly UserSetting[] {
    return fullData.map((e) => {
      return new UserSetting(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]);
    });
  }
}
