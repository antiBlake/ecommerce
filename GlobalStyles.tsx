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
}

#__next{
    background: yellow;
    height: inherit;
    display: flex;
    flex-direction: column;
    
}

`
    
