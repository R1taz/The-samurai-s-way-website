import React from 'react'
import style from './User.module.css'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/react-redux-hooks.ts'
import { toggleSubscribe } from '../../../redux/usersSlice.ts'
import { UserType } from '../../../interfaces/index.ts'

interface Props {
	user: UserType
}

function User({ user }: Props) {
	const subscribingInProgress = useAppSelector(state => state.usersPage.subscribingInProgress)
	const dispatch = useAppDispatch()

	return (
		<div className={style.user}>
			<NavLink to={`/profile/${user.id}`}>Имя: {user.name}</NavLink>
			<p>ID: {user.id}</p>
			<p>
				{user.followed && (
					<button
						disabled={subscribingInProgress.find(id => id === user.id)}
						onClick={() => dispatch(toggleSubscribe({ id: user.id, toggle: false }))}
					>
						Отписаться
					</button>
				)}
				{!user.followed && (
					<button
						disabled={subscribingInProgress.find(id => id === user.id)}
						onClick={() => dispatch(toggleSubscribe({ id: user.id, toggle: true }))}
					>
						Подписаться
					</button>
				)}
			</p>
		</div>
	)
}

export default User
