import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

import HeaderContainer from './components/Header/HeaderContainer'
import LoginContainer from './components/Header/Login/LoginContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import ProfileEditContainer from './components/ProfileEdit/ProfileEditContainer'

import { authorized } from './redux/authReducer'
import { connect } from 'react-redux'

import MessagesContainer from './components/Messages/MessagesContainer'
import NavbarContainer from './components/Navbar/NavbarContainer'

const News = React.lazy(() => import('./components/News/News'))
const UsersContainer = React.lazy(() =>
	import('./components/Users/UsersContainer')
)

function App(props) {
	useEffect(() => {
		props.authorized()
	}, [])

	if (!props.initialization) return <div>Preloader</div>

	return (
		<div class='app'>
			{props.errorDialogBox && (
				<div className='errorDialogBox'>
					<h2>{props.errorDialogBox.title}</h2>
					<p>{props.errorDialogBox.messageError}</p>
					<p>{props.errorDialogBox.statusCode}</p>
				</div>
			)}

			<HeaderContainer />
			<div className='main'>
				<NavbarContainer />

				<div className='content'>
					<Suspense fallback={<div>loading</div>}>
						<Routes>
							<Route path='/login' element={<LoginContainer />} />
							<Route path='/profile/:userId?' element={<ProfileContainer />} />
							<Route path='/edit' element={<ProfileEditContainer />} />
							<Route path='/news' element={<News />} />
							<Route
								path='/messages/:userId?'
								element={<MessagesContainer />}
							/>
							<Route path='/users' element={<UsersContainer />} />
							<Route path='/' element={<Navigate to='/profile' />} />
							<Route path='*' element={<div>Page not found</div>} />
						</Routes>
					</Suspense>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	initialization: state.app.initialization,
	errorDialogBox: state.app.errorDialogBox,
})

export default connect(mapStateToProps, { authorized })(App)
