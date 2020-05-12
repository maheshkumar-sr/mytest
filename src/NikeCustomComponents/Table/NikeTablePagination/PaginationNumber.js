/**
 * Date of Creation: Feb, 2020
 * Description : This file defines page range for pagination.
 *  Boundary count set to 6 i.e., it can display maximum 6 page number at a time.
 *
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from '@material-ui/core';
import styles from './styles.scss';

interface Props {
  boundaryCount: number;
  maxCount: number;
  onChange: any;
  count: number;
  rowsPerPage: number;
  page: number;
}

export default function PaginationNumber(props: Props) {
  const {
    boundaryCount, maxCount, onChange, count, rowsPerPage, page
  } = props;
  const numOfPages = Math.max(0, Math.ceil(count / rowsPerPage));
  let paginationNumber = (<div />);
  if (boundaryCount > 0 && boundaryCount <= maxCount) {
    if (boundaryCount === maxCount) {
      if (numOfPages > boundaryCount) {
        /* logic for number of pages even and odd.
          if even (Math.ceil((n+1)/2))-1) to same-2
          if odd same on both side */
        if (boundaryCount === 6) {
          if ((page > 3) && (page < (numOfPages - 2))) {
            paginationNumber = (Array.from(Array(boundaryCount), (ele, i) => (
              (((page - 3) + i) <= (numOfPages - 1)) && (
                <Button
                  classes={{
                    root: ((i === 3) ? (styles.selected) : (styles.paginationWrapper)),
                    label: styles.paginationLabel
                  }}
                  key={(page - 3) + i}
                  aria-label={`Go to page ${((page - 3) + i) + 1}`}
                  onClick={(e) => onChange(e, ((page - 3) + i) + 1)}
                >
                  {((page - 3) + i) + 1}
                </Button>
              ))));
          } else if (page >= (numOfPages - 2)) {
            paginationNumber = (Array.from(Array(boundaryCount), (ele, i) => (
              (((numOfPages - boundaryCount) + i) <= (numOfPages - 1)) && (
                <Button
                  classes={{
                    root: (
                      (((numOfPages - boundaryCount) + i) === page)
                        ? (styles.selected)
                        : (styles.paginationWrapper)
                    ),
                    label: styles.paginationLabel
                  }}
                  key={(numOfPages - boundaryCount) + i}
                  aria-label={`Go to page ${((numOfPages - boundaryCount) + i) + 1}`}
                  onClick={(e) => onChange(e, ((numOfPages - boundaryCount) + i) + 1)}
                >
                  {((numOfPages - boundaryCount) + i) + 1}
                </Button>
              )
            )));
          } else {
            paginationNumber = (Array.from(Array(boundaryCount), (ele, i) => (
              (i <= (numOfPages - 1)) && (
                <Button
                  classes={{
                    root: (((i) === page) ? (styles.selected) : (styles.paginationWrapper)),
                    label: styles.paginationLabel
                  }}
                  key={i}
                  aria-label={`Go to page ${i + 1}`}
                  onClick={(e) => onChange(e, i + 1)}
                >
                  {i + 1}
                </Button>
              )
            )));
          }
        }
      } else {
        paginationNumber = (Array.from(Array(boundaryCount), (ele, i) => (
          (i <= (numOfPages - 1)) && (
            <Button
              classes={{
                root: (((i) === page) ? (styles.selected) : (styles.paginationWrapper)),
                label: styles.paginationLabel
              }}
              key={i}
              aria-label={`Go to page ${i + 1}`}
              onClick={(e) => onChange(e, i + 1)}
            >
              {i + 1}
            </Button>
          )
        )));
      }
    } else {
      paginationNumber = (<div>Other Logic</div>);
    }
  }

  return (
    <div className={`${styles.paginationNumber}`}>
      <ButtonGroup classes={{ root: styles.paginationPanel }} variant="text" color="primary" aria-label="text primary button group">
        {paginationNumber}
      </ButtonGroup>
    </div>
  );
}

PaginationNumber.propTypes = {
  boundaryCount: PropTypes.number.isRequired,
  maxCount: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired
};
