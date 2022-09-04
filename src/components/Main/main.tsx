import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isAuth } from '../store/authSlice';
import { fetchWordList } from '../store/wordListFetch';
import { AppDispatch } from '../store/store';
import OurGoals from '../OurGoals/ourGoals';
import OurTeam from '../OurTeam/ourTeam';
import './main.scss';

function Main() {
  const isAuthorized: boolean = useSelector(isAuth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      fetchWordList({
        isAuthorized,
      }),
    );
  }, [dispatch, isAuthorized]);

  return (
    <main className="main">
      <section className="start-page">
        <div className="start-page__hero-img" />
        <div className="start-page__decoration-container" />
        <div className="start-page__content">
          <h4 className="start-page__subtitle">IngLang team</h4>
          <h2 className="start-page__title">Learning English is so fanny!</h2>
          <p className="start-page__text">Присоединяйся уже сегодня и начни весело изучать английский вместе с нами!</p>
          {!isAuthorized ? (
            <div className="start-page__registration-form">
              <Link
                to="/#logIn"
                className="login__button registration-button"
              >
                LOG IN
              </Link>
              <Link
                to="/#logIn"
                className="registration__button registration-button"
              >
                SIGN UP
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>
      </section>
      <section className="youtube-video">
        <h2 className="youtube-video__title">Давай начнем!</h2>
        <iframe
          className="youtube-video__video"
          title="youtube"
          src="https://www.youtube.com/embed/li_9PBrcOcQ"
          frameBorder="1"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </section>
      <OurGoals />
      <OurTeam />
    </main>
  );
}

export default Main;
