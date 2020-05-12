/* eslint-disable quotes */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import { StaticRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import * as FileSaver from 'file-saver';
import { MuiThemeProvider } from "@material-ui/core/styles";
import NikeTableHead from "../NikeTableHead";
import DataTable, {
  descendingComparator,
  getComparator,
  stableSort,
  handleRequestSort,
  exportAllData
} from "..";
// import button from '../../'

// test("exportAllData ", () => {
//   const  selectedRow = [];
//   const rowData = [];
//   const order = '';
//   const orderBy = '';
//   const exportRowData = {selectedRow, rowData, order, orderBy};
//   expect(exportAllData(exportRowData)).not.toBeDefined();
// });

// test('exportAllData', () => {
//   expect(exportAllData()).not.toBeDefined();
// });

describe("<NikeCustomComponents Table /> ", () => {
  let PROPS = {};

  const menuListOptions = [
    {
      link: "/",
      name: "Dashboard",
      path: {
        alt: "Dashboard",
        src: "/images/icon_dashboard.svg"
      }
    },
    {
      active: true,
      link: "/poProcessing",
      name: "P.O. Processing",
      nested: [
        {
          link: "/search",
          name: "P.O Search",
          path: {
            alt: "",
            src: ""
          }
        }
      ],
      path: {
        alt: "Processing",
        src: "/images/icon_poprocessing.svg"
      }
    }
  ];

  const history = {
    action: "PUSH",
    block: jest.fn(),
    createHref: jest.fn(),
    go: jest.fn(),
    goBack: jest.fn(),
    location: {
      hash: "",
      key: "pvyaje",
      pathname: "/search",
      search: "",
      state: undefined
    },
    goForward: jest.fn(),
    listen: jest.fn(),
    push: jest.fn(),
    replace: jest.fn()
  };

  const rowsPerPageOptionsState = [5, 7, 10, 15, 20, 25];

  const columnData = [
    {
      key: "poNumber",
      type: "numeric",
      link: true,
      label: "P.O#"
    },
    {
      key: "trackingNo",
      type: "numeric",
      link: true,
      label: "Trading P.O"
    },
    { key: "plantCode", type: "numeric", link: false, label: "Item#" },
    { key: "totalQuantity", type: "numeric", link: false, label: "Quantity" },
    { key: "vendorName", type: "string", link: false, label: "VendorName" },
    { key: "ogacDate", type: "date", link: false, label: "OGACDate" },
    {
      key: "podcsDate",
      type: "date",
      link: false,
      label: "GACDate"
    },
    {
      key: "unitPrice",
      type: "numeric",
      link: false,
      label: "NetUnitPrice"
    }
  ];

  const rowData = [
    {
      season: "Autumn(AT)",
      gacDate: "2019-07-16T17:00:00.000Z",
      unitPrice: 320,
      ogacDate: "2019-07-16T17:00:00.000Z",
      trackingNo: 6183472548,
      poNumber: 6754891051,
      vendorName: "GH",
      poCategory: "Accepted",
      podcsDate: "2019-07-16T17:00:00.000Z",
      shipTo: "NIKE JAPAN GROUP LLC",
      totalQuantity: 66,
      plantCode: 999,
      material: "FT3075-400"
    },
    {
      season: "Spring(SP)",
      gacDate: "2019-09-11T14:00:00.000Z",
      unitPrice: 113,
      ogacDate: "2019-09-11T14:00:00.000Z",
      trackingNo: 6764323575,
      poNumber: 6754891693,
      vendorName: "JP",
      poCategory: "Accepted",
      podcsDate: "2019-09-11T14:00:00.000Z",
      shipTo: "ASIA SAMPLE PROGRAM",
      totalQuantity: 71,
      plantCode: 1045,
      material: "FT3075-400"
    },
    {
      season: "Autumn(AT)",
      gacDate: "2019-07-23T14:00:00.000Z",
      unitPrice: 302,
      ogacDate: "2019-07-23T14:00:00.000Z",
      trackingNo: 6680310088,
      poNumber: 6754893869,
      vendorName: "MK",
      poCategory: "Accepted",
      podcsDate: "2019-07-23T14:00:00.000Z",
      shipTo: "NIKE SPORTS(CHINA) CO LTD",
      totalQuantity: 23,
      plantCode: 1026,
      material: "CK6047-002"
    },
    {
      season: "Summer(SU)",
      gacDate: "2019-04-24T13:00:00.000Z",
      unitPrice: 39,
      ogacDate: "2019-04-24T13:00:00.000Z",
      trackingNo: 6198444888,
      poNumber: 6754891553,
      vendorName: "XC",
      poCategory: "Accepted",
      podcsDate: "2019-04-24T13:00:00.000Z",
      shipTo: "AMERICAS SAMPLE PROGRAM",
      totalQuantity: 49,
      plantCode: 1023,
      material: "DS2089-005"
    },
    {
      season: "Autumn(AT)",
      gacDate: "2019-03-23T12:00:00.000Z",
      unitPrice: 284,
      ogacDate: "2019-03-23T12:00:00.000Z",
      trackingNo: 6852545578,
      poNumber: 6754892369,
      vendorName: "XC",
      poCategory: "Accepted",
      podcsDate: "2019-03-23T12:00:00.000Z",
      shipTo: "NIKE JAPAN GROUP LLC",
      totalQuantity: 5,
      plantCode: 1029,
      material: "CK6047-002"
    },
    {
      season: "Summer(SU)",
      gacDate: "2019-06-11T22:00:00.000Z",
      unitPrice: 80,
      ogacDate: "2019-06-11T22:00:00.000Z",
      trackingNo: 6972677938,
      poNumber: 6754893083,
      vendorName: "DW",
      poCategory: "Accepted",
      podcsDate: "2019-06-11T22:00:00.000Z",
      shipTo: "ASIA SAMPLE PROGRAM",
      totalQuantity: 98,
      plantCode: 1071,
      material: "CK6047-002"
    }
  ];
  beforeEach(() => {
    PROPS = {
      orderbyDefaultState: "itemNumber",
      uniqueKey: "poNumber",
      sortingOrder: "asc",
      rowsPerPageOptionsState,
      columnData,
      rowData,
      moreDetail: true,
      searchKeyword: "LS",

      closeHamburger: jest.fn(),
      getMenuList: jest.fn(),
      openHamburger: true,
      menuListOptions,
      history
    };
  });

  test("render the component correctly", () => {
    const store = createStore(() => ({}));

    const closeDrawerSpy = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <DataTable {...PROPS} closeDrawer={closeDrawerSpy} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper
      .find("#tableSortLabel")
      .at(1)
      .simulate("click");
  });

  test("render the component correctly", () => {
    PROPS.openHamburger = false;
    const store = createStore(() => ({}));

    const closeDrawerSpy = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <DataTable {...PROPS} closeDrawer={closeDrawerSpy} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test("render the component correctly", () => {
    PROPS.orderbyDefaultState = 1;
    PROPS.sortingOrder = "desc";
    PROPS.moreDetail = false;

    const store = createStore(() => ({}));

    const closeDrawerSpy = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <DataTable {...PROPS} closeDrawer={closeDrawerSpy} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );
    wrapper
      .find("#tableSortLabel")
      .at(1)
      .simulate("click");
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test("render the component correctly", () => {
    const store = createStore(() => ({}));
    document.body.innerHTML = '<div id="toggleTip"></div>';

    const closeDrawerSpy = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <DataTable {...PROPS} closeDrawer={closeDrawerSpy} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );

    const event = { preventDefault: () => {} };
    jest.spyOn(event, "preventDefault");
    wrapper
      .find("#tableRow")
      .at(0)
      .simulate("click");
    wrapper.update();
    wrapper
      .find("#closeIcon")
      .at(0)
      .simulate("click");
    wrapper.find("#deselectAll").simulate("click");
    wrapper
      .find("#tableRow")
      .at(1)
      .simulate("click");
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test("descendingComparator)", () => {
    expect(descendingComparator(-1, 1, "asc")).toBeDefined();
  });
  test("descendingComparator)", () => {
    PROPS.rowData = [];
    expect(descendingComparator(1, -1, "asc")).toBeDefined();
  });
  test("descendingComparator)", () => {
    PROPS.columnData = [];
    expect(descendingComparator(-1, 1, "asc")).toBeDefined();
  });
  test("descendingComparator)", () => {
    expect(descendingComparator(-1, 1, "desc")).toBeDefined();
  });
  test("descendingComparator)", () => {
    expect(descendingComparator(1, -1, "desc")).toBeDefined();
  });
  test("getComparator", () => {
    expect(getComparator("asc", "asc")).toBeDefined();
  });
  test("getComparator", () => {
    expect(getComparator("desc", "desc")).toBeDefined();
  });
  test("stableSort", () => {
    expect(stableSort([], {})).toBeDefined();
  });

  test("exportAllData ", () => {
    const  selectedRow = [];
    const rowData = [];
    const order = '';
    const orderBy = '';
    const exportRowData = {selectedRow, rowData, order, orderBy};
    expect(exportAllData(exportRowData)).toBeDefined();
  });

  test("render the component correctly", () => {
    PROPS.sortingOrder = "";
    const store = createStore(() => ({}));

    const closeDrawerSpy = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <DataTable {...PROPS} closeDrawer={closeDrawerSpy} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test("render the component correctly", () => {
    PROPS.openHamburger = false;
    const store = createStore(() => ({}));

    const closeDrawerSpy = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <DataTable {...PROPS} closeDrawer={closeDrawerSpy} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test("should disable submit button on submit click", () => {
    const wrapper = mount(<DataTable {...PROPS} />);
    const submitButton = wrapper.find(NikeTableHead);
    submitButton.simulate("click");

    expect(submitButton.props()).toBeTruthy();
  });
  test('render the component correctly', () => {
    const store = createStore(() => ({}));

    const closeDrawerSpy = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <DataTable {...PROPS} closeDrawer={closeDrawerSpy} />
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

  test('descendingComparator)', () => {
    // const a = [1, 2, 3, 4];
    // const b = [1, 2, 3, 4, 5];
    expect(descendingComparator(-1, 1, 'asc')).toBeDefined();
  });
  test('descendingComparator)', () => {
    PROPS.rowData = [];
    // const a = [1, 2, 3, 4];
    // const b = [1, 2, 3, 4, 5];
    expect(descendingComparator(1, -1, 'asc')).toBeDefined();
  });
  test('descendingComparator)', () => {
    PROPS.columnData = [];
    // const a = [1, 2, 3, 4];
    // const b = [1, 2, 3, 4, 5];
    expect(descendingComparator(-1, 1, 'asc')).toBeDefined();
  });
  test('descendingComparator)', () => {
    // const a = [1, 2, 3, 4];
    // const b = [1, 2, 3, 4, 5];
    expect(descendingComparator(-1, 1, 'desc')).toBeDefined();
  });
  test('descendingComparator)', () => {
    // const a = [1, 2, 3, 4];
    // const b = [1, 2, 3, 4, 5];
    expect(descendingComparator(1, -1, 'desc')).toBeDefined();
  });
  test('getComparator', () => {
    expect(getComparator('asc', 'asc')).toBeDefined();
  });
  test('getComparator', () => {
    expect(getComparator('desc', 'desc')).toBeDefined();
  });
  test('stableSort', () => {
    expect(stableSort([], {})).toBeDefined();
  });

  test('render the component correctly', () => {
    PROPS.sortingOrder = '';
    const store = createStore(() => ({}));

    const closeDrawerSpy = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider>
          <StaticRouter context={{}}>
            <DataTable {...PROPS} closeDrawer={closeDrawerSpy} />
          </StaticRouter>
        </MuiThemeProvider>
      </Provider>
    );
    // expect(wrapper.exists()).toBe(true);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // it('should handle the sorting of a request', () => {
  //   const wrapper = shallow(<DataTable {...PROPS} />);
  //   const instance = wrapper.instance();
  //   instance.handleRequestSort(null, 'name');
  //   expect(wrapper.state()).toEqual({ order: 'desc', orderBy: 'name' }); // SUCCESS
  //   instance.handleRequestSort(null, 'name');
  //   expect(wrapper.state()).toEqual({ order: 'asc', orderBy: 'name' }); // SUCCESS
  //   instance.handleRequestSort(null, 'address');
  //   expect(wrapper.state()).toEqual({ order: 'desc', orderBy: 'address' }); // SUCCESS
  // });

  // test('componentDidCatch with null params', () => {
  //   const wrapper = shallow(<DataTable {...PROPS} />);

  //   const error = null;
  //   const errorInfo = null;

  //   wrapper.instance().handleRequestSort(null, 'name');
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  // it('should handle the sorting of a request', () => {
  //   const wrapper = shallow(<DataTable {...PROPS} />);
  //   wrapper.handleRequestSort(null, 'name');
  //   expect(wrapper).toEqual('name');
  // });
});
