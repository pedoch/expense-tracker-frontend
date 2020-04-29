import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
	transactions: [],
	user: {
		transactions: [],
	},
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	function deleteTransaction(id) {
		dispatch({
			type: 'DELETE_TRANSACTION',
			payload: id,
		});
	}

	function addTransaction(transaction) {
		dispatch({
			type: 'ADD_TRANSACTION',
			payload: transaction,
		});
	}

	function setUser(user) {
		dispatch({
			type: 'SET_USER',
			payload: user,
		});
	}

	return (
		<GlobalContext.Provider
			value={{
				transactions: state.user.transactions,
				user: state.user,
				deleteTransaction,
				addTransaction,
				setUser,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
