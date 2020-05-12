/**
 * Date of Creation: Feb, 2020
 * Description : This file defines a custom radio button
 *  that allow the user to select one option from a set
 *  to be used across application.
 *
 * @flow
 */
import * as React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { customRadioButton } from '../../../utils/constants';
import styles from './styles.scss';

type Props = {|
  checked: boolean | string,
  handleChange?: Function,
  name?: string,
  value: string | number | React.Element<any>,
  label?: string | React.Node,
  disabled?: boolean,
  subLabel?: Object | string,
  labelPlacement?: string,
  isBlackFill?: boolean,
  id?: string
|};

const RadioButton = (props: Props) => {
  const {
    value,
    label,
    name,
    disabled,
    id,
    handleChange,
    isBlackFill,
    checked,
    ...remainingProps
  } = props;

  return (
    <div>
      <Radio
        checked={checked}
        onChange={handleChange}
        value={value}
        id={id}
        name={name}
        color="default"
        disabled={disabled}
        aria-label={label}
        checkedIcon={(
          <RadioButtonCheckedIcon
            fontSize="small"
          />
        )}
        classes={{
        }}
        {...remainingProps}
      />
    </div>
  );
};

const CustomRadioInput = (props: Props) => {
  const {
    value,
    label,
    disabled,
    labelPlacement,
    subLabel,
    id,
    handleChange,
    name,
    ...remainingProps
  } = props;
  return (
    <FormControlLabel
      value={value}
      disabled={disabled}
      onChange={handleChange}
      control={(
        <RadioButton
          id={id}
          value={value}
          label={label}
          disabled={disabled}
          {...remainingProps}
        />
      )}
      label={(
        <>
          <div>
            {/* {label} */}
            { customRadioButton.nikeCustomRadioButton }

          </div>
          {subLabel}
        </>
      )}
      labelPlacement={labelPlacement}
      className={styles.radioFormControl}
      {...remainingProps}
    />
  );
};

CustomRadioInput.defaultProps = {
  disabled: false,
  labelPlacement: 'end',
  label: '',
  subLabel: '',
  id: '',
  handleChange: '',
  name: '',
  isBlackFill: false
};

RadioButton.defaultProps = {
  isBlackFill: false,
  name: '',
  label: '',
  disabled: false,
  id: '',
  handleChange: '',
  subLabel: '',
  labelPlacement: ''
};

export default CustomRadioInput;
