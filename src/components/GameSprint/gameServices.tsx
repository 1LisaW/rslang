import { PaginatedResults, Difficulty } from '../../Api/api-types';
import { WordListState } from '../store/types';
import Api from '../../Api/api';

const NUMBER_WORDS_PER_PAGE = 20;

type StatisticProps = {
  wordList: PaginatedResults[] | [];
  icons: boolean[];
};

export const getRandomNumber = (limit: number) => Math.floor(Math.random() * limit + 0.5);

export const getWordsForGame = (wordList: WordListState) => {
  if (wordList.wordList.length === 0) return [];
  const wordData = wordList.wordList;
  return wordData.map((wordItem, idx) => {
    const randomIdx = getRandomNumber(NUMBER_WORDS_PER_PAGE - 1);
    const optimizedRndIdx = Math.random() > 0.5 ? idx : randomIdx;
    const randomTranslate = wordData[optimizedRndIdx]?.wordTranslate;
    const correctIdx = randomTranslate === wordItem?.wordTranslate ? 0 : 1;
    const dataItem = {
      word: wordItem.word,
      wordTranslate: randomTranslate,
      correctButtonIdx: correctIdx,
      wasInGame:
        wordItem.userWord &&
        wordItem.userWord.optional &&
        wordItem.userWord.optional.wasInGame,
    };
    return dataItem;
  });
};

const generateUpdateUserWord = (
  gameStatsName: 'sprintStats' | 'audioCallStats',
  initialWordList: PaginatedResults[],
  gameResults: boolean[],
) => {
  const resultOptions = initialWordList.map((word, idx) => {
    const userWord = { ...word.userWord };
    const optional =
      word.userWord && word.userWord.optional
        ? { ...word.userWord.optional }
        : { [gameStatsName]: {} };

    optional[gameStatsName] = { ...optional[gameStatsName] };
    const gameStats = word.userWord
      ? { ...word.userWord.optional[gameStatsName] }
      : {};
    if (word.userWord) {
      if (gameResults[idx]) {
        optional[gameStatsName]!.wins = gameStats.wins ? gameStats.wins + 1 : 1;
        optional[gameStatsName]!.fails = gameStats.fails ? gameStats.fails : 0;
        optional.winsInARow = optional.winsInARow ? optional.winsInARow + 1 : 1;
        if (
          (optional.winsInARow >= 3 && word.userWord.difficulty !== 'hard') ||
          (optional.winsInARow >= 5 && word.userWord.difficulty === 'hard')
        ) {
          optional.isLearned = true;
          userWord.difficulty = Difficulty.Easy;
        }
      } else {
        optional[gameStatsName]!.fails = gameStats.fails
          ? gameStats.fails + 1
          : 1;
        optional[gameStatsName]!.wins = gameStats.wins ? gameStats.wins : 0;
        if (optional.isLearned) optional.isLearned = false;
        optional.winsInARow = 0;
      }
    } else {
      optional[gameStatsName]!.wins = gameResults[idx] ? 0 : 1;
      optional[gameStatsName]!.fails = gameResults[idx] ? 1 : 0;
      if (optional.isLearned) optional.isLearned = gameResults[idx];
      optional.winsInARow = gameResults[idx] ? 1 : 0;
      userWord.difficulty = Difficulty.Easy;
    }
    optional.wasInGame = true;

    return word.userWord && word.userWord.difficulty
      ? { difficulty: word.userWord.difficulty, optional }
      : { difficulty: Difficulty.Easy, optional };
  });
  return resultOptions;
};

export const sendDataToServer = (
  currentUserId: string,
  statisticProps: StatisticProps,
) => {
  const { wordList, icons } = statisticProps;
  const initialWordList = [...wordList];
  const gameResults = [...icons];
  const userData = generateUpdateUserWord(
    'sprintStats',
    initialWordList,
    gameResults,
  );

  initialWordList.forEach((word, idx) => {
    if (word.userWord) {
      Api.updateUsersWord(currentUserId, word.id! || word._id!, {
        ...userData[idx],
      });
    } else {
      Api.createUsersWord(currentUserId, word.id! || word._id!, {
        ...userData[idx],
      });
    }
  });
};
