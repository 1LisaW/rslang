import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import IconStatusList from './iconStatusList';
import GameButtons from './gameButtons';

type CardData = {
  icons: boolean[];
  word: string;
  wordTranslate: string;
  correctButtonIdx: number;
  changeCard: (valid: boolean) => void;
};

const buttonsDataSprint = [
  {
    text: 'Верно',
    value: 'correct',
    className: 'game-card__actions--correct',
    isCorrect: true,
  },
  {
    text: 'Не верно',
    value: 'incorrect',
    className: 'game-card__actions--incorrect',
    isCorrect: false,
  },
];

function SprintCard(props: CardData) {
  const { icons, word, wordTranslate, correctButtonIdx, changeCard } = props;
  const iconProps = { icons };
  const dataForButtons = buttonsDataSprint.map((item, idx) => {
    const isCorrect = idx === correctButtonIdx;
    return { ...item, isCorrect };
  });
  return (
    <Card className="sprint-card" sx={{ maxWidth: 345 }}>
      <CardContent>
        <Box>
          <IconStatusList {...iconProps} />
        </Box>
        <Typography gutterBottom variant="h5" component="div">
          {word}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {wordTranslate}
        </Typography>
      </CardContent>
      <CardActions className="game-card__actions">
        <GameButtons {...{ buttonsData: dataForButtons, changeCard }} />
      </CardActions>
    </Card>
  );
}

export default SprintCard;
