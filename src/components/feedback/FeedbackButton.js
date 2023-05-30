import React from 'react'
import styled from 'styled-components'

const FeedbackButton = ({ data }) => {
	let { showFeedbackForm, setShowFeedbackForm } = data
	return (
		<Container>
			<Button 
				className={ showFeedbackForm ? 'cancel' : 'feedback' }
				onClick={ () => { setShowFeedbackForm(!showFeedbackForm) } }>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="32" height="32">
					<path d="M958 1328q101 40 184 106t142 153 91 187 33 210v64h-128v-64q0-119-45-224t-124-183-183-123-224-46q-119 0-224 45t-183 124-123 183-46 224v64H0v-64q0-109 32-210t92-187 142-152 184-107q-45-31-81-72t-61-88-38-100-14-108q0-93 35-174t96-142 142-96 175-36q93 0 174 35t142 96 96 142 36 175q0 55-13 107t-39 100-61 89-81 72zm-254-48q66 0 124-25t101-68 69-102 26-125q0-66-25-124t-69-101-102-69-124-26q-66 0-124 25t-102 69-69 102-25 124q0 66 25 124t68 102 102 69 125 25zM2048 0v1024h-256l-384 384v-384h-128V896h256v203l203-203h181V128H640v230q-32 4-64 10t-64 18V0h1536z" />
				</svg>
			</Button>
		</Container>
	)
}

export default FeedbackButton

const Container = styled.div`
	position: fixed;
	bottom: 36px;
	right: 36px;
	z-index: 201;
`

const Button = styled.div`
	width: 64px;
	height: 64px;
	border-radius: 32px;
	background: #8686F9;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 3px 3px 20px 0px rgba(50, 50, 50, 0.27);
	transition: box-shadow 225ms ease-in-out, background-color 225ms ease-in-out;

	&:hover {
		box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.5);
		background: rgb(0,67,119);
		cursor: pointer;
	}

	svg {
		fill: white;
		width: 28px;
	}
`