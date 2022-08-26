import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAuth, getCurrentUserId } from '../store/authSlice';
import { AppDispatch } from '../store/store';
import { fetchWordList } from '../store/wordListFetch';
import { getWordList } from '../store/wordListSlice';
import WordCard from '../WordCard/wordCard';

function Tutorial() {
  const isAuthorized = useSelector(isAuth);
  const currentUserId = useSelector(getCurrentUserId);
  const wordList = useSelector(getWordList);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchWordList({ isAuthorized, id: currentUserId }));
  }, [dispatch, currentUserId]);
  return (
    <>
      <h1>Tutorial</h1>
      {wordList.wordList.map(item => (
        <WordCard data={item} />
      ))}
    </>
  );
}

export default Tutorial;
