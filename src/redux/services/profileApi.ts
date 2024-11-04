import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import {
	getUserProfile,
	getUserStatus,
	updateUserPhoto,
	updateUserProfile,
	updateUserStatus,
} from '../slices/profileSlice.ts'
import { IProfile, IProfilePhotos } from '../../interfaces/index.ts'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
	withCredentials: true,
	headers: {
		'API-KEY': 'ad41faf1-cc70-40d4-bc1a-aa77abe2169d',
	},
})

export const profileApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://social-network.samuraijs.com/api/1.0' }),
	tagTypes: ['Profile'],
	endpoints: build => ({
		getProfile: build.query<IProfile | null, number>({
			queryFn: async userId => {
				try {
					const response = await instance.get(`/profile/${userId}`)
					return { data: response.data }
				} catch (error) {
					return { data: null }
				}
			},
			providesTags: ['Profile'],
			keepUnusedDataFor: 0,
		}),
		getStatus: build.query<string, number>({
			queryFn: async userId => {
				try {
					const response = await instance.get(`/profile/status/${userId}`)
					return { data: response.data }
				} catch (error) {
					return { data: null }
				}
			},
			providesTags: ['Profile'],
			keepUnusedDataFor: 0,
		}),
		updateStatus: build.mutation<string | null, string>({
			queryFn: async status => {
				try {
					const response = await instance.put('/profile/status/', {
						status: status,
					})
					if (response.data.resultCode !== 0) throw Error(response.data.messages[0])
					return { data: status }
				} catch (error) {
					return { data: null }
				}
			},
			invalidatesTags: ['Profile'],
		}),
		updatePhoto: build.mutation<IProfilePhotos | null, HTMLInputElement['files']>({
			queryFn: async files => {
				try {
					const response = await instance.put(
						'/profile/photo',
						{
							image: files![0],
						},
						{
							headers: {
								'Content-Type': 'multipart/form-data',
							},
						}
					)
					if (response.data.resultCode !== 0) throw Error()
					return { data: response.data.data.photos }
				} catch (error) {
					return { data: null }
				}
			},
			invalidatesTags: ['Profile'],
		}),
		updateProfile: build.mutation<Omit<IProfile, 'photos'> | null, Omit<IProfile, 'photos'>>({
			queryFn: async profile => {
				try {
					const response = await instance.put('/profile', {
						userId: profile.userId,
						aboutMe: profile.aboutMe,
						fullName: profile.fullName,
						lookingForAJob: profile.lookingForAJob,
						LookingForAJobDescription: profile.lookingForAJobDescription,
						contacts: profile.contacts,
					})
					if (response.data.resultCode !== 0) throw Error()

					return { data: profile }
				} catch (error) {
					return { data: null }
				}
			},
			invalidatesTags: ['Profile'],
		}),
	}),
})

export const {
	useGetProfileQuery,
	useGetStatusQuery,
	useUpdateStatusMutation,
	useUpdatePhotoMutation,
	useUpdateProfileMutation,
} = profileApi
