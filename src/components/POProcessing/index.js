/* @flow */
import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './styles.scss';
import imagePath from '../../utils/imagePath';


const POProcessing = () => (
  <div className="ncss-row">
    <div className="ncss-col-sm-12">
      <div className={styles.errorText}>
        <span className={styles.underProcess}>
          <img src={imagePath.iconProcess.src} alt={imagePath.iconProcess.alt} height="50" width="50" />
        </span>
        <div className="headline-3">
          We are currently working on this page and will launch soon !!.
        </div>
        <div className="headline-1">Sorry for this inconvenience.</div>
      </div>
    </div>
  </div>
);

export default withRouter(POProcessing);
