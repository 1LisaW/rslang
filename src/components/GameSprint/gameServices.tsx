import { WordListState } from '../store/types';

const NUMBER_WORDS_PER_PAGE = 20;

export const getRandomNumber = (limit: number) => Math.floor(Math.random() * limit + 0.5);

export const getWordsForGame = (wordList: WordListState) => {
  if (wordList.wordList.length === 0) return [];
  const wordData = wordList.wordList;
  console.log('wordList.wordList ', wordData);
  return wordData.map((wordItem, idx) => {
    const randomIdx = getRandomNumber(NUMBER_WORDS_PER_PAGE - 1);
    const optimizedRndIdx = Math.random() > 0.5 ? idx : randomIdx;
    console.log('IDX', idx, randomIdx, wordData);
    const randomTranslate = wordData[optimizedRndIdx]?.wordTranslate;
    const correctIdx = randomTranslate === wordItem?.wordTranslate ? 0 : 1;
    const dataItem = {
      word: wordItem.word,
      wordTranslate: randomTranslate,
      correctButtonIdx: correctIdx,
    };
    return dataItem;
  });
};
