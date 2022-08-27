import React, { useState } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { Container, Grid, Typography } from '@mui/material';
import CircularStatic from './CircularStatic/circularStatic';
import SprintCard from './sprintCard';
import AlertDialogSlideOnClose from './dialogSlideOnClose';
import './sprint.scss';

function Sprint() {
  const questions = [
    { word: 'disadvantage', wordTranslate: 'недостаток', isCorrect: true },
    { word: 'disadvantage', wordTranslate: 'кошка', isCorrect: false },
  ];
  // const icons: boolean[] = [];
  const defaultIcon: boolean[] = [];
  const [CardIdx, setCardData] = useState(0);
  const [icons, setIcons] = useState(defaultIcon);
  const changeCard = (valid: boolean) => {
    setCardData(CardIdx + 1 < questions.length ? CardIdx + 1 : 0);
    setIcons([...icons.slice(-5), valid]);
  };
  const props = { icons, ...questions[CardIdx], changeCard };

  return (
    <main className="sprint-container">
      <div className="bg" />
      <div className="bg bg2" />
      <div className="bg bg3" />
      <Container className="content" maxWidth="md" sx={{ maxHeight: '80%' }}>
        <Typography position="absolute" top="5%">SPRINT</Typography>
        <Grid
          className="sprint__grid-wrapper"
          container
          spacing={2}
          direction="column"
        >
          <Grid item xs={3}>
            <StyledEngineProvider injectFirst>
              <CircularStatic />
            </StyledEngineProvider>
          </Grid>
          <Grid item xs={8}>
            <SprintCard {...props} />
          </Grid>
        </Grid>
        <AlertDialogSlideOnClose />
      </Container>
    </main>
  );
}

export default Sprint;
