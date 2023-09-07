/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import colors from './colors';

const globalStyles = css`
  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-family: 'BlackHanSans-Regular';
    font-size: 90%;
    color: ${colors.black};
    line-height: 1.2rem;
  }

  @font-face {
    font-family: 'Montserrat';
    src: url('/fonts/BlackHanSans-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat';
    src: url('/fonts/BlackHanSans-Regular.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'BlackHanSans-Regular', Arial, Helvetica, sans-serif;
    background: radial-gradient(
        50% 50% at 50% 50%,
        rgba(26, 21, 21, 0) 0%,
        rgba(1, 1, 1, 0.16) 100%
      ),
      #fff;
  }

  h1,
  h2,
  h3 {
    font-weight: bold;
  }
  p {
    font-weight: normal;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default globalStyles;
