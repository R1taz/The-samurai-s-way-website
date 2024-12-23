import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import reportWebVitals from './reportWebVitals.js'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.ts'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
