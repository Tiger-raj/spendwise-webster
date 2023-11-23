// Importing necessary modules and components
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import {dollar} from "../../utils/icons";

function Incomes() {

    // Accessing functions and states from global context using useGlobalContext hook
    const {addIncome, incomes, getIncomes, deleteIncome, totalIncome} = useGlobalContext()


    // useEffect hook to fetch incomes on component mount
    useEffect(() =>{
        getIncomes()
    }, [])

    return (
        
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                {/* Displaying total income */}
                <h2 className = "total-income">Total Income: <span>{dollar}{totalIncome()}</span></h2>
                <div className='income-content'>
                    <div className='form-container'>
                        {/* Form component to add new income */}
                        <Form />


                    </div>
                    <div className="incomes">

                        {/* Mapping through incomes to display each income */}
                        {incomes.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            return ( 
                                // IncomeItem component to display individual income items
                            <IncomeItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                type={type}
                                category={category}
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteIncome}
                            />
                            );
                        })}

                    </div>
                </div>



            </InnerLayout>
        </IncomeStyled>

    )
}

// Styled component for Incomes section
const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 3px solid black;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 1.5rem;
        gap: .5rem;
        
        span{
            font-size: 2.5rem;
            font-weight; 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;

        }
    }


`;

export default Incomes
