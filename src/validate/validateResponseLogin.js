export default async function validateResponseLogin(response, setErrors) {
	const resultCode = response.resultCode

	if (response.fieldsErrors.length === 0) {
		setErrors({ globalError: response.messages[0] })
	}

	if (response.fieldsErrors.length !== 0 && resultCode === 1) {
		setErrors({ email: response.fieldsErrors[0].error })
	}

	if (response.fieldsErrors.length !== 0 && resultCode === 10) {
		setErrors({ globalError: response.fieldsErrors[0].error })
	}
}
