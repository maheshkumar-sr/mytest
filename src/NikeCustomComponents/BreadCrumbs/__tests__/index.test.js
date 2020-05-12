import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CustomBreadcrumbs from '../index';

describe('<CustomBreadcrumbs /> ', () => {
  let PROPS = {};

  const breadCrumbList = new Map([
    ['/', [{ linkTo: '/', label: 'Home' }]],

    ['/poProcessing', [{ linkTo: '/', label: 'Home' },
      { linkTo: '/poProcessing', label: 'P.O Processing' }]],

    ['/search', [{ linkTo: '/', label: 'Home' },
      { linkTo: '/poProcessing', label: 'P.O Processing' },
      { linkTo: '/search', label: 'P.O Search' }]]
  ]);
  
  beforeEach(() => {
    PROPS = {
      breadCrumbList,
      pathName: '/',
      staticContext: undefined,
      selectError: 'fkdjdf',
      filterContainer: 'sflkd',
      filterContainer: 'kjkk',
      isSelectNative: true
    };
  });

  test('render the component correctly', () => {
    const store = createStore(() => ({}));

    const closeDrawerSpy = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <CustomBreadcrumbs {...PROPS} closeDrawer={closeDrawerSpy} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );
    wrapper.find('Link').at(0).simulate("click");
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
