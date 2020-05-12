import configureStore from 'redux-mock-store'; // ES6 modules
import thunk from 'redux-thunk';
import { fetchPOCategory } from '../poCategory';
import * as actionTypes from '../actiontype';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);

describe('POCategory', () => {
  test('fetchPOCategory dispatch action', () => {
    store.clearActions();
    store.dispatch(fetchPOCategory({}));
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.FETCH_PO_CATEGORY,
        payload: [
          {
            key: 'ALL',
            value: 'All P.Os'
          },
          {
            key: 'Accepted',
            value: 'Accepted P.Os'
          },
          {
            key: 'UnAccepted',
            value: 'Unaccepted P.Os'
          },
          {
            key: 'UnIssued',
            value: 'Unissued P.Os'
          },
          {
            key: 'PendingChanges',
            value: 'P.Os Pending Changes'
          },
          {
            key: 'PastDueEvents',
            value: 'Past Due Events'
          }
        ]
      }
    ]);
  });
});
