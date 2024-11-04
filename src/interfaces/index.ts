// For Component

// For RTK

export interface IProfile {
	userId: number
	aboutMe?: string | null
	lookingForAJob: boolean
	lookingForAJobDescription: string
	fullName: string
	contacts: IProfileContacts
	photos: IProfilePhotos
}
export interface IProfilePhotos {
	small: string | null
	large: string | null
}
export type IProfileContacts = Record<
	'github' | 'vk' | 'facebook' | 'instagram' | 'twitter' | 'website' | 'youtube' | 'mainLink',
	string
>

export interface IUser {
	id: number
	name: string
	status: string
	photos: IProfilePhotos
	followed: boolean
}

export interface IUserData {
	id: number
	login: string
	email: string
}

export interface IDataUserMessage {
	id: number
	userName: string
	urlPhoto: string
	text: string
}
export interface IInterlocutor {
	id: number
	userName: string
}

export type IFriend = Omit<IDataUserMessage, 'text'> & { isOnline: boolean }

// For RTKQuery API

export interface ILoginData {
	email: string
	password: string
	rememberMe: boolean
	captcha: string
	globalError: string
}
export interface IResponseUserData {
	data: IUserData
	fieldsErrors: string[]
	messages: string[]
	resultCode: number
}

export interface IResponseGetUsers {
	items: IUser[]
	totalCount: number
	error: null | Error
}

export interface IToggleSubscribe {
	id: number
	toggle: boolean
}
