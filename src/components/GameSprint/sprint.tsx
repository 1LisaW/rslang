import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import StartView from './startView';
import SprintCardContainer from './sprintCardContainer';
import './sprint.scss';

function Sprint() {
  const defaultIcon: boolean[] = [];

  const [CardIdx, setCardData] = useState(0);
  const [icons, setIcons] = useState(defaultIcon);
  const [group, setGroup] = useState<number | null>(null);

  console.log(group);

  const { state }: { state: any } = useLocation();

  const redirectedFromTutorial =
    state &&
    'prevPath' in state &&
    state.prevPath.toString().startsWith('/tutorial');

  const questions = [
    { word: 'disadvantage', wordTranslate: 'недостаток', isCorrect: true },
    { word: 'disadvantage', wordTranslate: 'кошка', isCorrect: false },
  ];

  const changeCard = (valid: boolean) => {
    setCardData(CardIdx + 1 < questions.length ? CardIdx + 1 : 0);
    setIcons([...icons.slice(-5), valid]);
  };

  const chooseGroupHandler = (groupIdx: number) => {
    setGroup(groupIdx);
  };

  const containerProps = { icons, ...questions[CardIdx], changeCard };
  const startViewProps = { chooseGroupHandler };
  return (
    <main className="sprint-container">
      <div className="bg" />
      <div className="bg bg2" />
      <div className="bg bg3" />
      {redirectedFromTutorial ? (
        <SprintCardContainer {...containerProps} />
      ) : (
        <StartView {...startViewProps} />
      )}
    </main>
  );
}

export default Sprint;
