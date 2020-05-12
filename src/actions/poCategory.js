/* @flow */
// import axios from 'axios';
import type { Dispatch } from 'redux';
import * as actionTypes from './actiontype';
import { categoryResponse } from '../utils/category';

export const fetchPOCategory = () => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.FETCH_PO_CATEGORY,
    payload: categoryResponse.data
  });
};

export default fetchPOCategory;
