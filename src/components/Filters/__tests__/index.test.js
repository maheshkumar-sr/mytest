/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable quotes */
import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import POCategoryPage, { isValid } from ".."; 

jest.mock(
  "../../../NikeCustomComponents/FormGroups/NikeSelectBox",
  () =>
    function SelectBox() {
      return <span>SelectBox</span>;
    }
);

jest.mock(
  "../../../NikeCustomComponents/DatePicker",
  () =>
    function DatePicker() {
      return <span>DatePicker</span>;
    }
);

jest.mock(
  "../../../NikeCustomComponents/FormGroups/NikeTextField",
  () =>
    function TextField() {
      return <span>TextField</span>;
    }
);

describe("Test isValid", () => {
  test("isValid function", () => {
    expect(
      isValid({
        poCategory: "none",
        shipTo: "none",
        material: "",
        season: "none",
        period: "none",
        initialStateValueFactCode: { factoryCode: "none" }
      })
    ).toBe(true);

    expect(
      isValid({
        poCategory: "none",
        shipTo: "none",
        material: "none",
        season: "",
        period: "none",
        initialStateValueFactCode: { factoryCode: "none" }
      })
    ).toBe(true);

    expect(
      isValid({
        poCategory: "none",
        shipTo: "none",
        material: "none",
        season: "none",
        period: "",
        initialStateValueFactCode: { factoryCode: "none" }
      })
    ).toBe(true);

    expect(
      isValid({
        poCategory: "none",
        shipTo: "none",
        material: "none",
        season: "none",
        period: "none",
        initialStateValueFactCode: { factoryCode: "none" }
      })
    ).toBe(true);
  });
}); 

describe("<POCategoryPage /> ", () => {
  let PROPS = {};
  beforeEach(() => {
    PROPS = {
      checked: true,
      handleChange: jest.fn(),
      name: "name",
      value: 1234,
      label: "label",
      disabled: true,
      subLabel: "subLabel",
      labelPlacement: "labelPlacement",
      isBlackFill: true,
      id: "PO1234",
      searchedResultSet: [
        { value: "P.O Creation", key: "podcsDate" },
        { value: "OGAC Date", key: "ogacDate" },
        { value: "GAC Date", key: "gacDate" }
      ],
      initialSearchedResultSet: [
        {
          season: 'Falls(FA)',
          gacDate: '2019-07-14T15:00:00.000Z',
          unitPrice: 254,
          ogacDate: '2019-07-14T15:00:00.000Z',
          trackingNo: 6948841345,
          poNumber: 6754887737,
          vendorName: 'LS',
          poCategory: 'Accepted',
          podcsDate: '2019-07-14T15:00:00.000Z',
          shipTo: 'NIKE JAPAN GROUP LLC',
          totalQuantity: 48,
          plantCode: 1084,
          material: 'AT5582-901'
        }
      ],
      onChangeFilters: jest.fn(),
      PoFilterOnChange: jest.fn()
    };
  }); 

  test("render the component correctly", () => {
    const wrapper = mount(<POCategoryPage {...PROPS} />);

    expect(wrapper.exists()).toBe(true);
  });

  test("handleChangeFactoryCode with null params", () => {
    PROPS.searchedPOCategory = "none";
    const wrapper = mount(<POCategoryPage {...PROPS} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test("render the component correctly", () => {
    const closeDrawerSpy = jest.fn();
    const wrapper = mount(
      <POCategoryPage {...PROPS} closeDrawer={closeDrawerSpy} />
    );

    wrapper.find("#filterButton").simulate("click");
    wrapper.find("#clearAllFilter").simulate("click");
    wrapper
      .find("#selectedFromDate")
      .props()
      .handleDateChange();

    wrapper
      .find("#selectedToDate")
      .props()
      .handleDateChange();

    wrapper
      .find("#factorycode")
      .props()
      .onChange({ preventDefault: jest.fn(), target: { value: "123456" } });

    wrapper
      .find("#factorycode")
      .props()
      .onChange({ preventDefault: jest.fn(), target: { value: "qnb123456" } });

    wrapper
      .find("#seasonListDropDown")
      .props()
      .handleChangeDropDown({ target: { value: "ereret" } });

    wrapper
      .find("#materialsDropDown")
      .props()
      .handleChangeDropDown({ target: { value: "ereret" } });

    wrapper
      .find("#shipToListDropDown")
      .props()
      .handleChangeDropDown({ target: { value: "ereret" } });

    wrapper
      .find("#periodListDropDown")
      .props()
      .handleChangeDropDown({ target: { value: "ereret" } });

    wrapper
      .find("#poCategoryListDropDown")
      .props()
      .handleChangeDropDown({ target: { value: "ereret" } }); 

    expect(wrapper.exists()).toBe(true);
  });
});