export class MeasurementDescription {
  description: string | undefined;
  constructor(description: string | undefined) {
    if (description !== undefined && typeof description !== 'string') {
      throw new Error('MeasurementDescriptionはstring型でなければなりません');
    }
    this.description = description;
  }

  toString(): string | undefined {
    return this.description;
  }
}
