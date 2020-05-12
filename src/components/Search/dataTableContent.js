/* @flow */
export default [
  {
    key: 'poNumber', type: 'numeric', link: true, label: 'P.O#'
  },
  {
    key: 'trackingNo', type: 'numeric', link: true, label: 'Trading P.O'
  },
  {
    key: 'plantCode', type: 'numeric', link: false, label: 'Item#'
  },
  {
    key: 'material', type: 'string', link: true, label: 'Material'
  },
  {
    key: 'totalQuantity', type: 'numeric', link: false, label: 'Quantity'
  },
  {
    key: 'shipTo', type: 'string', link: false, label: 'ShipTo'
  },
  {
    key: 'vendorName', type: 'string', link: false, label: 'VendorName'
  },
  {
    key: 'ogacDate', type: 'date', link: false, label: 'OGACDate'
  },
  {
    key: 'podcsDate', type: 'date', link: false, label: 'GACDate'
  },
  {
    key: 'unitPrice', type: 'numeric', link: false, label: 'NetUnitPrice'
  }
];
