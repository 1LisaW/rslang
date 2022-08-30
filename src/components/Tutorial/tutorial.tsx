import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuth, getCurrentUserId } from '../store/authSlice';
import { getCurrentGroup, getGroupAndPage } from '../store/userSettingsSlice';
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
  const page = useSelector(getGroupAndPage);
  const currentPage = page.pageInGroup[group] || 0;

  useEffect(() => {
    dispatch(
      fetchWordList({
        isAuthorized,
        id: currentUserId,
        page: currentPage,
        group,
      }),
    );
  }, [dispatch, isAuthorized, location.search]);

  return (
    <div>
      <h1>Tutorial</h1>
      <div className="word-list__container">
        {wordList.wordList.map(item => (
          <section className="card" key={`section${item.id || item._id}`}>
            <WordCard data={item} key={item.id} />
          </section>
        ))}
      </div>
      <div className="controls__container">
        <GroupSelector />
        <GroupPagination group={group} page={currentPage} />
      </div>
    </div>
  );
}

export default Tutorial;
