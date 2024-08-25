export type ErrorDialogBoxType = {
	title: string
	messageError: string
	statusCode: string
}

export interface ProfileType {
	aboutMe: null | string
	contacts: ContactsProfile
	fullName: string
	lookingForAJob: boolean
	lookingForAJobDescription: null | string
	photos: PhotosProfileType
	userId: number
}

export interface PhotosProfileType {
	large: null | string
	small: null | string
}

export interface PostType {
	id: number
	userName: string
	urlPhoto: string
	text: string
}

export interface ContactsProfile {
	facebook: null | string
	github: null | string
	instagram: null | string
	mainLink: null | string
	twitter: null | string
	vk: null | string
	website: null | string
	youtube: null | string
}

export type PairOfContacts = [string, string | null]

export interface ContactUser {
	[key: string]: string
}

export type InterlocutorType = {
	id: number
	userName: string
}
export type MessagesInterlocutorType = {
	id: number
	userName: string
	urlPhoto: string
	text: string
}
export type FriendType = {
	id: number
	userName: string
	urlPhoto: string
	isOnline: boolean
}
export type UserType = {
	followed: boolean
	id: number
	name: string
	photos: PhotosProfileType
	status: null | string
	uniqueUrlName: null
}
export type LoginDataType = {
	email: string
	password: string
	rememberMe: boolean
	captcha: string
	setErrors: Function
}

export type GetUsersType = {
	totalCount: number
	items: UserType[]
	error: Object | null
}
export type ToggleSubscribeType = {
	id: number
	toggle: boolean
}
export type AuthorizedActionType = {
	id: number
	login: string
	email: string
}
export type SendMessageActionType = {
	id: number
	userName: string
	urlPhoto: string
	text: string
}
