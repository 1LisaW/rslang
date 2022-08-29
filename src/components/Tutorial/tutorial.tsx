import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAuth, getCurrentUserId } from '../store/authSlice';
import { getCurrentGroup, getGroupAndPage } from '../store/userSettingsSlice';
import { AppDispatch } from '../store/store';
import { fetchWordList } from '../store/wordListFetch';
import { getWordList } from '../store/wordListSlice';
import WordCard from '../WordCard/wordCard';
import GroupPagination from './GroupPagination/groupPagination';
import GroupSelector from './GroupSelector/groupSelector';
import './tutorial.scss';

function Tutorial() {
  const isAuthorized = useSelector(isAuth);
  const currentUserId = useSelector(getCurrentUserId);
  const wordList = useSelector(getWordList);
  const dispatch = useDispatch<AppDispatch>();

  const group = useSelector(getCurrentGroup);
  const page = useSelector(getGroupAndPage).pageInGroup[group];

  useEffect(() => {
    dispatch(fetchWordList({ isAuthorized, id: currentUserId }));
  }, [dispatch, currentUserId]);
  return (
    <div>
      <h1>Tutorial</h1>
      <div className="word-list__container">
        {wordList.wordList.map(item => (
          <section className="card">
            <WordCard data={item} />
          </section>
        ))}
      </div>
      <div className="controls__container">
        <GroupSelector />
        <GroupPagination group={group} page={page} />
      </div>
    </div>
  );
}

export default Tutorial;
