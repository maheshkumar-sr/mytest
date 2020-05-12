/* @flow */
import { connect } from 'react-redux';
import type { Dispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openHamburger } from '../../actions/header';
import Header from '../../components/Header';

export const mapStateToProps = () => ({});

export const mapsDispatchToProps = (dispatch: Dispatch) => ({
  openHamburger: () => dispatch(openHamburger())
});
const HeaderWrappper = withRouter(Header);
export default connect(mapStateToProps, mapsDispatchToProps)(HeaderWrappper);
