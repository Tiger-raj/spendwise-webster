import React from 'react'
import styled from 'styled-components'

// Button component with various props
function Button({name, icon, onClick, bg, bPad, color, bRad}) {
    return (

        // Styled button with inline styles based on props and an onClick event
        <ButtonStyled style={{
            background: bg,
            padding: bPad,
            borderRadius: bRad,
            color: color,
        }} onClick={onClick}>
            {icon}  {/* Icon passed as a prop */}
            {name}  {/* Button text passed as a prop */}
            
        </ButtonStyled>

    )
}


// Styled button component using styled-components
const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
    transition: all .4s ease-in-out;

`;

export default Button
