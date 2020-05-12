import React from 'react';
import { mount, shallow } from 'enzyme';

import toJson from 'enzyme-to-json';
import { StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import PaginationNumber from '../PaginationNumber';

describe('<PaginationNumber /> ', () => {
  let PROPS = {};
  beforeEach(() => {
    PROPS = {
      label: 'sdfdsfd',

      boundaryCount: 6,
      maxCount: 6,
      onChange: jest.fn(),
      count: 70,
      rowsPerPage: 5,
      page: 0,
      numOfPages: 1
    };
  });

  test('render the component correctly', () => {
    const wrapper = mount(<PaginationNumber {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });

  test('render the component correctly', () => {
    const store = createStore(() => ({}));

    const closeDrawerSpy = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <PaginationNumber {...PROPS} closeDrawer={closeDrawerSpy} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );
    // expect(wrapper.exists()).toBe(true);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('render the component correctly', () => {
    PROPS.boundaryCount = 0;
    const wrapper = mount(<PaginationNumber {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });
  test('render the component correctly', () => {
    PROPS.boundaryCount = 0;
    PROPS.page = 6;
    const wrapper = mount(<PaginationNumber {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });

  test('render the component correctly', () => {
    PROPS.boundaryCount = 5;
    PROPS.maxCount = 6;
    const wrapper = mount(<PaginationNumber {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });
  test('render the component correctly', () => {
    PROPS.boundaryCount = 5;
    PROPS.maxCount = 6;
    const wrapper = mount(<PaginationNumber {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });
  test('render the component correctly', () => {
    // PROPS.boundaryCount = 5;
    // PROPS.maxCount = 6;
    PROPS.numOfPages = 6;
    PROPS.page = 5;
    const wrapper = mount(<PaginationNumber {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });
  test('render the component correctly', () => {
    // PROPS.boundaryCount = 5;
    // PROPS.maxCount = 6;
    PROPS.numOfPages = 10;
    PROPS.boundaryCount = 5;
    const wrapper = mount(<PaginationNumber {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });
  test('render the component correctly', () => {
    PROPS.boundaryCount = 0;
    PROPS.maxCount = 0;
    PROPS.numOfPages = 3;
    PROPS.page = 5;
    const wrapper = mount(<PaginationNumber {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });
  test('render the component correctly', () => {
    PROPS.boundaryCount = 0;
    PROPS.maxCount = 0;
    PROPS.numOfPages = 0;
    PROPS.page = 0;
    const wrapper = mount(<PaginationNumber {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });
});
