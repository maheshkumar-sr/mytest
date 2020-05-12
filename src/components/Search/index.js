/* @flow */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import POSearchForm from '../../NikeCustomComponents/FormGroups/POSearchForm';
import { regularExp, poSearch } from '../../utils/constants';
import Spinner from '../../NikeCustomComponents/Spinner';
import DataTable from '../../NikeCustomComponents/Table';
import dataTableHead from './dataTableContent';
import styles from './styles.scss';
import FilterSection from '../Filters';
import { imagesPath } from '../../utils/imagePath';
import { appConfig } from '../../../appConfig';

interface Props {
  poCategoryList: Object;
  searchedResultSet: Object;
  searchedPOCategory: string;
  searchedKeyword: string;
  spinner: boolean;
  Loadspinner: (boolean)=>{};
  fetchPOCategory: ()=>{};
  PoSearchDataInit: (Object, string, any)=>{};
}

const POSearchPage = (props: Props) => {
  const {
    poCategoryList, searchedPOCategory, searchedResultSet, searchedKeyword, spinner
  } = props;

  const [spinnervalue] = useState(true);
  const [tableShow, settableShow] = useState(false);
  const [filterShow, setFilterShow] = useState(false);
  const [inputSearch, setInputSearch] = useState('');
  const [filteredResults, setfilteredResults] = useState([]);
  const [noResultsFoundError, setnoResultsFoundError] = useState(false);

  useEffect(() => {
    props.fetchPOCategory();
  }, []);

  useEffect(() => {
    setfilteredResults(searchedResultSet);
  }, [searchedResultSet]);

  const inputPlaceholder = poSearch.Enter_Vendor_Name_or_3_digit_PO_number;
  const selectPlaceHolder = poSearch.PO_Category;
  const PONumber = 'PO Number';


  const submitSearch = (poCategory, inputText) => {
    setInputSearch(inputText);
    if (inputText.match(regularExp.onlyNumber)) {
      props.Loadspinner(spinnervalue);
      settableShow(true);
      setFilterShow(true);
      props.PoSearchDataInit(poCategory, inputText, PONumber);
      const noResultsFoundNum = searchedResultSet.length === 0;
      setnoResultsFoundError(noResultsFoundNum);
    } else if (inputText.match(regularExp.onlyAlphabet)) {
      props.Loadspinner(spinnervalue);
      settableShow(true);
      setFilterShow(true);
      props.PoSearchDataInit(poCategory, inputText);
      const noResultsFoundAlpha = searchedResultSet.length === 0;
      setnoResultsFoundError(noResultsFoundAlpha);
    }
  };

  const onChangeFilters = (filterSearchResultList) => {
    setfilteredResults(filterSearchResultList);
  };

  const filterPanel = () => (
    <div className={`${styles.mt_25} ${styles.pb_30}`}>
      <FilterSection
        initialSearchedResultSet={searchedResultSet}
        searchedResultSet={filteredResults}
        poCategoryList={poCategoryList}
        searchedPOCategory={searchedPOCategory}
        onChangeFilters={onChangeFilters}
      />
    </div>
  );

  const maxCapacityErrorMsg = () => (
    <div className={styles.maxCapacityError}>
      <img src={imagesPath.iconNotification.src} alt={imagesPath.iconNotification.alt} />
      <div className={styles.pleaseNoteTxt}>
        <p className={styles.pleaseNote}>{poSearch.please_note}</p>
        <p>{`${poSearch.more_search_result_1} ${appConfig.SearchThresholdLimit} ${poSearch.more_search_result_2} ${appConfig.SearchThresholdLimit} ${poSearch.more_search_result_3}`}</p>
      </div>
    </div>
  );

  const filterResultProTip = () => (
    <div className={styles.maxCapacityError}>
      <img src={imagesPath.iconProTip.src} alt={imagesPath.iconProTip.alt} />
      <div className={styles.pleaseNoteTxt}>
        <p className={styles.pleaseNote}>{poSearch.pro_tips}</p>
        <p>{poSearch.save_search_criteria_for_reuse}</p>
      </div>
    </div>
  );

  const filterResultErrorMsg = () => (
    <div className={styles.filterErrorOuterContainer}>
      <img src={imagesPath.iconError.src} alt={imagesPath.iconError.alt} />
      <div className={styles.filterResultErrorMsg}>
        <p>
          <span className={styles.filterResultOops}>{poSearch.oops}</span>
          <span>
            {' '}
            {poSearch.sorry_we_couldnot_found_any_matching_results_for_this_criteria}
          </span>
        </p>
        <p>{poSearch.perhaps_you_should_check_your_applied_filters_or_clear_filters}</p>
      </div>
    </div>
  );

  const searchResults = () => (
    <DataTable
      orderbyDefaultState="itemNumber"
      uniqueKey="poNumber"
      sortingOrder="asc"
      rowsPerPageOptionsState={[5, 7, 10, 15, 20, 25]}
      columnData={dataTableHead}
      rowData={filteredResults}
      moreDetail
      searchKeyword={searchedKeyword}
    />
  );

  const renderSearch = () => (
    <POSearchForm
      selectFieldData={poCategoryList}
      selectPlaceHolder={selectPlaceHolder}
      inputPlaceholder={inputPlaceholder}
      submitSearch={submitSearch}
    />
  );


  const noResults = () => {
    if (!spinner && searchedResultSet && searchedResultSet.length === 0 && noResultsFoundError) {
      return (
        <div className={styles.noResults}>
          <img src={imagesPath.iconError.src} alt={imagesPath.iconError.alt} />
          <div className={styles.noResultsText}>
            <p className={styles.noResultsSorryMsg}>
              <span className={styles.noResultsOops}>{`${poSearch.oops} `}</span>
              {poSearch.sorry_we_couldn_find_any_matches_results_for}
              {` "${inputSearch}"`}
            </p>
            <p>{poSearch.no_Result_found_secound_text}</p>
          </div>
        </div>
      );
    }
    return (
      <>
        {!spinner && filterShow && filterPanel()}
        {!spinner
          && tableShow
          && filteredResults.length >= appConfig.SearchThresholdLimit
          && maxCapacityErrorMsg()}
        {!spinner && tableShow && filteredResults.length === 0 && filterResultErrorMsg()}
        {!spinner && tableShow && filteredResults.length === 0 && filterResultProTip()}
        {!spinner && tableShow && filteredResults.length > 0 && searchResults()}
      </>
    );
  };

  return (
    <>
      {renderSearch()}
      {spinner
        ? <Spinner />
        : noResults()}
    </>
  );
};

POSearchPage.propTypes = {
  poCategoryList: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchedResultSet: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchedPOCategory: PropTypes.string.isRequired,
  searchedKeyword: PropTypes.string.isRequired,
  spinner: PropTypes.bool.isRequired,
  Loadspinner: PropTypes.func.isRequired,
  fetchPOCategory: PropTypes.func.isRequired,
  PoSearchDataInit: PropTypes.func.isRequired
};

export default POSearchPage;
