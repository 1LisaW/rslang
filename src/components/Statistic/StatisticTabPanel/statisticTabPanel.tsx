/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GameStat from './GameStat/gameStat';
import WordsStat from './WordsStat/wordsStat';
import StatChart from './StatChart/statChart';
import type { StatisticsOptional } from '../../../Api/api-types';

import './statisticTabPanel.scss';

interface StatisticTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function StatisticTabPanel(props: StatisticTabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type StatProps = {
  statData: StatisticsOptional;
};

export default function StatisticTabs(props: StatProps) {
  const { statData } = props;
  const history = statData.historicalStats;
  const [value, setValue] = useState(0);
  const dateKeysInStats = Object.keys(history).sort();
  const [currentDate, setCurrentDate] = useState(
    dateKeysInStats.at(-1) as string,
  );
  const [statsAtDate, setStatsAtDate] = useState(history[currentDate]);
  const wordsData = {
    labels: dateKeysInStats,
    newWords: dateKeysInStats.map(
      dateKey => history[dateKey].dailyCumulativeGameStats.newWordsQty,
    ),
    learnedWords: dateKeysInStats.map(
      dateKey => history[dateKey].dailyCumulativeGameStats.learnedWords.length
        + history[dateKey].dailyTutorialLearnedWords.length,
    ),
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDateChange = (dir: 'prev' | 'next') => {
    if (!dateKeysInStats.length) return;

    let dateIndex =
      dateKeysInStats.indexOf(currentDate) === -1
        ? dateKeysInStats.length - 1
        : dateKeysInStats.indexOf(currentDate);

    if (dir === 'prev') {
      dateIndex = Math.max(0, dateIndex - 1);
    } else {
      dateIndex = Math.min(dateIndex + 1, dateKeysInStats.length - 1);
    }

    const newDate = dateKeysInStats[dateIndex];
    if (newDate !== currentDate) {
      const newValues = history[newDate];
      setCurrentDate(newDate);
      setStatsAtDate(newValues);
    }
  };

  const handlePrevDate = () => {
    handleDateChange('prev');
  };

  const handleNextDate = () => {
    handleDateChange('next');
  };

  const getDays = (num: number): string => {
    let days = 'дней';
    switch (num % 10) {
      case 1:
        days = 'день';
        break;
      case 2:
      case 3:
      case 4:
        days = 'дня';
        break;
      default:
        days = 'дней';
    }
    return `${num} ${days}`;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="статистика изучения слов"
        >
          <Tab label="Статистика за день" {...a11yProps(0)} />
          <Tab label="История изучения" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <StatisticTabPanel value={value} index={0}>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <GameStat
              gameName="Sprint"
              currentDate={currentDate}
              newWordsQty={statsAtDate.dailyGameSprintStats.newWordsQty}
              percentGood={Math.trunc(
                (statsAtDate.dailyGameSprintStats.correctAnswers /
                  statsAtDate.dailyGameSprintStats.totalAnswers) *
                  100,
              )}
              longestStreak={statsAtDate.dailyGameSprintStats.longestWinsInARow}
            />
          </Grid>

          <Grid xs={12} md={6}>
            <GameStat
              gameName="Audiocall"
              currentDate={currentDate}
              newWordsQty={statsAtDate.dailyGameAudiocallStats.newWordsQty}
              percentGood={Math.trunc(
                (statsAtDate.dailyGameAudiocallStats.correctAnswers /
                  statsAtDate.dailyGameAudiocallStats.totalAnswers) *
                  100,
              )}
              longestStreak={
                statsAtDate.dailyGameAudiocallStats.longestWinsInARow
              }
            />
          </Grid>

          <Grid xs={12}>
            <WordsStat
              currentDate={currentDate}
              newWordsQty={statsAtDate.dailyCumulativeGameStats.newWordsQty}
              percentGood={Math.trunc(
                (statsAtDate.dailyCumulativeGameStats.correctAnswers /
                  statsAtDate.dailyCumulativeGameStats.totalAnswers) *
                  100,
              )}
              learnedWordsQty={
                statsAtDate.dailyCumulativeGameStats.longestWinsInARow
              }
            />
          </Grid>
        </Grid>
        <Box className="date-btns-container">
          <Button className="date-btns" onClick={handlePrevDate}>
            <ArrowBackIosNewIcon />
          </Button>
          <Typography>
            {`Дата: ${currentDate} (доступно ${getDays(
              dateKeysInStats.length,
            )})`}
          </Typography>
          <Button className="date-btns" onClick={handleNextDate}>
            <ArrowForwardIosIcon />
          </Button>
        </Box>
      </StatisticTabPanel>

      <StatisticTabPanel value={value} index={1}>
        <StatChart chartName="Исория изучения слов" wordsData={wordsData} />
      </StatisticTabPanel>
    </Box>
  );
}
