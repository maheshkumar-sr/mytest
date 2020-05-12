/**
 * Date of Creation: Feb, 2020
 * Description : This file defines a custom select box
 *  that allow the user to select one option from a menu dropdown.
 *
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import styles from './styles.scss';
import { poSearch, globalConstant } from '../../../utils/constants';

interface Props {
  isSelectNative: boolean;
  selectPlaceHolder: string;
  handleChangeDropDown: any;
  searchType: string;
  selectError?: boolean;
  filterContainer: boolean;
  selectFieldData: Array<Object>;
}

const PoSearchMenuItems = (props: Props) => {
  const {
    selectFieldData,
    selectError,
    searchType,
    handleChangeDropDown,
    filterContainer,
    isSelectNative,
    selectPlaceHolder
  } = props;

  return (
    <div className={styles.selectBoxContainer}>
      <FormControl
        className={styles.formControlContainer}
        error={selectError}
        classes={{
          root: selectError ? styles.errorSelect : ''
        }}
      >
        <Select
          labelId={poSearch.search_select_filled_label}
          id={poSearch.search_select_filled}
          value={searchType}
          classes={{
            root: styles.searchSelectRoot,
            select: styles.searchSelect,
            icon: styles.searchSelectIcon
          }}
          onChange={handleChangeDropDown}
          className={filterContainer
            ? styles.filterSelectFiledContainer : styles.selectFieldContainer}
          native={isSelectNative}
          MenuProps={!isSelectNative ? {
            anchorOrigin: {
              vertical: globalConstant.bottom,
              horizontal: globalConstant.left
            },
            transformOrigin: {
              vertical: globalConstant.top,
              horizontal: globalConstant.left
            },
            getContentAnchorEl: null,
            classes: {
              paper: filterContainer ? styles.filterMenuPropsPaper : styles.menuPropsPaper,
              list: styles.menuPropsList
            }
          } : {}}
        >
          {!isSelectNative && (
          <MenuItem
            value="0"
            disabled
            classes={{
              root: styles.menuItemRoot,
              selected: styles.menuItemSelected
            }}
          >
            <p className={styles.menuItemDisabled}>{selectPlaceHolder}</p>
          </MenuItem>
          )}
          {isSelectNative && (
          <option value="0" disabled>
            {selectPlaceHolder}
          </option>
          )}
          {selectFieldData && selectFieldData.map(
            (selectValue) => (!isSelectNative ? (
              <MenuItem
                key={Math.random()}
                value={selectValue.key}
                classes={{
                  root: styles.menuItemRoot,
                  selected: styles.menuItemSelected
                }}
              >
                {selectValue.value}
              </MenuItem>
            ) : (
              <option
                key={Math.random()}
                value={selectValue}
              >
                {selectValue}
              </option>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  );
};

PoSearchMenuItems.propTypes = {
  isSelectNative: PropTypes.bool,
  selectPlaceHolder: PropTypes.string.isRequired,
  handleChangeDropDown: PropTypes.func.isRequired,
  searchType: PropTypes.string.isRequired,
  selectError: PropTypes.bool,
  filterContainer: PropTypes.bool,
  selectFieldData: PropTypes.instanceOf(Array).isRequired
};

PoSearchMenuItems.defaultProps = {
  isSelectNative: false,
  selectError: false,
  filterContainer: false
};

export default PoSearchMenuItems;
