/**
 * Date of Creation: Feb, 2020
 * Description : This file defines a custom checkbox to select one or more
 *  items from a set, to be used across application.
 *
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './styles.scss';

export function CheckBoxOutlineBlankIcon() {
  return <div className={styles.checkBoxBlank} />;
}

export function CheckBoxCheckedIcon() {
  return (
    <div className={styles.checkBoxFill}>
      <span className={styles.checkMark} />
    </div>
  );
}

interface Props {
  checked: boolean;
  onChange?: (MouseEvent)=> boolean;
  inputProps?: Object;
  indeterminate?: boolean;
}

export default function CheckboxItem(props: Props) {
  const {
    checked, onChange
  } = props;

  return (
    <div className={styles.checkBoxContainer}>
      <FormControlLabel
        className={styles.formControllerContainer}
        control={(
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon />}
            checkedIcon={<CheckBoxCheckedIcon />}
            checked={checked}
            onChange={onChange}
            className={styles.checkBoxContainer}
            classes={{
              root: styles.checkBoxRoot,
              checked: styles.checkBoxChecked
            }}
            disableRipple
            {...props}
          />
        )}
      />
    </div>
  );
}

CheckboxItem.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  inputProps: PropTypes.shape({
    'aria-labelledby': PropTypes.string
  }),
  indeterminate: PropTypes.bool
};

CheckboxItem.defaultProps = {
  onChange: () => false,
  inputProps: { 'aria-labelledby': '' },
  indeterminate: false
};
