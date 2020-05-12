/* @flow */
import { connect } from 'react-redux';
import type { Dispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPOCategory } from '../../actions/poCategory';
import { PoSearchDataInit, Loadspinner } from '../../actions/poSearchResult';
import POSearchPage from '../../components/Search';

interface State {
  poCategoryList: Object;
  PoSearchResult: Object;
}

export const mapStateToProps = (state: State) => ({
  poCategoryList: state.poCategoryList,
  searchedResultSet: state.PoSearchResult.poSearchResult,
  searchedKeyword: state.PoSearchResult.searchedValue,
  searchedPOCategory: state.PoSearchResult.searchedPoCategory,
  spinner: state.PoSearchResult.spinner
});

export const mapsDispatchToProps = (dispatch: Dispatch) => ({
  Loadspinner: (spinnervalue: boolean) => dispatch(Loadspinner(spinnervalue)),
  fetchPOCategory: () => dispatch(fetchPOCategory()),
  PoSearchDataInit: (
    poCategory: Object,
    inputText: string,
    PONumber: string
  ) => dispatch(
    PoSearchDataInit(poCategory, inputText, PONumber)
  )
});
const POSearchPageWrappper = withRouter(POSearchPage);
export default connect(mapStateToProps, mapsDispatchToProps)(POSearchPageWrappper);
