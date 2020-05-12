import React from 'react';
import { mount } from 'enzyme';
import CircularIndeterminate from '..';

describe('<CircularIndeterminate /> ', () => {
  test('render the component correctly', () => {
    const wrapper = mount(<CircularIndeterminate />);
    expect(wrapper.exists()).toBe(true);
  });
});
