import { usersAPI } from '../api/api'
import { userType } from '../types/types.ts'

const SET_USERS = 'setUsers'
const SET_TOTAL_USERS_COUNT = 'setTotalUsersCount'
const TOGGLE_USER_SUBSCRIBE = 'toggleUserSubscribe'
const TOGGLE_SUBSCRIBING_IN_PROGRESS = 'toggleSubscribingInProgress'
const CHANGE_CURRENT_PAGE = 'changeCurrentPage'

const initialState = {
	users: [] as userType[],
	totalUsersCount: 0,
	usersInPageCount: 10,
	pagesInPortionCount: 10,
	currentPage: 1,
	subscribingInProgress: [] as number[], // array of users ids
}

export type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): initialStateType => {
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

type setUsersType = {
	type: typeof SET_USERS
	users: userType[]
}
const setUsers = (users: userType[]): setUsersType => ({
	type: SET_USERS,
	users,
})

type setTotalUsersCountType = {
	type: typeof SET_TOTAL_USERS_COUNT
	totalCount: number
}
const setTotalUsersCount = (totalCount: number): setTotalUsersCountType => ({
	type: SET_TOTAL_USERS_COUNT,
	totalCount,
})

type toggleUserSubscribeType = {
	type: typeof TOGGLE_USER_SUBSCRIBE
	id: number
	toggle: boolean
}
const toggleUserSubscribe = (
	id: number,
	toggle: boolean
): toggleUserSubscribeType => ({
	type: TOGGLE_USER_SUBSCRIBE,
	id,
	toggle,
})

type toggleSubscribingInProgressType = {
	type: typeof TOGGLE_SUBSCRIBING_IN_PROGRESS
	id: number
	isFetching: boolean
}
const toggleSubscribingInProgress = (
	id: number,
	isFetching: boolean
): toggleSubscribingInProgressType => ({
	type: TOGGLE_SUBSCRIBING_IN_PROGRESS,
	id,
	isFetching,
})

type changeCurrentPageType = {
	type: typeof CHANGE_CURRENT_PAGE
	page: number
}
export const changeCurrentPage = (page: number): changeCurrentPageType => ({
	type: CHANGE_CURRENT_PAGE,
	page,
})

export const getUsers = (page: number) => {
	return async (dispatch: any, getState: any) => {
		const response = await usersAPI.getUsersData(
			getState().usersPage.usersInPageCount,
			page
		)
		if (response.error) return

		dispatch(setUsers(response.items))
		dispatch(setTotalUsersCount(response.totalCount))
	}
}

export const toggleSubscribe = (id: number, toggle: boolean) => {
	return async (dispatch: any) => {
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
