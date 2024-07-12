import { connect } from 'react-redux'
import Messages from './Messages'
import withAuthRedirect from '../../hocs/withAuthRedirect'
import { compose } from '@reduxjs/toolkit'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { sendMessage } from '../../redux/messagesReducer.ts'

const MessagesContainer = props => {
	let messagesId

	if (props.router.params.userId) {
		messagesId = props.router.params.userId
	}

	return (
		<Messages
			messagesInterlocutors={props.messagesInterlocutors}
			interlocutor={props.interlocutor}
			messagesId={props.router.params.userId}
			sendMessage={props.sendMessage}
			userName={props.userName}
		/>
	)
}

const mapStateToProps = state => {
	return {
		interlocutor: state.messagesPage.interlocutor,
		messagesInterlocutors: state.messagesPage.messagesInterlocutors,
		userName: state.auth.login,
	}
}

export default compose(
	connect(mapStateToProps, { sendMessage }),
	withAuthRedirect,
	withRouter
)(MessagesContainer)

function withRouter(Component) {
	return props => {
		let location = useLocation()
		let params = useParams()
		let navigate = useNavigate()
		return <Component {...props} router={{ location, params, navigate }} />
	}
}
