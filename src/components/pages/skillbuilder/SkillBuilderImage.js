import React from 'react'
import styled, { keyframes } from 'styled-components'

const SkillBuilderImage = ({ data }) => {
	let { currentContent } = data

	return (
		<Container>
			<img src={ currentContent.imageUrl } />
		</Container>
	)
}

export default SkillBuilderImage

const animateInDown = keyframes`
	0% { 
		transform: translateY(48px); 
		opacity: 0;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
`

const Container = styled.div`
	width: 50%;
	padding: 24px;
	z-index: 1;
	animation: ${ animateInDown } 650ms cubic-bezier(.04, .69, .38, 1);
	animation-fill-mode: forwards;
	
	img {
		width: 80%;
	}
`
