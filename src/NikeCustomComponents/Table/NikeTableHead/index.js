/**
 * Date of Creation: Feb, 2020
 * Description : This file defines customized table header with sorting enabled.
 *  Using Material UI component in background.
 *
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import CheckboxItem from '../../FormGroups/NikeCheckBox';
import styles from './styles.scss';

interface Props {
  numSelected: number;
  order: string;
  orderBy: string;
  rowCount: number;
  columnData: Object;
  onRequestSort: any;
  onSelectAllClick: Function;
}

export default function NikeTableHead(props: Props) {
  const {
    onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, columnData
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead classes={{ root: styles.tableHead }}>
      <TableRow>
        <TableCell padding="checkbox">
          <CheckboxItem
            id="tableHeadCheckBoxItem"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {columnData.map((headCell) => (
          <TableCell
            key={headCell.key}
            align="left"
            sortDirection={orderBy === headCell.key ? order : false}
          >
            <TableSortLabel
              id="tableSortLabel"
              active={orderBy === headCell.key}
              direction={orderBy === headCell.key ? order : 'asc'}
              onClick={createSortHandler(headCell.key)}
              IconComponent={ArrowDropDown}
            >
              {headCell.label}
              {orderBy === headCell.key ? (
                <span className={`${styles.tableHeadVisuallyHidden}`}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

NikeTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  columnData: PropTypes.arrayOf(PropTypes.object).isRequired
};
