import React, { useEffect, useState } from 'react'
import style from './ProfileStatus.module.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks/react-redux-hooks.ts'
import { updateUserStatus } from '../../../../redux/profileSlice.ts'

interface Props {
	isOwner: boolean
}

function ProfileStatus(props: Props) {
	const userStatus = useAppSelector(state => state.profilePage.status)
	const [status, setStatus] = useState(userStatus)
	const [editMode, setEditMode] = useState(false)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (userStatus !== status && !editMode) {
			setStatus(userStatus)
		}
	})

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
						dispatch(updateUserStatus(status))
						setEditMode(false)
					}}
				/>
			)}
		</div>
	)
}

export default ProfileStatus
