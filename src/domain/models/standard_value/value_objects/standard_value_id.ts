export class StandardValueId {
  standardValueId: number;
  constructor(id: number) {
    if (!id) throw new Error('StandardValueIdが存在しません');
    if (isNaN(id)) {
      throw new Error('StandardValueIdはnumber型でなければなりません');
    }
    this.standardValueId = id;
  }

  toNumber(): number {
    return this.standardValueId;
  }
}
