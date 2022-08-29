import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import { Container, Grid, Typography } from '@mui/material';
import { AppDispatch } from '../store/store';
import { fetchWordList } from '../store/wordListFetch';
import { getWordList } from '../store/wordListSlice';
import { isAuth, getCurrentUserId } from '../store/authSlice';
import CircularStatic from './CircularStatic/circularStatic';
import SprintCard from './sprintCard';
import AlertDialogSlideOnClose from './dialogSlideOnClose';
import { getWordsForGame } from './gameServices';
import GameStatistic from './gameStatistic';

type ContainerProps = {
  group: number | undefined;
  page: number | undefined;
};

export default function SprintCardContainer(props: ContainerProps) {
  const { group, page } = props;
  const defaultIcon: boolean[] = [];

  const [CardIdx, setCardData] = useState(0);
  const [icons, setIcons] = useState(defaultIcon);

  const isAuthorized = useSelector(isAuth);
  const currentUserId = useSelector(getCurrentUserId);
  const gameWordList = useSelector(getWordList);
  const [isGameOver, setGameOver] = useState(false);
  const { wordList } = gameWordList;

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(
      fetchWordList({
        isAuthorized,
        id: currentUserId,
        page,
        group,
      }),
    );
  }, [dispatch]);

  const dataForCards = getWordsForGame(gameWordList);

  const changeCard = (valid: boolean) => {
    if (CardIdx === dataForCards.length - 1) setGameOver(true);
    setCardData(CardIdx + 1 < dataForCards.length ? CardIdx + 1 : 0);
    setIcons([...icons, valid]);
  };

  const cardProps = { icons, ...dataForCards[CardIdx], changeCard };
  const statisticProps = { icons, wordList };

  return (
    <>
      {!isGameOver && (
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
              <SprintCard {...cardProps} />
            </Grid>
          </Grid>
          <AlertDialogSlideOnClose />
        </Container>
      )}
      {isGameOver && <GameStatistic {...statisticProps} />}
    </>
  );
}
