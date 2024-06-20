import React from 'react'
import style from './User.module.css'
import { NavLink } from 'react-router-dom'

function User(props) {
	return (
		<div className={style.user}>
			<NavLink to={`/profile/${props.user.id}`}>Имя: {props.user.name}</NavLink>
			<p>ID: {props.user.id}</p>
			<p>
				{props.user.followed && (
					<button
						disabled={props.subscribingInProgress.find(
							id => id === props.user.id
						)}
						onClick={() => props.toggleSubscribe(props.user.id, false)}
					>
						Отписаться
					</button>
				)}
				{!props.user.followed && (
					<button
						disabled={props.subscribingInProgress.find(
							id => id === props.user.id
						)}
						onClick={() => props.toggleSubscribe(props.user.id, true)}
					>
						Подписаться
					</button>
				)}
			</p>
		</div>
	)
}

export default User
