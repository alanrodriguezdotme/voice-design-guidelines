import React, { useEffect } from 'react'
import styled from 'styled-components'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey('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')

const testMessage = {
	to: 'alanro@microsoft.com',
	from: 'alanro@microsoft.com',
	subject: 'Feeback for Voice Patterns Site',
	text: 'testing this out',
	html: '<strong><emphasis>Yooooo</emphasis></strong>'
}

const FeedbackForm = () => {

	useEffect(() => {
		sgMail
			.send(testMessage)
			.then(() => { console.log('feedback sent!')},
				error => { console.error(error) })
	}, [])

	return (
		<Container>
			
		</Container>
	)
}

export default FeedbackForm

const Container = styled.div`
	min-width: 400px;
	min-height: 200px;
	border-radius: 4px;
	background: white;
	z-index: 5;
`
