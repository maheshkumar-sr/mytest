import header, { initialState } from '../header';
import {
  OPEN_HAMBURGER,
  CLOSE_HAMBURGER,
  FETCH_MENU_LIST
} from '../../actions/actiontype';

describe('Header Reducer', () => {
  test('reducerHeader initialState', () => {
    expect(header(undefined, {})).toEqual({
      ...initialState,
      menuListOptions: [],
      openHamburger: false
    });
  });

  test('reducerHeader OPEN_HAMBURGER', () => {
    expect(
      header(undefined, {
        type: OPEN_HAMBURGER
      })
    ).toEqual({
      ...initialState,
      menuListOptions: [],
      openHamburger: undefined
    });
  });
  test('reducerHeader OPEN_HAMBURGER', () => {
    expect(
      header(undefined, {
        type: CLOSE_HAMBURGER
      })
    ).toEqual({
      ...initialState,
      menuListOptions: [],
      openHamburger: undefined
    });
  });
  test('reducerHeader OPEN_HAMBURGER', () => {
    expect(
      header(undefined, {
        type: FETCH_MENU_LIST
      })
    ).toEqual({
      menuListOptions: undefined,
      openHamburger: false
    });
  });
});
