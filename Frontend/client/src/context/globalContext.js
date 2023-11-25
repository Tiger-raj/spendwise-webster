// Importing necessary modules from React and axios
import React, { useContext, useState } from "react"
import axios from 'axios'



// Base URL for API requests
const BASE_URL = "http://localhost:5000/api/v1/";

 // Creating a new context
const GlobalContext = React.createContext()


// Global Provider component
export const GlobalProvider = ({children}) => {

    // State for incomes, expenses, and error handling
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //State for targets
    const [target, setTarget] = useState([])

    //State for bills
    // const [bills, setBills] = useState([])

    //add an income
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    //fetch incomes
    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    //delete an income
    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    //calculate total income
    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //add an expense
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    //fetch expenses
    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }


    //delete an expense
    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    //calculate total expense
    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate total Balance 
    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    //function to generate transaction history
    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 5)
    }

    //add a target
    const addTarget = async (target) => {
        const response = await axios.post(`${BASE_URL}add-target`, target)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getTarget()
    }

    //fetch target
    const getTarget = async () => {
        const response = await axios.get(`${BASE_URL}get-target`)
        setTarget(response.data)
        console.log(response.data)
    }

    //delete a target
    const deleteTarget = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-target/${id}`)
        getTarget()
    }


    //add bills
    // const addBills = async (target) => {
    //     const response = await axios.post(`${BASE_URL}add-bills`, bills)
    //         .catch((err) =>{
    //             setError(err.response.data.message)
    //         })
    //     getBills()
    // }

    //fetch bills
    // const getBills = async () => {
    //     const response = await axios.get(`${BASE_URL}get-bills`)
    //     setBills(response.data)
    //     console.log(response.data)
    // }

    //delete a bill
    // const deleteBills = async (id) => {
    //     const res  = await axios.delete(`${BASE_URL}delete-bills/${id}`)
    //     getBills()
    // }




    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            target,
            setTarget,
            addTarget,
            getTarget,
            deleteTarget, 
            // bills,
            // setBills, 
            // addBills,
            // getBills,
            // deleteBills
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


//Custom hook to use the global context
export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}
