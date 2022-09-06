/* eslint-disable react/require-default-props */
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Divider } from '@mui/material';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  // color: theme.palette.text.secondary,
  // border: '1px solid red',
}));

interface WordsStatProps {
  percentGood: number;
  newWordsQty: number;
  learnedWordsQty: number;
  currentDate: string;
}

function WordsStat(props: WordsStatProps) {
  const { percentGood, newWordsQty, currentDate, learnedWordsQty } = props;

  return (
    <div>
      <Item>
        <Grid container spacing={2}>
          <Grid xs={12}>
            Статистика слов за
            {` ${currentDate}`}
            <Divider />
          </Grid>

          <Grid xs={8} className="aligned-left">
            Количество новых слов за день:
          </Grid>
          <Grid xs={4}>{newWordsQty}</Grid>

          <Grid xs={8} className="aligned-left">
            Количество изученных слов за день:
          </Grid>
          <Grid xs={4}>{learnedWordsQty}</Grid>

          <Grid xs={8} className="aligned-left">
            Процент правильных ответов за день:
          </Grid>
          <Grid xs={4}>
            {percentGood}
            %
          </Grid>

        </Grid>
      </Item>
    </div>
  );
}

export default WordsStat;
