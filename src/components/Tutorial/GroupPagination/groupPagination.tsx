import React from 'react';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { TutorialWordsGroups } from '../../store/types';

import './groupPagination.scss';

const PAGES_IN_GROUP = 30;
const PAGES_TITLE = 'Страница: ';

interface PaginationProps {
  group: number;
  page: number;
  changeHandler: (page: number) => void;
}

export default function GroupPagination(props: PaginationProps) {
  const { group, page, changeHandler } = props;
  const isVisible = group !== TutorialWordsGroups.GROUP_7_USER;

  return (
    <div className="pagination__container">
      {isVisible ? (
        <Stack spacing={1}>
          <Typography className="pagination__header">
            {PAGES_TITLE}
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
            onChange={(_, num) => {
              changeHandler(num);
            }}
          />
        </Stack>
      ) : (
        ''
      )}
    </div>
  );
}
