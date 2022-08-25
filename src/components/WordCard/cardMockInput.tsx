import { PaginatedResults, Difficulty } from '../../Api/api-types';

const cardMockInput:PaginatedResults = {
  id: '5e9f5ee35eb9e72bc21af702',
  group: 1,
  page: 0,
  word: 'popular',
  image: 'files/01_0611.jpg',
  audio: 'files/01_0611.mp3',
  audioMeaning: 'files/01_0611_meaning.mp3',
  audioExample: 'files/01_0611_example.mp3',
  textMeaning: 'A <i>popular</i> thing is liked by many people.',
  textExample: 'These people are listening to a <b>popular</b> man speak.',
  transcription: '[pάpjulər]',
  textExampleTranslate: 'Эти люди слушают разговор популярного человека',
  textMeaningTranslate: 'Популярная вещь нравится многим людям',
  wordTranslate: 'популярный',
  userWord: {
    difficulty: Difficulty.Weak,
    optional: {
      wins: 1,
      fails: 2,
    },
  },
};
export default cardMockInput;
