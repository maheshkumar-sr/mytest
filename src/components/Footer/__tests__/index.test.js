import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Footer from '..';

describe('<Footer /> ', () => {
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
    const wrapper = mount(<Footer {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });
});
