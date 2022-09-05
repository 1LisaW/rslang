import React, { useState, useCallback } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DOMPurify from 'dompurify';
import { useDispatch, useSelector } from 'react-redux';
import CardButton from './CardButton/cardButton';
import CircularProgressWithLabel from './CircularProgress/circularProgress';
import AudioButton from '../AudioFiles/audioFiles';
import AudioDecorator from '../AudioFiles/audioDecorator';
import { start, stop, isSoundPlaying } from '../store/soundPlaySlice';
import { AppDispatch } from '../store/store';
import { Difficulty, PaginatedResults } from '../../Api/api-types';
import { updateWordList } from '../store/wordListSlice';
import {
  getDifficultyButtonData,
  getIsLearnedButtonData,
  updateUserWord,
  createUserWord,
} from '../Tutorial/tutorialServices';
import './wordCard.scss';

interface CardInput {
  data: PaginatedResults;
  isAuth: boolean;
  group: number;
  userId: string;
}

const { REACT_APP_PATH_TO_SERVER } = process.env;
const decorator = new AudioDecorator();

function WordCard({ data, isAuth, group, userId }:CardInput) {
  const IMG_PATH = REACT_APP_PATH_TO_SERVER?.concat(data.image);
  const AUDIO_ARR: Array<string> = [
    REACT_APP_PATH_TO_SERVER?.concat(data.audio) as string,
    REACT_APP_PATH_TO_SERVER?.concat(data.audioMeaning) as string,
    REACT_APP_PATH_TO_SERVER?.concat(data.audioExample) as string,
  ];
  const dispatch = useDispatch<AppDispatch>();
  const isPlaying = useSelector(isSoundPlaying);
  const [playItem, setPlayItem] = useState(false);
  const setterPlayItem = (value: boolean) => {
    setPlayItem(value);
  };
  const difficultyData = getDifficultyButtonData(data);
  const isLearnedData = getIsLearnedButtonData(data);

  const audioButtonHandler = {
    handlerPlay: (fileList: Array<string>) => {
      if (isPlaying) {
        decorator.runExecuteAfterStop();
      }

      dispatch(start());
      decorator.setExecuteAfterStop(() => {
        setterPlayItem(false);
        dispatch(stop());
      });
      setPlayItem(true);
      decorator.play(fileList);
    },
    handlerPause: () => {
      setPlayItem(false);
      dispatch(stop());
      decorator.pause();
    },
  };

  const handlerDifficultySwitch = useCallback(() => {
    const difficulty =
      difficultyData.isDifficult === Difficulty.Hard
        ? Difficulty.Easy
        : Difficulty.Hard;
    const newWordData = {
      id: data._id || '',
      optional:
        data.userWord && data.userWord.optional ? data.userWord.optional : {},
      difficulty,
    };
    dispatch(updateWordList(newWordData));
    if (data.userWord) {
      updateUserWord(userId, newWordData);
    } else {
      createUserWord(userId, newWordData);
    }
  }, [difficultyData]);

  const buttonDifficultyHandler = {
    ...difficultyData,
    handler: handlerDifficultySwitch,
  };

  const handlerIsLearnedSwitch = useCallback(() => {
    const isLearned = !isLearnedData.isLearned;
    const currentOptional =
      data.userWord && data.userWord.optional ? data.userWord.optional : {};
    const optional = {
      ...currentOptional,
      isLearned,
    };
    const newDifficulty =
      data.userWord && data.userWord.difficulty
        ? data.userWord.difficulty
        : Difficulty.Easy;
    const newWordData = {
      id: data._id || '',
      difficulty: isLearned ? Difficulty.Easy : newDifficulty,
      optional,
    };
    dispatch(updateWordList(newWordData));
    if (data.userWord) {
      updateUserWord(userId, newWordData);
    } else {
      createUserWord(userId, newWordData);
    }
  }, [isLearnedData]);
  const buttonLearnedHandler = {
    ...isLearnedData,
    handler: handlerIsLearnedSwitch,
  };

  const gameResults = { wins: 0, fails: 0 };
  if (
    data.userWord &&
    data.userWord.optional &&
    data.userWord.optional.sprintStats
  ) {
    gameResults.wins += data.userWord.optional.sprintStats.wins || 0;
    gameResults.fails += data.userWord.optional.sprintStats.fails || 0;
  }
  if (
    data.userWord &&
    data.userWord.optional &&
    data.userWord.optional.audioCallStats
  ) {
    gameResults.wins += data.userWord.optional.audioCallStats.wins || 0;
    gameResults.fails += data.userWord.optional.audioCallStats.fails || 0;
  }

  const progress = {
    value: gameResults.wins
      ? (gameResults.wins * 100) / (gameResults.wins + gameResults.fails)
      : 0,
  };

  const groupColorClassName = `group${group}`;

  return (
    <StylesProvider injectFirst>
      <Card className="card-word-tutorial__container">
        <CardMedia
          className="card-word-tutorial__img"
          component="img"
          image={IMG_PATH}
          // width="50%"
          title={data.word}
        />
        <Box className="card__content">
          <Box className="card__text">
            <Box className="card__header">
              <Box className="card__title">
                <Typography gutterBottom variant="h4" component="h2">
                  {data.word}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className="card__transcription"
                  color="textSecondary"
                >
                  {data.transcription}
                </Typography>
              </Box>
              <AudioButton {...{ ...audioButtonHandler, file: AUDIO_ARR, playItem }} />
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant="h5"
                component="h5"
                color="textSecondary"
                className="card__translate"
              >
                {data.wordTranslate}
              </Typography>
            </Box>
            <CardContent>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data.textMeaning),
                }}
              />
              <Typography variant="body1" color="textSecondary">
                {data.textMeaningTranslate}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data.textExample),
                }}
              />
              <Typography variant="body1" color="textSecondary">
                {data.textExampleTranslate}
              </Typography>
            </CardContent>
          </Box>
          {isAuth ? (
            <Box className={groupColorClassName}>
              <Box className="card__authorized-section">
                <div className="card__buttons-container">
                  <CardButton {...buttonDifficultyHandler} />
                  <CardButton {...buttonLearnedHandler} />
                </div>
                <CircularProgressWithLabel {...progress} />
              </Box>
            </Box>
          ) : (
            <Box className={groupColorClassName}>
              <Box className="card__authorized-section" />
            </Box>
          )}
        </Box>
      </Card>
    </StylesProvider>
  );
}

export default WordCard;
