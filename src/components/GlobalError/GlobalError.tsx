import React, { memo } from 'react'
import { useAppSelector } from '../../hooks/react-redux-hooks.ts'

const GlobalError = memo(() => {
	const errorDialogBox = useAppSelector(state => state.app.errorDialogBox)

	return (
		<>
			{errorDialogBox && (
				<div className='errorDialogBox'>
					<h2>{errorDialogBox.title}</h2>
					<p>{errorDialogBox.messageError}</p>
					<p>{errorDialogBox.statusCode}</p>
				</div>
			)}
		</>
	)
})

export default GlobalError
