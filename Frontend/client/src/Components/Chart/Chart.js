import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'


import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateformat'


// Registering various Chart.js components for usage in the Chart component
ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {

    // Accessing incomes and expenses from the global context
    const {incomes, expenses} = useGlobalContext()


    // Data for the chart
    const data = {
        labels: incomes.map((inc) =>{
            const {date} = inc
            // Formatting the date using dateFormat utility function
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes.map((income) => {
                        const {amount} = income  // Extracting income amounts
                        return amount
                    })
                ],
                backgroundColor: 'green',
                // Curve tension for the line
                tension: .2  
            },
            {
                label: 'Expenses',
                data: [
                    ...expenses.map((expense) => {
                        const {amount} = expense  // Extracting expense amounts
                        return amount
                    })
                ],
                backgroundColor: 'red',
                // Curve tension for the line
                tension: .2 
            }
        ]
    }

    
    return (

        // Styled component for Chart_
        <ChartStyled>
            <Line data={data}/>
        </ChartStyled>
    )
}


const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;

`;

export default Chart
