import React from 'react';
import './global/global.scss';
import './global/reset.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Header from './components/Header/header';
import Main from './components/Main/main';
import Footer from './components/Footer/footer';
import Tutorial from './components/Tutorial/tutorial';
import Audiocall from './components/GameAudiocall/audiocall';
import Sprint from './components/GameSprint/sprint';
import Statistic from './components/Statistic/statistic';

function App() {
  return (
    <div className="body__container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/audiocall" element={<Audiocall />} />
          <Route path="/sprint" element={<Sprint />} />
          <Route path="/statistic" element={<Statistic />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
