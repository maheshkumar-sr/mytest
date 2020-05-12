/**
 * Date of Creation: Mar, 2020
 * Description : This file defines function to export table data into excel file.
 *
 * @flow
 */
import PropTypes from 'prop-types';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
// eslint-disable-next-line
import { stableSort, getComparator } from './index';

interface Props {
  selectedRow?: Object;
  columnData: Object;
  rowData?: Object;
  order: string;
  orderBy: string;
}
const exportToExcel = (props: Props) => {
  const {
    selectedRow,
    rowData,
    order,
    orderBy
  } = props;
  let eachSelectedRow;
  if (rowData) {
    eachSelectedRow = rowData && stableSort(rowData, getComparator(order, orderBy));
  } else {
    eachSelectedRow = selectedRow && stableSort(selectedRow, getComparator(order, orderBy));
  }
  const csvData = [];
  if (eachSelectedRow) {
    eachSelectedRow.map((eachRow) => (
      csvData.push({
        PONumber: eachRow.poNumber,
        TrackingPO: eachRow.trackingNo,
        ItemNumber: eachRow.plantCode,
        Material: eachRow.material,
        Quantity: eachRow.totalQuantity,
        ShipTo: eachRow.shipTo,
        VendorName: eachRow.vendorName,
        OGACDate: new Date(eachRow.ogacDate).toLocaleDateString(),
        GACDate: new Date(eachRow.gacDate).toLocaleDateString(),
        NetUnitPrice: eachRow.unitPrice
      })
    ));
  }
  const fileName = `POSearch_${Date.now()}`;
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = { Sheets: { PO_Results: ws }, SheetNames: ['PO_Results'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
  return false;
};

exportToExcel.propTypes = {
  selectedRow: PropTypes.arrayOf(PropTypes.object),
  columnData: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowData: PropTypes.arrayOf(PropTypes.object),
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

export default exportToExcel;
