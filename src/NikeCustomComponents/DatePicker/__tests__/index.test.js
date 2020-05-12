import React from 'react';
import { mount, shallow } from 'enzyme';
import MaterialUIPickers from '../index';

describe('<MaterialUIPickers /> ', () => {
  let PROPS = {};
  beforeEach(() => {
    PROPS = {
      label: 'sdfdsfd',
      selectedDate: '03/07/1993',
      handleDateChange: jest.fn(),
    };
  });

  test('render the component correctly', () => {
    const wrapper = mount(<MaterialUIPickers {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });

  test('render the component correctly', () => {
    PROPS.label = '';
    PROPS.selectedDate = '';
    const wrapper = mount(<MaterialUIPickers {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });
});
