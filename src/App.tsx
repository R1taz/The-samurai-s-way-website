import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

import { authorized } from './redux/slices/authSlice.ts'
import { useAppDispatch, useAppSelector } from './helpers/hooks/react-redux-hooks.ts'
import { useGetUserDataQuery } from './redux/services/authApi.ts'
import { initialized } from './redux/slices/appSlice.ts'

import Layout from './components/Layout/Layout.tsx'
import News from './components/News/News.tsx'
import Login from './components/Login/Login.tsx'
import Profile from './components/Profile/Profile.tsx'
import Messages from './components/Messages/Messages.tsx'

const ProfileEdit = lazy(() => import('./components/ProfileEdit/ProfileEdit.tsx'))
const Users = lazy(() => import('./components/Users/Users.tsx'))
const NotFoundPage = lazy(() => import('./components/NotFoundPage/NotFoundPage.tsx'))

function App() {
	const initialization = useAppSelector(state => state.app.initialization)
	const dispatch = useAppDispatch()

	const { data, isError } = useGetUserDataQuery('')

	if (isError) {
		dispatch(initialized())
	}

	if (data && !initialization) {
		if (data.resultCode === 0) dispatch(authorized(data.data))
		dispatch(initialized())
	}

	if (!initialization) return <div>Preloader</div>

	return (
		<Suspense fallback={<div>loading</div>}>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index path='/news' element={<News />} />
					<Route path='/' element={<Navigate to='/news' />} />
					<Route path='login' element={<Login />} />
					<Route path='profile/:id?' element={<Profile />} />
					<Route path='edit' element={<ProfileEdit />} />
					<Route path='messages/:userId?' element={<Messages />} />
					<Route path='users' element={<Users />} />
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>
		</Suspense>
	)
}

export default App
