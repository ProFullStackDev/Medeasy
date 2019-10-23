import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import ScrollToTop from './components/ScrollToTop'
import store from './redux/store'

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<ScrollToTop>
				<App />
			</ScrollToTop>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)
