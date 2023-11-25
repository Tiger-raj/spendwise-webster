// Importing necessary modules and icons from external sources
import React from 'react'
import styled from 'styled-components'
import Button from '../Button/Button';
import { dateFormat } from '../../utils/dateformat';
import {mobile, car, gift, motorcycle, target, laptop, dollar, calender, comment, trash, food, book} from '../../utils/icons';

function TargetItem({
    id,
    title,
    amount,
    date,
    type,
    category,
    description,
    deleteItem,
    indicatorColor,
    
}) {

    //Category icon for target items
    const categoryIcon = () =>{

        //Switch statement to select the appropriate icon based on the category
        switch(category) {

            // (For incomes)
            case 'mobile':
                return mobile;
            case 'gift':
                return gift;
            case 'motorcycle':
                return motorcycle;
            case 'car':
                return car;
            case 'laptop':
                return laptop;
            case 'other':
                return target;
            default:
                return ''
        }
    }

    //category icon for expense items
    const expenseCatIcon = () => {

        // Switch statement to select the appropriate icon based on the category
        switch (category) {

            // (For expenses)
            case 'education':
                return book;
            case 'groceries':
                return food;
            
            default:
                return ''
        }
    }


    return (

        // Styled component for individual income/expense items
        <TargetItemStyled indicator={indicatorColor}>
            
            <div className="icon">
                {/* Displays the icon */}
                {type === 'income' ? expenseCatIcon() : categoryIcon()}
            </div>

            {/* Div for the content of the target item */}
            <div className="content">

                {/* Title and other details of the target */}
                <h5>{title}</h5>

                {/*Inner content */}
                <div className="inner-content">

                    {/*Details about the target */}
                    <div className="text">

                        {/* Displaying amount, date and description */}
                        <p>{dollar} {amount}</p>
                        <p>{calender} {dateFormat(date)}</p>
                        <p>
                            {comment}
                            {description}
                        </p>
                    </div>

                    {/* Delete button to remove the income/expense item */}
                    <div className="btn-con">
                        <Button 
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}

                            //Configuring the delete button
                            onClick={() => deleteItem(id)}
                        />
                    </div>
                </div>
            </div>
        </TargetItemStyled>
    )
}

const TargetItemStyled = styled.div`
background: #FCF6F9;
border: 2px solid #FFFFFF;
box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
border-radius: 20px;
padding: 1rem;
margin-bottom: 1rem;
display: flex;
align-items: center;
gap: 1rem;
width: 100%;
color: #222260;
.icon{
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #F5F5F5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #FFFFFF;
    i{
        font-size: 2.6rem;
    }
}

.content{
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: .2rem;
    h5{
        font-size: 1.3rem;
        padding-left: 2rem;
        position: relative;
        &::before{
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: .8rem;
            height: .8rem;
            border-radius: 50%;
            background: ${props => props.indicator};
        }
    }

    .inner-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .text{
            display: flex;
            align-items: center;
            gap: 1.5rem;
            p{
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--primary-color);
                opacity: 0.8;
            }
        }
    }
}
`;
    
    



export default TargetItem
