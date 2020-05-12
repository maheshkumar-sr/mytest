/**
 * Date of Creation: Feb, 2020
 * Description : This file defines a custom input base to input text,
 *  to be used across application.
 *
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import { poSearch } from '../../../utils/constants';
import styles from './styles.scss';

interface Props {
  onChangeInput: ()=>{};
  inputPlaceholder: string;
  inputError: boolean;
  clearText: ()=>{};
  inputText: [ string | number ];
}

const InputBaseComp = (props: Props) => {
  const {
    inputError,
    inputText,
    inputPlaceholder,
    onChangeInput,
    clearText
  } = props;

  return (
    <div className={styles.inputBaseContainer}>
      <InputBase
        className={styles.searchInputBase}
        classes={{
          input: styles.searchInputBaseInput,
          error: inputError ? styles.errorInput : ''
        }}
        value={inputText}
        placeholder={inputPlaceholder}
        inputProps={{ 'aria-label': poSearch.VendorName_PONumber }}
        onChange={onChangeInput}
        error={inputError}
      />
      <button
        type="button"
        onClick={clearText}
        className={styles.clearText}
      >
        Clear
      </button>
    </div>
  );
};

InputBaseComp.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  inputError: PropTypes.bool.isRequired,
  clearText: PropTypes.func.isRequired,
  inputText: PropTypes.string.isRequired
};

export default InputBaseComp;
