import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ToggleButton from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import IconStatusList from './iconStatusList';

type CardData = {
  icons: boolean[];
  word: string;
  wordTranslate: string;
  isCorrect: boolean;
  changeCard: (valid: boolean) => void;
};

function SprintCard(props: CardData) {
  const { icons, word, wordTranslate, isCorrect, changeCard } = props;
  const [answer, setAnswer] = useState('incorrect');
  const handleChange = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    newAnswer: string,
  ) => {
    setAnswer(newAnswer);
  };
  const iconProps = { icons };

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
      <CardActions className="sprint-card__actions">
        <ToggleButtonGroup
          className="sprint-card__actions--group"
          color="primary"
          value={answer}
          exclusive
          onChange={handleChange}
          aria-label="Answers"
        >
          <ToggleButton
            className="sprint-card__actions--correct"
            value="correct"
            onClick={() => changeCard(isCorrect)}
          >
            Верно
          </ToggleButton>
          <ToggleButton
            className="sprint-card__actions--incorrect"
            value="incorrect"
            onClick={() => changeCard(!isCorrect)}
          >
            Не верно
          </ToggleButton>
        </ToggleButtonGroup>
      </CardActions>
    </Card>
  );
}

export default SprintCard;
