import { usersAPI } from '../api/api'

const SET_USERS = 'setUsers'
const SET_TOTAL_USERS_COUNT = 'setTotalUsersCount'
const TOGGLE_USER_SUBSCRIBE = 'toggleUserSubscribe'
const TOGGLE_SUBSCRIBING_IN_PROGRESS = 'toggleSubscribingInProgress'
const CHANGE_CURRENT_PAGE = 'changeCurrentPage'

const initialState = {
	users: [],
	totalUsersCount: 0,
	usersInPageCount: 10,
	pagesInPortionCount: 10,
	currentPage: 1,
	subscribingInProgress: [],
}

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_CURRENT_PAGE:
			return { ...state, currentPage: action.page }

		case SET_USERS:
			return { ...state, users: [...action.users] }

		case SET_TOTAL_USERS_COUNT:
			return { ...state, totalUsersCount: action.totalCount }

		case TOGGLE_USER_SUBSCRIBE:
			return {
				...state,
				users: [
					...state.users.map(user => {
						if (user.id === action.id)
							return { ...user, followed: action.toggle }
						return user
					}),
				],
			}

		case TOGGLE_SUBSCRIBING_IN_PROGRESS:
			return {
				...state,
				subscribingInProgress: action.isFetching
					? [...state.subscribingInProgress, action.id]
					: [...state.subscribingInProgress.filter(id => id !== action.id)],
			}

		default:
			return state
	}
}

export default usersReducer

const setUsers = users => ({ type: SET_USERS, users })
const setTotalUsersCount = totalCount => ({
	type: SET_TOTAL_USERS_COUNT,
	totalCount,
})
const toggleUserSubscribe = (id, toggle) => ({
	type: TOGGLE_USER_SUBSCRIBE,
	id,
	toggle,
})
const toggleSubscribingInProgress = (id, isFetching) => ({
	type: TOGGLE_SUBSCRIBING_IN_PROGRESS,
	id,
	isFetching,
})

export const changeCurrentPage = page => ({ type: CHANGE_CURRENT_PAGE, page })

export const getUsers = page => {
	return async (dispatch, getState) => {
		const response = await usersAPI.getUsersData(
			getState().usersPage.usersInPageCount,
			page
		)
		if (response.error) return

		dispatch(setUsers(response.items))
		dispatch(setTotalUsersCount(response.totalCount))
	}
}

export const toggleSubscribe = (id, toggle) => {
	return async dispatch => {
		dispatch(toggleSubscribingInProgress(id, true))

		try {
			const response = toggle
				? await usersAPI.follow(id)
				: await usersAPI.unfollow(id)
			if (response.resultCode !== 0) return
		} catch (err) {
			return
		}

		dispatch(toggleUserSubscribe(id, toggle))
		dispatch(toggleSubscribingInProgress(id, false))
	}
}
