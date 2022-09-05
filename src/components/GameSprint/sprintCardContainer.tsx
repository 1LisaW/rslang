import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import { Container, Grid, Typography } from '@mui/material';
import { AppDispatch } from '../store/store';
import { fetchWordList } from '../store/gameWordListFetch';
import { getGamesWordList } from '../store/gameWordListSlice';
import { isAuth, getCurrentUserId } from '../store/authSlice';
import CircularStatic from './CircularStatic/circularStatic';
import SprintCard from './sprintCard';
import AlertDialogSlideOnClose from '../GameCommonComponents/CloseButton/dialogSlideOnClose';
import {
  getWordsForGame,
  sendDataToServer,
} from '../GameCommonComponents/GameServices/gameServices';
import GameStatistic from '../GameCommonComponents/GameStatistics/gameStatistic';

type ContainerProps = {
  redirectedFromTutorial: boolean;
  group: number | undefined;
  page: number | undefined;
  wordsPerPage: number;
};

export default function SprintCardContainer(props: ContainerProps) {
  const { redirectedFromTutorial, group, page, wordsPerPage } = props;
  const defaultIcon: boolean[] = [];

  const [CardIdx, setCardData] = useState(0);
  const [icons, setIcons] = useState(defaultIcon);

  const isAuthorized = useSelector(isAuth);
  const currentUserId = useSelector(getCurrentUserId);
  const gameWordListState = useSelector(getGamesWordList);
  const [isGameOver, setGameOver] = useState(false);
  const { gameWordList } = gameWordListState;

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (group !== undefined) {
      dispatch(
        fetchWordList({
          redirectedFromTutorial,
          isAuthorized,
          id: currentUserId,
          page,
          group,
          wordsPerPage,
        }),
      );
    }
  }, [dispatch, group]);

  const dataForCards = getWordsForGame(gameWordListState);
  const statisticProps = { icons, gameWordList };

  const setCancelRound = (valid: boolean) => {
    setIcons(prevState => [...prevState, valid]);
    if (CardIdx === dataForCards.length - 1) {
      setGameOver(true);
      sendDataToServer('sprintStats', currentUserId, statisticProps);
    }
    setCardData(CardIdx + 1 < dataForCards.length ? CardIdx + 1 : 0);
  };

  const handleGameOver: () => void = () => {
    setGameOver(true);
    sendDataToServer('sprintStats', currentUserId, statisticProps);
  };

  const cardProps = { icons, ...dataForCards[CardIdx], setCancelRound };

  return (
    <>
      {!isGameOver && (dataForCards.length >= 20) && (
        <Container className="content">
          <Typography position="absolute" top="5%" variant="h5" color="textSecondary">
            СПРИНТ
          </Typography>
          <Grid
            className="sprint__grid-wrapper"
            container
            spacing={2}
            direction="column"
          >
            <Grid item xs={3}>
              <StyledEngineProvider injectFirst>
                <CircularStatic onFinish={handleGameOver} />
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
      {dataForCards.length < 20 && (
        <Container className="content" maxWidth="md" sx={{ maxHeight: '80%' }}>
          <Typography position="absolute" top="50%" left="25%" width="50%">
            Недостаточно слов для игры. Попробуйте вызвать игру на следующей
            странице учебника.
          </Typography>
        </Container>
      )}
    </>
  );
}
