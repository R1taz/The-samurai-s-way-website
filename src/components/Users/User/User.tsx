import React from 'react'
import style from './User.module.css'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks/react-redux-hooks.ts'
import { useToggleSubscribeMutation } from '../../../redux/services/usersApi.ts'
import { addSubscribingInProgress, toggleUserSubscribe } from '../../../redux/slices/usersSlice.ts'
import { IUser } from '../../../interfaces/index.ts'

interface UserProps {
	user: IUser
}

function User({ user }: UserProps) {
	const subscribingInProgress = useAppSelector(state => state.usersPage.subscribingInProgress)
	const dispatch = useAppDispatch()

	const [toggleSubscribe] = useToggleSubscribeMutation()

	const toggleFollowing = async (toggle: boolean): Promise<void> => {
		dispatch(addSubscribingInProgress(user.id))
		const response = await toggleSubscribe({ id: user.id, toggle: toggle })
		dispatch(toggleUserSubscribe(response.data!))
	}

	return (
		<div className={style.user}>
			<NavLink to={`/profile/${user.id}`}>Имя: {user.name}</NavLink>
			<p>ID: {user.id}</p>
			<p>
				{user.followed && (
					<button
						disabled={subscribingInProgress.find(id => id === user.id) ? true : false}
						onClick={() => toggleFollowing(false)}
					>
						Отписаться
					</button>
				)}
				{!user.followed && (
					<button
						disabled={subscribingInProgress.find(id => id === user.id) ? true : false}
						onClick={() => toggleFollowing(true)}
					>
						Подписаться
					</button>
				)}
			</p>
		</div>
	)
}

export default User
