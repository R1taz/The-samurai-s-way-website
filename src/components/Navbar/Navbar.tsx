import React from 'react'
import style from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../hooks/react-redux-hooks.ts'

function Navbar() {
	const friends = useAppSelector(state => state.navbar.friends)

	const isActiveLink = (props: { isActive: boolean }) => {
		if (props.isActive) return style.activeLink
	}

	let friendsElem = friends.map(friend => {
		return (
			<div className={style.friend}>
				<img src={friend.urlPhoto} />
				<p className={style.userName}>{friend.userName}</p>
				<div className={friend.isOnline ? style.online : style.offline}></div>
			</div>
		)
	})

	return (
		<div className={style.navbar}>
			<NavLink to='/profile' className={isActiveLink}>
				Профиль
			</NavLink>
			<NavLink to='/news' className={isActiveLink}>
				Новости
			</NavLink>
			<NavLink to='/messages' className={isActiveLink}>
				Сообщения
			</NavLink>
			<NavLink to='/users' className={isActiveLink}>
				Люди
			</NavLink>
			<NavLink to='/communities' className={isActiveLink}>
				Сообщества
			</NavLink>
			<NavLink to='/music' className={isActiveLink}>
				Музыка
			</NavLink>

			<div className={style.friends}>{friendsElem}</div>
		</div>
	)
}

export default Navbar
