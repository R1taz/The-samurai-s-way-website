import React from 'react'
import style from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux-hooks.ts'
import { logout } from '../../redux/authSlice.ts'

function Header() {
	const isAuth = useAppSelector(state => state.auth.isAuth)
	const login = useAppSelector(state => state.auth.login)
	const dispatch = useAppDispatch()

	return (
		<div className={style.header}>
			<img src='https://vyazanka.ru/uploads/shops/62c53d258f9f2.png' />

			{isAuth && (
				<span className={style.login} onClick={() => dispatch(logout())}>
					{login}
				</span>
			)}
			{!isAuth && (
				<NavLink to='/login' className={style.login}>
					Логин
				</NavLink>
			)}
		</div>
	)
}

export default Header
