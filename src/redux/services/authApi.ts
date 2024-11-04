import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import validateResponseLogin from '../../validate/validateResponseLogin'
import { setCaptchaUrl } from '../slices/authSlice.ts'
import { ILoginData, IResponseUserData, IUserData } from '../../interfaces/index.ts'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
	withCredentials: true,
	headers: {
		'API-KEY': 'ad41faf1-cc70-40d4-bc1a-aa77abe2169d',
	},
})

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://social-network.samuraijs.com/api/1.0' }),
	tagTypes: ['Auth'],
	endpoints: build => ({
		getUserData: build.query<IResponseUserData, ''>({
			query: () => ({
				url: '/auth/me',
				credentials: 'include',
				headers: { 'API-KEY': 'ad41faf1-cc70-40d4-bc1a-aa77abe2169d' },
			}),
			providesTags: ['Auth'],
		}),
		setLoginData: build.mutation<IUserData | null, { values: ILoginData; setErrors: (args: any) => void }>({
			queryFn: async (data, { dispatch }) => {
				try {
					const response = await instance.post('/auth/login', { ...data.values })
					const responseData = response.data

					switch (responseData.resultCode) {
						case 0:
							const userData = await instance.get('https://social-network.samuraijs.com/api/1.0/auth/me')
							return { data: userData.data.data }

						case 1:
							validateResponseLogin(responseData, data.setErrors)
							return { data: null }

						case 10:
							validateResponseLogin(responseData, data.setErrors)
							const responseCaptcha = await instance.get('/security/get-captcha-url')
							dispatch(setCaptchaUrl(responseCaptcha.data.url))
							return { data: null }

						default:
							return { data: null }
					}
				} catch (err) {
					return { data: null }
				}
			},
			invalidatesTags: ['Auth'],
		}),
		removeLoginData: build.mutation<boolean, ''>({
			queryFn: async () => {
				try {
					const response = await instance.delete('/auth/login')
					if (response.data.resultCode === 0) return { data: true }

					return { data: false }
				} catch (error) {
					return { data: false }
				}
			},
			invalidatesTags: ['Auth'],
		}),
	}),
})

export const { useGetUserDataQuery, useSetLoginDataMutation, useRemoveLoginDataMutation } = authApi
