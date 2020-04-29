// import React, { useContext } from 'react';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Balance from './Balance';
import IncomeExpences from './IncomeExpences';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';
import UserDetails from './UserDetails';
// import { GlobalContext } from '../context/GlobalState';

export default function ExpenseTrackerMain() {
	// const { user } = useContext(GlobalContext);

	if (!localStorage.getItem('token') && !sessionStorage.getItem('token'))
		return <Redirect to='/login' />;
	return (
		<>
			<UserDetails />
			<Balance />
			<IncomeExpences />
			<TransactionList />
			<AddTransaction />
		</>
	);
}
