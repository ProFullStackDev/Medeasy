import React, { Fragment } from 'react'
// Components
import Conditions from './Conditions'
// Images
import { ReactComponent as DownArrowIcon } from '../../images/downarrow.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { NavLink, Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
	selectInventoryCategories,
	selectInventoryProducts
} from '../../redux/selectors/inventorySelectors'
import { selectCartProducts } from '../../redux/selectors/cartSelectors'

const NavBarLower = ({ conditions, products, cartProducts }) => {
	const handleClick = () => {
		document.querySelector('.Conditions').style.display = 'none'
		document.querySelector('.Conditions').style.opacity = 0
	}

	return (
		<div className="NavBar__lower">
			<div className="container">
				<ul className="NavBar__lower--categories">
					<div style={{ display: 'flex' }}>
						<NavLink
							activeClassName="active"
							style={{ borderLeft: '1px solid #72B4A7' }}
							to="/"
							className="NavBar__lower--category"
						>
							<FontAwesomeIcon icon={faHome} />
						</NavLink>
						<li
							className="NavBar__lower--category"
							onMouseLeave={() => {
								const conditions = document.querySelector('.Conditions')
								if (conditions) {
									conditions.style.display = 'none'
									conditions.style.opacity = 0
								}
							}}
							onMouseOver={() => {
								const conditions = document.querySelector('.Conditions')
								if (conditions) {
									conditions.style.display = 'grid'
									conditions.style.opacity = 1
								}
							}}
						>
							<span style={{ marginRight: '1.5rem', fontWeight: '700' }}>
								CONDITIONS
							</span>
							{conditions && products ? (
								<Fragment>
									<DownArrowIcon alt="down-arrow" />
									<Conditions onClick={handleClick} />
								</Fragment>
							) : null}
						</li>
						<NavLink
							activeClassName="active"
							to="/faq"
							className="NavBar__lower--category"
						>
							<span style={{ fontWeight: '700' }}>FAQ</span>
						</NavLink>
						<NavLink
							activeClassName="active"
							to="/delivery"
							className="NavBar__lower--category"
						>
							<span style={{ fontWeight: '700' }}>DELIVERY</span>
						</NavLink>
						<NavLink
							activeClassName="active"
							to="/profile/orders"
							className="NavBar__lower--category"
						>
							<span style={{ fontWeight: '700' }}>ORDER STATUS</span>
						</NavLink>
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<NavLink activeClassName='active' to="/cart" className='NavBar__lower-cart-item'>
							<div className="NavBar__lower-other-cart">
								<FontAwesomeIcon icon={faShoppingCart} />
								{cartProducts.length ? (
									<span style={{ marginLeft: '1rem' }}>
										${' '}
										{cartProducts.reduce((acc, product) => {
											acc += parseInt(product.subTotal)
											return acc
										}, 0)}
									</span>
								) : null}
                <span style={{ marginLeft: '2rem' }}>{cartProducts.length} Item(s)</span>
							</div>
						</NavLink>
					</div>
				</ul>
			</div>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	conditions: selectInventoryCategories,
	products: selectInventoryProducts,
	cartProducts: selectCartProducts
})

export default connect(mapStateToProps)(NavBarLower)
