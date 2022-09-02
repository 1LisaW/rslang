import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ResponsiveAppBar from '../Header/header';
import Footer from '../Footer/footer';

function TemplatePage() {
  const location = useLocation();
  const isGamePage =
    location.pathname.startsWith('/sprint') ||
    location.pathname.startsWith('/audiocall');
  return (
    <div className="body__container">
      <ResponsiveAppBar />
      <Outlet />
      {!isGamePage && <Footer />}
    </div>
  );
}

export default TemplatePage;
