import React from 'react';

function Main() {
  return (
    <main className="main">
      <section className="start-page">
        <div className="start-page__hero-img" />
        <div className="start-page__decoration-container" />
        <div className="start-page__text">
          <h4 className="start-page__subtitle">IngLang team</h4>
          <h2>Learning English is so fanny!</h2>
          <p>Присоединяйся уже сегодня и начни весело изучать английский с нами</p>
          <div className="start-page__registration-form">
            <button className="login__button" type="button">Sign in</button>
            <button className="registration__button" type="button">Registration</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
