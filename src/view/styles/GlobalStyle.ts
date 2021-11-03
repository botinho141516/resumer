import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #E1E1E6;
  }

  html {
    min-height: 100%;
  }

  img {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  svg {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  a:link {
    text-decoration: inherit;
    color: inherit;
    cursor: pointer;
  }

  a:visited {
    text-decoration: inherit;
    color: inherit;
    cursor: pointer;
  }
`
