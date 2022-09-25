import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

*{
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    

}

body{
padding: 0;
margin: 0;
height: 100vh;
overflow: hidden;
background-color: #f5f5f5;
}

#__next{
    height: 100%;
    
}

`;
