import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ErrorBoundary from '..';

describe('<ErrorBoundary /> ', () => {
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
      fullWidth: true
    };
  });

  test('render the component correctly', () => {
    const wrapper = mount(<ErrorBoundary {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });

  test('render the component correctly', () => {
    const wrapper = mount(<ErrorBoundary {...PROPS} />);
    wrapper.setState({
      error: null,
      errorInfo: null
    });
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('componentDidCatch with null params', () => {
    const wrapper = shallow(<ErrorBoundary {...PROPS} />);

    const error = null;
    const errorInfo = null;

    wrapper.instance().componentDidCatch(error, errorInfo);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('componentDidCatch without null params', () => {
    const wrapper = shallow(<ErrorBoundary {...PROPS} />);

    const error = 'error';
    const errorInfo = 'componentDidCatch';

    wrapper.instance().componentDidCatch(error, errorInfo);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
