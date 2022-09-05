import React from 'react';
import githubIcon from '../../assets/icons/Github_logo.png';
import lisaw from '../../assets/imgs/team/1LisaW.jpg';
import weranika from '../../assets/imgs/team/Weranika.jpg';
import madKorney from '../../assets/imgs/team/madKorney.jpg';
import './ourTeam.scss';

function OurTeam() {
  return (
    <section className="our-team">
      <h2 className="our-team__title">ДАВАЙ ЗНАКОМИТЬСЯ</h2>
      <article className="our-team__person">
        <img
          src={lisaw}
          alt="lisaw"
          className="person__img"
        />
        <div className="person__content">
          <div className="person__title-container">
            <h3 className="person__title">
              1lisaw
            </h3>
            <a
              className="person__github-link"
              href="https://github.com/1lisaw"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={githubIcon}
                alt="github icon"
                className="person__github-link--icon"
              />
            </a>
          </div>
          <h5 className="person__subtitle">Team leader, Frontend developer</h5>
          <p className="person__info">
            Координанор и лидер команды. Отвечала за server-client API,
            shared/reusable components игр, частичный дизайн и логику игр.
            Создла авторизацию UI/services и redux-store.
          </p>
        </div>
      </article>

      <article className="our-team__person">
        <img
          src={weranika}
          alt="weranika"
          className="person__img"
        />
        <div className="person__content">
          <div className="person__title-container">
            <h3 className="person__title">
              Weranika
            </h3>
            <a
              className="person__github-link"
              href="https://github.com/Weranika"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={githubIcon}
                alt="github icon"
                className="person__github-link--icon"
              />
            </a>
          </div>
          <h5 className="person__subtitle">Frontend developer</h5>
          <p className="person__info">
            Определение единого дизайна приложения. Создание навигации и настройка роутинга.
            Вёрстка, адаптив и UI главной страницы и списка слов. Создание карточки слова,
            аудиокомпонента электронного учебника, аудио в Аудиовызове и игровой статистике.
            Частичный дизайн игр и учебника, частичная логика игр.
          </p>
        </div>
      </article>

      <article className="our-team__person">
        <img
          src={madKorney}
          alt="weranika"
          className="person__img"
        />
        <div className="person__content">
          <div className="person__title-container">
            <h3 className="person__title">
              madkorney
            </h3>
            <a
              className="person__github-link"
              href="https://github.com/Weranika"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={githubIcon}
                alt="github icon"
                className="person__github-link--icon"
              />
            </a>
          </div>
          <h5 className="person__subtitle">Frontend developer</h5>
          <p className="person__info">
            Создал страницу Статистики с графической визуализацией,
            спроектировал структуру данных для работы со статистикойю
            Так же внедрил постраничное отображение данных в учебнике
            и навигация по страницам и разделам учебника.
          </p>
        </div>
      </article>
    </section>
  );
}

export default OurTeam;
