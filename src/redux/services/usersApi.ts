import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { addSubscribingInProgress, getUsersData, toggleUserSubscribe } from '../slices/usersSlice.ts'
import { IResponseGetUsers, IToggleSubscribe } from '../../interfaces/index.ts'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
	withCredentials: true,
	headers: {
		'API-KEY': 'ad41faf1-cc70-40d4-bc1a-aa77abe2169d',
	},
})

export const usersApi = createApi({
	reducerPath: 'usersApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://social-network.samuraijs.com/api/1.0' }),
	tagTypes: ['Users'],
	endpoints: build => ({
		getUsers: build.query<IResponseGetUsers | null, { pageCount: number; currentPage: number }>({
			queryFn: async ({ pageCount, currentPage }) => {
				try {
					const response = await instance.get(`/users?count=${pageCount}&page=${currentPage}`)
					return { data: response.data }
				} catch (error) {
					return { data: null }
				}
			},
			providesTags: ['Users'],
			keepUnusedDataFor: 0,
		}),
		toggleSubscribe: build.mutation<IToggleSubscribe | null, IToggleSubscribe>({
			queryFn: async ({ id, toggle }) => {
				try {
					const response = toggle ? await instance.post(`/follow/${id}`) : await instance.delete(`/follow/${id}`)
					if (response.data.resultCode !== 0) throw Error()
					return { data: { id, toggle } }
				} catch (error) {
					return { data: null }
				}
			},
			invalidatesTags: ['Users'],
		}),
	}),
})

export const { useGetUsersQuery, useToggleSubscribeMutation } = usersApi
