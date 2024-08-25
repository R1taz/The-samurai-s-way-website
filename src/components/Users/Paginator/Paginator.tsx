import React, { memo } from 'react'

import { getUsers, changeCurrentPage } from '../../../redux/usersSlice.ts'
import { usePaginator } from '../../../hooks/usePaginator.tsx'
import { useAppDispatch } from '../../../hooks/react-redux-hooks.ts'

interface Props {
	currentPage: number
}

const Paginator = memo(({ currentPage }: Props) => {
	const dispatch = useAppDispatch()
	const paginator = usePaginator(currentPage)

	return (
		<div>
			{paginator.currentPortion > 1 && (
				<button
					onClick={() => {
						paginator.setCurrentPortion(paginator.currentPortion - 1)
						dispatch(changeCurrentPage(paginator.leftNumberPage - paginator.pagesInPortionCount))
						dispatch(getUsers(paginator.leftNumberPage - paginator.pagesInPortionCount))
					}}
				>
					Previous
				</button>
			)}

			<div>{paginator.buttonPagesElem}</div>

			{paginator.rightNumberPage < paginator.countPage && (
				<button
					onClick={() => {
						paginator.setCurrentPortion(paginator.currentPortion + 1)
						dispatch(changeCurrentPage(paginator.rightNumberPage + 1))
						dispatch(getUsers(paginator.rightNumberPage + 1))
					}}
				>
					Next
				</button>
			)}
		</div>
	)
})

export default Paginator
