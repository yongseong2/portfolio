/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';

export function Nav() {
  return (
    <div>
      <ul>
        <li>
          <Link to={'/about-me'}>
            <p>About me</p>
          </Link>
        </li>
        <li>
          <Link to={'/portfolio'}>
            <p>Portfolio</p>
          </Link>
        </li>
        <li>CONTACT ME</li>
      </ul>
    </div>
  );
}
