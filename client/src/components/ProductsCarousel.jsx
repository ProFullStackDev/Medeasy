import React from 'react'
import styled from 'styled-components'
import { ReactComponent as LArrow } from '../images/larrow.svg'
import { ReactComponent as RArrow } from '../images/rarrow.svg'

const bgColor = '#7ac7b8'

const ProductCarouselContainer = styled.div`
  margin: 1.5rem 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const ButtonContainer = styled.button`
	background: ${bgColor};
	cursor: pointer;
	width: 2.5rem;
	height: 2.5rem;
	padding: 5px;
	border: none;
	border-radius: 3px;
	& svg {
		width: 100%;
		height: 100%;
  }
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    background: rgba(122, 199, 184, .54);
  }
`

const SelectContainer = styled.select`
  min-width: 2rem;
  margin: 0 1.5rem;
  cursor: pointer;
  border: none;
  color: white;
  background: ${bgColor};
  padding: 5px 1rem;
`

const ProductsCarousel = ({ onClick, currentPageNumber, totalPages }) => {
	return (
		<ProductCarouselContainer>
			<span>Page {currentPageNumber}</span>
			<SelectContainer onChange={e => onClick(e.target.value)} value={currentPageNumber}>
				{Array.from({ length: totalPages }).map((v, index) => (
					<option key={index} value={index + 1}>
						{index + 1}
					</option>
				))}
			</SelectContainer>
			<ButtonContainer
				disabled={currentPageNumber === 1}
				onClick={() => onClick(currentPageNumber - 1)}
			>
				<LArrow />
			</ButtonContainer>
			<ButtonContainer style={{ marginLeft: '1rem' }}
				disabled={currentPageNumber === totalPages}
				onClick={() => onClick(currentPageNumber + 1)}
			>
				<RArrow />
			</ButtonContainer>
		</ProductCarouselContainer>
	)
}

export default ProductsCarousel
