import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import GameButtons from '../GameCommonComponents/GameButtons/gameButtons';
import AudioButton from '../AudioFiles/audioFiles';
import AudioDecorator from '../AudioFiles/audioDecorator';

type CardData = {
  icons: boolean[];
  audio: string;
  word: string;
  words: string[];
  correctButtonIdx: number;
  wasInGame: boolean | undefined;
  changeCard: (valid: boolean) => void;
};

const { REACT_APP_PATH_TO_SERVER } = process.env;
const decorator = new AudioDecorator();

function AudioCallCard(props: CardData) {
  const { audio, word, words, correctButtonIdx, wasInGame, changeCard } = props;
  const AUDIO_PATH: Array<string> = [REACT_APP_PATH_TO_SERVER?.concat(audio) as string];
  console.log(word);
  const audioButtonHandler = {
    handlerPlay: () => {
      // if (isPlaying) {
      //   decorator.runExecuteAfterStop();
      // }

      // dispatch(start());
      // decorator.setExecuteAfterStop(() => {
      //   setterPlayCard(false);
      //   dispatch(stop());
      // });
      // setPlayCard(true);
      decorator.play(AUDIO_PATH);
    },
    handlerPause: () => {
      decorator.play(AUDIO_PATH);
    },
  };

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
      <CardContent>
        {wasInGame ? (
          <Box className="audio-container">
            {/* <Typography gutterBottom variant="h5" component="div">
              {`${word} ${audio}`}
            </Typography> */}
            <AudioButton {...{ ...audioButtonHandler, file: AUDIO_PATH, playCard: false }} />
          </Box>
        ) : (
          <Box className="audio-container">
            {/* <Typography
              className="new-word"
              gutterBottom
              variant="h5"
              component="div"
            >
              {`${word} ${audio}`}
            </Typography> */}
            <AudioButton {...{ ...audioButtonHandler, file: AUDIO_PATH, playCard: false }} />
          </Box>
        )}
      </CardContent>
      <CardActions className="audio-call-card__actions">
        <GameButtons {...{ buttonsData: dataForButtons, changeCard }} />
      </CardActions>
    </Card>
  );
}

export default AudioCallCard;
