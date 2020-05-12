/* @flow */
import { connect } from 'react-redux';
import type { Dispatch } from 'react-redux';
import { closeHamburger, getMenuList } from '../../actions/header';
import Hamburger from '../../NikeCustomComponents/Hamburger';

export const mapStateToProps = (state: Object) => ({
  openHamburger: state.header.openHamburger,
  menuListOptions: state.header.menuListOptions
});

export const mapsDispatchToProps = (dispatch: Dispatch) => ({
  closeHamburger: () => dispatch(closeHamburger()),
  getMenuList: () => dispatch(getMenuList())
});
export default connect(mapStateToProps, mapsDispatchToProps)(Hamburger);
