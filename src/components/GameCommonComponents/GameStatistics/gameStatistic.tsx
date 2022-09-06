import { Grid, Paper, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PaginatedResults } from '../../../Api/api-types';
import AudioButton from '../../AudioFiles/audioFiles';
import AudioDecorator from '../../AudioFiles/audioDecorator';
import { AppDispatch } from '../../store/store';
import { start, stop, isSoundPlaying } from '../../store/soundPlaySlice';
import './gameStatistic.scss';

type WordResult = {
  word: string;
  wordTranslate: string;
  audio: string;
};
type Results = {
  title?: string;
  ratio?: number;
  wins: WordResult[];
  fails: WordResult[];
};

type StatisticProps = {
  gameWordList: PaginatedResults[] | [];
  icons: boolean[];
  setterGameOver: () => void;
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#41403f',
    },
    secondary: {
      main: '#cd7c43',
    },
  },
});

const { REACT_APP_PATH_TO_SERVER } = process.env;
const decorator = AudioDecorator;

export default function GameStatistic(statisticProps: StatisticProps) {
  const { gameWordList, icons, setterGameOver } = statisticProps;
  const initialGameWordList = [...gameWordList];
  const gameResults = [...icons];
  const results: Results = { wins: [], fails: [] };

  results.ratio =
    gameResults.filter(item => item).length / initialGameWordList.length;

  if (results.ratio < 0.3) {
    results.title = 'Похоже, сегодня вы не в духе, попробуйте еще';
  } else if (results.ratio < 0.6) {
    results.title = 'Неплохо! Вам еще есть чему поучиться';
  } else if (results.ratio < 0.9) {
    results.title = 'Хороший результат!';
  } else {
    results.title = 'Отличный результат!';
  }

  initialGameWordList.forEach((word, idx) => {
    const wordData = { word: word.word, wordTranslate: word.wordTranslate, audio: word.audio };
    if (gameResults[idx]) {
      results.wins.push(wordData);
    } else {
      results.fails.push(wordData);
    }
  });

  const dispatch = useDispatch<AppDispatch>();
  const isPlaying = useSelector(isSoundPlaying);

  const audioButtonHandler = {
    handlerPlay: (fileList: Array<string>) => {
      if (isPlaying) {
        decorator.runExecuteAfterStop();
      }

      dispatch(start());
      decorator.setExecuteAfterStop(() => {
        dispatch(stop());
      });
      decorator.play(fileList);
    },
    handlerPause: () => {
      dispatch(stop());
      decorator.pause();
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper className="statistic-content">
        <Typography
          paragraph
          variant="h4"
          sx={{ m: '5px', textAlign: 'center', p: '2%' }}
          color="secondary"
        >
          {results.title}
        </Typography>
        <Grid
          container
          rowSpacing={1}
          className="statistic__list"
        >

          <Grid item xs={8} key="correct-words">
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, mb: '20px' }}
              color="textSecondary"
            >
              Угаданные слова :
            </Typography>
          </Grid>
          {results.wins.map(item => (
            <React.Fragment key={`frag${item.word}`}>
              <Box className="statistic__row">
                <Grid item xs={5} key={`grid-corr-word_audio${item.word}`} className="statistic__audio">
                  <AudioButton {...{ ...audioButtonHandler,
                    file: [REACT_APP_PATH_TO_SERVER?.concat(item.audio) as string],
                    playItem: false }}
                  />
                </Grid>

                <Grid item xs={5} key={`grid-corr-word${item.word}`} className="statistic__word">
                  <Typography
                    sx={{ color: 'green', fontWeight: 600 }}
                    key={`tpg-corr-word${item.word}`}
                    variant="h6"
                  >
                    {item.word}
                  </Typography>
                </Grid>
                <Grid item xs={5} key={`grid${item.wordTranslate}`}>
                  <Typography key={`tpg${item.wordTranslate}`} variant="h6">
                    {item.wordTranslate}
                  </Typography>
                </Grid>
              </Box>
            </React.Fragment>
          ))}
          <Grid item xs={8} key="grid-unmached-words">
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, m: '20px 0' }}
              color="textSecondary"
            >
              Не угаданные слова :
            </Typography>
          </Grid>
          {results.fails.map(item => (
            <React.Fragment key={`frag${item.word}`}>
              <Box className="statistic__row">
                <Grid item xs={5} key={`grid-corr-word${item.word}`} className="statistic__audio">
                  <AudioButton {...{ ...audioButtonHandler,
                    file: [REACT_APP_PATH_TO_SERVER?.concat(item.audio) as string],
                    playItem: false }}
                  />
                </Grid>
                <Grid item xs={5} key={`grid-inc-word${item.word}`} className="statistic__word">
                  <Typography
                    sx={{ color: 'red', fontWeight: 600 }}
                    key={`tpg-inc-word${item.word}`}
                    variant="h6"
                  >
                    {item.word}
                  </Typography>
                </Grid>
                <Grid item xs={5} key={`grid${item.wordTranslate}`}>
                  <Typography key={`tpg${item.wordTranslate}`} variant="h6">
                    {item.wordTranslate}
                  </Typography>
                </Grid>
              </Box>
            </React.Fragment>
          ))}
        </Grid>
        <Box className="statistic__buttons-cont">
          <Link
            key="menuItem link main"
            to="/rslang"
            className="statistic__word"
          >
            ГЛАВНАЯ
          </Link>
          <button
            className="statistic__word"
            type="button"
            onClick={() => {
              setterGameOver();
            }}
          >
            НАЧАТЬ ЗАНОВО
          </button>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}
