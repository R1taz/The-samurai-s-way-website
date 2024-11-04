import React from 'react'
import style from '../Navbar.module.css'

interface FriendProps {
	userName: string
	isOnline: boolean
	id: number
	urlPhoto: string
}

const Friend = (friend: FriendProps) => {
	return (
		<div className={style.friend}>
			<img src={friend.urlPhoto} />
			<p className={style.userName}>{friend.userName}</p>
			<div className={friend.isOnline ? style.online : style.offline}></div>
		</div>
	)
}

export default Friend
