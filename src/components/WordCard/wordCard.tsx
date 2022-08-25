import React from 'react';
import './wordCard.scss';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import { boolean } from 'zod';
import { PaginatedResults } from '../../Api/api-types';
// import AudioButton from '../AudioFiles/audioFiles';
import img from './8.jpg';

interface CardInput {
  data: PaginatedResults;
}
const useStyles = makeStyles({
  media: {
    height: 290,
    width: '40%',
  },
});

function WordCard({ data }:CardInput) {
  const classes = useStyles();

  return (
    <Card>
      <Box
        className="card-word__container"
        display="flex"
        flexDirection="row"
      >
        <CardMedia
          className={classes.media}
          component="img"
          image={img}
          width="50%"
          title={data.word}
        />
        <Box className="card__content">
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
            {/* <AudioButton audio={true}/> */}
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
      </Box>
    </Card>
  );
}

export default WordCard;
