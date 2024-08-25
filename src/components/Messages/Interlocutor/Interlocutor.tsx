import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './Interlocutor.module.css'
import { useAppSelector } from '../../../hooks/react-redux-hooks.ts'

function Interlocutor() {
	const interlocutor = useAppSelector(state => state.messagesPage.interlocutor)

	let interlocutorElem = interlocutor.map(item => {
		return (
			<NavLink to={`${item.id}`} className={style.link}>
				{item.userName}
			</NavLink>
		)
	})

	return <div>{interlocutorElem}</div>
}

export default Interlocutor
