import React, { useEffect } from 'react'
import style from './Users.module.css'
import User from './User/User.tsx'
import Paginator from './Paginator/Paginator.tsx'
import { getUsers } from '../../redux/usersSlice.ts'
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux-hooks.ts'

function Users() {
	const currentPage = useAppSelector(state => state.usersPage.currentPage)
	const users = useAppSelector(state => state.usersPage.users)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (users.length !== 0) return
		dispatch(getUsers(currentPage))
	}, [dispatch])

	if (users.length === 0) return <div>loading</div>

	return (
		<div>
			<Paginator currentPage={currentPage} />
			<div className={style.users}>
				{users.map(user => (
					<User user={user} />
				))}
			</div>
		</div>
	)
}

export default Users
