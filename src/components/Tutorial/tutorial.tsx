import React, { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuth, getCurrentUserId } from '../store/authSlice';
import { AppDispatch } from '../store/store';
import { fetchWordList } from '../store/wordListFetch';
import { getWordList } from '../store/wordListSlice';
import WordCard from '../WordCard/wordCard';
import './tutorial.scss';

function Tutorial() {
  const isAuthorized = useSelector(isAuth);
  const currentUserId = useSelector(getCurrentUserId);
  const wordList = useSelector(getWordList);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page'));
  const group = Number(searchParams.get('group'));
  const paginationHandler = () => {
    setSearchParams(`page=${2}&group=${2}`);
  };
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(
      fetchWordList({
        isAuthorized,
        id: currentUserId,
        page,
        group,
      }),
    );
  }, [dispatch, isAuthorized, location.search]);

  return (
    <>
      <h1>Tutorial</h1>
      {wordList.wordList.map(item => (
        <section className="card">
          <WordCard data={item} key={item.id} />
        </section>
      ))}
      <button type="button" onClick={paginationHandler}>
        Click
      </button>
    </>
  );
}

export default Tutorial;
