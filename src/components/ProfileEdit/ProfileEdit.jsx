import React from 'react'
import style from './ProfileEdit.module.css'
import userPhoto from '../../assets/user.png'
import { Field, Form, Formik } from 'formik'

const ProfileEdit = props => {
	const onMainPhotoSelected = event => {
		if (event.target.files.length) {
			props.updateUserPhoto(event.target.files[0])
		}
	}

	return (
		<div className={style.info}>
			<div>
				<img src={props.profile.photos.large || userPhoto} />
				<input type='file' onChange={onMainPhotoSelected} />
			</div>

			<div>
				<Formik
					initialValues={{
						fullName: props.profile.fullName,
						aboutMe: props.profile.aboutMe,
						search: props.profile.lookingForAJob ? 'true' : 'false',
						descriptionJob: props.profile.lookingForAJobDescription,
						facebook: props.profile.contacts.facebook,
						github: props.profile.contacts.github,
						instagram: props.profile.contacts.instagram,
						mainLink: props.profile.contacts.mainLink,
						twitter: props.profile.contacts.twitter,
						vk: props.profile.contacts.vk,
						website: props.profile.contacts.website,
						youtube: props.profile.contacts.youtube,
					}}
					/* validationSchema={} */
					onSubmit={(values, { setSubmitting }) => {
						props.updateProfile({
							userId: props.id,
							fullName: values.fullName,
							aboutMe: values.aboutMe,
							search: values.search === 'true' ? true : false,
							descriptionJob: values.descriptionJob,
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
						})

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
									value={values.aboutMe}
									onChange={handleChange}
								></textarea>
							</div>

							<div>
								<div>
									<p>Поиск работы</p>
								</div>

								<div>
									<p>В активном поиске</p>
									<Field
										type='radio'
										value='true'
										checked={values.search === 'true'}
										name='search'
									/>
								</div>

								<div>
									<p>Не ищу</p>
									<Field
										type='radio'
										value='false'
										checked={values.search === 'false'}
										name='search'
									/>
								</div>
							</div>

							{values.search === 'true' && (
								<div>
									<p>Описание резюме</p>
									<textarea
										name='descriptionJob'
										value={values.descriptionJob}
										onChange={handleChange}
									></textarea>
								</div>
							)}

							<div>
								<p>Контакты</p>

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
