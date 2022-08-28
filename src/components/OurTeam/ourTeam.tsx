import React from 'react';
import githubIcon from '../../assets/icons/Github_logo.png';
import lisaw from '../../assets/imgs/team/1LisaW.jpg';
import weranika from '../../assets/imgs/team/Weranika.jpg';
import madKorney from '../../assets/imgs/team/madKorney.png';
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
            Координировала команду...Lorem Ipsum is simply dummy
            text of the printing and typesetting industry. Lorem
            Ipsum has been the industry standard dummy text ever
            since the 1500s, when an unknown printer took a galley
            of type and scrambled it to make a type specimen book.
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
            Создала навигацию, настроила роутинг...Lorem Ipsum is
            simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
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
            Создал статистику, пагинацию...Lorem Ipsum is simply dummy
            text of the printing and typesetting industry. Lorem Ipsum
            has been the industry standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to
            make a type specimen book.
          </p>
        </div>
      </article>
    </section>
  );
}

export default OurTeam;
