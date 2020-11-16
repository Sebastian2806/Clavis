import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
    
    body {
        margin: 0;
        background-color: ${({ theme }) => theme.colors.darkblue};
        font-family:  'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    button, input {
        font-family: 'Roboto', sans-serif;
    }

    h1, h2, h3, h4, h5, h6 { 
        margin: 0;
    }

    ol, ul {
        padding: 0;
    	list-style: none;
    }

    a {
        text-decoration: none;
        color: ${({ theme }) => theme.colors.light}
    }
`;

export default GlobalStyle;
