import React, { memo } from 'react'
import Post from './Post/Post.tsx'
import style from './Posts.module.css'
import { useAppSelector } from '../../../hooks/react-redux-hooks.ts'

const Posts = memo(() => {
	const posts = useAppSelector(state => state.profilePage.posts)

	let postsElem = posts.map(post => {
		return <Post key={post.id} userName={post.userName} urlPhoto={post.urlPhoto} text={post.text} />
	})

	return <div className={style.posts}>{postsElem}</div>
})

export default Posts
