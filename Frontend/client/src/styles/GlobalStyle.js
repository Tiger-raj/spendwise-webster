//Importing the necessary method from the styled-components library
import {createGlobalStyle} from 'styled-components'


//Creating a GlobalStyle component using createGlobalStyle method
export const GlobalStyle = createGlobalStyle`

    /* Resetting default margin, padding and box-sizing for all element */
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    /*Defining CSS variables in the root element for color theming */
    :root {
        --primary-color: #222260;
        --primary-color2: 'color: rgba(34, 34, 96, .6)';
        --primary-color3: 'color: rgba(34, 34, 96, .4)';
        --color-green: #42AD00;
        --color-grey: #aaa;
        --color-accent: #7b2a96;
        --color-delete: #FF0000;
    }

    
    /*Styling the body elements*/
    body {
        font-family: 'Nunito Sans', sans-serif;
        font-size: clamp(1rem, 1.5vw, 1.2rem);
        overflow: hidden;
        color: rgba(34, 34, 96, .6);
        
    }

    h1, h2, h3, h4, h5, h6 {
        color: var(--primary-color);

    }

    .error{
        color: red;
        animation: shake 0.5s ease-in-out;
        @keyframes shake {
            0%{
               transform: translate(0); 
            }
            25%{
                transform: translate(10px);
            }
            50%{
                transform: translate(-10px);

            }
            75%{
                transform: translate(10px);
            }
            100%{
                transform: transalte(0);
            }

        }
    }
`;
