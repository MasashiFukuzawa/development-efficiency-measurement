import { StandardValue } from './standard_value';

export interface StandardValueRepositoryInterface {
  create(standardValue: StandardValue): StandardValue;
}
