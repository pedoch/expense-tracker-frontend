import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { required, length, email } from '../util/validators';
import { Spinner, toaster } from 'evergreen-ui';
import axios from 'axios';

export default function Signup() {
	const [signupInfo, setSignupInfo] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [validation, setValidation] = useState({
		name: {
			isValid: true,
			message: '',
		},
		email: {
			isValid: true,
			message: '',
		},
		password: {
			isValid: true,
			message: '',
		},
	});

	const [redirect, setRedirect] = useState(false);

	const [loading, setLoading] = useState(false);

	const handleInput = (e, key) => {
		setSignupInfo({
			...signupInfo,
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

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		let check = required(signupInfo.name);
		if (!check.isValid) {
			setLoading(false);
			return setValidation({
				...validation,
				name: {
					isValid: false,
					message: 'Please enter your name',
				},
			});
		}
		check = email(signupInfo.email);
		if (!check.isValid) {
			setLoading(false);
			return setValidation({
				...validation,
				email: {
					isValid: false,
					message: 'Please enter valid email',
				},
			});
		}
		check = length({ min: 6 }, signupInfo.password);
		if (!check.isValid) {
			setLoading(false);
			return setValidation({
				...validation,
				password: {
					isValid: false,
					message: 'Password should be atleast 6 characters long',
				},
			});
		}
		axios
			.put('https://expense-tracker-deltanboi.herokuapp.com/auth/signup', {
				name: signupInfo.name,
				email: signupInfo.email,
				password: signupInfo.password,
			})
			.then((result) => {
				toaster.success('Signup successful');
				setRedirect(true);
			})
			.catch((err) => {
				if (!err.response) {
					toaster.danger('Login failed', {
						description: 'May be a network error',
					});
				} else {
					if (err.response.status === 422) {
						toaster.danger('Signup failed', {
							description: 'User already exists',
						});
					}
					if (err.response.status === 500) {
						toaster.danger('Signup failed', {
							description: 'May be a problem with our server',
						});
					}
				}

				setLoading(false);
			});
	};

	if (localStorage.getItem('token') || sessionStorage.getItem('token'))
		return <Redirect to='/' />;

	if (redirect) return <Redirect to='/login' />;

	return (
		<div>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className='form-control'>
					<label htmlFor='name'>Name*</label>
					<input
						type='text'
						name='name'
						value={signupInfo.name}
						onChange={(e) => handleInput(e, 'name')}
						placeholder='Enter your name...'
						onFocus={() => handleFocus('name')}
					/>
					{!validation.name.isValid && <p>{validation.name.message}</p>}
				</div>
				<div className='form-control'>
					<label htmlFor='email'>Email*</label>
					<input
						type='text'
						name='email'
						value={signupInfo.email}
						onChange={(e) => handleInput(e, 'email')}
						placeholder='Enter email...'
						onFocus={() => handleFocus('email')}
					/>
					{!validation.email.isValid && <p>{validation.email.message}</p>}
				</div>
				<div className='form-control'>
					<label htmlFor='password'>Password*</label>
					<input
						type='password'
						name='password'
						value={signupInfo.password}
						onChange={(e) => handleInput(e, 'password')}
						placeholder='Enter password...'
						onFocus={() => handleFocus('password')}
					/>
					{!validation.password.isValid && <p>{validation.password.message}</p>}
				</div>
				<button type='submit' className='btn'>
					{loading ? <Spinner size={16} /> : 'Signup'}
				</button>
			</form>
			<hr></hr>
			<p>
				Have an account? &nbsp;&nbsp;<Link to='/login'>Login</Link>
			</p>
		</div>
	);
}
