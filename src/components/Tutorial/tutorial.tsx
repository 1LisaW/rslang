import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAuth, getCurrentUserId } from '../store/authSlice';
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
        <GroupSelector group={1} />
        <GroupPagination isVisible page={24} />
      </div>
    </div>
  );
}

export default Tutorial;
