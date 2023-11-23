//Importing the necessary method from the styled-components library
import React from "react";
import styled, { keyframes } from "styled-components";

//Importing a custom hook for obtaining window size
import { useWindowSize } from '../../utils/useWindowSize';  


//Creating a functional component named Orb
function Orb() {

    //using the useWindowSize hook to get the width and height of the window
    const {width, height} = useWindowSize()

    console.log (width, height)


    //defining a keyframe animation uusing the keyframes method from styled-components
    const moveOrb = keyframes`
        0%{
            transform: translate(0,0);
        }
        50%{
            transform: translate(400px, 500px);
        }
        100%{
            transform: translate(0,0);
    `


    //creating a styled component called OrbStyled
    const OrbStyled = styled.div`
        width: 70vh;  
        height: 70vh;
        position: absolute;
        border-radius: 50%;
        margin-left: -37vh;
        margin-top: -37vh;
        background: linear-gradient(180deg, #760a94 0%, #b59bbd 100%);
        filter: blur(300px);
        animation: ${moveOrb} 20s alternate linear infinite;

    `;

    return (
        <OrbStyled></OrbStyled>
    )
}

//Exporting the Orb component 
export default Orb
