const { addExpense, getExpenses, deleteExpense  } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { addTarget, getTarget, deleteTarget } = require('../controllers/target');



const router = require('express').Router();



router.post('/add-income', addIncome)
        .get('/get-incomes', getIncomes)
        .delete('/delete-income/:id', deleteIncome)
        .post('/add-expense', addExpense)
        .get('/get-expenses', getExpenses)
        .delete('/delete-expense/:id', deleteExpense)
        .post('/add-target', addTarget)
        .get('/get-target', getTarget)
        .delete('/delete-target/:id', deleteTarget)
        // .post('/add-bills', addBills)
        // .get('/get-bills', getBills)
        // .delete('/delete-target/:id', deleteTarget)

module.exports = router
