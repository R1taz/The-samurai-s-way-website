import React from 'react'
import style from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthorizedIsAuth } from '../../redux/selectors'
import { logout } from '../../redux/authReducer.ts'

function Header() {
	const dispatch = useDispatch()
	const isAuth = useSelector((state: any) => getUserAuthorizedIsAuth(state))
	const login = useSelector((state: any) => state.auth.login)

	return (
		<div className={style.header}>
			<img src='https://vyazanka.ru/uploads/shops/62c53d258f9f2.png' />

			{isAuth && (
				<span className={style.login} onClick={() => logout()(dispatch)}>
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
