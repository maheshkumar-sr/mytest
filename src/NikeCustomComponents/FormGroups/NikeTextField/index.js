/**
 * Date of Creation: Feb, 2020
 * Description : This file defines a custom textField wrapper,
 *  that is a complete form control including label, input and help text.
 *
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import styles from './styles.scss';

interface Props {
  name: string;
  onChange: any;
}

export default function BasicTextFields(props: Props) {
  const { name, onChange } = props;

  return (
    <div className={styles.textFieldContainer}>
      <TextField
        name={name}
        onChange={onChange}
        className={styles.textFieldRoot}
        InputProps={{
          classes: {
            root: styles.textFieldInputBaseRoot
          }
        }}
        {...props}
      />
    </div>
  );
}

BasicTextFields.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
