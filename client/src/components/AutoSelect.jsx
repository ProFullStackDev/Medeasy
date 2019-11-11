import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { ReactComponent as SearchIcon } from '../images/search.svg'
import { Link } from 'react-router-dom'

const AutoSelectContainer = styled.div`
	margin: auto;
	display: flex;
	flex-direction: column;
	position: relative;
`

const FormContainer = styled.div`
	display: flex;
	width: 49rem;
	border: 1px solid #ddd7d7;
	overflow: hidden;
	border-radius: 0.5rem;
	transition: all 0.3s ease-in;
	&:hover,
	& input:focus {
		border-color: #7ac7b8;
	}
`

const TextForm = styled.form`
	flex: 1;
	display: flex;
	background: #7ac7b8;
	justify-content: space-between;

	& input[type='text'] {
		font-weight: bold;
		height: 100%;
		width: 100%;
		border: none;
		outline: none;
		background: white;
		padding: 1rem 2rem;
		font-size: 1.6rem;
		color: #7ac7b8;

		&::placeholder {
			font-weight: normal;
		}

		svg {
			fill: #7ac7b8;
			margin: 0 1rem;
			outline: none;
			cursor: pointer;
			height: 100%;
			align-self: center;
		}
	}
`

const SearchResultList = styled.ul`
	z-index: 10;
	width: 100%;
	position: absolute;
	top: 4.2rem;
	overflow: hidden;
	background: #f1f2f6;
	border-radius: 0.5rem;
	margin-top: 1rem;
`

const SearchResultListItemStyles = css`
	cursor: pointer;
	background: transparent;
	display: flex;
	max-height: 7rem;
	padding: 1rem;
	transition: all 0.3s ease-in;
	border: 2px solid transparent;
	&:hover {
		background: #7ac7b8;
		color: white;
		border-color: #659d92;
	}
`

const SearchResultListItemLink = styled(Link)`
	${SearchResultListItemStyles}
`

const SearchResultListItem = styled.li`
	${SearchResultListItemStyles}
`

const SearchResultImage = styled.img`
	max-width: 7rem;
	max-height: 7rem;
	margin-right: 2rem;
`

const SearchResultDetails = styled.div``

export const AutoSelect = ({ products, isNormalItem, onClick }) => {
	const [autoSelectState, setAutoSelectState] = useState(true)
	const [searchText, setSearchText] = useState('')

	const handleChange = event => {
		setAutoSelectState(true)
		setSearchText(event.target.value)
	}

	const handleClick = (productName, productId) => {
		setAutoSelectState(false)
		setSearchText('')
		console.log(productName, productId)
		if (isNormalItem) onClick({ id: productId, name: productName })
	}

	return (
		<AutoSelectContainer>
			<FormContainer>
				<TextForm className="NavBar__upper--search-text">
					<input
          required
						value={searchText}
						onKeyUp={event => {
							if (event.keyCode === 27) {
								setAutoSelectState(false)
								event.target.blur()
							}
						}}
						onChange={handleChange}
						type="text"
						placeholder="Search for products"
					/>
					<SearchIcon alt="Search fr" />
				</TextForm>
			</FormContainer>
			{products && autoSelectState && searchText.length > 0 ? (
				<SearchResultList>
					{products
						.filter(p =>
							p.name.toLowerCase().startsWith(searchText.toLowerCase())
						)
						.map(product =>
							!isNormalItem ? (
								<SearchResultListItemLink
									to={`/product/${product._id}`}
									key={product._id}
									onClick={() => setAutoSelectState(false)}
								>
									<SearchResultImage src={product.photos[0]} alt="Product" />
									<SearchResultDetails>
										<p style={{ fontSize: '1.8rem', marginBottom: '3px' }}>
											<span style={{ fontWeight: 'bold' }}>
												{product.name.slice(0, searchText.length)}
											</span>
											{product.name.slice(searchText.length)}
										</p>
										<p>{product.category.name}</p>
									</SearchResultDetails>
								</SearchResultListItemLink>
							) : (
								<SearchResultListItem
									onClick={() => handleClick(product.name, product._id)}
									key={product._id}
								>
									<SearchResultImage src={product.photos[0]} alt="Product" />
									<SearchResultDetails>
										<p style={{ fontSize: '1.8rem', marginBottom: '3px' }}>
											<span style={{ fontWeight: 'bold' }}>
												{product.name.slice(0, searchText.length)}
											</span>
											{product.name.slice(searchText.length)}
										</p>
										<p>{product.category.name}</p>
									</SearchResultDetails>
								</SearchResultListItem>
							)
						)}
				</SearchResultList>
			) : null}
		</AutoSelectContainer>
	)
}
