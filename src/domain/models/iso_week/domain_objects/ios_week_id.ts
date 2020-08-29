export class IsoWeekId {
  isoWeekId: number;
  constructor(id: number) {
    if (!id) throw new Error('IsoWeekIdが存在しません');
    if (isNaN(id)) {
      throw new Error('IsoWeekIdはnumber型でなければなりません');
    }
    this.isoWeekId = id;
  }

  toNumber(): number {
    return this.isoWeekId;
  }
}
