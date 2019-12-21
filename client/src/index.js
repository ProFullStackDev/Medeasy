import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import App from './App.jsx'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import ScrollToTop from './components/ScrollToTop'
import store from './redux/store'
import history from './redux/createHistory'

window.fcWidget.init({
	token: '820e752d-920a-4fe7-847c-389c48ccb138',
	host: 'https://wchat.freshchat.com'
})

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
