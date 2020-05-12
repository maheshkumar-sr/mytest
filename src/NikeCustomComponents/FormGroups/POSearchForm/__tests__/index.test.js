import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { reduxForm } from 'redux-form';
import { StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import POSearchInput from '../index';

describe('<POSearchInput /> ', () => {
  let PROPS = {};
  beforeEach(() => {
    PROPS = {
      selectFieldData: [
        { value: 'All P.Os', key: 'ALL' },
        { value: 'Accepted P.Os', key: 'Accepted' },
        { value: 'Unaccepted P.Os', key: 'UnAccepted' },
        { value: 'Unissued P.Os', key: 'UnIssued' },
        { value: 'P.Os Pending Changes', key: 'PendingChanges' },
        { value: 'Past Due Events', key: 'PastDueEvents' }
      ],
      selectPlaceHolder: 'P.O Category',
      inputPlaceholder: 'Enter Vendor Name, or 10 digit P.O number',
      submitSearch: jest.fn()
    };
  });

  test('render the <POSearchInput /> component correctly', () => {
    const store = createStore(() => ({}));

    const closeDrawerSpy = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <POSearchInput {...PROPS} closeDrawer={closeDrawerSpy} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('render the <POSearchInput /> component with Clear Button Click', () => {
    const store = createStore(() => ({}));
    const closeDrawerSpy = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <POSearchInput {...PROPS} closeDrawer={closeDrawerSpy} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );
    
    wrapper.find('button').at(0).simulate('click');
  });

  test('render the <POSearchInput /> component with Input OnChange', () => {
    const store = createStore(() => ({}));
    const closeDrawerSpy = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <POSearchInput {...PROPS} closeDrawer={closeDrawerSpy} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );
    
    wrapper.find('input[type="text"]').at(0).simulate('change');
  });

  test('render the <POSearchInput /> component with Form Submit', () => {
    const store = createStore(() => ({}));
    const closeDrawerSpy = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <POSearchInput {...PROPS} closeDrawer={closeDrawerSpy} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );
    
    wrapper.find('form').at(0).simulate('submit');
  });

});
