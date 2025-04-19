import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from "react-router-dom";
import AppRoute from './config/app-route.jsx';
import { Provider } from 'react-redux'
import { store } from './reducer/store.js'
import { loadConfig } from './config.js';


// bootstrap
import 'bootstrap';

// css
import '@fortawesome/fontawesome-free/css/all.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './index.css';
import './scss/react.scss';
import 'bootstrap-social/bootstrap-social.css';

loadConfig().then(() => {
	const container = document.getElementById('root');
	const root = createRoot(container);
	function App() {
		let element = useRoutes(AppRoute);
		return element;
	}

	root.render(
		<StrictMode>
			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>
		</StrictMode>
	);
});