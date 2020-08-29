export class TheoreticalTimeId {
  theoreticalTimeId: number;
  constructor(theoreticalTimeId: number) {
    if (theoreticalTimeId === null) {
      throw new Error('TheoreticalTimeIdが存在しません');
    }
    if (isNaN(theoreticalTimeId)) {
      throw new Error('TheoreticalTimeIdはnumber型でなければなりません');
    }
    this.theoreticalTimeId = theoreticalTimeId;
  }

  toNumber(): number {
    return this.theoreticalTimeId;
  }
}
