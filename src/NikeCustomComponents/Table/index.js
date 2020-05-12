/**
 * Date of Creation: Feb, 2020
 * Description : This file defines a customized table with features
 *  like sorting, select, customized pagination, export features.
 *
 * @flow
 */
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { Link } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckboxItem from '../FormGroups/NikeCheckBox';
import NikeTablePagination from './NikeTablePagination';
import NikeTableHead from './NikeTableHead';
import Button from '../NikeButton';
import exportToExcel from './exportToExcel';
import styles from './styles.scss';

let exportRowData;
interface Props {
  orderbyDefaultState: string;
  sortingOrder: string;
  rowsPerPageOptionsState: Object;
  uniqueKey: string;
  columnData: Object;
  rowData: Object;
  moreDetail?: boolean;
  searchKeyword: string;
}

export function descendingComparator(a: Object, b: Object, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: Object, b: Object) => descendingComparator(a, b, orderBy)
    : (a: Object, b: Object) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array: Object, comparator: any) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const exportAllData = () => {
  exportToExcel(exportRowData);
};


export default function DataTable(props: Props) {
  const {
    orderbyDefaultState,
    uniqueKey,
    sortingOrder,
    rowsPerPageOptionsState,
    columnData,
    rowData,
    searchKeyword
  } = props;
  const [order, setOrder] = (sortingOrder) ? (React.useState(sortingOrder)) : (React.useState('asc'));
  const [orderBy, setOrderBy] = React.useState(orderbyDefaultState);
  const [selected, setSelected] = React.useState([]);
  const [selectedRow, setSelectedRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPageOptions] = React.useState([...rowsPerPageOptionsState, { label: 'All', value: -1 }]);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
  const isSelected = (uniKeyValue) => selected.indexOf(uniKeyValue) !== -1;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rowData.length - page * rowsPerPage);
  exportRowData = {
    rowData,
    columnData,
    order,
    orderBy
  };

  const LabelDisplayedRowsActions = (count) => {
    const labelDisplayedRows = (
      <span>
        Showing
        <span className={styles.labelDisplayRowColor}>
          {' '}
          {(page * rowsPerPage) + 1}
          -
          {(page + 1) * rowsPerPage}
          {' '}
        </span>
        {' '}
        of
        <span className={styles.labelDisplayRowColor}>
          {' '}
          {count}
          {' '}
        </span>
        {' results for \''}
        <span className={styles.labelDisplayRowColor}>{searchKeyword}</span>
        {'\''}
      </span>
    );
    return labelDisplayedRows;
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rowData.map((n) => n[uniqueKey]);
      setSelected(newSelecteds);
      const newSelectedRows = rowData;
      setSelectedRows(newSelectedRows);
      return;
    }
    setSelected([]);
    setSelectedRows([]);
  };

  const handleClick = (event, uniKeyValue, row) => {
    const selectedIndex = selected.indexOf(uniKeyValue);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, uniKeyValue);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    const selectedRowIndex = selectedRow.indexOf(row);
    let newSelectedRow = [];
    if (selectedRowIndex === -1) {
      newSelectedRow = newSelectedRow.concat(selectedRow, row);
    } else if (selectedRowIndex === 0) {
      newSelectedRow = newSelectedRow.concat(selectedRow.slice(1));
    } else if (selectedRowIndex === selectedRow.length - 1) {
      newSelectedRow = newSelectedRow.concat(selectedRow.slice(0, -1));
    } else if (selectedRowIndex > 0) {
      newSelectedRow = newSelectedRow.concat(
        selectedRow.slice(0, selectedRowIndex),
        selectedRow.slice(selectedRowIndex + 1)
      );
    }
    setSelectedRows(newSelectedRow);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const closeTooltip = () => {
    const el = document.getElementById('toggleTip');
    el.classList.add(`${styles.removeTooltip}`);
  };

  const tableTooltip = () => {
    const el = document.getElementById('toggleTip');
    if (el) {
      el.classList.remove(`${styles.removeTooltip}`);
    }

    const deselectAll = () => {
      setSelected([]);
      setSelectedRows([]);
      if (el) {
        el.classList.add(`${styles.removeTooltip}`);
      }
    };

    return (
      <div id="toggleTip" className={styles.selectedTableTooltip}>
        <div className={`ncss-col-sm-3 ${styles.selectPos}`}>
          <span>{`${selected.length} P.Os selected`}</span>
          <span
            id="deselectAll"
            className={styles.deselectButton}
            role="button"
            tabIndex={0}
            onClick={() => deselectAll()}
            onKeyDown={() => false}
          >
            Deselect all
          </span>
        </div>
        <div className={`ncss-col-sm-offset-5 ncss-col-sm-4 full ${styles.buttonAlignmnet}`}>
          <Button
            theme="white"
            onClick={() => exportToExcel({
              selectedRow,
              columnData,
              order,
              orderBy
            })}
          >
            Export
          </Button>
          <Button theme="white" disabled>Action</Button>
          <Button theme="white" disabled>Collaborate</Button>
          <CloseIcon
            id="closeIcon"
            onClick={() => closeTooltip()}
            classes={{ root: styles.closeIcon }}
          />
        </div>
      </div>
    );
  };

  return (
    <TableContainer className={`${styles.tableContainer} ${styles.tableRoot} `} component={Paper}>
      <div className={`ncss-col-sm-12 ${styles.headerPagination}`}>
        {LabelDisplayedRowsActions(rowData.length)}
      </div>
      {typeof (selected) === 'object' && selected.length > 0 && tableTooltip()}
      <Table className={`${styles.table}`} size="medium" aria-label="simple table">
        <NikeTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={rowData.length}
          columnData={columnData}
        />
        <TableBody className={`${styles.tableBody}`}>
          {(rowsPerPage > 0
            ? stableSort(rowData,
              getComparator(order, orderBy)).slice(page * rowsPerPage,
              page * rowsPerPage + rowsPerPage)
            : stableSort(rowData, getComparator(order, orderBy))
          ).map((row, index) => {
            const isItemSelected = isSelected(row[uniqueKey]);
            const labelId = `enhanced-table-checkbox-${index}`;
            return (
              <TableRow
                id="tableRow"
                hover
                onClick={(event) => {
                  event.preventDefault();
                  handleClick(event, row[uniqueKey], row);
                }}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={Math.random()}
                selected={isItemSelected}
                classes={{
                  root: styles.tableRow,
                  selected: `${styles.tableRowContainerSelected} ${styles.tableRowSelected}`
                }}
              >
                <TableCell padding="checkbox">
                  <CheckboxItem
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </TableCell>
                {columnData.map((headCell) => (
                  <TableCell
                    key={headCell.key}
                    align="left"
                    style={{ minWidth: '100px' }}
                  >
                    {(headCell.link === true) && (
                      <Link
                        href="/#"
                        component="button"
                        variant="body2"
                        className={styles.linkButtonClass}
                      >
                        {(headCell.type === 'date' ? new Date(row[headCell.uniKeyValue]).toLocaleDateString() : row[headCell.key])}
                      </Link>
                    )}
                    {(headCell.link === false) && (headCell.type === 'date' ? new Date(row[headCell.key]).toLocaleDateString() : row[headCell.key])}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={11} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <NikeTablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              colSpan={11}
              count={rowData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'Results per page' },
                native: true
              }}
              labelRowsPerPage="Results per page"
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              selected={selected}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

DataTable.propTypes = {
  orderbyDefaultState: PropTypes.string.isRequired,
  uniqueKey: PropTypes.string.isRequired,
  sortingOrder: PropTypes.string.isRequired,
  rowsPerPageOptionsState: PropTypes.arrayOf(PropTypes.number).isRequired,
  columnData: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowData: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchKeyword: PropTypes.string.isRequired
};
