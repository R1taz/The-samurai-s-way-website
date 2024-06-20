import React, { memo, useState } from 'react'
import style from './Paginator.module.css'

const Paginator = memo(props => {
	let countPage = Math.ceil(props.totalUsersCount / props.usersInPageCount)

	let [currentPortion, setCurrentPortion] = useState(
		Math.ceil(props.currentPage / props.pagesInPortionCount)
	)

	let leftNumberPage =
		currentPortion * props.pagesInPortionCount - props.pagesInPortionCount + 1

	let rightNumberPage = currentPortion * props.pagesInPortionCount
	if (rightNumberPage > countPage) {
		rightNumberPage = countPage
	}

	let buttonPagesElem = []
	for (let i = leftNumberPage; i <= rightNumberPage; i++) {
		buttonPagesElem.push(
			<button
				onClick={() => {
					props.changeCurrentPage(i)
					props.getUsers(i)
				}}
				className={props.currentPage === i ? style.bold : null}
			>
				{i}
			</button>
		)
	}

	return (
		<div>
			{currentPortion > 1 && (
				<button
					onClick={() => {
						setCurrentPortion(currentPortion - 1)
						props.changeCurrentPage(leftNumberPage - props.pagesInPortionCount)
						props.getUsers(leftNumberPage - props.pagesInPortionCount)
					}}
				>
					Previous
				</button>
			)}

			<div>{buttonPagesElem}</div>

			{rightNumberPage < countPage && (
				<button
					onClick={() => {
						setCurrentPortion(currentPortion + 1)
						props.changeCurrentPage(rightNumberPage + 1)
						props.getUsers(rightNumberPage + 1)
					}}
				>
					Next
				</button>
			)}
		</div>
	)
})

export default Paginator
