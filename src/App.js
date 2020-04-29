import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/ExpenseTrackerMain';
import Error from './components/Error';
import MainLayout from './components/MainLayout';
import { GlobalProvider } from './context/GlobalState';
import './App.css';

function App() {
	return (
		<GlobalProvider>
			<BrowserRouter>
				<MainLayout>
					<div className='container'>
						<Header />
						<Switch>
							<Route path='/login' component={Login} />
							<Route path='/signup' component={Signup} />
							<Route path='/' component={Main} exact />
							<Route component={Error} />
						</Switch>
					</div>
				</MainLayout>
			</BrowserRouter>
		</GlobalProvider>
	);
}

export default App;
