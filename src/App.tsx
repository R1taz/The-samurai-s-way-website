import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

import Header from './components/Header/Header.tsx'
import Login from './components/Login/Login.tsx'
import Profile from './components/Profile/Profile.tsx'
import ProfileEdit from './components/ProfileEdit/ProfileEdit.tsx'
import Messages from './components/Messages/Messages.tsx'
import Navbar from './components/Navbar/Navbar.tsx'

import { authorized } from './redux/authSlice.ts'
import { useAppDispatch, useAppSelector } from './hooks/react-redux-hooks.ts'
import GlobalError from './components/GlobalError/GlobalError.tsx'

const News = React.lazy(() => import('./components/News/News.tsx'))
const Users = React.lazy(() => import('./components/Users/Users.tsx'))

function App() {
	const initialization = useAppSelector(state => state.app.initialization)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(authorized())
	}, [dispatch])

	if (!initialization) return <div>Preloader</div>

	return (
		<div className='app'>
			<GlobalError />
			<Header />
			<div className='main'>
				<Navbar />

				<div className='content'>
					<Suspense fallback={<div>loading</div>}>
						<Routes>
							<Route path='/login' element={<Login />} />
							<Route path='/profile/:userId?' element={<Profile />} />
							<Route path='/edit' element={<ProfileEdit />} />
							<Route path='/news' element={<News />} />
							<Route path='/messages/:userId?' element={<Messages />} />
							<Route path='/users' element={<Users />} />
							<Route path='/' element={<Navigate to='/profile' />} />
							<Route path='*' element={<div>Page not found</div>} />
						</Routes>
					</Suspense>
				</div>
			</div>
		</div>
	)
}

export default App
