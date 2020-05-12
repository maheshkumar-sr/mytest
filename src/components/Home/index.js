/* @flow */
import React from 'react';
import styles from './styles.scss';
import { imagesPath } from '../../utils/imagePath';

const Home = () => (
  <div className={styles.homePageContainer}>
    <h1>Home Page</h1>
    <div className={styles.homePageContent}>
      <span className={styles.logoImage}>
        <img src={imagesPath.nikeLogo.src} alt={imagesPath.nikeLogo.alt} />
        <span>DPOC</span>
      </span>
    </div>
  </div>
);
export default Home;
