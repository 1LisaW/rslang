import {
  StatisticsOptional,
  CumulativeGameStats,
  StatisticData,
} from '../../Api/api-types';
import Api from '../../Api/api';
import getSimplifiedDate from '../../util/util';

const emptyGameStats: CumulativeGameStats = {
  newWordsQty: 0,
  learnedWords: [],
  longestWinsInARow: 0,
  correctAnswers: 0,
  totalAnswers: 0,
};

type HistoricalData = { [data: string]: {
  dailyGameSprintStats: CumulativeGameStats;
  dailyGameAudiocallStats: CumulativeGameStats;
  dailyCumulativeGameStats: CumulativeGameStats;
  dailyTutorialLearnedWords: string[];
};
};

const generateUpdateUserGameStatistic = async (
  statsName: 'dailyGameSprintStats' | 'dailyGameAudiocallStats',
  gameStats: CumulativeGameStats,
) => {
  const currentDate = getSimplifiedDate(new Date());
  const initialHistoricalStats: HistoricalData = {
    [currentDate]: {
      dailyCumulativeGameStats: { ...emptyGameStats },
      dailyGameSprintStats: { ...emptyGameStats },
      dailyGameAudiocallStats: { ...emptyGameStats },
      dailyTutorialLearnedWords: [],
    },
  };
  const initialStats: StatisticsOptional = {
    historicalStats: initialHistoricalStats };
  const lastUserStats = await Api.getUserStatistic();
  const newUserState =
    'error' in lastUserStats
      ? { optional: initialStats }
      : { optional: lastUserStats.optional };

  const newUserStateOptional = newUserState.optional || {
    optional: { ...initialStats },
  };
  const dailyGameSprintStats =
    newUserStateOptional.historicalStats && currentDate in newUserStateOptional.historicalStats
      ? {
        ...emptyGameStats,
        ...newUserStateOptional.historicalStats[currentDate]
          .dailyGameSprintStats || {},
      }
      : { ...emptyGameStats, learnedWords: [] };

  const dailyGameAudiocallStats =
    newUserStateOptional.historicalStats &&
    currentDate in newUserStateOptional.historicalStats
      ? {
        ...emptyGameStats,
        ...newUserStateOptional.historicalStats[currentDate]
          .dailyGameAudiocallStats || {},
      }
      : { ...emptyGameStats, learnedWords: [] };

  const dailyCumulativeGameStats =
    newUserStateOptional.historicalStats &&
    currentDate in newUserStateOptional.historicalStats
      ? {
        ...emptyGameStats,
        ...(newUserStateOptional.historicalStats[currentDate]
          .dailyCumulativeGameStats || {}),
      }
      : { ...emptyGameStats, learnedWords: [] };
  if (statsName === 'dailyGameAudiocallStats') {
    dailyGameAudiocallStats.correctAnswers += gameStats.correctAnswers;
    dailyGameAudiocallStats.learnedWords = Array.from(
      new Set(
        dailyGameAudiocallStats.learnedWords.concat(gameStats.learnedWords),
      ),
    );
    dailyGameAudiocallStats.longestWinsInARow = Math.max(
      gameStats.longestWinsInARow,
      dailyGameAudiocallStats.longestWinsInARow,
    );
    dailyGameAudiocallStats.newWordsQty += gameStats.newWordsQty;
    dailyGameAudiocallStats.totalAnswers += gameStats.totalAnswers;
  }
  if (statsName === 'dailyGameSprintStats') {
    dailyGameSprintStats.correctAnswers += gameStats.correctAnswers;
    dailyGameSprintStats.learnedWords = Array.from(
      new Set(dailyGameSprintStats.learnedWords.concat(gameStats.learnedWords)),
    );
    dailyGameSprintStats.longestWinsInARow = Math.max(
      gameStats.longestWinsInARow,
      dailyGameSprintStats.longestWinsInARow,
    );
    dailyGameSprintStats.newWordsQty += gameStats.newWordsQty;
    dailyGameSprintStats.totalAnswers += gameStats.totalAnswers;
  }
  dailyCumulativeGameStats.correctAnswers += gameStats.correctAnswers;
  dailyCumulativeGameStats.learnedWords = Array.from(
    new Set(
      dailyCumulativeGameStats.learnedWords.concat(gameStats.learnedWords),
    ),
  );
  dailyCumulativeGameStats.longestWinsInARow = Math.max(
    gameStats.longestWinsInARow,
    dailyCumulativeGameStats.longestWinsInARow,
  );
  dailyCumulativeGameStats.newWordsQty += gameStats.newWordsQty;
  dailyCumulativeGameStats.totalAnswers += gameStats.totalAnswers;
  const statisticData: StatisticData = {
    ...newUserState,
    optional: {
      historicalStats: {
        [currentDate]: {
          dailyGameAudiocallStats,
          dailyGameSprintStats,
          dailyCumulativeGameStats,
          dailyTutorialLearnedWords:
            newUserState.optional &&
            newUserState.optional.historicalStats &&
            newUserState.optional.historicalStats[currentDate] ?
              newUserState.optional.historicalStats[currentDate]
                .dailyTutorialLearnedWords : [],
        },
      },
    },
  };
  return statisticData;
};

const sendStatisticDataToServer = async (
  userId: string,
  statsName: 'dailyGameSprintStats' | 'dailyGameAudiocallStats',
  gameStats: CumulativeGameStats,
) => {
  const statisticData = await generateUpdateUserGameStatistic(
    statsName,
    gameStats,
  );
  Api.updateUserStatistic(userId, statisticData);
};

export default sendStatisticDataToServer;
