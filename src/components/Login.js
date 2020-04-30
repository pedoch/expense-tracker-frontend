import React, { useState, useContext } from 'react';
import { length, email } from '../util/validators';
import { Redirect, Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import axios from 'axios';
// import axios from 'axios';

export default function Login() {
	const [loginInfo, setLoginInfo] = useState({
		email: '',
		password: '',
		rememberMe: true,
	});

	const [validation, setValidation] = useState({
		email: {
			isValid: true,
			message: '',
		},
		password: {
			isValid: true,
			message: '',
		},
	});

	const { setUser } = useContext(GlobalContext);

	const handleInput = (e, key) => {
		setLoginInfo({
			...loginInfo,
			[key]: e.target.value,
		});
	};

	const handleFocus = (key) => {
		setValidation({
			...validation,
			[key]: {
				isValid: true,
				message: '',
			},
		});
	};

	// const handleRedirect = (link) => {
	// 	return <Redirect to={{ pathname: link }} />;
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		let check = email(loginInfo.email);
		if (!check.isValid)
			return setValidation({
				...validation,
				email: {
					isValid: false,
					message: 'Please enter valid email',
				},
			});
		check = length({ min: 6 }, loginInfo.password);
		if (!check.isValid)
			return setValidation({
				...validation,
				password: {
					isValid: false,
					message: 'Password should be atleast 6 characters long',
				},
			});

		axios
			.post('https://expense-tracker-deltanboi.herokuapp.com/auth/login', {
				email: loginInfo.email,
				password: loginInfo.password,
			})
			.then((result) => {
				setUser(result.data.user);

				if (loginInfo.rememberMe) {
					localStorage.setItem('token', result.data.token);
					localStorage.setItem('user', JSON.stringify(result.data.user));
				} else {
					sessionStorage.setItem('token', result.data.token);
					sessionStorage.setItem('user', JSON.stringify(result.data.user));
				}

				// handleRedirect('/');
				// window.location.replace('/');
				return <Redirect to='/' />;
			})
			.catch((err) => console.log(err));
	};

	if (localStorage.getItem('token') || sessionStorage.getItem('token'))
		return <Redirect to='/' />;

	return (
		<div>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className='form-control'>
					<label htmlFor='email'>Email</label>
					<input
						type='text'
						name='email'
						value={loginInfo.email}
						onChange={(e) => handleInput(e, 'email')}
						placeholder='Enter email...'
						onFocus={() => handleFocus('email')}
					/>
					{!validation.email.isValid && <p>{validation.email.message}</p>}
				</div>
				<div className='form-control'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						value={loginInfo.password}
						onChange={(e) => handleInput(e, 'password')}
						placeholder='Enter password...'
						onFocus={() => handleFocus('password')}
					/>
					{!validation.password.isValid && <p>{validation.password.message}</p>}
				</div>
				<div className='checkbox'>
					<input
						type='checkbox'
						defaultChecked={true}
						onChange={(e) =>
							setLoginInfo({ ...loginInfo, rememberMe: e.target.checked })
						}
					/>
					<span>Remember me</span>
				</div>
				<button type='submit' className='btn'>
					Login
				</button>
			</form>
			<hr />
			<p>
				Don't have an account? &nbsp;&nbsp;<Link to='/signup'>Signup</Link>
			</p>
		</div>
	);
}
