import React from 'react'
import styled from 'styled-components'

const EmulatorOverlay = ({ closeAction }) => {
	return (
		<Container>
			<CloseButton onClick={ () => closeAction() }>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
					<path d="M1169 1024l879 879-145 145-879-879-879 879L0 1903l879-879L0 145 145 0l879 879L1903 0l145 145-879 879z" />
				</svg>
			</CloseButton>
		</Container>
	)
}

export default EmulatorOverlay

const Container = styled.div`
	width: 100%;
	height: 100%;
	z-index: 1;
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.7);
`

const CloseButton = styled.div`
	position: absolute;
	top: 20px;
	right: 20px;
	width: 64px;
	height: 64px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;

	svg {
		fill: #fff;
		height: 32px;
		width: 32px;
	}
`