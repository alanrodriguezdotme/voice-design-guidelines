import React from 'react'
import styled from 'styled-components'
import FeedbackForm from './FeedbackForm'

const Feedback = ({ data }) => {
	let { showFeedbackForm, setShowFeedbackForm } = data

	return (
		<Container>
			<Overlay onClick={ () => setShowFeedbackForm(false) } />
			<FeedbackForm />
		</Container>
	)
}

export default Feedback

const Container = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	z-index: 200;
	display: flex;
	align-items: center;
	justify-content: center;
`

const Overlay = styled.div`
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.69);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
`
