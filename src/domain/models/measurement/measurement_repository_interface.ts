import { Measurement } from './measurement';

export interface MeasurementRepositoryInterface {
  last(userId: string): Measurement | null;
  stampStartAt(
    userId: string,
    theoreticalTimeId: number,
    description?: string,
  ): Measurement;
  stampStopAt(
    userId: string,
    theoreticalTimeId: number,
    lastMeasurement: Measurement,
  ): Measurement;
  getAll(): readonly Measurement[];
}
