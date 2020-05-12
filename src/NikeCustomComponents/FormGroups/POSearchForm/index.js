/**
 * Date of Creation: Feb, 2020
 * Description : This file defines a custom search box.
 * combination of SelectField, TextField, and Button.
 * On click of Search Button, it trigger the function to get the search set.
 *
 * @flow
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import styles from './styles.scss';
import InputBaseComp from '../NikeInputBase';
import SelectBoxComp from '../NikeSelectBox';
import { poSearch, globalConstant, regularExp } from '../../../utils/constants';

interface Props {
  submitSearch: any;
  inputPlaceholder: string;
  selectPlaceHolder: string;
}

export default function POSearchInput(props: Props) {
  const [poCategory, setpoCategory] = useState('0');
  const [errorText, setErrorText] = useState('');
  const [inputText, setInputText] = useState('');
  const [selectError, setSelectError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [RegularExpValid, setRegularExpValid] = useState(false);


  const handleChangeDropDown = (event) => {
    setSelectError(false);
    setpoCategory(event.target.value);
  };

  const onChangeInput = (event) => {
    setInputError(false);
    setRegularExpValid(false);
    setInputText(event.target.value);
  };

  const clearText = () => {
    setRegularExpValid(false);
    setInputText('');
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (poCategory === '0') {
      setSelectError(true);
      setErrorText(poSearch.Select_any_one_PO_Category);
    } else if (
      !inputText.match(regularExp.onlyNumber)
      && !inputText.match(regularExp.onlyAlphabet)
    ) {
      setRegularExpValid(true);
      setErrorText(poSearch.special_charater_not_allowed_please_enter_valid_keyword);
    } else {
      setSelectError(false);
      setErrorText('');
      props.submitSearch(poCategory, inputText);
    }
  };

  const errorOutline = selectError || RegularExpValid ? styles.errorOutline : styles.paperComponent;

  return (
    <div className={styles.formPaperContainer}>
      <h3 className={styles.poSeachText}>P.O Search</h3>
      <Paper
        component={globalConstant.form}
        onSubmit={submitSearch}
        className={errorOutline}
      >
        <SelectBoxComp
          selectError={selectError}
          handleChangeDropDown={handleChangeDropDown}
          searchType={poCategory}
          {...props}
        />

        <InputBaseComp
          inputError={inputError}
          onChangeInput={onChangeInput}
          inputText={inputText}
          clearText={clearText}
          {...props}
        />

        <IconButton
          type={globalConstant.submit}
          className={styles.searchIconButton}
          aria-label={globalConstant.search}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <p className={styles.errorDisp}>
        {RegularExpValid === true ? poSearch.special_charater_not_allowed_please_enter_valid_keyword : ''}
        {selectError === false ? '' : errorText}
      </p>
    </div>
  );
}

POSearchInput.propTypes = {
  submitSearch: PropTypes.func.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  selectPlaceHolder: PropTypes.string.isRequired
};
