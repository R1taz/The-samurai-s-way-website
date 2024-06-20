import { connect } from 'react-redux'
import Header from './Header'
import { logout } from '../../redux/authReducer'
import { getUserAuthorizedIsAuth } from '../../redux/selectors'

const mapStateToProps = state => {
	return {
		isAuth: getUserAuthorizedIsAuth(state),
		login: state.auth.login,
	}
}

export default connect(mapStateToProps, { logout })(Header)
