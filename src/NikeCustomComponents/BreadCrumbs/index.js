/**
 * Date of Creation: Feb, 2020
 * Description : This file defines custom breadcrumbs,
 *  type of secondary navigation scheme that reveals the user's location in application.
 *
 * @flow
 */
import React, { useState } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.scss';


function CustomBreadcrumbs(props) {
  const { breadCrumbList, pathName } = props;
  const breadCrumbItemsPath = breadCrumbList.get(pathName)
    && breadCrumbList.get(pathName).breadCrumbItemsPath;
  const [breadCrumbItems, setBreadCrumbsValue] = useState(breadCrumbItemsPath);

  React.useEffect(() => {
    setBreadCrumbsValue(breadCrumbList.get(pathName));
  }, [pathName]);


  const breadCrumbsPath = (linkTo) => {
    if (linkTo === '/') {
      setBreadCrumbsValue(
        breadCrumbList.get(linkTo)
      );
    } else if (linkTo === '/poProcessing') {
      setBreadCrumbsValue(
        breadCrumbList.get(linkTo)
      );
    } else if (linkTo === '/search') {
      setBreadCrumbsValue(
        breadCrumbList.get(linkTo)
      );
    }
  };

  return (
    <div className={styles.breadCrumbContainer}>
      {breadCrumbItems && (
        <Breadcrumbs
          className={styles.breadCrumb}
          separator={<NavigateNextIcon fontSize="small" />}
        >
          {breadCrumbItems.map(({ linkTo, label }) => (
            <Link
              key={label}
              to={linkTo}
              className={styles.breadCrumbsPath}
              onClick={() => breadCrumbsPath(linkTo)}
            >
              {label}
            </Link>
          ))}
        </Breadcrumbs>
      )}
    </div>
  );
}

CustomBreadcrumbs.propTypes = {
  breadCrumbList: PropTypes.objectOf(PropTypes.object).isRequired,
  pathName: PropTypes.string.isRequired
};

export default withRouter(CustomBreadcrumbs);
