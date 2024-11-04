import React, { memo } from 'react'

import { changeCurrentPage } from '../../../redux/slices/usersSlice.ts'
import { usePaginator } from '../../../helpers/hooks/usePaginator.tsx'
import { useAppDispatch } from '../../../helpers/hooks/react-redux-hooks.ts'

interface PaginatorProps {
	currentPage: number
}

const Paginator = memo(({ currentPage }: PaginatorProps) => {
	const dispatch = useAppDispatch()
	const paginator = usePaginator(currentPage)

	return (
		<div>
			{paginator.currentPortion > 1 && (
				<button
					onClick={() => {
						paginator.setCurrentPortion(paginator.currentPortion - 1)
						dispatch(changeCurrentPage(paginator.leftNumberPage - paginator.pagesInPortionCount))
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
					}}
				>
					Next
				</button>
			)}
		</div>
	)
})

export default Paginator
