import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import AppRouter from './router/Router';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
	<React.StrictMode>
		<AppRouter />
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
