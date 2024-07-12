import { connect } from 'react-redux'
import Users from './Users'
import {
	changeCurrentPage,
	getUsers,
	toggleSubscribe,
} from '../../redux/usersReducer.ts'
import { getUsersSelector } from '../../redux/selectors'

const mapStateToProps = state => {
	return {
		totalUsersCount: state.usersPage.totalUsersCount,
		usersInPageCount: state.usersPage.usersInPageCount,
		pagesInPortionCount: state.usersPage.pagesInPortionCount,
		currentPage: state.usersPage.currentPage,
		users: getUsersSelector(state),
		subscribingInProgress: state.usersPage.subscribingInProgress,
	}
}

export default connect(mapStateToProps, {
	getUsers,
	toggleSubscribe,
	changeCurrentPage,
})(Users)
