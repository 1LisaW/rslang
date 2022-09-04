import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VerifiedIcon from '@mui/icons-material/Verified';
import { isAuth, getCurrentUserId } from '../store/authSlice';
import {
  getCurrentGroup,
  getGroupAndPage,
  setCurrentGroup,
  setCurrentPage,
  getPageInCurrentGroup,
} from '../store/userSettingsSlice';
import { AppDispatch } from '../store/store';
import { fetchWordList } from '../store/wordListFetch';
import { getWordList, getIsGameAvailable } from '../store/wordListSlice';
import WordCard from '../WordCard/wordCard';
import GroupPagination from './GroupPagination/groupPagination';
import GroupSelector from './GroupSelector/groupSelector';
import { WordListState } from '../store/types';
import { fetchAuth } from '../store/authFetch';
import { fetchUserSettings } from '../store/userSettingsFetch';
import StorageWorker from '../../localStorage';
import './tutorial.scss';
import Api from '../../Api/api';

function Tutorial() {
  const isAuthorized: boolean = useSelector(isAuth);
  const currentUserId: string = useSelector(getCurrentUserId);
  const wordList: WordListState = useSelector(getWordList);
  const isPageNotLearned = useSelector(getIsGameAvailable);

  const dispatch = useDispatch<AppDispatch>();

  const group = useSelector(getCurrentGroup);
  const groupAndPage = useSelector(getGroupAndPage);
  const pageIndex = useSelector(getPageInCurrentGroup);

  useEffect(() => {
    dispatch(fetchAuth(StorageWorker.userId));
    dispatch(fetchUserSettings({ id: StorageWorker.userId, isAuthorized }));
  }, [dispatch, currentUserId]);

  useEffect(() => {
    dispatch(
      fetchWordList({
        isAuthorized,
        id: currentUserId,
        page: pageIndex,
        group,
        wordsPerPage: 20,
      }),
    );
  }, [dispatch, isAuthorized, group, pageIndex]);

  const handleGroupChange = (newValue: number) => {
    const newGroup = newValue;
    const newGroupAndPage = {
      currentGroup: newGroup,
      currentPage: groupAndPage.pageInGroup[newGroup] || 0,
      pageInGroup: groupAndPage.pageInGroup,
    };
    dispatch(setCurrentGroup(newGroupAndPage));
    Api.updateUserSettings(currentUserId, { optional: newGroupAndPage });
  };

  const handlePageChange = (pageNum: number) => {
    const newGroupAndPage = {
      currentGroup: groupAndPage.currentGroup,
      pageInGroup: {
        ...groupAndPage,
        [groupAndPage.currentGroup]: pageNum - 1,
      },
      currentPage: pageNum - 1,
    };
    dispatch(setCurrentPage(newGroupAndPage));
    Api.updateUserSettings(currentUserId, { optional: newGroupAndPage });
  };

  const wordListData =
    group === 6
      ? wordList.wordList.filter(word => word.userWord?.difficulty === 'hard')
      : wordList.wordList;

  return (
    <main className="tutorial-container">
      <h1 className="tutorial__title">УЧЕБНИК</h1>
      <div className="word-list__container">
        {!isPageNotLearned && (
          <VerifiedIcon
            sx={{
              position: 'fixed',
              top: '100px',
              right: '25px',
              fontSize: '5rem',
              color: 'green',
            }}
          />
        )}
        {wordListData.map(item => (
          <section className="card" key={`section${item.id || item._id}`}>
            <WordCard
              data={item}
              key={item.id}
              isAuth={isAuthorized}
              group={group}
              userId={currentUserId}
            />
          </section>
        ))}
      </div>
      <div className="controls__container">
        <GroupSelector group={group} changeHandler={handleGroupChange} />

        <GroupPagination
          group={group}
          page={(pageIndex || 0) + 1}
          changeHandler={handlePageChange}
        />
      </div>
    </main>
  );
}

export default Tutorial;
