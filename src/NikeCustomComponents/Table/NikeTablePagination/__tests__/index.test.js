import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { reduxForm } from 'redux-form';
import { StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import TablePaginationActions from '../index';
import NikeTablePagination from '../index';
// import NikeTablePagination from '../../index';

// jest.mock(
//   '../PaginationNumber',
//   () =>
//     function PaginationNumber() {
//       return <span>PaginationNumber</span>;
//     }
// );
// jest.mock(
//   '../../index',
//   () =>
//     function callexport() {
//       return <span>callexport</span>;
//     }
// );
// jest.mock(
//   'react-csv',
//   () =>
//     function CSVLink() {
//       return <span>CSVLink</span>;
//     }
// );

describe('<NikeTablePagination /> ', () => {
  let PROPS = {};
  const rowsPerPageOptions = [
    5,
    7,
    10,
    15,
    20,
    25,
    { label: 'All', value: -1 }
  ];

  const SelectProps = {
    inputProps: {
      'aria-label': 'Results per page'
    },
    native: true
  };

  const tableData = {
    exportColumnHead: {
      key: 'poNumber',
      type: 'numeric',
      link: true,
      label: 'P.O#'
    },
    exportRowData: {
      season: 'Autumn(AT)',
      gacDate: '2019-07-16T17:00:00.000Z',
      unitPrice: 320,
      ogacDate: '2019-07-16T17:00:00.000Z',
      trackingNo: 6183472548,
      poNumber: 6754891051,
      vendorName: 'GH',
      poCategory: 'Accepted',
      podcsDate: '2019-07-16T17:00:00.000Z',
      shipTo: 'NIKE JAPAN GROUP LLC',
      totalQuantity: 66,
      plantCode: 999,
      material: 'FT3075-400'
    }
  };
  beforeEach(() => {
    PROPS = {
      rowsPerPageOptions,
      colSpan: 11,
      count: 70,
      rowsPerPage: 5,
      page: 0,
      SelectProps,
      labelRowsPerPage: 'Results per page',
      onChangePage: jest.fn(),
      onChangeRowsPerPage: jest.fn(),
      selected: [6754891051],
      // data: tableData,
      callexport: jest.fn(),
      tableData
    };
  });

  // test('render the component correctly', () => {
  //   const store = createStore(() => ({}));

  //   // const closeDrawerSpy = jest.fn();
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <MuiThemeProvider>
  //         <StaticRouter context={{}}>
  //           <TablePaginationActions {...PROPS} />
  //         </StaticRouter>
  //       </MuiThemeProvider>
  //     </Provider>
  //   );
  //   // expect(wrapper.exists()).toBe(true);

  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  test('render the component correctly', () => {
    const store = createStore(() => ({}));

    // const closeDrawerSpy = jest.fn();
    const wrapper = shallow(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <NikeTablePagination {...PROPS} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );
    // expect(wrapper.exists()).toBe(true);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test('render the component correctly', () => {
    const store = createStore(() => ({}));

    // const closeDrawerSpy = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <TablePaginationActions {...PROPS} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );
    // expect(wrapper.exists()).toBe(true);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test('render the component correctly', () => {
    const store = createStore(() => ({}));

    // const closeDrawerSpy = jest.fn();
    const wrapper = shallow(<NikeTablePagination {...PROPS} />);
    // expect(wrapper.exists()).toBe(true);

    expect(wrapper.find('#exportAll').exists()).toBe(false);
  });
});
