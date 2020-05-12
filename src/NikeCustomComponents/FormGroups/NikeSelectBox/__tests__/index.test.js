import React from 'react';
import { mount, shallow } from 'enzyme';
import PoSearchMenuItems from '../index';

describe('<PoSearchMenuItems /> ', () => {
  let PROPS = {};
  beforeEach(() => {
    PROPS = {
      selectError: 'fkdjdf',
      filterContainer: 'sflkd',
      filterContainer: 'kjkk',
      isSelectNative: true,
    };
  });

  test('render the component correctly', () => {
    const wrapper = mount(<PoSearchMenuItems {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });

  test('render the component correctly', () => {
    PROPS.selectError = '';
    PROPS.filterContainer = '';
    PROPS.filterContainer = '';
    PROPS.isSelectNative = false;
    const wrapper = mount(<PoSearchMenuItems {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });
});
