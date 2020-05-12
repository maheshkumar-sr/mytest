/* @flow */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Header from './containers/Header';
import Hamburger from './containers/Hamburger';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import routes from './routes';
import styles from './App.scss';

export default function App() {
  return (
    <ErrorBoundary>
      <div className={`ncss-container ${styles.appContainer}`}>
        <div className={`ncss-row ${styles.appContainerHeader}`}>
          <div className="ncss-col-sm-12">
            <Header />
          </div>
        </div>
        <div className={`ncss-row ${styles.appContainerBody}`}>
          <div className={`ncss-col-sm-1 ${styles.appContainerBodyHamburger}`}>
            <Hamburger />
            <Divider orientation="vertical" flexItem className={styles.verticalDivider} />
          </div>
          <div className={`ncss-col-sm-11 ncss-col-sm-offset-1 ${styles.appContainerMainBody}`}>
            <Switch>
              {routes.map((route) => (
                <Route
                  key={route.name}
                  {...route}
                />
              ))}
            </Switch>
          </div>
        </div>
        <div className={`ncss-row ${styles.appContainerFooter}`}>
          <div className="ncss-col-sm-12">
            <Footer />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
