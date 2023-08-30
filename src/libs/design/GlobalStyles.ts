/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import colors from './colors';

const globalStyles = css`
  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-family: 'Pretendard';
    font-size: 90%;
    color: ${colors.black};
    line-height: 1.2rem;
  }

  @font-face {
    font-family: 'Montserrat';
    src: url('/fonts/NanumMyeongjo-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat';
    src: url('/fonts/NanumMyeongjo-ExtraBold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
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
