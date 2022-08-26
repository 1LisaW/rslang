import React from 'react';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import './groupPagination.scss';
import { TutorialWordsGroups } from '../../store/types';

const PAGES_IN_GROUP = 30;

interface PaginationData {
  page: number;
}

export default function GroupPagination(props: PaginationData) {
  const { page } = props;
  const isVisible = page !== TutorialWordsGroups.GROUP_7_USER;

  return (
    <div className="pagination__container">
      {isVisible ? (
        <Stack spacing={1}>
          <Typography className="pagination__header">
            Page:
            {page}
          </Typography>
          <Pagination
            className="pagination"
            count={PAGES_IN_GROUP}
            page={page}
            variant="outlined"
            shape="rounded"
            size="large"
            showFirstButton
            showLastButton
          />
        </Stack>
      ) : (
        ''
      )}
    </div>
  );
}
