import React from 'react'
import style from './Header.module.css'
import { NavLink } from 'react-router-dom'

function Header(props) {
	return (
		<div className={style.header}>
			<img src='https://vyazanka.ru/uploads/shops/62c53d258f9f2.png' />

			{props.isAuth && (
				<span className={style.login} onClick={() => props.logout()}>
					{props.login}
				</span>
			)}
			{!props.isAuth && (
				<NavLink to='/login' className={style.login}>
					Логин
				</NavLink>
			)}
		</div>
	)
}

export default Header
