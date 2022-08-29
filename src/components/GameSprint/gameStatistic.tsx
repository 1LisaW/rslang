import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { PaginatedResults } from '../../Api/api-types';
import './gameStatistic.scss';

type WordResult = {
  word: string;
  wordTranslate: string;
};
type Results = {
  title?: string;
  ratio?: number;
  wins: WordResult[];
  fails: WordResult[];
};

type StatisticProps = {
  wordList: PaginatedResults[] | [];
  icons: boolean[];
};

export default function GameStatistic(staticticProps: StatisticProps) {
  const { wordList, icons } = staticticProps;
  const initialWordList = [...wordList];
  const gameResults = [...icons];
  const results: Results = { wins: [], fails: [] };

  results.ratio = gameResults.filter(item => item).length / initialWordList.length;

  if (results.ratio < 0.3) {
    results.title = 'Похоже, сегодня вы не в духе, попробуйте ещею';
  } else if (results.ratio < 0.6) {
    results.title = 'Неплохо! Вам еще есть чему поучиться.';
  } else if (results.ratio < 0.9) {
    results.title = 'Хороший результат!';
  } else {
    results.title = 'Отличный результат!';
  }

  initialWordList.forEach((word, idx) => {
    const wordData = { word: word.word, wordTranslate: word.wordTranslate };
    if (gameResults[idx]) {
      results.wins.push(wordData);
    } else {
      results.fails.push(wordData);
    }
  });

  return (
    <Paper className="statistic-content">
      <Typography paragraph variant="h4" sx={{ m: '5px' }}>
        {results.title}
      </Typography>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ p: '20px' }}
      >
        <Grid item xs={8}>
          <Typography
            variant="subtitle1"
            sx={{ color: 'green', fontWeight: 600 }}
          >
            Угаданные слова :
          </Typography>
        </Grid>
        {results.wins.map(item => (
          <>
            <Grid item xs={5} key={item.word}>
              <Typography sx={{ color: 'green', fontWeight: 600 }}>
                {item.word}
              </Typography>
            </Grid>
            <Grid item xs={5} key={item.wordTranslate}>
              <Typography>{item.wordTranslate}</Typography>
            </Grid>
          </>
        ))}
        <Grid item xs={8}>
          <Typography
            paragraph
            variant="subtitle1"
            sx={{ color: 'red', fontWeight: 600 }}
          >
            Не угаданные слова :
          </Typography>
        </Grid>
        {results.fails.map(item => (
          <>
            <Grid item xs={5} key={item.word}>
              <Typography sx={{ color: 'red', fontWeight: 600 }}>
                {item.word}
              </Typography>
            </Grid>
            <Grid item xs={5} key={item.wordTranslate}>
              <Typography>{item.wordTranslate}</Typography>
            </Grid>
          </>
        ))}
      </Grid>
    </Paper>
  );
}
