// Importing necessary modules from React and styled-components
import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';

function History() {

    // Accessing transactionHistory from global context
    const {transactionHistory} = useGlobalContext()


    // Destructuring transactionHistory into a new array called history
    const [...history] = transactionHistory()


    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {history.map((item) =>{
                const {_id, title, amount, type} = item
                return (
                  <div key={_id} className='history-item'>
                    <p style={{
                        color: type === 'income' ? 'var(--color-green)' : 'red'
                    }}>
                        {title}
                    </p>

                    <p style={{
                        color: type === 'income' ? 'var(--color-green)' : 'red'
                    }}>
                        {
                            type === 'income' ? `+${amount <= 0 ? 0 : amount}` : `-${amount <= 0 ? 0: amount}`
                        }
                    </p>

                  </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1.5rem;
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .h2{
        color: rgba(95, 30, 115);
        font-wieght: bold;
        font-size: 2em;
    }
`;

export default History
