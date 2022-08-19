import React from 'react';
import './main.scss';

function Main() {
  return (
    <main className="main">
      <section className="start-page">
        <div className="start-page__hero-img" />
        <div className="start-page__decoration-container" />
        <div className="start-page__content">
          <h4 className="start-page__subtitle">IngLang team</h4>
          <h2 className="start-page__title">Learning English is so fanny!</h2>
          <p className="start-page__text">Присоединяйся уже сегодня и начни весело изучать английский вместе с нами!</p>
          <div className="start-page__registration-form">
            <button className="login__button registration-button" type="button">SIGN IN</button>
            <button className="registration__button registration-button" type="button">REGISTRATION</button>
          </div>
        </div>
      </section>
      <section className="our-team">
        <div>Our team</div>
      </section>
    </main>
  );
}

export default Main;
