import React from 'react'
import style from './Users.module.css'
import User from './User/User.tsx'
import Paginator from './Paginator/Paginator.tsx'
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/react-redux-hooks.ts'
import { useGetUsersQuery } from '../../redux/services/usersApi.ts'
import { getUsersData } from '../../redux/slices/usersSlice.ts'

function Users() {
	const currentPage = useAppSelector(state => state.usersPage.currentPage)
	const users = useAppSelector(state => state.usersPage.users)
	const pageCount = useAppSelector(state => state.usersPage.usersInPageCount)
	const dispatch = useAppDispatch()

	const { data: dataUsers } = useGetUsersQuery({ pageCount, currentPage })

	if (dataUsers && JSON.stringify(dataUsers) !== JSON.stringify(users)) {
		dispatch(getUsersData(dataUsers!))
	}

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
