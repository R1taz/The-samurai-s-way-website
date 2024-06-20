import React, { memo } from 'react'
import Post from './Post/Post'
import style from './Posts.module.css'

const Posts = memo(props => {
	console.log('render posts')
	let postsElem = props.posts.map(post => {
		return (
			<Post
				key={post.id}
				userName={post.userName}
				urlPhoto={post.urlPhoto}
				text={post.text}
			/>
		)
	})

	return <div className={style.posts}>{postsElem}</div>
})

export default Posts
