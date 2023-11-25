// Importing necessary modules and resources
import React, { useState } from "react";
import styled from "styled-components";
import avatar from '../../img/avatar.png'
import { menuItems } from "../../utils/menuitems";
import { signout } from "../../utils/icons";
import {dollar} from "../../utils/icons";
import { useGlobalContext } from "../../context/globalContext";
import Button from '../../Components/Button/Button';



function Navigation({active, setActive}) {
    const {totalBalance} = useGlobalContext()

    return (
        <NavStyled>
            {/* User info section */} 
            <div className="user-con">
                <img src={avatar} alt="" />
                <div className="text">
                    <h2>Mike</h2>
                    <p>{dollar} {totalBalance()}</p>
                </div>
            </div>

            {/* Menu items section */}
            <ul className="menu-items">

                {/* Mapping through menu items and rendering them */}
                {menuItems.map((item) => {
                    return (<li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className= {active === item.id? 'active': ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                    );
                })} 

            </ul>

            {/* Sign out section */}
            <div className="bottom-nav">
            <Button 
                    name={'Sign Out'}
                    icon={signout}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </NavStyled>
    )
}

// Styled component for navigation
const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 300px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    border: 3px solid black;
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.6);
        }
        h2{
            color: rgba(95, 30, 115);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }

        }
    }

    .active{
        color: rgba(78, 11, 117); !important;
        i{
            color: rgba(34, 34, 96, 1); !important;

        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #630f94;
            border-radius: 0 10px 10px 0;
        }
    }
`;

export default Navigation
