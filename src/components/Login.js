import React, { useState, useContext } from 'react';
import { length, email } from '../util/validators';
import { Redirect, Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { Spinner, toaster } from 'evergreen-ui';
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

	const [redirect, setRedirect] = useState(false);
	const [loading, setLoading] = useState(false);

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
		setLoading(true);
		let check = email(loginInfo.email);
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
		check = length({ min: 6 }, loginInfo.password);
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

				toaster.success('Login successful');

				setRedirect(true);
			})
			.catch((err) => {
				if (!err.response) {
					toaster.danger('Login failed', {
						description: 'May be a network error',
					});
				} else {
					if (err.response.status === 401) {
						toaster.danger('Login failed', {
							description: 'Incorrect email/password',
						});
					}
					if (err.response.status === 500) {
						toaster.danger('Login failed', {
							description: 'May be a problem with our server',
						});
					}
				}

				setLoading(false);
			});
	};

	if (localStorage.getItem('token') || sessionStorage.getItem('token'))
		return <Redirect to='/' />;

	if (redirect) return <Redirect to='/' />;

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
				<button type='submit' className='btn' disabled={loading}>
					{loading ? <Spinner size={16} /> : 'Login'}
				</button>
			</form>
			<hr />
			<p>
				Don't have an account? &nbsp;&nbsp;<Link to='/signup'>Signup</Link>
			</p>
		</div>
	);
}
