import React, { useContext } from 'react';
import Transaction from './Transaction';
import { GlobalContext } from '../context/GlobalState';

export default function TransactionList() {
	const { transactions } = useContext(GlobalContext);

	return (
		<>
			<h3>History</h3>
			<ul className='list' style={{ maxHeight: '280px' }}>
				{transactions.map((transaction) => (
					<Transaction key={transaction._id} transaction={transaction} />
				))}
			</ul>
		</>
	);
}
