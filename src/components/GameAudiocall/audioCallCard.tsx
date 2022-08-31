import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import GameButtons from '../GameCommonComponents/GameButtons/gameButtons';

type CardData = {
  icons: boolean[];
  audio: string;
  word: string;
  words: string[];
  correctButtonIdx: number;
  wasInGame: boolean | undefined;
  changeCard: (valid: boolean) => void;
};

function AudioCallCard(props: CardData) {
  const { audio, word, words, correctButtonIdx, wasInGame, changeCard } = props;
  // const iconProps = { icons };
  // console.log(iconProps);
  // console.log('words', words);

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
            <Typography gutterBottom variant="h5" component="div">
              {`${word} ${audio}`}
            </Typography>
          </Box>
        ) : (
          <Box className="audio-container">
            <Typography
              className="new-word"
              gutterBottom
              variant="h5"
              component="div"
            >
              {`${word} ${audio}`}
            </Typography>
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
