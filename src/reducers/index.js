/* @flow */
import { combineReducers } from 'redux';
import poCategoryListReducer from './poCategory';
import headerData from './header';
import PoSearchResultReducer from './poSearchResult';

export default combineReducers({
  poCategoryList: poCategoryListReducer,
  PoSearchResult: PoSearchResultReducer,
  header: headerData
});
