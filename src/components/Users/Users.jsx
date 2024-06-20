import React, { useEffect } from 'react'
import style from './Users.module.css'
import User from './User/User'
import Paginator from './Paginator/Paginator'

function Users(props) {
	useEffect(() => {
		if (props.users.length !== 0) return
		props.getUsers(props.currentPage)
	}, [])

	if (props.users.length === 0) return <div>loading</div>

	const usersElements = props.users.map(user => {
		return (
			<User
				user={user}
				subscribingInProgress={props.subscribingInProgress}
				toggleSubscribe={props.toggleSubscribe}
			/>
		)
	})

	return (
		<div>
			<Paginator
				totalUsersCount={props.totalUsersCount}
				usersInPageCount={props.usersInPageCount}
				pagesInPortionCount={props.pagesInPortionCount}
				currentPage={props.currentPage}
				getUsers={props.getUsers}
				changeCurrentPage={props.changeCurrentPage}
			/>
			<div className={style.users}>{usersElements}</div>
		</div>
	)
}

export default Users
