import React from 'react';
import './wordCard.scss';
import { StylesProvider } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DOMPurify from 'dompurify';
import { PaginatedResults } from '../../Api/api-types';
import AudioButton from '../AudioFiles/audioFiles';
import CardButton from './CardButton/cardButton';
import CircularProgressWithLabel from './CircularProgress/circularProgress';

interface CardInput {
  data: PaginatedResults;
  isAuth :boolean;
  group:number;
}

const { REACT_APP_PATH_TO_SERVER } = process.env;

function WordCard({ data, isAuth, group }:CardInput) {
  console.log(isAuth, 'isAuth');

  const audioButtonHandler = {
    play: true,
    handler: (play: boolean, file: string) => {
      console.log(file);
      const audio = new Audio(file);
      audio.play();
      console.log(play);
    },
  };
  const buttonDifficultyHandler = {
    text: 'легкое',
    color: 'primary',
    action: true,
    handler: (play: boolean) => {
      console.log(play);
    },
  };
  const buttonLearnedHandler = {
    text: 'знаю',
    color: 'secondary',
    action: false,
    handler: (play: boolean) => {
      console.log(play);
    },
  };
  const progress = {
    value: 25,
  };

  const IMG_PATH = REACT_APP_PATH_TO_SERVER?.concat(data.image);
  const AUDIO_PATH = REACT_APP_PATH_TO_SERVER?.concat(data.audio);
  const groupColorClassName = `group${group}`;

  return (
    <StylesProvider injectFirst>
      <Card
        className="card-word__container"
      >
        <CardMedia
          className="card-word__img"
          component="img"
          image={IMG_PATH}
          width="50%"
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
              <AudioButton {...{ ...audioButtonHandler, file: (AUDIO_PATH as string) }} />
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
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.textMeaning) }}
              />
              <Typography variant="body1" color="textSecondary">
                {data.textMeaningTranslate}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.textExample) }}
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
          ) : ('')}
        </Box>
      </Card>
    </StylesProvider>
  );
}

export default WordCard;
