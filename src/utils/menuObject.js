import { imagesPath } from './imagePath';

export default [
  {
    name: 'Dashboard',
    path: {
      src: imagesPath.iconDashboard.src,
      alt: imagesPath.iconDashboard.alt
    },
    link: '/'
  }, {
    name: 'P.O. Processing',
    path: {
      src: imagesPath.iconProcessing.src,
      alt: imagesPath.iconProcessing.alt
    },
    link: '/poProcessing',
    nested: [{
      name: 'P.O Search',
      path: {
        src: '',
        alt: ''
      },
      link: '/search'
    }],
    active: true
  }, {
    name: 'P.O. Reporting',
    path: {
      src: imagesPath.iconReporting.src,
      alt: imagesPath.iconReporting.alt
    },
    link: ''
  }, {
    name: 'Delivery Instructions ESI/DSI',
    path: {
      src: imagesPath.iconDelivery.src,
      alt: imagesPath.iconDelivery.alt
    },
    link: ''
  }, {
    name: 'Material Special Instructions',
    path: {
      src: imagesPath.iconMaterial.src,
      alt: imagesPath.iconMaterial.alt
    },
    link: ''
  }, {
    name: 'CR Subscription',
    path: {
      src: imagesPath.iconSubscription.src,
      alt: imagesPath.iconSubscription.alt
    },
    link: ''
  }, {
    name: 'Colloboration Report',
    path: {
      src: imagesPath.iconSupport.src,
      alt: imagesPath.iconSupport.alt
    },
    link: ''
  }, {
    name: 'Help',
    path: {
      src: imagesPath.iconHelp.src,
      alt: imagesPath.iconHelp.alt
    },
    link: ''
  }
];
