import poSearchResult, { initialState } from '../poSearchResult';
import {
  PO_SEARCH_RESULT_SUCCESS,
  PO_SEARCH_FAILURE,
  LOADING
} from '../../actions/actiontype';

describe('Header Reducer', () => {
  test('reducerHeader initialState', () => {
    expect(poSearchResult(undefined, {})).toEqual({
      ...initialState,
      error: '',
      poSearchResult: [],
      searchedPoCategory: '',
      searchedValue: '',
      spinner: false
    });
  });

  test('reducerHeader LOADING', () => {
    expect(
      poSearchResult(undefined, {
        type: LOADING
      })
    ).toEqual({
      ...initialState,
      error: '',
      searchedPoCategory: '',
      poSearchResult: [],
      searchedValue: '',
      spinner: undefined
    });
  });
  test('reducerHeader PO_SEARCH_FAILURE', () => {
    expect(
      poSearchResult(undefined, {
        type: PO_SEARCH_FAILURE
      })
    ).toEqual({
      error: undefined,
      poSearchResult: [],
      searchedPoCategory: '',
      searchedValue: '',
      spinner: false
    });
  });
});
