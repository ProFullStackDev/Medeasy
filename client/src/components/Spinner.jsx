import React from 'react'
import styled, { keyframes } from 'styled-components'

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
`
const SpinnerContainer = styled.div`
	display: inline-block;
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 64px;
	height: 64px;
	&::after {
		content: ' ';
		display: block;
		border-radius: 50%;
		width: 0;
		height: 0;
		margin: 6px;
		box-sizing: border-box;
		border: 26px solid #fff;
		border-color: ${props =>
			props.white
				? 'white transparent white transparent'
				: '#7ac7b8 transparent #7ac7b8 transparent'};
		animation: ${spinnerAnimation} 1.2s infinite;
	}
`

export default ({ white }) => <SpinnerContainer white={white} />
