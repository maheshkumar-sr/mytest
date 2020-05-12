import React from 'react';
import { mount } from 'enzyme';
import CheckboxItem from '../index';

describe('<CheckboxItem /> ', () => {
  let PROPS = {};
  beforeEach(() => {
    PROPS = {
      handleChange: jest.fn(),
      checked: false,
      inputProps: { 'aria-labelledby': 'enhanced-table-checkbox-4' },
      onChange: jest.fn()
    };
  });

  test('render the component correctly', () => {
    const wrapper = mount(<CheckboxItem {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });
  test('render the component correctly', () => {
    PROPS.checked = true;
    const wrapper = mount(<CheckboxItem {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });
  test('render the component correctly', () => {
    PROPS.inputProps = '';
    const wrapper = mount(<CheckboxItem {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });
  test('render the component correctly', () => {
    PROPS.onChange = null;
    const wrapper = mount(<CheckboxItem {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });
});
