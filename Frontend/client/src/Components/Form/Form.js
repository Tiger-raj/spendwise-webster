// Importing necessary modules and components
import React, {useState} from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import { plus } from '../../utils/icons';
import Button from '../../Components/Button/Button'


function Form() {

    // Accessing required functions and states from global context
    const {addIncome, getIncomes, error, setError} = useGlobalContext()

    // State variables to manage form inputs
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })


    // Destructuring state variables for easier access
    const {title, amount, date, category, description} = inputState;

    
    // Function to handle input changes
    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }


    // Function to handle form submission
    const handleSubmit = e => {
        e.preventDefault()

        // Calling addIncome function with form data
        addIncome(inputState)
        getIncomes(inputState)

        // Resetting the input state after submission
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        })
    }

    return (
        // Styled form component to input income details
        <FormStyled onSubmit={handleSubmit}>

            {/* Displaying error if present */}
            {error && <p className='error'>{error}</p>}

            {/* Input field for salary title */}
            <div className='input-control'>
                <input 
                type="text" 
                value={title}
                name={'title'}
                placeholder="Salary Title"
                onChange={handleInput('title')}
                />
            </div>

            {/* Input field for salary amount */}
            <div className='input-control'>
                <input 
                type="text" 
                value={amount}
                name={'amount'}
                placeholder="Salary Amount"
                onChange={handleInput('amount')}
                />
            </div>

            {/* Date picker to select a date */}
            <div className='input-control'>
                <DatePicker
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>

            {/* Dropdown to select a category */}
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>

                    {/* Options for different income categories */}
                    <option value=""  disabled >Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>  
                    <option value="youtube">Youtube</option>  
                    <option value="other">Other</option>  
                </select>
            </div>

            {/* Textarea for description */}
            <div className='input-control'>
                <textarea name="description" value={description} placeholder= 'Add A Reference' id="description" cols="30" rows="4" onChange={(handleInput('description'))}></textarea>
            </div>

            {/* Button to submit the form */}
            <div className='submit-btn'>
                <Button 
                    name={'Add Income'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
            
        </FormStyled>
    )
}


// Styled form component
const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }
    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }
    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }

`;

export default Form
