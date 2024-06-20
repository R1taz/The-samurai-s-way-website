import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './Interlocutor.module.css'

function Interlocutor(props) {
	let interlocutorElem = props.interlocutor.map(item => {
		return (
			<NavLink to={`${item.id}`} className={style.link}>
				{item.userName}
			</NavLink>
		)
	})

	return <div>{interlocutorElem}</div>
}

export default Interlocutor
