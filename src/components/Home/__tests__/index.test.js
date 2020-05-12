import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Home from '..';

describe('<Home /> ', () => {
  let PROPS = {};
  beforeEach(() => {
    PROPS = {
      angled: false,
      leftArrow: false,
      rightArrow: false,
      discreet: true,
      fullwidth: 'true',
      children: '',
      variant: '',
      emphasis: '',
      customClass: {},
      theme: 'black',
      fullWidth: true,
    };
  });

  test('render the component correctly', () => {
    const wrapper = mount(<Home {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });
});
