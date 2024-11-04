import { createSlice } from '@reduxjs/toolkit'
import { IFriend } from '../../interfaces'

interface State {
	friends: IFriend[]
}

const initialState: State = {
	friends: [
		{
			id: 1,
			userName: 'Bot 1',
			urlPhoto:
				'https://img1.fonwall.ru/o/jn/lamborghini-centenario-lamborghini-urus-lamborghini-cars.jpeg?auto=compress&fit=resize&w=1600',
			isOnline: true,
		},
		{
			id: 2,
			userName: 'Bot 2',
			urlPhoto: 'https://a.d-cd.net/SD-HkhT2I0X_yHAkFLjtisQzt50-1920.jpg',
			isOnline: false,
		},
	],
}

const navbarSlice = createSlice({
	name: 'navbar',
	initialState,
	reducers: {},
})

export default navbarSlice.reducer
