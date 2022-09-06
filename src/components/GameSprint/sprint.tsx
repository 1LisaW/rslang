import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StartView from '../GameCommonComponents/StartView/startView';
import SprintCardContainer from './sprintCardContainer';
import { getRandomNumber } from '../GameCommonComponents/GameServices/gameServices';
import {
  getCurrentGroup,
  getPageInCurrentGroup,
} from '../store/userSettingsSlice';
import './sprint.scss';

function Sprint() {
  const PAGES_PER_GROUP = 30;
  const GROUPS_COUNT = 6;
  const wordsPerPage = 20;

  const statePage = useSelector(getPageInCurrentGroup);
  const stateGroup = useSelector(getCurrentGroup);

  const [group, setGroup] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number | undefined>(undefined);
  const [isGroupChosen, setGroupIsChosen] = useState(false);

  const { state }: { state: any } = useLocation();

  const redirectedFromTutorial: boolean =
    state &&
    'prevPath' in state &&
    state.prevPath.toString().startsWith('/tutorial');

  useEffect(() => {
    if (!redirectedFromTutorial) {
      setPage(getRandomNumber(PAGES_PER_GROUP - 1));
      setGroup(getRandomNumber(GROUPS_COUNT - 1));
    } else {
      setPage(statePage);
      setGroup(stateGroup);
    }
  }, []);

  const chooseGroupHandler = (groupIdx: number) => {
    setGroup(groupIdx);
    setGroupIsChosen(true);
  };

  const containerProps = {
    redirectedFromTutorial,
    group,
    page,
    wordsPerPage,
  };
  const startViewProps = { chooseGroupHandler };
  return (
    <main className="sprint-container">
      <div className="bg" />
      <div className="bg bg2" />
      <div className="bg bg3" />
      {redirectedFromTutorial || isGroupChosen ? (
        <SprintCardContainer {...containerProps} />
      ) : (
        <StartView {...startViewProps} />
      )}
    </main>
  );
}

export default Sprint;
