export class MeasurementDescription {
  description?: string;
  constructor(description?: string) {
    const isUndefined = typeof description === 'undefined';
    if (!isUndefined && typeof description !== 'string') {
      throw new Error('MeasurementDescriptionはstring型でなければなりません');
    }
    if (!isUndefined) this.description = description;
  }

  toString(): string | undefined {
    return this.description;
  }
}
