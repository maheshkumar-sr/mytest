/* @flow */
import Home from './components/Home';
import POProcessing from './components/POProcessing';
import Search from './containers/Search';

export default [
  {
    path: '/',
    exact: true,
    name: 'home',
    component: Home
  }, {
    name: 'Poprocessing',
    path: '/poProcessing',
    component: POProcessing
  }, {
    name: 'Search',
    path: '/search',
    component: Search
  }
];
