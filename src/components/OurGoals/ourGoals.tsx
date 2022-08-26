import React from 'react';
import teamImg1 from '../../assets/imgs/14.jpg';
import teamImg2 from '../../assets/imgs/17.jpg';
import teamImg3 from '../../assets/imgs/22.jpg';
import teamImg4 from '../../assets/imgs/26.jpg';
import teamImg5 from '../../assets/imgs/28.jpg';
import teamImg6 from '../../assets/imgs/19.jpg';
import teamImg7 from '../../assets/imgs/6.jpg';
import './ourGoals.scss';

function OurGoals() {
//   const itemData:Array<IImgs> = [
//     {
//       img: { teamImg1 },
//       title: 'our img',
//     },
//     {
//       img: { teamImg2 },
//       title: 'our img1',
//     },
//     {
//       img: { teamImg3 },
//       title: 'our img',
//     },
//     {
//       img: { teamImg4 },
//       title: 'our img',
//     },
//     {
//       img: { teamImg5 },
//       title: 'our img',
//     },
//     {
//       img: { teamImg6 },
//       title: 'our img',
//     },
//   ];

  return (
    <section className="our-goals">
      <div className="our-goals__imgs-container">
        <img src={teamImg1} alt="our img" className="our-goals__img our-goals__img--custom" />
        <img src={teamImg2} alt="our img" className="our-goals__img our-goals__img--custom1" />
        <img src={teamImg3} alt="our img" className="our-goals__img our-goals__img--custom2" />
        <img src={teamImg4} alt="our img" className="our-goals__img" />
        <img src={teamImg6} alt="our img" className="our-goals__img" />
        <img src={teamImg5} alt="our img" className="our-goals__img" />
        <img src={teamImg7} alt="our img" className="our-goals__img" />
      </div>
      <article className="our-goals__content">
        <h2 className="our-goals__title">ПОЧЕМУ МЫ   ?</h2>
        <h2 className="our-goals__title-ing">WHY CHOOSE US</h2>
        <ul className="our-goals__list">
          <li className="our-goals__item">
            <h3 className="our-goals__item-title">Быстрые результаты</h3>
            <p className="our-goals__item-content">
              Получите быстрый и гарантированный
              результат не выходя из дома
            </p>
          </li>
          <li className="our-goals__item">
            <h3 className="our-goals__item-title">Совершенно бесплатно</h3>
            <p className="our-goals__item-content">
              Вы можете сэкономить много денег
              изучая английский вместе с нами
            </p>
          </li>
          <li className="our-goals__item">
            <h3 className="our-goals__item-title">Это весело</h3>
            <p className="our-goals__item-content">
              Наши игры не дадут вам заскучать!
              Вы можете изучать английский легко и весело
            </p>
          </li>
        </ul>
      </article>
    </section>
  );
}

export default OurGoals;
