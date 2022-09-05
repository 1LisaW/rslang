import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
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
  cancelRound: (valid: boolean) => void,
  changeCard: () => void;
};

const { REACT_APP_PATH_TO_SERVER } = process.env;
const decorator = AudioDecorator;

function AudioCallCard(props: CardData) {
  const {
    audio,
    word,
    words,
    image,
    correctButtonIdx,
    wasInGame,
    cancelRound,
    changeCard,
  } = props;
  const [isDone, setDone] = useState(false);
  const AUDIO_PATH: Array<string> = [REACT_APP_PATH_TO_SERVER?.concat(audio) as string];
  const IMG_PATH = REACT_APP_PATH_TO_SERVER?.concat(image) as string;
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
  const setCancelRound = (valid: boolean) => {
    setDone(true);
    cancelRound(valid);
    dataForButtons.forEach(button => {
      button.className = button.isCorrect
        ? 'audio-call-button correct'
        : button.className;
    });
  };
  const setChangeCard = () => {
    setDone(false);
    changeCard();
  };
  const audioButtonHandler = {
    handlerPlay: () => {
      decorator.play(AUDIO_PATH);
    },
  };

  useEffect(() => {
    audioButtonHandler.handlerPlay();
  }, [props]);

  dataForButtons.push({
    text: 'Не знаю',
    value: 'do not know',
    className: 'audio-call-button',
    isCorrect: false,
  });
  return (
    <Card className="audio-call-card" sx={{ maxWidth: 345 }}>
      <CardContent className="audio-call__card-content">
        {isDone && (
          <CardMedia
            className="card-word__img"
            component="img"
            image={IMG_PATH}
            width="40%"
            title={word}
          />
        )}
        <Box>
          {isDone && wasInGame && (
            <Typography variant="h5" color="textSecondary">
              {word}
            </Typography>
          )}
          {isDone && !wasInGame && (
            <Typography className="new-word" variant="h5" color="textSecondary">
              {word}
            </Typography>
          )}
          <Box className="audio-container">
            <AudioGame {...{ ...audioButtonHandler, file: AUDIO_PATH }} />
          </Box>
        </Box>
      </CardContent>
      <CardActions className="audio-call-card__actions">
        <GameButtons {...{ buttonsData: dataForButtons, setCancelRound }} />
      </CardActions>
      {isDone && <Button onClick={setChangeCard}>Далее</Button>}
    </Card>
  );
}

export default AudioCallCard;
