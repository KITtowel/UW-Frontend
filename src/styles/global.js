import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
	${reset};
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
	*, *::before, *::after {
		box-sizing: border-box;
    font-family: 'Pretendard-Regular' !important;
	}
  html {
    overflow-x: hidden;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 20px;
  }
  ::-webkit-scrollbar-track-piece {
    background-color: white;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #9dc3e6;
  }
`;

export default GlobalStyle;
