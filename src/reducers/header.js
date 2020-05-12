/* @flow */
import {
  OPEN_HAMBURGER,
  CLOSE_HAMBURGER,
  FETCH_MENU_LIST
} from '../actions/actiontype';

const initialState = {
  openHamburger: false,
  menuListOptions: []
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case OPEN_HAMBURGER:
      return { ...state, openHamburger: action.payload };

    case CLOSE_HAMBURGER:
      return { ...state, openHamburger: action.payload };

    case FETCH_MENU_LIST:
      return { ...state, menuListOptions: action.payload };

    default:
      return state;
  }
};
