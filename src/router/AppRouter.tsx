import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ContactMe } from '../pages/contactMe/ContactMe';
import MainPage from '../pages/MainPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path='/portfolio' element={<MainPage />} />
      <Route path='/contact-me' element={<ContactMe />} />
    </Routes>
  );
}
