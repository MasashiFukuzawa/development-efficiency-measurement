import { Measurement } from './measurement';

export interface MeasurementRepositoryInterface {
  last(userId: string): Measurement | null;
  stampStartAt(userId: string, description?: string): Measurement;
}
