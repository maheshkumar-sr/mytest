/* @flow */
import type { Dispatch } from 'redux';
import menuObject from '../utils/menuObject';
import * as actionTypes from './actiontype';

export const openHamburger = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.OPEN_HAMBURGER,
    payload: true
  });
};

export const closeHamburger = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.CLOSE_HAMBURGER,
    payload: false
  });
};


export const getMenuList = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.FETCH_MENU_LIST,
    payload: menuObject
  });
};
