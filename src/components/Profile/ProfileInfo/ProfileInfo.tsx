import React from 'react'
import style from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus/ProfileStatus.tsx'
import ProfileContacts from './ProfileContacts/ProfileContacts.tsx'
import userPhoto from '../../../assets/user.png'
import { NavLink } from 'react-router-dom'
import { ProfileType } from '../../../interfaces'

interface Props {
	isOwner: boolean
	profile: ProfileType
}

const ProfileInfo = (props: Props) => {
	return (
		<div className={style.profile}>
			<img
				src='https://mykaleidoscope.ru/x/uploads/posts/2022-10/1666364979_14-mykaleidoscope-ru-p-krasivie-peizazhi-prirodi-oboi-17.jpg'
				alt=''
			/>

			<div className={style.info}>
				<div>
					<img src={props.profile.photos.large || userPhoto} />
					{props.isOwner && <NavLink to='/edit'>Редактировать</NavLink>}
				</div>

				<div>
					<div>
						<h1>{props.profile.fullName}</h1>
					</div>

					<ProfileStatus isOwner={props.isOwner} />
					<ProfileContacts contacts={props.profile.contacts} />

					<p>Поиск работы: {props.profile.lookingForAJob ? 'В активном поиске' : 'Не ищу'}</p>
					{props.profile.lookingForAJob && <p>Описание резюме: {props.profile.lookingForAJobDescription}</p>}
				</div>
			</div>
		</div>
	)
}

export default ProfileInfo
