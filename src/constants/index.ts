export class GlobalConstants {
  static readonly EMAIL_REGEXP = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  static readonly GITHUB_ISSUE_URL =
    'https://github.com/MasashiFukuzawa/development-efficiency-measurement/issues';
  static readonly GITHUB_README_URL =
    'https://github.com/MasashiFukuzawa/development-efficiency-measurement#optional-cli-setting';
}

export class GoogleAppsScriptConstants {
  static readonly MAX_CACHE_EXPIRATION_IN_SECONDS = 21600;
}
