import React from 'react';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import { TutorialWordsGroups } from '../../store/types';
import { getIsNotLearnedPageList } from '../../store/isLearnedSlice';
import './groupPagination.scss';

const PAGES_IN_GROUP = 30;
const PAGES_TITLE = 'Страница: ';

interface PaginationProps {
  group: number;
  page: number;
  changeHandler: (page: number) => void;
}

export default function GroupPagination(props: PaginationProps) {
  const isNotLearnedPages = useSelector(getIsNotLearnedPageList);
  const { group, page, changeHandler } = props;
  const isVisible = group !== TutorialWordsGroups.GROUP_7_USER;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isCurrentGroupLearned = new Set(
    isNotLearnedPages.isNotLearnedPages[group],
  );
  // const isPageNotLearned = isCurrentGroupLearned.has(page);

  return (
    <div className="pagination__container">
      {isVisible ? (
        <Stack spacing={1}>
          <Typography
            className="pagination__header"
          >
            {PAGES_TITLE}
            {page}
          </Typography>
          <Pagination
            siblingCount={0}
            className="pagination"
            count={PAGES_IN_GROUP}
            color="secondary"
            page={page}
            variant="outlined"
            size="large"
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
