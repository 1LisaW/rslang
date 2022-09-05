import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@mui/material';
import { AppDispatch } from '../store/store';
import { fetchWordList } from '../store/gameWordListFetch';
import { getGamesWordList } from '../store/gameWordListSlice';
import { isAuth, getCurrentUserId } from '../store/authSlice';
import AudioCallCard from './audioCallCard';
import AlertDialogSlideOnClose from '../GameCommonComponents/CloseButton/dialogSlideOnClose';
import {
  getWordsAudioCallGame,
  sendDataToServer,
} from '../GameCommonComponents/GameServices/gameServices';
import GameStatistic from '../GameCommonComponents/GameStatistics/gameStatistic';

type ContainerProps = {
  redirectedFromTutorial: boolean;
  group: number | undefined;
  page: number | undefined;
  wordsPerPage: number;
};

export default function AudioCallCardContainer(props: ContainerProps) {
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
  }, [dispatch, group]);

  const dataForCards = getWordsAudioCallGame(gameWordListState);
  const statisticProps = { icons, gameWordList };

  const changeCard = (valid: boolean) => {
    if (CardIdx === dataForCards.length - 1) {
      setGameOver(true);
      sendDataToServer('audioCallStats', currentUserId, statisticProps);
    }

    setCardData(CardIdx + 1 < dataForCards.length ? CardIdx + 1 : 0);
    setIcons([...icons, valid]);
  };

  const setterGameOver = () => {
    setGameOver(false);
    setIcons(defaultIcon);
  };

  // const cardProps = { icons, ...dataForCards[CardIdx], changeCard };
  return (
    <>
      {!isGameOver && (dataForCards.length >= 20) && (
        <Container
          className="audio-call__content content"
          maxWidth="md"
          sx={{ maxHeight: '80%' }}
        >
          <Typography position="absolute" top="5%" variant="h5" color="textSecondary">
            АУДИОВЫЗОВ
          </Typography>
          <Grid
            className="audio-call__grid-wrapper"
            container
            spacing={2}
            direction="column"
          >
            <Grid item xs={8}>
              <AudioCallCard {...{ icons, ...dataForCards[CardIdx], changeCard }} />
            </Grid>
          </Grid>
          <AlertDialogSlideOnClose />
        </Container>
      )}
      {isGameOver && <GameStatistic {...{ ...statisticProps, setterGameOver }} />}
      {dataForCards.length < 20 && (
        <Container
          className="audio-call__content content"
          maxWidth="md"
          sx={{ maxHeight: '80%' }}
        >
          <Typography position="absolute" top="50%" left="25%" width="50%">
            Недостаточно слов для игры. Попробуйте вызвать игру на следующей
            странице учебника.
          </Typography>
        </Container>
      )}
    </>
  );
}
