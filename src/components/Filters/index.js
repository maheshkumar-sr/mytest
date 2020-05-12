/* @flow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SelectBox from '../../NikeCustomComponents/FormGroups/NikeSelectBox';
import DatePicker from '../../NikeCustomComponents/DatePicker';
import TextField from '../../NikeCustomComponents/FormGroups/NikeTextField';
import { regularExp } from '../../utils/constants';
import { filterArray } from '../../utils/common';
import styles from './styles.scss';

interface Props {
  initialSearchedResultSet: Object;
  searchedResultSet: Object;
  searchedPOCategory: string;
  onChangeFilters: any;
}

export function isValid({
  poCategory,
  shipTo,
  material,
  season,
  period,
  initialStateValueFactCode
}) {
  return (
    poCategory !== 'none'
    || shipTo !== 'none'
    || material !== 'none'
    || season !== 'none'
    || period !== 'none'
    || initialStateValueFactCode.factoryCode !== ''
  );
}

const POCategoryPage = (props: Props) => {
  const {
    searchedResultSet,
    searchedPOCategory,
    initialSearchedResultSet
  } = props;
  const [poCategory, setPoCategory] = React.useState(searchedPOCategory);
  const [period, setPeriod] = React.useState('');
  const [shipTo, setShipTo] = React.useState('');
  const [material, setMaterial] = React.useState('');
  const [season, setSeason] = React.useState('');
  const [selectedFromDate, setSelectedFromDate] = React.useState(new Date());
  const [selectedToDate, setSelectedToDate] = React.useState(new Date());

  const initialPlantCodestate = {
    factoryCode: '',
    errorCheck: false,
    errorMessage: null
  };
  const [initialStateValueFactCode, setStateValueFactCode] = React.useState(initialPlantCodestate);

  useEffect(() => {
    const filteredResult = filterArray(initialSearchedResultSet, {
      poCategory,
      shipTo,
      material,
      season,
      plantCode: initialStateValueFactCode.factoryCode,
      fromDate: selectedFromDate,
      toDate: selectedToDate
    }, period);
    if (
      isValid({
        poCategory,
        shipTo,
        material,
        season,
        period,
        initialStateValueFactCode
      })
    ) {
      props.onChangeFilters(filteredResult);
    } else {
      props.onChangeFilters(initialSearchedResultSet);
    }
  }, [
    poCategory,
    shipTo,
    material,
    season,
    initialStateValueFactCode,
    selectedFromDate,
    selectedToDate,
    period
  ]);

  const selectPOPlaceHolder = 'All P.Os';
  const periodList = [
    { value: 'P.O Creation', key: 'podcsDate' },
    { value: 'OGAC Date', key: 'ogacDate' },
    { value: 'GAC Date', key: 'gacDate' }
  ];

  const createDictionaryObject = (key, value) => ({ key, value });

  const getFilterList = (listKey) => {
    const filterlist = [{ key: 'none', value: 'None' }];
    [...new Set(searchedResultSet.map((x) => x[listKey]))].forEach((item) => {
      filterlist.push(createDictionaryObject(item, item));
    });
    return filterlist;
  };

  const shipToList = getFilterList('shipTo');
  const materials = getFilterList('material');
  const seasonList = getFilterList('season');
  const poCategoryList = getFilterList('poCategory');

  const handleChangeDropDownPOCategory = (event) => {
    setPoCategory(event.target.value);
  };

  const handleChangeDropDownPeriod = (event) => {
    setPeriod(event.target.value);
  };

  const handleChangeDropDownShipTo = (event) => {
    setShipTo(event.target.value);
  };

  const handleChangeDropDownMaterial = (event) => {
    setMaterial(event.target.value);
  };

  const handleChangeDropDownSeason = (event) => {
    setSeason(event.target.value);
  };

  const handleFromDateChange = (date) => {
    setSelectedFromDate(date);
  };

  const handleToDateChange = (date) => {
    setSelectedToDate(date);
  };

  const handleChangeFactoryCode = (event) => {
    event.preventDefault();
    const { value } = event.target;
    if (value && regularExp.onlyNumber.test(value)) {
      setStateValueFactCode({
        errorMessage: null,
        factoryCode: parseInt(value.slice(0, 4), 10)
      });
    } else {
      setStateValueFactCode({ errorMessage: null, factoryCode: '' });
    }
  };

  const clearAllFilter = () => {
    setPeriod('');
    setMaterial('');
    setSeason('');
    setSelectedFromDate(new Date());
    setSelectedToDate(new Date());
    setPoCategory(searchedPOCategory);
    setShipTo('');
    setStateValueFactCode({ ...initialPlantCodestate });
    props.onChangeFilters(initialSearchedResultSet);
  };

  return (
    <>
      <div className={`ncss-container ${styles.dropDown}`}>
        <div className={`ncss-row ${styles.dropDownPadding}`}>
          <div className={`ncss-col-sm-1 ${styles.itemDropDown}`}>
            <p className={styles.filterName}>P.O Category</p>
            <SelectBox
              id="poCategoryListDropDown"
              className={styles.rootFilter}
              filterContainer
              selectFieldData={poCategoryList}
              selectPlaceHolder={selectPOPlaceHolder}
              searchType={poCategory}
              handleChangeDropDown={(event) => handleChangeDropDownPOCategory(event)}
              isSelectNative={false}
            />
          </div>
          <div className={`ncss-col-sm-1 ${styles.itemDropDown}`}>
            <p className={styles.filterName}>Period</p>
            <SelectBox
              id="periodListDropDown"
              className={styles.rootFilter}
              filterContainer
              selectFieldData={periodList}
              selectPlaceHolder={selectPOPlaceHolder}
              searchType={period}
              handleChangeDropDown={(event) => handleChangeDropDownPeriod(event)}
              isSelectNative={false}
            />
          </div>
          <div className={`ncss-col-sm-1 ${styles.itemDropDown}`}>
            <p className={styles.filterName}>From</p>
            <DatePicker
              id="selectedFromDate"
              selectedDate={selectedFromDate}
              handleDateChange={handleFromDateChange}
            />
          </div>
          <div className={`ncss-col-sm-1 ${styles.itemDropDown}`}>
            <p className={styles.filterName}>To</p>
            <DatePicker
              id="selectedToDate"
              selectedDate={selectedToDate}
              handleDateChange={handleToDateChange}
            />
          </div>
          <div className={`ncss-col-sm-1 ${styles.itemDropDown}`}>
            <p className={styles.filterName}>Ship To</p>
            <SelectBox
              id="shipToListDropDown"
              className={styles.rootFilter}
              filterContainer
              selectFieldData={shipToList}
              selectPlaceHolder={selectPOPlaceHolder}
              searchType={shipTo}
              handleChangeDropDown={(event) => handleChangeDropDownShipTo(event)}
            />
          </div>
          <div className={`ncss-col-sm-1 ${styles.itemDropDown}`}>
            <p className={styles.filterName}>Material</p>
            <SelectBox
              id="materialsDropDown"
              className={styles.rootFilter}
              filterContainer
              selectFieldData={materials}
              selectPlaceHolder={selectPOPlaceHolder}
              searchType={material}
              handleChangeDropDown={(event) => handleChangeDropDownMaterial(event)}
            />
          </div>
          <div className={`ncss-col-sm-1 ${styles.itemDropDown}`}>
            <p className={styles.filterName}>Season</p>
            <SelectBox
              id="seasonListDropDown"
              className={styles.rootFilter}
              filterContainer
              selectFieldData={seasonList}
              selectPlaceHolder={selectPOPlaceHolder}
              searchType={season}
              handleChangeDropDown={(event) => handleChangeDropDownSeason(event)}
            />
          </div>
          <div className={`ncss-col-sm-1 ${styles.itemDropDown}`}>
            <p className={styles.filterName}>Factory Code</p>
            <TextField
              id="factorycode"
              name="factorycode"
              helperText={initialStateValueFactCode.errorMessage}
              onChange={(e) => handleChangeFactoryCode(e)}
              error={initialStateValueFactCode.errorCheck}
              value={initialStateValueFactCode.factoryCode}
              maxLength="4"
              type="text"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        id="filterButton"
        onClick={() => false}
        className={styles.showAllFilters}
      >
        Show All Filters
      </button>
      <span className={styles.divider}>|</span>
      <button
        type="button"
        id="clearAllFilter"
        onClick={clearAllFilter}
        className={styles.clearAll}
      >
        Clear all
      </button>
    </>
  );
};

POCategoryPage.propTypes = {
  initialSearchedResultSet: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchedResultSet: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchedPOCategory: PropTypes.string.isRequired,
  onChangeFilters: PropTypes.func.isRequired
};

export default POCategoryPage;
