import { createSelector } from 'reselect'

export const getUserAuthorizedId = state => state.auth.id
export const getUserAuthorizedIsAuth = state => state.auth.isAuth

export const getPosts = createSelector(
	state => state.profilePage.posts,
	posts => posts.filter(post => true)
)

export const getUsersSelector = createSelector(
	state => state.usersPage.users,
	users => users.filter(() => true)
)
