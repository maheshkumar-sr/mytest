import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { reduxForm } from 'redux-form';
import { StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import POSearchPage, { submitSearch } from '..';
// import button from '../../'

describe('<POSearchPage /> ', () => {
  let PROPS = {};
  const selectFieldData = {
    '0': {
      value: 'All P.Os',
      key: 'Allpos'
    },
    '1': {
      value: 'Accepted P.Os',
      key: 'Accepted'
    }
  };
  beforeEach(() => {
    PROPS = {
      selectFieldData,
      selectPlaceHolder: 'P.O Category',
      inputPlaceholder: 'Enter Vendor Name, or 10 digit P.O number',
      submitSearch: jest.fn(),
      fetchPOCategory: jest.fn()
    };
  });

  test('render the component correctly', () => {
    const store = createStore(() => ({}));

    const closeDrawerSpy = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <POSearchPage {...PROPS} closeDrawer={closeDrawerSpy} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );
    // expect(wrapper.exists()).toBe(true);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('render the component correctly', () => {
    const store = createStore(() => ({}));

    const closeDrawerSpy = jest.fn();
    const wrapper = shallow(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <submitSearch {...PROPS} closeDrawer={closeDrawerSpy} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );
    // expect(wrapper.exists()).toBe(true);

    // wrapper.instance().submitSearch({}, 'name');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
