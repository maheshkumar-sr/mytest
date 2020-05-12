/* @flow */
import * as actionTypes from '../actions/actiontype';

const initialState = {
  poSearchResult: [],
  searchedValue: '',
  error: '',
  spinner: false,
  searchedPoCategory: ''
};

const PoSearchResultReducer = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case actionTypes.PO_SEARCH_RESULT_SUCCESS:
      return {
        ...state,
        poSearchResult: action.payload.data.data.searchResult,
        searchedValue: action.payload.inputValue,
        searchedPoCategory: action.payload.searchedPoCategory,
        spinner: false
      };
    case actionTypes.PO_SEARCH_FAILURE:
      return {
        ...state,
        error: action.payload,
        spinner: false
      };

    case actionTypes.LOADING:
      return {
        ...state,
        spinner: action.payload
      };
    default:
      return state;
  }
};

export default PoSearchResultReducer;
