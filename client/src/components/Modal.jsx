import React from 'react'
import { createPortal } from 'react-dom'

const modalStyle = {
	position: 'fixed',
	left: 0,
	top: 0,
	bottom: 0,
	right: 0,
	backgroundColor: 'rgba(0,0,0,.2)',
	color: '##FFF',
}

const Modal = ({ onClick, children }) => {
		return createPortal(
			<div style={modalStyle} onClick={onClick}>
				{children}
			</div>,
			document.getElementById('modal__root')
		)
}

export default Modal
