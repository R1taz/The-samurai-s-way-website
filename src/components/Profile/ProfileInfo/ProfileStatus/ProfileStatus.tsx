import React, { useEffect, useState } from 'react'
import style from './ProfileStatus.module.css'
import { useAppDispatch, useAppSelector } from '../../../../helpers/hooks/react-redux-hooks.ts'
import { useGetStatusQuery, useUpdateStatusMutation } from '../../../../redux/services/profileApi.ts'
import { getUserStatus, updateUserStatus } from '../../../../redux/slices/profileSlice.ts'
import { ProfileInfoProps } from '../ProfileInfo.tsx'

type ProfileStatusProps = Omit<ProfileInfoProps, 'profile'>

function ProfileStatus(props: ProfileStatusProps) {
	const userStatus = useAppSelector(state => state.profilePage.status)
	const dispatch = useAppDispatch()

	const [status, setStatus] = useState(userStatus)
	const [editMode, setEditMode] = useState(false)
	const [updateStatus] = useUpdateStatusMutation()

	useEffect(() => {
		if (userStatus !== status && !editMode) setStatus(userStatus)
	})

	const { data: dataStatus, isLoading: isLoadingStatus } = useGetStatusQuery(props.userId)

	if (dataStatus !== userStatus) dispatch(getUserStatus(dataStatus!))
	if (!dataStatus && isLoadingStatus) return <></>

	const handleBlur = async (): Promise<void> => {
		const newDataStatus = await updateStatus(status).unwrap()
		dispatch(updateUserStatus(newDataStatus!))
		setEditMode(false)
	}

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
					onBlur={handleBlur}
				/>
			)}
		</div>
	)
}

export default ProfileStatus
