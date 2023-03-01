import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

const App = () => {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;