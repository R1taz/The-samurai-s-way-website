import React, { useEffect, useState } from 'react'
import style from './ProfileStatus.module.css'

function ProfileStatus(props) {
	const [status, setStatus] = useState(props.status)
	const [editMode, setEditMode] = useState(false)

	useEffect(() => {
		setStatus(props.status)
	}, [props.status])

	return (
		<div className={style.status}>
			{!editMode && (
				<p
					onDoubleClick={() => {
						if (props.isOwner) setEditMode(true)
					}}
				>
					{status || 'Введите статус'}
				</p>
			)}
			{editMode && (
				<input
					type='text'
					value={status}
					onChange={event => setStatus(event.target.value)}
					autoFocus
					onBlur={() => {
						props.updateUserStatus(status)
						setEditMode(false)
					}}
				/>
			)}
		</div>
	)
}

export default ProfileStatus
