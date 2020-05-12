import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import POProcessing from '..';

jest.mock(
  '../../../NikeCustomComponents/FormGroups/NikeCheckBox/index',
  () => function CustomCheckBox() {
    return <span>CustomCheckBox</span>;
  },
);
jest.mock(
  '../../../NikeCustomComponents/FormGroups/NikeRadioButton/index.js',
  () => function RadioButtonsGroup() {
    return <span>RadioButtonsGroup</span>;
  },
);
jest.mock(
  '../../../NikeCustomComponents/NikeButton/index.js',
  () => function Buttons() {
    return <span>Buttons</span>;
  },
);

describe('<POProcessing /> ', () => {
  let PROPS = {};
  beforeEach(() => {
    PROPS = {
      angled: false,
      leftArrow: false,
      rightArrow: false,
      discreet: true,
      fullwidth: 'true',
      children: '',
      variant: '',
      emphasis: '',
      customClass: {},
      theme: 'black',
      fullWidth: true,
    };
  });

  test('render the component correctly', () => {
    const wrapper = shallow(<POProcessing {...PROPS} />);
    expect(wrapper.exists()).toBe(true);
  });
});
