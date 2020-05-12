import React from 'react';
import { mount } from 'enzyme';
import Button from '..';

describe('<ButtonComp /> ', () => {
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
    const wrapper = mount(<Button {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });

  test('render the component correctly', () => {
    PROPS.theme = '';
    const wrapper = mount(<Button {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });

  test('render the component correctly', () => {
    PROPS.fullWidth = false;
    const wrapper = mount(<Button {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });
});
