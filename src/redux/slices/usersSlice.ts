import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IResponseGetUsers, IToggleSubscribe, IUser } from '../../interfaces'

interface State {
	users: IUser[]
	totalUsersCount: number
	usersInPageCount: number
	pagesInPortionCount: number
	currentPage: number
	subscribingInProgress: number[]
}

const initialState: State = {
	users: [],
	totalUsersCount: 0,
	usersInPageCount: 10,
	pagesInPortionCount: 10,
	currentPage: 1,
	subscribingInProgress: [],
}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		changeCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		getUsersData(state, action: PayloadAction<IResponseGetUsers>) {
			state.users = action.payload.items
			state.totalUsersCount = action.payload.totalCount
		},
		addSubscribingInProgress(state, action: PayloadAction<number>) {
			state.subscribingInProgress.push(action.payload)
		},
		toggleUserSubscribe(state, action: PayloadAction<IToggleSubscribe>) {
			if (action.payload.toggle) {
				state.users = state.users.map(user => {
					return user.id === action.payload.id ? { ...user, followed: action.payload.toggle } : user
				})
			}
			state.subscribingInProgress = state.subscribingInProgress.filter(id => id !== action.payload.id)
		},
	},
})

export default usersSlice.reducer
export const { changeCurrentPage, getUsersData, addSubscribingInProgress, toggleUserSubscribe } = usersSlice.actions
