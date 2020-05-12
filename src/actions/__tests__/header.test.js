import configureStore from 'redux-mock-store'; // ES6 modules
import thunk from 'redux-thunk';
import { openHamburger, closeHamburger, getMenuList } from '../header';
import * as actionTypes from '../actiontype';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);

describe('header', () => {
  test('openHamburger dispatch action', () => {
    store.clearActions();
    store.dispatch(openHamburger({}));
    expect(store.getActions()).toEqual([{ type: actionTypes.OPEN_HAMBURGER, payload: true }]);
  });

  test('closeHamburger dispatch action', () => {
    store.clearActions();
    store.dispatch(closeHamburger({}));
    expect(store.getActions()).toEqual([{ type: actionTypes.CLOSE_HAMBURGER, payload: false }]);
  });

  test('getMenuList dispatch action', () => {
    store.clearActions();
    store.dispatch(getMenuList({}));
    expect(store.getActions()).toEqual([{
      type: actionTypes.FETCH_MENU_LIST,
      payload:
            [{
              link: '/',
              name: 'Dashboard',
              path: {
                alt: 'Dashboard',
                src: '/images/icon_dashboard.svg',
              },
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
                    src: '',
                  },
                },
              ],
              path: {
                alt: 'Processing',
                src: '/images/icon_poprocessing.svg',
              },
            },
            {
              link: '',
              name: 'P.O. Reporting',
              path: {
                alt: 'Reporting',
                src: '/images/icon_poreporting.svg',
              },
            },
            {
              link: '',
              name: 'Delivery Instructions ESI/DSI',
              path: {
                alt: 'Delivery',
                src: '/images/icon_delivery_iInstructions_esidsi.svg',
              },
            },
            {
              link: '',
              name: 'Material Special Instructions',
              path: {
                alt: 'Material',
                src: '/images/icon_material_special_instructions.svg',
              },
            },
            {
              link: '',
              name: 'CR Subscription',
              path: {
                alt: 'Subscription',
                src: '/images/icon_crsubscription.svg',
              },
            },
            {
              link: '',
              name: 'Colloboration Report',
              path: {
                alt: 'Support',
                src: '/images/icon_collaboration_support.svg',
              },
            },
            {
              link: '',
              name: 'Help',
              path: {
                alt: 'Help',
                src: '/images/icon_help.svg',
              },
            },

            ],
    }]);
  });
});
