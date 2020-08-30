import { StandardValue } from './standard_value';

export interface StandardValueRepositoryInterface {
  getAll(): readonly StandardValue[];
  map(data: any[][]): readonly StandardValue[];
  create(standardValue: StandardValue): StandardValue;
}
