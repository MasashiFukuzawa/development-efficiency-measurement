import { Measurement } from './measurement';

export interface MeasurementRepositoryInterface {
  getAll(): readonly Measurement[];
  map(data: any[][]): readonly Measurement[];
  last(userId: string, isoWeekId: number): Measurement | null;
  stampStartAt(userId: string, isoWeekId: number): Measurement;
  stampStopAt(lastMeasurement: Measurement): Measurement;
}
