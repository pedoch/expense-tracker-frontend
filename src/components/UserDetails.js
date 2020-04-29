import React from 'react';

export default function UserDetails() {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<h4>Hello&nbsp;{JSON.parse(localStorage.getItem('user')).name}</h4>
			<button
				onClick={() => {
					if (localStorage.token) {
						localStorage.removeItem('token');
						localStorage.removeItem('user');
					}
					if (sessionStorage.token) {
						sessionStorage.removeItem('token');
						sessionStorage.removeItem('user');
					}

					window.location.reload();
				}}
				className='btn'
				style={{ maxWidth: '75px', height: '30px', padding: '0px' }}
			>
				Log out
			</button>
		</div>
	);
}
