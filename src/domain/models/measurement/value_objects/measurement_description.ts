export class MeasurementDescription {
  description?: string;
  constructor(description?: string) {
    if (!this.isUndefined(description) && typeof description !== 'string') {
      throw new Error('MeasurementDescriptionはstring型でなければなりません');
    }
    if (!this.isUndefined(description)) this.description = description;
  }

  toString(): string | undefined {
    return this.description;
  }

  isUndefined(description?: string): boolean {
    return typeof description === 'undefined';
  }
}
