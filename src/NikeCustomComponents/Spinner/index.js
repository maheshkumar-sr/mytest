/**
 * Date of Creation: Feb, 2020
 * Description :  This file is imported when loader needs
 *                to be displayed during large data subscription.
 * @flow
 */
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles.scss';

export default function CircularIndeterminate() {
  return (
    <div className={styles.root}>
      <CircularProgress
        className={styles.spinner}
      />
    </div>
  );
}
