import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Axios from 'axios';

const AddTransaction = () => {
	const [text, setText] = useState('');
	const [amount, setAmount] = useState(0);

	const {addTransaction} = useContext(GlobalContext)

	const onSubmit = (e) => {
		e.preventDefault();

		if (!text) {
			return alert('Transaction text required');
		}
		if (!amount) {
			return alert('Transaction amount required');
		}

		Axios.put(
			'https://expense-tracker-deltanboi.herokuapp.com/transaction/create-transaction',
			{
				amount: amount,
				text: text,
			},
			{
				headers: {
					Authorization: localStorage.getItem('token')
						? 'Bearer ' + localStorage.getItem('token')
						: 'Bearer ' + sessionStorage.getItem('token'),
				},
			},
		)
			.then((result) => {
				if(localStorage.getItem('user')){
					let user = JSON.parse(localStorage.getItem('user'))
					user.transactions = result.data.transactions
					localStorage.setItem('user', JSON.stringify(user))
					addTransaction(result.data.transactions)
				}
			})
			.catch((err) => console.log(err));
	};
	return (
		<>
			<h3>Add new transaction</h3>
			<form onSubmit={onSubmit}>
				<div className='form-control'>
					<label htmlFor='text'>Text</label>
					<input
						type='text'
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder='Enter text...'
					/>
				</div>
				<div className='form-control'>
					<label htmlFor='amount'>
						Amount <br />
						(negative - expense, positive - income)
					</label>
					<input
						type='number'
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder='Enter amount...'
					/>
				</div>
				<button className='btn'>Add transaction</button>
			</form>
		</>
	);
};

export default AddTransaction;
