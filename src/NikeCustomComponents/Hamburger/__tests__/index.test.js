import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { reduxForm } from 'redux-form';
import { StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Hamburger from '..';

describe('<Hamburger /> ', () => {
  let PROPS = {};

  const menuListOptions = [
    {
      link: '/',
      name: 'Dashboard',
      path: {
        alt: 'Dashboard',
        src: '/images/icon_dashboard.svg'
      }
    },
    {
      active: true,
      link: '/poProcessing',
      name: 'P.O. Processing',
      nested: [
        {
          link: '/search',
          name: 'P.O Search',
          path: {
            alt: '',
            src: ''
          }
        }
      ],
      path: {
        alt: 'Processing',
        src: '/images/icon_poprocessing.svg'
      }
    }
  ];

  const history = {
    action: 'PUSH',
    block: jest.fn(),
    createHref: jest.fn(),
    go: jest.fn(),
    goBack: jest.fn(),
    location: {
      hash: '',
      key: 'pvyaje',
      pathname: '/search',
      search: '',
      state: undefined
    },
    goForward: jest.fn(),
    listen: jest.fn(),
    push: jest.fn(),
    replace: jest.fn()
  };

  beforeEach(() => {
    PROPS = {
      closeHamburger: jest.fn(),
      getMenuList: jest.fn(),
      openHamburger: true,
      closeHamburger: jest.fn(),
      menuListOptions,
      history
      // history:jest.fn()
    };
  });

  // test('render the component correctly', () => {
  //   const closeDrawerSpy = jest.fn();
  //   const wrapper = mount(
  //     <Hamburger {...PROPS} closeDrawer={closeDrawerSpy} />
  //   );
  //   // const wrapper = mount(<Hamburger {...PROPS} />);
  //   expect(wrapper.exists()).toBe(true);
  // });

  test('render the component correctly', () => {
    const store = createStore(() => ({}));

    const closeDrawerSpy = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <Hamburger {...PROPS} closeDrawer={closeDrawerSpy} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );
    // expect(wrapper.exists()).toBe(true);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('render the component correctly', () => {
    PROPS.openHamburger = false;
    const store = createStore(() => ({}));

    const closeDrawerSpy = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <Hamburger {...PROPS} closeDrawer={closeDrawerSpy} />
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
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <Hamburger {...PROPS} closeDrawer={closeDrawerSpy} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );
    // expect(wrapper.exists()).toBe(true);

    // const open = false;
    const event = { preventDefault: () => {} };
    // mocks for this function
    jest.spyOn(event, 'preventDefault');
    // wrapper.find('form').simulate('submit', event);
    // how would you know that function is called

    // wrapper.instance().toggleDrawer(event);

    // expect(event.preventDefault).toBeCalled();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // test('toggleDrawer', () => {
  //   const wrapper = shallow(<Hamburger {...PROPS} />);

  //   const side = true;
  //   const open = false;

  //   wrapper.instance().toggleDrawer(side, open);
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  // test('render the component correctly', () => {
  //     PROPS.theme = '';
  //     const wrapper = mount(<Button {...PROPS} />);
  //     expect(wrapper.exists()).toBe(true);
  // });

  // test('render the component correctly', () => {
  //     PROPS.fullWidth = false;
  //     const wrapper = mount(<Button {...PROPS} />);
  //     expect(wrapper.exists()).toBe(true);
  // });
});
