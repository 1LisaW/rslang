import React from 'react';
import './navBar.scss';
import {
  BrowserRouter,
  Routes,
  Link,
  Route,
} from 'react-router-dom';
import Main from '../Main/main';
import Tutorial from '../Tutorial/tutorial';
import Audiocall from '../GameAudiocall/audiocall';
import Sprint from '../GameSprint/sprint';
import Statistic from '../Statistic/statistic';

function Navbar() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Main</Link></li>
          <li><Link to="/tutorial">Tutorial</Link></li>
          <li><Link to="/audiocall">Audiocall</Link></li>
          <li><Link to="/sprint">Sprint</Link></li>
          <li><Link to="/statistic">Statistic</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/audiocall" element={<Audiocall />} />
        <Route path="/sprint" element={<Sprint />} />
        <Route path="/statistic" element={<Statistic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navbar;
