import React from 'react'
import style from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../helpers/hooks/react-redux-hooks.ts'
import Friend from './Friend/Friend.tsx'

type NavLinkClassProps = { isActive: boolean }

function Navbar() {
	const friends = useAppSelector(state => state.navbar.friends)

	const isActiveLink = (props: NavLinkClassProps): string => {
		return props.isActive ? style.activeLink : ''
	}

	let friendsElem = friends.map(friend => {
		return <Friend key={friend.id} {...friend} />
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
