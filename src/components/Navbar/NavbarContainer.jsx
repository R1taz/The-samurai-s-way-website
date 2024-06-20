import { connect } from 'react-redux'
import Navbar from './Navbar'

const mapStateToProps = state => ({ friends: state.navbar.friends })

export default connect(mapStateToProps)(Navbar)
