import { connect } from 'react-redux'
import Login from './Login'
import { login } from '../../../redux/authReducer'
import { compose } from '@reduxjs/toolkit'
import withMainPageRedirect from '../../../hocs/withMainPageRedirect'

const mapStateToProps = state => ({ captchaUrl: state.auth.captchaUrl })

export default compose(
	connect(mapStateToProps, { login }),
	withMainPageRedirect
)(Login)
