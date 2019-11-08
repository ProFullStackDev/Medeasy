import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// Redux
import { connect } from 'react-redux'
import { selectAuthUser } from '../../redux/selectors/authSelectors'
import { createStructuredSelector } from 'reselect'
// Components
import LoginModalForm from './LoginModalForm'
import RegisterModalForm from './RegisterModalForm'
import Modal from '../../components/Modal'
import AlertMessage from '../../components/AlertMessage'
// Scss
import '../../styles/components/LoginRegisterModal.scss'
// Images
import medeasyAuth from '../../images/medeasy-auth.svg'
import formGraphic from '../../images/form-graphic.svg'
import { ReactComponent as CloseBtnGrey } from '../../images/closeBtnGrey.svg'

const LoginRegisterModal = ({ history, match, user }) => {
	const determineMode = match.path === '/login' ? 'login' : 'register'
	const [mode, setMode] = useState(determineMode)
	if (user) history.goBack()
	return (
		<Modal>
			<div className="LoginRegisterModal">
				<div className="LoginRegisterModal__left">
					<div className="LoginRegisterModal__left-title">
						<h2 className="LoginRegisterModal__left-title--content">
							{mode === 'login' ? 'Login to' : 'Register with'}
							<img
								style={{ marginLeft: '1rem' }}
								src={medeasyAuth}
								alt="medeasy-logo"
							/>
						</h2>
						<div className="LoginRegisterModal__left-title--bar"></div>
					</div>
					<img
						alt="form-graphic"
						src={formGraphic}
						className="LoginRegisterModal__left-image"
					/>
				</div>
				<div className="LoginRegisterModal__right">
					<AlertMessage />
					<Link title="close" to="/">
						<CloseBtnGrey title="close" alt="close-btn-grey" />
					</Link>
					{/* Show the forms based on the mode */}
					{mode === 'login' ? (
						<LoginModalForm isAdmin={false} history={history} match={match} />
					) : (
						<RegisterModalForm />
					)}
					{mode === 'login' ? (
						<span style={{ fontSize: '1.2rem', marginTop: '2.5rem' }}>
							New to Medeasy ?{' '}
							<Link
								to="/register"
								onClick={() => setMode('register')}
								style={{ color: '#7AC7B8', cursor: 'pointer' }}
							>
								Register
							</Link>{' '}
							now
						</span>
					) : (
						<span style={{ fontSize: '1.2rem', marginTop: '2.5rem' }}>
							Already Registered ?{' '}
							<Link
								to="/login"
								onClick={() => setMode('login')}
								style={{ color: '#7AC7B8', cursor: 'pointer' }}
							>
								Login
							</Link>{' '}
							now
						</span>
					)}
				</div>
			</div>
		</Modal>
	)
}

const mapStateToProps = createStructuredSelector({
	user: selectAuthUser
})

export default connect(mapStateToProps)(LoginRegisterModal)
