const INITIALIZED = 'initialized'
const SET_ERROR_DIALOG_BOX = 'setErrorDialogBox'
const DELETE_ERROR_DIALOG_BOX = 'deleteErrorDialogBox'

const initialState = {
	initialization: false,
	errorDialogBox: null,
}

const appReducer = (state = initialState, action) => {
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

		/* case 'fake':
			return { ...state } */

		default:
			return state
	}
}

export const initialized = () => ({ type: INITIALIZED })
export const deleteErrorDialogBox = () => ({ type: DELETE_ERROR_DIALOG_BOX })
export const setErrorDialogBox = (statusCode, messageError) => ({
	type: SET_ERROR_DIALOG_BOX,
	statusCode,
	messageError,
})

export default appReducer
