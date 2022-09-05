/* eslint-disable react/require-default-props */
import React from 'react';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { Divider } from '@mui/material';

import './gameStat.scss';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  // color: theme.palette.text.secondary,
  // border: '1px solid red',
  borderRadius: '10px',
}));

interface GameStatProps {
  gameName: string;
  percentGood: number;
  newWordsQty: number;
  longestStreak: number;
  currentDate: string;
}

function GameStats(props: GameStatProps) {
  const { gameName, percentGood, newWordsQty, currentDate, longestStreak } =
    props;

  return (
    <div key={gameName}>
      <Item>
        <Grid container spacing={2}>
          <Grid xs={12}>
            Статистика игры
            <span className="game-name">{` ${gameName} `}</span>
            за
            {` ${currentDate}`}
            <Divider />
          </Grid>

          <Grid xs={8} className="aligned-left">
            Количество новых слов за день:
          </Grid>
          <Grid xs={4}>{newWordsQty}</Grid>

          <Grid xs={8} className="aligned-left">
            Процент правильных ответов за день:
          </Grid>
          <Grid xs={4}>
            {percentGood}
            %
          </Grid>

          <Grid xs={8} className="aligned-left">
            Серия правильных ответов за день:
          </Grid>
          <Grid xs={4}>{longestStreak}</Grid>
        </Grid>
      </Item>
    </div>
  );
}

export default GameStats;
