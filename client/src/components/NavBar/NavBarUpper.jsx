import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import medeasyLogo from '../../images/medeasy-logo.png'
import { ReactComponent as CartIcon } from '../../images/cart.svg'
import { ReactComponent as ContactIcon } from '../../images/contactus.svg'
import { ReactComponent as UserIcon } from '../../images/user.svg'
import { ReactComponent as DownArrowBlackIcon } from '../../images/downArrowBlack.svg'
import { ReactComponent as BagIcon } from '../../images/bag.svg'
import { ReactComponent as LogoutIcon } from '../../images/logout.svg'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { logout } from '../../redux/actions/authActions'
import { selectAuthUser } from '../../redux/selectors/authSelectors'
import { selectCartProducts } from '../../redux/selectors/cartSelectors'

const NavBarUpper = ({ logout, user, cartProducts }) => {
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
				<nav className="NavBar__upper-links">
					<NavLink exact to="/" activeClassName="active">
						Home
					</NavLink>
					<NavLink exact to="/about" activeClassName="active">
						About Us
					</NavLink>
					<NavLink exact to="/customer" activeClassName="active">
						Customer Service
					</NavLink>
					<NavLink exact to="/privacy" activeClassName="active">
						Privacy Policy
					</NavLink>
				</nav>
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
					<Link to="/cart">
						<div className="NavBar__upper-other-cart">
							<CartIcon
								alt="cart-img"
								className="NavBar__upper-other-cart--image"
							/>
							{cartProducts.length ? (
								<span className="NavBar__upper-other-cart--count">{ cartProducts.length }</span>
							) : null }
						</div>
					</Link>
					<Link to="/contact" className="NavBar__upper-other-contact">
						<ContactIcon alt="contact" style={{ marginRight: '.5rem' }} />
						Contact us
					</Link>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	user: selectAuthUser,
	cartProducts: selectCartProducts
})

export default connect(
	mapStateToProps,
	{ logout }
)(NavBarUpper)
