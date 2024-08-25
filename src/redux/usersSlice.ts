import { usersAPI } from '../api/api.js'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { GetUsersType, ToggleSubscribeType, UserType } from '../interfaces/index.ts'

type UsersStateType = {
	users: UserType[]
	totalUsersCount: number
	usersInPageCount: number
	pagesInPortionCount: number
	currentPage: number
	subscribingInProgress: number[]
}

const initialState: UsersStateType = {
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
	},
	extraReducers: builder => {
		builder
			.addCase(getUsers.fulfilled, (state, action) => {
				state.users = action.payload.items
				state.totalUsersCount = action.payload.totalCount
			})
			.addCase(toggleSubscribe.pending, (state, action) => {
				state.subscribingInProgress.push(action.meta.arg.id)
			})
			.addCase(toggleSubscribe.fulfilled, (state, action) => {
				state.users = state.users.map(user => {
					return user.id === action.payload.id ? { ...user, followed: action.payload.toggle } : user
				})
				state.subscribingInProgress = state.subscribingInProgress.filter(id => id !== action.payload.id)
			})
			.addCase(toggleSubscribe.rejected, (state, action) => {
				state.subscribingInProgress = state.subscribingInProgress.filter(id => id !== action.payload)
			})
	},
})

export default usersSlice.reducer
export const { changeCurrentPage } = usersSlice.actions

export const getUsers = createAsyncThunk<GetUsersType, number, { state: { usersPage: UsersStateType } }>(
	'users/getUsers',
	async (page, { getState }) => {
		const response = await usersAPI.getUsersData(getState().usersPage.usersInPageCount, page)
		if (!response.error) return response
	}
)
export const toggleSubscribe = createAsyncThunk<ToggleSubscribeType, ToggleSubscribeType, { rejectValue: number }>(
	'users/toggleSubscribe',
	async ({ id, toggle }, { rejectWithValue }) => {
		const response = toggle ? await usersAPI.follow(id) : await usersAPI.unfollow(id)
		if (response.resultCode !== 0) return rejectWithValue(id)
		return { id: id, toggle: toggle }
	}
)
