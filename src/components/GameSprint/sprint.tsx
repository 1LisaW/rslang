import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StartView from './startView';
import SprintCardContainer from './sprintCardContainer';
import { getRandomNumber } from './gameServices';
import './sprint.scss';

function Sprint() {
  const PAGES_PER_GROUP = 30;
  const GROUPS_COUNT = 6;

  const [group, setGroup] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number | undefined>(undefined);
  const [isGroupChosen, setGroupIsChosen] = useState(false);

  const { state }: { state: any } = useLocation();

  const redirectedFromTutorial: boolean =
    state &&
    'prevPath' in state &&
    state.prevPath.toString().startsWith('/tutorial');

  useEffect(() => {
    // if (!redirectedFromTutorial) {
    setPage(getRandomNumber(PAGES_PER_GROUP));
    setGroup(getRandomNumber(GROUPS_COUNT));
    // }
  }, []);

  console.log(page, group, 'page and group');

  const chooseGroupHandler = (groupIdx: number) => {
    setGroup(groupIdx);
    setGroupIsChosen(true);
  };

  const containerProps = { group, page };
  const startViewProps = { chooseGroupHandler };
  return (
    <main className="sprint-container">
      <div className="bg" />
      <div className="bg bg2" />
      <div className="bg bg3" />
      {(redirectedFromTutorial || isGroupChosen) ? (
        <SprintCardContainer {...containerProps} />
      ) : (
        <StartView {...startViewProps} />
      )}
    </main>
  );
}

export default Sprint;
