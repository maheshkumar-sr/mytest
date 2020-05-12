/* @flow */
import * as actionTypes from '../actions/actiontype';

export default (state: Object = [], action: Object) => {
  switch (action.type) {
    case actionTypes.FETCH_PO_CATEGORY:
      return action.payload;

    default:
      return state;
  }
};
