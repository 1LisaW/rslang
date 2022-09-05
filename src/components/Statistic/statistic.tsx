/* eslint-disable react/require-default-props */
import React from 'react';
import { useSelector } from 'react-redux';
import StatisticTabs from './StatisticTabPanel/statisticTabPanel';
import usePromiseEffect from './hook';
import Api from '../../Api/api';
import {
  isAuth,
  getCurrentUserId,
  getCurrentUserName,
} from '../store/authSlice';
import { StatisticResponse, StatisticsOptional } from '../../Api/api-types';
import './statistic.scss';

const UNAUTHORIZED_MSG =
  'Извините, статистика доступна только авторизованным пользователям';
const NO_STAT_AVAILABLE = 'Нет статистики у пользователя';

const mockData: StatisticsOptional = {
  historicalStats: {
    '2010-01-01': {
      dailyCumulativeGameStats: {
        newWordsQty: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        longestWinsInARow: 0,
        learnedWords: [],
      },
      dailyGameAudiocallStats: {
        newWordsQty: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        longestWinsInARow: 0,
        learnedWords: [],
      },
      dailyGameSprintStats: {
        newWordsQty: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        longestWinsInARow: 0,
        learnedWords: [],
      },
      dailyTutorialLearnedWords: [],
    },
  },
};

function Statistic() {
  const isAuthorized = useSelector(isAuth);
  const userID = useSelector(getCurrentUserId);
  const userName = useSelector(getCurrentUserName);

  const response = usePromiseEffect(async () => {
    const resp = await Api.getUserStatistic(userID);
    return resp;
  }, [isAuthorized, userID]);

  let isDataError = !!response.error;
  let statData: StatisticsOptional = mockData;
  if (!isDataError && response.value) {
    if ('error' in response.value) {
      isDataError = true;
    } else {
      statData = (response.value as StatisticResponse).optional;
    }
  }

  const errorMsg =
    isAuthorized && isDataError
      ? `${NO_STAT_AVAILABLE} ${userName}`
      : UNAUTHORIZED_MSG;

  return (
    <div>
      {isAuthorized && !isDataError ? (
        <div>
          <StatisticTabs statData={statData} />
        </div>
      ) : (
        <div className="error-msg">{errorMsg}</div>
      )}
    </div>
  );
}

export default Statistic;
