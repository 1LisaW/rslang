import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StartView from '../GameCommonComponents/StartView/startView';
import AudioCallCardContainer from './audioCallCardContainer';
import { getRandomNumber } from '../GameCommonComponents/GameServices/gameServices';
import './audioCall.scss';

function Audiocall() {
  const PAGES_PER_GROUP = 30;
  const GROUPS_COUNT = 6;
  const wordsPerPage = 20;

  const [group, setGroup] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number | undefined>(undefined);
  const [isGroupChosen, setGroupIsChosen] = useState(false);

  const { state }: { state: any } = useLocation();

  const redirectedFromTutorial: boolean =
    state &&
    'prevPath' in state &&
    state.prevPath.toString().startsWith('/tutorial');
  console.log('state.prevPath.toString().startsWith(/tutorial)!!!!!', state);

  useEffect(() => {
    // if (!redirectedFromTutorial) {
    setPage(getRandomNumber(PAGES_PER_GROUP - 1));
    setGroup(getRandomNumber(GROUPS_COUNT - 1));
    // }
  }, []);

  console.log(page, group, 'page and group');

  const chooseGroupHandler = (groupIdx: number) => {
    setGroup(groupIdx);
    setGroupIsChosen(true);
  };

  const containerProps = { redirectedFromTutorial, group, page, wordsPerPage };
  console.log('containerProps', containerProps);
  const startViewProps = { chooseGroupHandler };
  return (
    <main className="audioCall-container">
      <div className="bg" />
      <div className="bg bg2" />
      <div className="bg bg3" />
      {redirectedFromTutorial || isGroupChosen ? (
        <AudioCallCardContainer {...containerProps} />
      ) : (
        <StartView {...startViewProps} />
      )}
    </main>
  );
}

export default Audiocall;
