import React, { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuth, getCurrentUserId } from '../store/authSlice';
import { AppDispatch } from '../store/store';
import { fetchWordList } from '../store/wordListFetch';
import { getWordList } from '../store/wordListSlice';
import WordCard from '../WordCard/wordCard';
import GroupPagination from './GroupPagination/groupPagination';
import './tutorial.scss';
import { WordListState } from '../store/types';

function Tutorial() {
  const isAuthorized: boolean = useSelector(isAuth);
  const currentUserId: string = useSelector(getCurrentUserId);
  const wordList: WordListState = useSelector(getWordList);

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
    <div>
      <h1>Tutorial</h1>
      <div className="word-list__container">
        {wordList.wordList.map(item => (
          <section className="card">
            <WordCard data={item} key={item.id} />
          </section>
        ))}
      </div>
      <GroupPagination isVisible page={24} />
      <button type="button" onClick={paginationHandler}>
        Click
      </button>
    </div>
  );
}

export default Tutorial;
