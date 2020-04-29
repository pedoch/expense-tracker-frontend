import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Axios from 'axios';

export default function Transaction({ transaction }) {
	const { deleteTransaction } = useContext(GlobalContext);
	const sign = transaction.amount < 0 ? '-' : '+';
	return (
		<li className={transaction.amount < 0 ? 'minus' : 'plus'}>
			{transaction.text}{' '}
			<span>
				{sign}${Math.abs(transaction.amount)}
			</span>
			<button
				className='delete-btn'
				onClick={() => {
					Axios.delete('https://expense-tracker-deltanboi.herokuapp.com/transaction/delete-transaction/'+transaction._id,
					{
						headers: {
							Authorization: localStorage.getItem('token')
								? 'Bearer ' + localStorage.getItem('token')
								: 'Bearer ' + sessionStorage.getItem('token'),
						},
					},).then((result)=>{
						deleteTransaction(result.data.transactions);
					}).catch((err)=>{
						console.log(err)
					})
				}}
			>
				x
			</button>
		</li>
	);
}
