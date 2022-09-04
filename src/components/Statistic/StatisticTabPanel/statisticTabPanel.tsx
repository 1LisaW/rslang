/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import Stack from '@mui/material/Stack';
// import { styled } from '@mui/material/styles';
// import { Divider } from '@mui/material';
// import { Divider } from '@mui/material';
import GameStat from './GameStat/gameStat';
import WordsStat from './WordsStat/wordsStat';
import StatChart from './StatChart/statChart';
import getSimplifiedDate from '../../../util/util';
// import type { CumulativeGameStats, StatisticsOptional } from '../../../Api/api-types';

import './statisticTabPanel.scss';

type Histo = {
  new: number;
  perc: number;
  streak: number;
};
type Histor = {
  [date: string]: Histo;
};

const historicData: Histor = {
  '2022-09-02': { new: 3, perc: 65, streak: 0 },
  '2022-09-01': { new: 2, perc: 35, streak: 3 },
  '2022-08-31': { new: 0, perc: 22, streak: 6 },
  '2022-08-25': { new: 4, perc: 77, streak: 2 },
};

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

export default function StatisticTabs() {
  const [value, setValue] = useState(0);
  const [currentDate, setCurrentDate] = useState(getSimplifiedDate(new Date()));
  const [historicDat, setHistoricDat] = useState(historicData['2022-09-02']);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDateChange = (dir: 'prev' | 'next') => {
    const dateKeysInStats = Object.keys(historicData).sort();
    if (!dateKeysInStats.length) return;

    // const dateOffset = 24 * 60 * 60 * 1000 * (dir === 'prev' ? -1 : 1);
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
      const newValues = historicData[newDate];
      setCurrentDate(newDate);
      setHistoricDat(newValues);
    }
  };
  const handlePrevDate = () => {
    handleDateChange('prev');
  };
  const handleNextDate = () => {
    handleDateChange('next');
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
              newWordsQty={historicDat.new}
              percentGood={historicDat.perc}
              longestStreak={historicDat.streak}
            />
          </Grid>

          <Grid xs={12} md={6}>
            <GameStat
              gameName="Audiocall"
              currentDate={currentDate}
              newWordsQty={historicDat.new}
              percentGood={historicDat.perc}
              longestStreak={historicDat.streak}
            />
          </Grid>

          <Grid xs={12}>
            <WordsStat
              currentDate={currentDate}
              newWordsQty={historicDat.new}
              percentGood={historicDat.perc}
              learnedWordsQty={historicDat.streak}
            />
          </Grid>
        </Grid>
        <Box className="date-btns-container">
          <Button className="date-btns" onClick={handlePrevDate}>
            <ArrowBackIosNewIcon />
          </Button>
          <Typography>
            Дата:
            {` ${currentDate}`}
          </Typography>
          <Button className="date-btns" onClick={handleNextDate}>
            <ArrowForwardIosIcon />
          </Button>
        </Box>
      </StatisticTabPanel>

      <StatisticTabPanel value={value} index={1}>
        <StatChart chartName="Исория изучения слов" wordsData={[0, 1, 2]} />
      </StatisticTabPanel>
    </Box>
  );
}
