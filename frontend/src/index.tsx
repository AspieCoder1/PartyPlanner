import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import AppRouter from './router/Router';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Provider } from 'react-redux';
import store from './redux/store';
import './utils/history';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { setId, setToken, setUsername } from './redux/user-slice';

interface TokenDecoded extends JwtPayload {
	username: string;
	id: string;
	exp: number;
}

if (localStorage.token) {
	const decoded: TokenDecoded = jwtDecode(localStorage.token);
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		window.location.href = '/';
	} else {
		store.dispatch(setUsername(decoded.username));
		store.dispatch(setToken(localStorage.token));
		store.dispatch(setId(decoded.id));
	}
}

console.log(process.env);

ReactDOM.render(
	<div>
		<Provider store={store}>
			<AppRouter />
		</Provider>
	</div>,
	document.getElementById('root')
);

serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
