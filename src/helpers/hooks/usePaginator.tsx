import React, { useState } from 'react'
import { changeCurrentPage } from '../../redux/slices/usersSlice.ts'
import { useAppDispatch, useAppSelector } from '../hooks/react-redux-hooks.ts'

export const usePaginator = (currentPage: number) => {
	const totalUsersCount = useAppSelector(state => state.usersPage.totalUsersCount)
	const usersInPageCount = useAppSelector(state => state.usersPage.usersInPageCount)
	const pagesInPortionCount = useAppSelector(state => state.usersPage.pagesInPortionCount)
	const dispatch = useAppDispatch()

	const countPage = Math.ceil(totalUsersCount / usersInPageCount)
	const [currentPortion, setCurrentPortion] = useState(Math.ceil(currentPage / pagesInPortionCount))
	const leftNumberPage = currentPortion * pagesInPortionCount - pagesInPortionCount + 1

	let rightNumberPage = currentPortion * pagesInPortionCount
	if (rightNumberPage > countPage) {
		rightNumberPage = countPage
	}

	const buttonPagesElem: React.JSX.Element[] = []
	for (let i = leftNumberPage; i <= rightNumberPage; i++) {
		buttonPagesElem.push(
			<button
				onClick={() => {
					dispatch(changeCurrentPage(i))
				}}
				style={{
					fontWeight: currentPage === i ? 'bold' : undefined,
					backgroundColor: currentPage === i ? 'gray' : undefined,
					border: currentPage === i ? 'none' : undefined,
				}}
			>
				{i}
			</button>
		)
	}

	return {
		countPage,
		currentPortion,
		setCurrentPortion,
		leftNumberPage,
		rightNumberPage,
		buttonPagesElem,
		pagesInPortionCount,
	}
}
