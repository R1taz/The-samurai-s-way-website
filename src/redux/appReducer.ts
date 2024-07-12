import { errorDialogBoxType } from '../types/types.ts'

const INITIALIZED = 'initialized'
const SET_ERROR_DIALOG_BOX = 'setErrorDialogBox'
const DELETE_ERROR_DIALOG_BOX = 'deleteErrorDialogBox'

const initialState = {
	initialization: false,
	errorDialogBox: null as null | errorDialogBoxType,
}

export type initialStateType = typeof initialState

const appReducer = (state = initialState, action: any): initialStateType => {
	switch (action.type) {
		case INITIALIZED:
			return { ...state, initialization: true }

		case SET_ERROR_DIALOG_BOX:
			return {
				...state,
				errorDialogBox: {
					title: 'Произошла ошибка',
					messageError: action.messageError + '.',
					statusCode: 'Status code: ' + action.statusCode,
				},
			}

		case DELETE_ERROR_DIALOG_BOX:
			return { ...state, errorDialogBox: null }

		default:
			return state
	}
}

type initializedActionType = {
	type: typeof INITIALIZED
}
export const initialized = (): initializedActionType => ({ type: INITIALIZED })

type deleteErrorDialogBoxActionType = {
	type: typeof DELETE_ERROR_DIALOG_BOX
}
export const deleteErrorDialogBox = (): deleteErrorDialogBoxActionType => ({
	type: DELETE_ERROR_DIALOG_BOX,
})

type setErrorDialogBoxActionType = {
	type: typeof SET_ERROR_DIALOG_BOX
	statusCode: number
	messageError: string
}
export const setErrorDialogBox = (
	statusCode: number,
	messageError: string
): setErrorDialogBoxActionType => ({
	type: SET_ERROR_DIALOG_BOX,
	statusCode,
	messageError,
})

export default appReducer
