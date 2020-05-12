import React from 'react';
import { mount, shallow } from 'enzyme';
import InputBaseComp from '../index';

describe('<InputBaseComp /> ', () => {
  let PROPS = {};
  beforeEach(() => {
    PROPS = {
      checked: true,
      handleChange: jest.fn(),
      name: 'name',
      value: 1234,
      label: 'label',
      disabled: true,
      subLabel: 'subLabel',
      labelPlacement: 'labelPlacement',
      isBlackFill: true,
      id: 'PO1234',
      inputError: 'jhhijhk',
    };
  });

  test('render the component correctly', () => {
    const wrapper = mount(<InputBaseComp {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });

  test('render the component correctly', () => {
    PROPS.inputError = '';
    const wrapper = mount(<InputBaseComp {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });
});
