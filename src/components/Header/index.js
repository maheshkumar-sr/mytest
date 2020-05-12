/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Breadcrumbs from '../../NikeCustomComponents/BreadCrumbs';
import styles from './styles.scss';
import { imagesPath } from '../../utils/imagePath';

interface Props {
  location: Object;
  openHamburger: ()=>{};
}

const Header = (props: Props) => {
  const { location, openHamburger } = props;

  const breadCrumbList = new Map([
    ['/', [{ linkTo: '/', label: 'Home' }]],

    ['/poProcessing', [{ linkTo: '/', label: 'Home' },
      { linkTo: '/poProcessing', label: 'P.O Processing' }]],

    ['/search', [{ linkTo: '/', label: 'Home' },
      { linkTo: '/poProcessing', label: 'P.O Processing' },
      { linkTo: '/search', label: 'P.O Search' }]]
  ]);

  return (
    <header className={`ncss-row ${styles.pageHeader}`}>
      <div className={`ncss-col-sm-1 ${styles.menuLeftHeader}`}>
        <button className={styles.menuHeaderImage} onClick={openHamburger} type="button">
          <img src={imagesPath.menuHeader.src} alt={imagesPath.menuHeader.alt} />
        </button>
        <Divider orientation="vertical" flexItem className={styles.verticalDivider} />
      </div>
      <div className={`ncss-col-sm-11 ${styles.menuRightHeader}`}>
        <Breadcrumbs
          breadCrumbList={breadCrumbList}
          pathName={location.pathname}
        />
      </div>
    </header>
  );
};

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  openHamburger: PropTypes.func.isRequired
};

export default Header;
