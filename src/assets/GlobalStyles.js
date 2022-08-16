import { createGlobalStyle } from "styled-components";


const GlobalStyles = createGlobalStyle`
  @import url(https://meyerweb.com/eric/tools/css/reset/reset.css);
  @import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap);
 *{
    box-sizing: border-box;
  }
  body{
    background-color: #000;
    font-family: 'Roboto';
    font-style: normal;
  }
`;

export default GlobalStyles;
