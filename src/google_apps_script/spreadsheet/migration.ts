export class Migration {
  readonly tableNames: string[];
  readonly tableList: { [key: string]: string[] };
  constructor() {
    this.tableNames = [
      'users',
      'user_settings',
      'iso_weeks',
      'theoretical_times',
      'measurements',
      'summary_reports',
      'standard_values',
    ];
    this.tableList = {
      users: ['user_id', 'user_name', 'registered_at'],
      user_settings: [
        'user_id',
        'google_calendar_id',
        'work_start_hour',
        'work_start_minute',
        'work_end_hour',
        'work_end_minute',
        'notification_status',
        'updated_at',
      ],
      iso_weeks: ['id', 'year', 'iso_week'],
      theoretical_times: ['user_id', 'ios_week_id', 'theoretical_implement_time'],
      measurements: ['id', 'user_id', 'iso_week_id', 'start_at', 'stop_at'],
      summary_reports: [
        'id',
        'user_id',
        'ios_week_id',
        'total_implement_hour',
        'measurement_count',
        'average_implement_hour',
        'theoretical_available_hour',
        'available_rate',
        'kpi_value',
        'notified_at',
      ],
      standard_values: [
        'ios_week_id',
        'total_implement_hour',
        'measurement_count',
        'average_implement_hour',
        'theoretical_available_hour',
        'available_rate',
        'kpi_value',
      ],
    };
  }
}
