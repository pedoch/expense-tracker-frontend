import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Spinner, toaster } from 'evergreen-ui';
import Axios from 'axios';

const AddTransaction = () => {
	const [text, setText] = useState('');
	const [amount, setAmount] = useState();
	const [loading, setLoading] = useState(false);
	const [validation, setValidation] = useState({
		text: {
			isValid: true,
			message: '',
		},
		amount: {
			isValid: true,
			message: '',
		},
	});

	const { addTransaction } = useContext(GlobalContext);

	const handleFocus = (key) => {
		setValidation({
			...validation,
			[key]: {
				isValid: true,
				message: '',
			},
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		if (!text) {
			setLoading(false);
			return setValidation({
				...validation,
				text: {
					isValid: false,
					message: 'This field is required',
				},
			});
		}
		if (!amount) {
			setLoading(false);
			return setValidation({
				...validation,
				amount: {
					isValid: false,
					message: 'This field is required',
				},
			});
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
				if (localStorage.getItem('user')) {
					let user = JSON.parse(localStorage.getItem('user'));
					user.transactions = result.data.transactions;
					localStorage.setItem('user', JSON.stringify(user));
				} else {
					let user = JSON.parse(sessionStorage.getItem('user'));
					user.transactions = result.data.transactions;
					sessionStorage.setItem('user', JSON.stringify(user));
				}

				addTransaction(result.data.transactions);

				setText('');
				setAmount(0);

				toaster.success('Add transaction successful');

				setLoading(false);
			})
			.catch((err) => {
				if (!err.response) {
					toaster.danger('Add transaction failed', {
						description: 'May be a network error',
					});
				} else {
					if (err.response.status === 422) {
						toaster.danger('Add transaction failed', {
							description: 'User does not exist',
						});
					}
					if (err.response.status === 500) {
						toaster.danger('Add transaction failed', {
							description: 'May be a problem with our server',
						});
					}
				}

				setLoading(false);
			});
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
						onFocus={() => handleFocus('text')}
					/>
					{!validation.text.isValid && <p>{validation.text.message}</p>}
				</div>
				<div className='form-control'>
					<label htmlFor='amount'>
						Amount <br />( -&nbsp;&nbsp;expense, +&nbsp;&nbsp; income )
					</label>
					<input
						type='number'
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder='Enter amount...'
						onFocus={() => handleFocus('amount')}
					/>
					{!validation.amount.isValid && <p>{validation.amount.message}</p>}
				</div>
				<button className='btn'>
					{loading ? <Spinner size={16} /> : 'Add Transation'}
				</button>
			</form>
		</>
	);
};

export default AddTransaction;
