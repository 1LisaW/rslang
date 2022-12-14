import { PaginatedResults, Difficulty, Optional, CumulativeGameStats } from '../../../Api/api-types';
import { GameWordListState } from '../../store/types';
import Api from '../../../Api/api';
import sendStatisticToServer from '../../Statistic/statisticService';

const VARIANTS_IN_AUDIO_CALL = 5;

type StatisticProps = {
  gameWordList: PaginatedResults[] | [];
  icons: boolean[];
};

export const getRandomNumber = (limit: number) => Math.floor(Math.random() * limit);

const getRandomWordsIdx = (wordIdx: number, limit: number) => {
  const idxArray: number[] = [];
  while (idxArray.length < limit && idxArray.length < VARIANTS_IN_AUDIO_CALL) {
    const randomIdx = Math.floor(Math.random() * VARIANTS_IN_AUDIO_CALL);
    if (!idxArray.includes(randomIdx)) {
      idxArray.push(randomIdx);
    }
  }
  if (!idxArray.includes(wordIdx)) {
    const replaceIdx = Math.floor(Math.random() * VARIANTS_IN_AUDIO_CALL);
    idxArray[replaceIdx] = wordIdx;
  }

  return idxArray;
};

export const getWordsForGame = (wordList: GameWordListState) => {
  if (
    wordList.gameWordList.length === 0 ||
    wordList.gameWordList.length < VARIANTS_IN_AUDIO_CALL
  ) {
    return [];
  }
  const wordData = wordList.gameWordList;

  return wordData.map((wordItem, idx) => {
    const randomIdx = getRandomNumber(wordData.length - 1);
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

export const getWordsAudioCallGame = (wordList: GameWordListState) => {
  if (wordList.gameWordList.length === 0) return [];
  const wordData = wordList.gameWordList;

  return wordData.map((wordItem, idx) => {
    const randomWordsIdx = getRandomWordsIdx(idx, wordData.length - 1);
    const randomWordsTranslate = randomWordsIdx.map(
      index => wordData[index].wordTranslate,
    );
    const correctIdx = randomWordsIdx.indexOf(idx);
    const dataItem = {
      audio: wordItem.audio,
      image: wordItem.image,
      word: wordItem.word,
      words: randomWordsTranslate,
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
    const optional: Optional =
      word.userWord && word.userWord.optional
        ? { ...word.userWord.optional }
        : { [gameStatsName]: {} };

    optional[gameStatsName] = { ...optional[gameStatsName] };
    const gameStats = word.userWord && word.userWord.optional
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
  gameID: 'sprintStats' | 'audioCallStats',
  currentUserId: string,
  statisticProps: StatisticProps,
) => {
  const { gameWordList, icons } = statisticProps;
  const initialGameWordList = [...gameWordList].slice(0, icons.length);
  const gameResults = [...icons];
  const userData = generateUpdateUserWord(
    gameID,
    initialGameWordList,
    gameResults,
  );

  initialGameWordList.forEach((word, idx) => {
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

  type LearnedAndNewWords = {
    learnedWords: string[],
    newWordsQty: number,
  };

  const learnedAndNewWords: LearnedAndNewWords = userData
    .reduce((acc: LearnedAndNewWords, item, idx) => {
      if (
        item.optional.isLearned &&
        (!initialGameWordList[idx].userWord ||
          (initialGameWordList[idx].userWord &&
            !initialGameWordList[idx].userWord!.optional) ||
          !initialGameWordList[idx].userWord!.optional!.isLearned)
      ) {
        acc.learnedWords.push(initialGameWordList[idx]._id || '');
      }
      if (
        !initialGameWordList[idx].userWord ||
        !initialGameWordList[idx].userWord!.optional ||
        !initialGameWordList[idx].userWord!.optional!.wasInGame
      ) {
        acc.newWordsQty += 1;
      }
      return acc;
    }, { learnedWords: [], newWordsQty: 0 });

  const longestWinsInARow = icons
    .join('')
    .split('false')
    .sort((a, b) => b.length - a.length)[0].length / 'true'.length;
  const gameStats: CumulativeGameStats = {
    newWordsQty: learnedAndNewWords.newWordsQty,
    learnedWords: learnedAndNewWords.learnedWords,
    longestWinsInARow,
    correctAnswers: icons.filter(item => item).length,
    totalAnswers: icons.length,
  };
  const statsName = gameID === 'sprintStats' ? 'dailyGameSprintStats' : 'dailyGameAudiocallStats';
  sendStatisticToServer(currentUserId, statsName, gameStats);
};
