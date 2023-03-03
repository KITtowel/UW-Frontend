import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import NearStore from './pages/NearStore';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index path="/login" element={<Login />} />
				<Route path="/nearstore" element={<NearStore />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;