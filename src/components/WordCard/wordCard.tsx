import React from 'react';
import './wordCard.scss';
import { StylesProvider } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { PaginatedResults } from '../../Api/api-types';
import AudioButton from '../AudioFiles/audioFiles';
import img from './8.jpg';
import CardButton from './CardButton/cardButton';
import CircularProgressWithLabel from './CircularProgress/circularProgress';

interface CardInput {
  data: PaginatedResults;
}

function WordCard({ data }:CardInput) {
  const audioButtonHandler = {
    play: true,
    handler: (play: boolean) => {
      console.log(play);
    },
  };
  const buttonDifficultyHandler = {
    text: 'non difficult',
    color: 'primary',
    action: true,
    handler: (play: boolean) => {
      console.log(play);
    },
  };
  const buttonLearnedHandler = {
    text: 'New word',
    color: 'secondary',
    action: false,
    handler: (play: boolean) => {
      console.log(play);
    },
  };
  const progress = {
    value: 25,
  };

  return (
    <StylesProvider injectFirst>
      <Card
        className="card-word__container"
      >
        <CardMedia
          className="card-word__img"
          component="img"
          image={img}
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
              <AudioButton {...audioButtonHandler} />
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
              <Typography variant="body1">
                {data.textMeaning}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {data.textMeaningTranslate}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="body1">
                {data.textExample}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {data.textExampleTranslate}
              </Typography>
            </CardContent>
          </Box>
          <Box className="card__authorized-section">
            <div className="card__buttons-container">
              <CardButton {...buttonDifficultyHandler} />
              <CardButton {...buttonLearnedHandler} />
            </div>
            <CircularProgressWithLabel {...progress} />
          </Box>
        </Box>
      </Card>
    </StylesProvider>
  );
}

export default WordCard;
