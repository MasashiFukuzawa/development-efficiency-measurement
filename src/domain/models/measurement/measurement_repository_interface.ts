import { Measurement } from './measurement';

export interface MeasurementRepositoryInterface {
  getAll(): readonly Measurement[];
  getRawData(): readonly any[][];
  map(data: any[][]): readonly Measurement[];
  putCache(
    id: number,
    userId: string,
    isoWeekId: number,
    startAt: Date,
    stopAt: Date | undefined,
  ): void;
  last(userId: string, isoWeekId: number): Measurement | null;
  stampStartAt(userId: string, isoWeekId: number): Measurement;
  stampStopAt(lastMeasurement: Measurement): Measurement;
}
