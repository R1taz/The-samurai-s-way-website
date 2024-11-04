import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './Interlocutor.module.css'
import { useAppSelector } from '../../../helpers/hooks/react-redux-hooks.ts'

function Interlocutors() {
	const interlocutors = useAppSelector(state => state.messagesPage.interlocutors)

	let interlocutorsElem = interlocutors.map(item => {
		return (
			<NavLink to={`${item.id}`} className={style.link}>
				{item.userName}
			</NavLink>
		)
	})

	return <div>{interlocutorsElem}</div>
}

export default Interlocutors
