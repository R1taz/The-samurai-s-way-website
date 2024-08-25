import React, { memo, useState } from 'react'
import style from './ProfileContacts.module.css'
import { ContactsProfile, ContactUser, PairOfContacts } from '../../../../interfaces'

interface Props {
	contacts: ContactsProfile
}

const ProfileContacts = memo((props: Props) => {
	const [showContacts, setShowContacts] = useState(false)

	let contactsUser: ContactUser[] = []

	let [contact, value]: PairOfContacts = ['', null]

	for ([contact, value] of Object.entries(props.contacts)) {
		if (value !== null && value !== '') contactsUser.push({ [contact]: value })
	}

	let contactsElems = contactsUser.map(item => (
		<p>
			{Object.keys(item)}: {Object.values(item)}
		</p>
	))

	return (
		<div className={style.contacts}>
			{!showContacts && <button onClick={() => setShowContacts(!showContacts)}>Показать больше информации</button>}

			{showContacts && (
				<div>
					<button onClick={() => setShowContacts(!showContacts)}>Скрыть информацию</button>
					{contactsElems}
				</div>
			)}
		</div>
	)
})

export default ProfileContacts
