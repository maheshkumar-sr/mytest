/**
 * Date of Creation: Feb, 2020
 * Description : This file defines custom datepicker,
 *  to be used across application.
 *
 * @flow
 */
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import styles from './styles.scss';

interface Props {
  selectedDate: Object;
  handleDateChange: any;
}

export default function MaterialUIPickers(props: Props) {
  const { selectedDate, handleDateChange } = props;

  return (
    <div className={styles.datePickerContainer}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          value={selectedDate}
          onChange={handleDateChange}
          className={styles.keyboardDatePickerContainer}
          InputAdornmentProps={{
            classes: {
              root: styles.datePickerAdornmentRoot
            }
          }}
          InputProps={{
            classes: {
              root: styles.datePickerInputBaseRoot
            }
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

MaterialUIPickers.propTypes = {
  selectedDate: PropTypes.instanceOf(Object).isRequired,
  handleDateChange: PropTypes.func.isRequired
};
