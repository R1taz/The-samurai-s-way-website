import React from 'react'
import style from './ProfileEdit.module.css'
import userPhoto from '../../assets/user.png'
import { Field, Form, Formik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/react-redux-hooks.ts'
import {
	useGetProfileQuery,
	useUpdatePhotoMutation,
	useUpdateProfileMutation,
} from '../../redux/services/profileApi.ts'
import { getUserProfile, updateUserPhoto, updateUserProfile } from '../../redux/slices/profileSlice.ts'
import useRedirect from '../../helpers/hooks/useRedirect.tsx'

const ProfileEdit = () => {
	const profile = useAppSelector(state => state.profilePage.profile)
	const id = useAppSelector(state => state.auth.id)
	const dispatch = useAppDispatch()

	const [updateProfile] = useUpdateProfileMutation()
	const [updatePhoto] = useUpdatePhotoMutation()

	const { data: dataProfile } = useGetProfileQuery(id!)
	if (dataProfile && JSON.stringify(dataProfile) !== JSON.stringify(profile)) {
		dispatch(getUserProfile(dataProfile!))
	}

	const redirect = useRedirect()
	if (redirect) return redirect

	if (!profile) return <div>loading</div>

	const onMainPhotoSelected: React.ChangeEventHandler<HTMLInputElement> = async event => {
		if (event.target.files && event.target.files.length) {
			const data = await updatePhoto(event.target.files).unwrap()
			dispatch(updateUserPhoto(data!))
		}
	}

	type socialNetworkType = {
		[key: string]: string
	}

	const socialNetworks: socialNetworkType[] = []

	for (let key in profile.contacts) {
		socialNetworks.push({ [key]: profile.contacts[key] || '' })
	}

	return (
		<div className={style.info}>
			<div>
				<img src={profile.photos.large || userPhoto} />
				<input type='file' onChange={onMainPhotoSelected} />
			</div>

			<div>
				<Formik
					initialValues={{
						fullName: profile.fullName,
						aboutMe: profile.aboutMe,
						lookingForAJob: profile.lookingForAJob ? 'true' : 'false',
						lookingForAJobDescription: profile.lookingForAJobDescription,
						facebook: profile.contacts.facebook,
						github: profile.contacts.github,
						instagram: profile.contacts.instagram,
						mainLink: profile.contacts.mainLink,
						twitter: profile.contacts.twitter,
						vk: profile.contacts.vk,
						website: profile.contacts.website,
						youtube: profile.contacts.youtube,
					}}
					/* validationSchema={} */
					onSubmit={async (values, { setSubmitting }) => {
						const newProfileData = await updateProfile({
							userId: id!,
							fullName: values.fullName,
							aboutMe: values.aboutMe,
							lookingForAJob: values.lookingForAJob === 'true' ? true : false,
							lookingForAJobDescription: values.lookingForAJobDescription,
							contacts: {
								facebook: values.facebook,
								github: values.github,
								instagram: values.instagram,
								mainLink: values.mainLink,
								twitter: values.twitter,
								vk: values.vk,
								website: values.website,
								youtube: values.youtube,
							},
						}).unwrap()
						dispatch(updateUserProfile(newProfileData!))

						setSubmitting(false)
					}}
				>
					{({ values, handleChange, isSubmitting }) => (
						<Form>
							<div>
								<p>Имя: </p>
								<Field name='fullName' type='text' />
							</div>

							<div>
								<p>Описание: </p>
								<textarea
									name='aboutMe'
									value={values.aboutMe ? values.aboutMe : ''}
									onChange={handleChange}
								></textarea>
							</div>

							<div>
								<div>
									<p>Поиск работы</p>
								</div>

								<div>
									<p>В активном поиске</p>
									<Field type='radio' value='true' checked={values.lookingForAJob === 'true'} name='lookingForAJob' />
								</div>

								<div>
									<p>Не ищу</p>
									<Field type='radio' value='false' checked={values.lookingForAJob === 'false'} name='lookingForAJob' />
								</div>
							</div>

							{values.lookingForAJob === 'true' && (
								<div>
									<p>Описание резюме</p>
									<textarea
										name='lookingForAJobDescription'
										value={values.lookingForAJobDescription}
										onChange={handleChange}
									></textarea>
								</div>
							)}

							<div>
								<p>Контакты</p>
								{/* { где то накосячил в коде } */}
								{/* {socialNetworks.map(item => {
									return (
										<div>
											<p>{Object.keys(item)}</p>
											<Field name={Object.keys(item)} type='text' />
										</div>
									)
								})} */}

								<div>
									<p>facebook: </p>
									<Field name='facebook' type='text' />
								</div>

								<div>
									<p>github: </p>
									<Field name='github' type='text' />
								</div>

								<div>
									<p>instagram: </p>
									<Field name='instagram' type='text' />
								</div>

								<div>
									<p>mainLink: </p>
									<Field name='mainLink' type='text' />
								</div>

								<div>
									<p>twitter: </p>
									<Field name='twitter' type='text' />
								</div>

								<div>
									<p>vk: </p>
									<Field name='vk' type='text' />
								</div>

								<div>
									<p>website: </p>
									<Field name='website' type='text' />
								</div>

								<div>
									<p>youtube: </p>
									<Field name='youtube' type='text' />
								</div>
							</div>

							<div className={style.save}>
								<button type='submit' disabled={isSubmitting}>
									Сохранить
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default ProfileEdit
