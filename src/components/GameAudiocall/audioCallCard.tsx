import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import GameButtons from '../GameCommonComponents/GameButtons/gameButtons';
import AudioGame from '../AudioFiles/audioGame';
import AudioDecorator from '../AudioFiles/audioDecorator';

type CardData = {
  icons: boolean[];
  audio: string;
  word: string;
  words: string[];
  image: string;
  correctButtonIdx: number;
  wasInGame: boolean | undefined;
  changeCard: (valid: boolean) => void;
};

const { REACT_APP_PATH_TO_SERVER } = process.env;
const decorator = new AudioDecorator();

function AudioCallCard(props: CardData) {
  const { audio, word, words, image, correctButtonIdx, wasInGame, changeCard } = props;
  const AUDIO_PATH: Array<string> = [REACT_APP_PATH_TO_SERVER?.concat(audio) as string];
  const IMG_PATH = REACT_APP_PATH_TO_SERVER?.concat(image) as string;
  console.log(word);
  const audioButtonHandler = {
    handlerPlay: () => {
      decorator.play(AUDIO_PATH);
    },
  };

  useEffect(() => {
    audioButtonHandler.handlerPlay();
  }, [props]);

  const dataForButtons = (words || []).map((item, idx) => {
    const isCorrect = idx === correctButtonIdx;
    const buttonData = {
      text: item,
      value: item,
      className: 'audio-call-button',
      isCorrect,
    };

    return buttonData;
  });
  dataForButtons.push({
    text: 'Не знаю',
    value: 'do not know',
    className: 'audio-call-button',
    isCorrect: false,
  });
  return (
    <Card className="audio-call-card" sx={{ maxWidth: 345 }}>
      <CardContent className="audio-call__card-content">
        <CardMedia
          className="card-word__img"
          component="img"
          image={IMG_PATH}
          width="40%"
          title={word}
        />
        <Box>
          {wasInGame ? (
            <Typography
              variant="h5"
              color="textSecondary"
            >
              {word}
            </Typography>
          ) : (
            <Typography
              className="new-word"
              variant="h5"
              color="textSecondary"
            >
              {word}
            </Typography>
          )}
          <Box className="audio-container">
            <AudioGame {...{ ...audioButtonHandler, file: AUDIO_PATH }} />
          </Box>
        </Box>
      </CardContent>
      <CardActions className="audio-call-card__actions">
        <GameButtons {...{ buttonsData: dataForButtons, changeCard }} />
      </CardActions>
    </Card>
  );
}

export default AudioCallCard;
