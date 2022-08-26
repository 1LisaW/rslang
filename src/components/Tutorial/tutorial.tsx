import React from 'react';
import WordCard from '../WordCard/wordCard';
import cardMockInput from '../WordCard/cardMockInput';
import './tutorial.scss';

function Tutorial() {
  return (
    <section className="card">
      <WordCard data={cardMockInput} />
    </section>
  );
}

export default Tutorial;
