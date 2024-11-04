import React, { memo, useState } from 'react'
import style from './ProfileContacts.module.css'
import { IProfileContacts } from '../../../../interfaces'

interface ProfileContacs {
	contacts: IProfileContacts
}

const ProfileContacts = memo((props: ProfileContacs) => {
	const [showContacts, setShowContacts] = useState(false)

	type socialNetworkType = {
		[key: string]: string
	}

	let socialNetworks: socialNetworkType[] = []

	for (let key in props.contacts) {
		if (props.contacts[key]) socialNetworks.push({ [key]: props.contacts[key] })
	}

	let contactsElems = socialNetworks.map(item => (
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
