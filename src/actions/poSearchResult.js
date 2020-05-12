/* @flow */
import axios from 'axios';
import type { Dispatch } from 'redux';
import * as actionTypes from './actiontype';
import { poSearchResultTestData, poEmptySearchResultTestData } from './mock/PoSearchData';
import { appConfig, apiURL } from '../../appConfig';

export const Loadspinner = (spinnervalue: boolean) => ({
  type: actionTypes.LOADING,
  payload: spinnervalue
});

export const POSearchResults = (poCategory: string, responseData: Object, inputText: string) => ({
  type: actionTypes.PO_SEARCH_RESULT_SUCCESS,
  payload: {
    data: responseData,
    inputValue: inputText,
    searchedPoCategory: poCategory !== 'ALL' ? poCategory : ''
  }
});

export const PoSearchFailure = (error: string) => ({
  type: actionTypes.PO_SEARCH_FAILURE,
  payload: error
});

export const fetchPOSearchResults = (poCategory: string, inputText: string, PONumber: string) => {
  let PoSearchData = null;

  if (PONumber === 'PO Number' && inputText) {
    PoSearchData = {
      poCategory,
      poNumber: parseInt(inputText, 10),
      maxRecordCount: appConfig.SearchThresholdLimit

    };
  } else if (inputText === '') {
    PoSearchData = {
      poCategory,
      maxRecordCount: appConfig.SearchThresholdLimit

    };
  } else {
    PoSearchData = {
      poCategory,
      vendorName: inputText,
      maxRecordCount: appConfig.SearchThresholdLimit

    };
  }
  return (dispatch: Dispatch) => {
    if (appConfig.APIMock) {
      // Mock PO Search data
      if (inputText === 'xyz') {
        // Empty Mock PO Search Data
        dispatch(POSearchResults(poCategory, poEmptySearchResultTestData, inputText));
      } else {
        // Mock PO Search Data
        dispatch(POSearchResults(poCategory, poSearchResultTestData, inputText));
      }
    } else {
      // API PO Search Data
      axios.post(apiURL.poSearchAPI, PoSearchData)
        .then((response) => {
          dispatch(POSearchResults(poCategory, response.data, inputText));
        })
        .catch((error) => {
          dispatch(PoSearchFailure(error));
        });
    }
  };
};

export const PoSearchDataInit = (
  poCategory: string,
  inputText: string,
  PONumber: string
) => (dispatch: Dispatch) => {
  dispatch(fetchPOSearchResults(poCategory, inputText, PONumber));
};
