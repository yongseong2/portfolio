import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutMePage from '../pages/aboutMe/AboutMePage';
import PortfolioPage from '../pages/portfollio/PortfolioPage';
import { Layout } from './Layout';
import MainPage from '../pages/main/MainPage';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<MainPage />} />
        <Route path='/about-me' element={<AboutMePage />} />
        <Route path='/portfolio' element={<PortfolioPage />} />
      </Route>
    </Routes>
  );
}
