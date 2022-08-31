import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { getWordList } from '../store/wordListSlice';
import WordCard from '../WordCard/wordCard';
import GroupPagination from './GroupPagination/groupPagination';
import GroupSelector from './GroupSelector/groupSelector';
import { WordListState } from '../store/types';
import './tutorial.scss';

function Tutorial() {
  const isAuthorized: boolean = useSelector(isAuth);
  const currentUserId: string = useSelector(getCurrentUserId);
  const wordList: WordListState = useSelector(getWordList);

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const group = useSelector(getCurrentGroup);
  const groupAndPage = useSelector(getGroupAndPage);
  const pageIndex = useSelector(getPageInCurrentGroup);

  useEffect(() => {
    dispatch(
      fetchWordList({
        isAuthorized,
        id: currentUserId,
        page: pageIndex,
        group,
      }),
    );
  }, [dispatch, isAuthorized, location.search, group, pageIndex]);

  const handleGroupChange = (newValue: number) => {
    const newGroup = newValue;
    const newGroupAndPage = {
      ...groupAndPage,
      currentGroup: newGroup,
      currentPage: groupAndPage.pageInGroup[newGroup],
    };
    dispatch(setCurrentGroup(newGroupAndPage));
  };

  const handlePageChange = (pageNum: number) => {
    const newGroupAndPage = {
      ...groupAndPage,
      [group]: pageNum - 1,
      currentPage: pageNum - 1,
    };
    dispatch(setCurrentPage(newGroupAndPage));
  };

  return (
    <div>
      <h1 className="tutorial__title">УЧЕБНИК</h1>
      <div className="word-list__container">
        {wordList.wordList.map(item => (
          <section className="card" key={`section${item.id || item._id}`}>
            <WordCard data={item} key={item.id} isAuth={isAuthorized} group={group} />
          </section>
        ))}
      </div>
      <div className="controls__container">
        <GroupSelector
          group={group}
          changeHandler={handleGroupChange}
        />

        <GroupPagination
          group={group}
          page={pageIndex + 1}
          changeHandler={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Tutorial;
