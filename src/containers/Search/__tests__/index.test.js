import { mapStateToProps, mapsDispatchToProps } from '../index';

const store = {
  poCategoryList: {},
  PoSearchResult: {},
  PoSearchResult: { error: {} },
  PoSearchResult: { spinner: {} },
  poFilteredSearchResult: { poFilteredSearchResult: {} }
};

test('mapStateToProps', () => {
  expect(mapStateToProps(store)).toBeTruthy();
});

test('mapsDispatchToProps', () => {
  const data = mapsDispatchToProps((a, b) => (a, b));
  expect(data.Loadspinner('')).toBeUndefined();
  expect(data.fetchPOCategory({})).toBeUndefined();
  expect(data.PoSearchDataInit({}, '', '')).toBeUndefined();
});
