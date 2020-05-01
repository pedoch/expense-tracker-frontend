import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { toaster } from 'evergreen-ui';
import Axios from 'axios';

export default function Transaction({ transaction }) {
	const { deleteTransaction } = useContext(GlobalContext);
	const sign = transaction.amount < 0 ? '-' : '+';
	return (
		<li className={transaction.amount < 0 ? 'minus' : 'plus'}>
			<div>
				<button
					className='delete-btn'
					onClick={() => {
						Axios.delete(
							'https://expense-tracker-deltanboi.herokuapp.com/transaction/delete-transaction/' +
								transaction._id,
							{
								headers: {
									Authorization: localStorage.getItem('token')
										? 'Bearer ' + localStorage.getItem('token')
										: 'Bearer ' + sessionStorage.getItem('token'),
								},
							},
						)
							.then((result) => {
								deleteTransaction(result.data.transactions);
								toaster.success('Delete Transaction Successful');
							})
							.catch((err) => {
								if (!err.response) {
									toaster.danger('Delete transaction failed', {
										description: 'May be a network error',
									});
								} else {
									if (err.response.status === 404) {
										toaster.danger('Delete transaction failed');
									}
									if (err.response.status === 500) {
										toaster.danger('Delete transaction failed', {
											description: 'May be a problem with our server',
										});
									}
								}
							});
					}}
				>
					x
				</button>
				{transaction.text}{' '}
			</div>
			<span>
				{sign}₦{Math.abs(transaction.amount)}
			</span>
		</li>
	);
}
