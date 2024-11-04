import React from 'react'
import style from './Post.module.css'

interface PostProps {
	id: number
	text: string
	urlPhoto: string
	userName: string
}

function Post(props: PostProps) {
	return (
		<div className={style.post}>
			<img src={props.urlPhoto} />
			<p className={style.userName}>{props.userName}</p>
			<p className={style.userText}>{props.text}</p>
		</div>
	)
}

export default Post
