import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ConditionsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 2rem;
	row-gap: 2rem;
	grid-auto-rows: minmax(15rem, max-content);
`

const ConditionItem = styled.div`
	background: white;
	color: #7ac7b8;
	height: 100%;
	transition: all 0.3s ease-in;
	box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.1);
	border-radius: 4px;
	display: flex;
	align-items: center;
	text-transform: uppercase;
	font-weight: bold;
	font-size: 1.8rem;
	justify-content: center;
	&:hover {
		background: #7ac7b8;
		color: white;
		box-shadow: 0;
		cursor: pointer;
	}
`

const titleStyle = {
	textAlign: 'center',
	color: 'white',
	background: '#7ac7b8',
	fontWeight: 'normal',
	padding: '.5rem',
	borderRadius: '2rem',
	width: '20%',
	margin: '2.5rem auto',
	cursor: 'default'
}

const Conditions = ({ conditions }) => {
	return (
		<Fragment>
			<h3 style={titleStyle}>Conditions</h3>
			<ConditionsContainer>
				{conditions.map(condition => (
					<Link key={condition._id} to={`/condition/${condition._id}`} id={condition._id}>
						<ConditionItem>{condition.name}</ConditionItem>
					</Link>
				))}
			</ConditionsContainer>
		</Fragment>
	)
}

export default Conditions
