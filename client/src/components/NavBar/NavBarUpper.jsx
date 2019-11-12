import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import medeasyLogo from '../../images/medeasy-logo.png'

import { AutoSelect } from '../AutoSelect'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { ReactComponent as UserIcon } from '../../images/user.svg'
import { ReactComponent as DownArrowBlackIcon } from '../../images/downArrowBlack.svg'
import { ReactComponent as BagIcon } from '../../images/bag.svg'
import { ReactComponent as LogoutIcon } from '../../images/logout.svg'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { logout } from '../../redux/actions/authActions'
import { selectInventoryProducts } from '../../redux/selectors/inventorySelectors'
import { selectAuthUser } from '../../redux/selectors/authSelectors'

const NavBarUpper = ({ logout, user, products }) => {
	useState(user)
	const logoutUser = () => logout()

	return (
		<div className="NavBar__upper">
			<div className="container">
				<div className="NavBar__upper-logo">
					<Link to="/">
						<img
							src={medeasyLogo}
							className="NavBar__upper-img"
							alt="medeasy-logo"
						/>
					</Link>
				</div>
				<AutoSelect products={products} />
				<div className="NavBar__upper-other">
					<span className="NavBar__upper-other-auth">
						{!user ? (
							<React.Fragment>
								<Link to="/login" style={{ cursor: 'pointer' }}>
									Login
								</Link>
								&nbsp;|&nbsp;
								<Link to="/register" style={{ cursor: 'pointer' }}>
									Signup
								</Link>
							</React.Fragment>
						) : (
							<React.Fragment>
								<span style={{ display: 'flex', alignItems: 'center' }}>
									<UserIcon />
									&nbsp;&nbsp;
									{user.name.split(' ').length > 1
										? user.name.split(' ')[0]
										: user.name}
									&nbsp;&nbsp;
									<DownArrowBlackIcon id="downarrow" />
								</span>
								<ul className="NavBar__upper-other-auth-user">
									<Link to="/profile/address">
										<li>
											<UserIcon />
											<span>Profile</span>
										</li>
									</Link>
									<Link to="/profile/orders">
										<li>
											<BagIcon />
											<span>My Orders</span>
										</li>
									</Link>
									<li onClick={logoutUser}>
										<LogoutIcon />
										<span>Logout</span>
									</li>
								</ul>
							</React.Fragment>
						)}
					</span>
					<FontAwesomeIcon style={{ margin: '0 1rem' }} icon={faPhoneAlt} />
					<a href="tel:+15555777572" style={{ fontWeight: 'bold', fontSize: '1.7rem' }}>+1-555-5777-572</a>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	user: selectAuthUser,
	products: selectInventoryProducts
})

export default connect(
	mapStateToProps,
	{ logout }
)(NavBarUpper)
