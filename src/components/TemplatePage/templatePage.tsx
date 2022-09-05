import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AudioDecorator from '../AudioFiles/audioDecorator';
import ResponsiveAppBar from '../Header/header';
import Footer from '../Footer/footer';

function TemplatePage() {
  const location = useLocation();
  const decorator = AudioDecorator;
  const isGamePage =
    location.pathname.startsWith('/sprint') ||
    location.pathname.startsWith('/audiocall');

  useEffect(() => {
    console.log('Location changed');
    decorator.pause();
  }, [location]);

  return (
    <div className="body__container">
      <ResponsiveAppBar />
      <Outlet />
      {!isGamePage && <Footer />}
    </div>
  );
}

export default TemplatePage;
