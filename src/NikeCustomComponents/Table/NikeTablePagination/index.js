/**
 * Date of Creation: Feb, 2020
 * Description : This file defines custom pagination panel for the data table.
 *
 * @flow
 */
import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import Button from '../../NikeButton';
import PaginationNumber from './PaginationNumber';
// eslint-disable-next-line
import { exportAllData } from '../index';
import styles from './styles.scss';

interface TableProps {
  count: number;
  onChangePage: (MouseEvent, number)=>{};
  page: number;
  rowsPerPage: number;
}

export function TablePaginationActions(props: TableProps) {
  const {
    count, page, rowsPerPage, onChangePage
  } = props;

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleOnChange = (event, pageNum) => {
    onChangePage(event, pageNum - 1);
  };

  return (
    <>
      <div className={styles.tablePaginationComponent}>
        <IconButton
          id="tablePaginationNext"
          classes={{ root: styles.paginationNextPrevButton }}
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          Previous
        </IconButton>
        <PaginationNumber
          id="tablePaginationNumber"
          boundaryCount={6}
          maxCount={6}
          onChange={handleOnChange}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
        />
        <IconButton
          id="tablePaginationPrevious"
          classes={{ root: styles.paginationNextPrevButton }}
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          Next
        </IconButton>
      </div>
      <div className={styles.exportButton}>
        <Button id="exportAll" onClick={() => exportAllData()}>
          Export Data
        </Button>
      </div>
    </>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

interface NiketableProps {
  rowsPerPageOptions: Object;
  colSpan: number;
  count: number;
  rowsPerPage: number;
  page: number;
  SelectProps: any;
  labelRowsPerPage: string;
  onChangePage: (MouseEvent, Function)=>{};
  onChangeRowsPerPage: Function | null;
}

export default function NikeTablePagination(props: NiketableProps) {
  const {
    rowsPerPageOptions,
    colSpan,
    count,
    rowsPerPage,
    labelRowsPerPage,
    page,
    SelectProps,
    onChangePage,
    onChangeRowsPerPage
  } = props;
  return (
    <TablePagination
      classes={{
        root: styles.paginationPanel,
        spacer: styles.tablePaginationSpacer,
        selectRoot: styles.tablePaginationSelectRoot,
        select: styles.tablePaginationSelect,
        selectIcon: styles.tablePaginationSelectIcon,
        caption: styles.caption
      }}
      rowsPerPageOptions={rowsPerPageOptions}
      colSpan={colSpan}
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      labelRowsPerPage={labelRowsPerPage}
      SelectProps={SelectProps}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
      labelDisplayedRows={() => false}
    />
  );
}

NikeTablePagination.propTypes = {
  rowsPerPageOptions: PropTypes.arrayOf(oneOfType([PropTypes.number, PropTypes.object])).isRequired,
  colSpan: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  SelectProps: PropTypes.shape({
    inputProps: PropTypes.shape({
      'aria-label': PropTypes.string
    }),
    native: PropTypes.bool
  }).isRequired,
  labelRowsPerPage: PropTypes.string.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired
};
