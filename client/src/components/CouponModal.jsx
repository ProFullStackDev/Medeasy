import React, { useEffect, Fragment } from 'react'
import styled from 'styled-components'

import { ReactComponent as BarCodeIcon } from '../images/bar.svg'
import Spinner from './Spinner'
import CustomButton from './CustomButton'

import { connect } from 'react-redux'
import { fetchAllCoupons } from '../redux/actions/inventoryActions'
import {
	selectInventoryLoading,
	selectInventoryCoupons
} from '../redux/selectors/inventorySelectors'
import { createStructuredSelector } from 'reselect'

import '../styles/components/ShowModal.scss'

const CouponItem = styled.div`
	background: #7ac7b8;
	width: 70%;
	margin: 2rem auto 1.5rem 0;
	border: 5px dotted white;
	border-radius: 5px;
	box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
	padding: 3rem;
	color: white;
	font-weight: bold;
	text-transform: uppercase;
	transition: all 0.2s ease-in;
	&:hover {
		cursor: pointer;
		transform: rotate(-5deg);
		box-shadow: 0 0 2rem rgba(0, 0, 0, 0.5);
	}
`

const CouponItemCode = styled.span`
	background: white;
	color: #7ac7b8;
	border-radius: 4rem;
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 7rem;
	padding: 0.5rem 2rem;
`

const CouponCode = styled.h2`
	margin: 0 auto 2rem;
	font-size: 3.5rem;
	text-align: center;
`

const CouponDescriptionContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const CouponModal = ({
	coupons,
	loading,
	fetchAllCoupons,
	disableOverlay,
	onClick
}) => {
	useEffect(() => {
		fetchAllCoupons()
	}, [fetchAllCoupons])
	return (
		<div className="ShowModal" style={{ padding: '3rem' }}>
			{!coupons || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<p style={{ fontSize: '2.5rem' }} className="ShowModal__title">
						All Coupons
					</p>
					{coupons.map(coupon => (
						<CouponItem
							onClick={() => {
                onClick(coupon.name)
                disableOverlay()
							}}
							key={coupon._id}
						>
							<CouponCode>{coupon.description}*</CouponCode>
							<CouponDescriptionContainer>
								<BarCodeIcon />
								<CouponItemCode>{coupon.name}</CouponItemCode>
							</CouponDescriptionContainer>
						<span style={{ float: 'right', fontSize: '9px', marginTop: '1rem', textTransform: 'capitalise' }}>*Min Order Amount: $ {coupon.minimumOrderAmount}</span>
						</CouponItem>
					))}
					<div className="ShowModal__buttons">
						<CustomButton
							specialBgColor="#d44a4a"
							fontSize="2rem"
							onClick={disableOverlay}
						>
							Cancel
						</CustomButton>
						{/* Implement disable feature for update button */}
					</div>
				</Fragment>
			)}
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	loading: selectInventoryLoading,
	coupons: selectInventoryCoupons
})

export default connect(
	mapStateToProps,
	{ fetchAllCoupons }
)(CouponModal)
