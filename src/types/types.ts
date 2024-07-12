export type postsType = {
	id: number
	userName: string
	urlPhoto: string
	text: string
}
export type profileType = {
	aboutMe: null | string
	contacts: profileContactsType
	fullName: string
	lookingForAJob: boolean
	lookingForAJobDescription: null | string
	photos: profilePhotosType
	userId: number
}
type profileContactsType = {
	facebook: null | string
	github: null | string
	instagram: null | string
	mainLink: null | string
	twitter: null | string
	vk: null | string
	website: null | string
	youtube: null | string
}
export type profilePhotosType = {
	small: null | string
	large: null | string
}

export type userType = {
	followed: boolean
	id: number
	name: string
	photos: profilePhotosType
	status: null | string
}

export type errorDialogBoxType = {
	title: string
	messageError: string
	statusCode: string
}

export type friendsType = {
	id: number
	userName: string
	urlPhoto: string
	isOnline: boolean
}

export type interlocutorType = {
	id: number
	userName: string
}
export type messagesInterlocutorsType = {
	id: number
	userName: string
	urlPhoto: any
	text: string
}
