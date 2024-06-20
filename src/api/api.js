import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
	withCredentials: true,
	headers: {
		'API-KEY': 'ad41faf1-cc70-40d4-bc1a-aa77abe2169d',
	},
})

export const authAPI = {
	async authorized() {
		const response = await instance.get('/auth/me')
		return response.data
	},

	async captcha() {
		const response = await instance.get('/security/get-captcha-url')
		return response.data
	},

	async login(email, password, rememberMe, captcha) {
		const response = await instance.post('/auth/login', {
			email: email,
			password: password,
			rememberMe: rememberMe,
			captcha: captcha,
		})
		return response.data
	},

	async logout() {
		const response = await instance.delete('/auth/login')
		return response.data
	},
}

export const profileAPI = {
	async getProfile(userId) {
		const response = await instance.get('/profile/' + userId)
		return response.data
	},

	async getStatus(userId) {
		const response = await instance.get('/profile/status/' + userId)
		return response.data
	},

	async updateStatus(status) {
		const response = await instance.put('/profile/status/', {
			status: status,
		})
		return response.data
	},

	async updatePhoto(file) {
		const response = await instance.put(
			'/profile/photo',
			{
				image: file,
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		)
		return response.data
	},

	async updateProfile(profile) {
		const response = await instance.put('/profile', {
			userId: profile.userId,
			fullName: profile.fullName,
			aboutMe: profile.aboutMe,
			lookingForAJob: profile.search,
			LookingForAJobDescription: profile.descriptionJob,
			contacts: profile.contacts,
		})
		return response.data
	},
}

export const usersAPI = {
	async getUsersData(count = 10, page = 1) {
		const response = await instance.get(`/users?count=${count}&page=${page}`)
		return response.data
	},

	async follow(id) {
		const response = await instance.post(`/follow/${id}`)
		return response.data
	},

	async unfollow(id) {
		const response = await instance.delete(`/follow/${id}`)
		return response.data
	},
}
