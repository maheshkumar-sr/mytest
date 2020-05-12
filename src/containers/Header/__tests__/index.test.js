import { mapStateToProps, mapsDispatchToProps } from '../index';

// const store = {
//     header: {openHamburger:{}},
//     header:{menuListOptions:{}}
// };

test('mapStateToProps', () => {
  expect(mapStateToProps()).toBeTruthy();
});

test('mapsDispatchToProps', () => {
  const data = mapsDispatchToProps((a, b) => (a, b));
  expect(data.openHamburger({})).toBeUndefined();
});
