import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import App from './App.jsx'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import ScrollToTop from './components/ScrollToTop'
import store from './redux/store'
import history from './redux/createHistory'

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<ScrollToTop>
				<App />
			</ScrollToTop>
		</Router>
	</Provider>,
	document.getElementById('root')
)
