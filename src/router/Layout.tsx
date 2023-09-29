import React from 'react';
import { Outlet } from 'react-router-dom';
import { Nav } from '../libs/common/Nav';

export function Layout() {
  return (
    <div>
      {/* <Nav /> */}
      <Outlet />
    </div>
  );
}