import React from 'react';
import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../Header/header';
import Footer from '../Footer/footer';

function TemplatePage() {
  return (
    <div className="body__container">
      <ResponsiveAppBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default TemplatePage;
