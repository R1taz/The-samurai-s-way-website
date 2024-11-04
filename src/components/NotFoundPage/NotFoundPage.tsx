import React from 'react'
import style from './NotFoundPage.module.css'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
	return (
		<div className={style.notFound}>
			<h1>Страница не найдена</h1>
			<Link to='/'>Вернуться на главную</Link>
		</div>
	)
}

export default NotFoundPage
