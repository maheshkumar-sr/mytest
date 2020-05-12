import poCategory, { initialState } from '../poCategory';
import {
  FETCH_PO_CATEGORY,
} from '../../actions/actiontype';

describe('Header Reducer', () => {
  test('reducerHeader initialState', () => {
    expect(poCategory(undefined, {})).toEqual([]);
  });

  test('reducerHeader OPEN_HAMBURGER', () => {
    expect(poCategory(undefined, {
      type: FETCH_PO_CATEGORY,
    })).toEqual(undefined);
  });
});
