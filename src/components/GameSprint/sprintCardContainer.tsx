import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { Container, Grid, Typography } from '@mui/material';
import CircularStatic from './CircularStatic/circularStatic';
import SprintCard from './sprintCard';
import AlertDialogSlideOnClose from './dialogSlideOnClose';

type Props = {
  icons: boolean[];
  word: string;
  wordTranslate: string;
  isCorrect: boolean;
  changeCard: (valid: boolean) => void;
};

export default function SprintCardContainer(props: Props) {
  return (
    <Container className="content" maxWidth="md" sx={{ maxHeight: '80%' }}>
      <Typography position="absolute" top="5%">
        SPRINT
      </Typography>
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
  );
}
