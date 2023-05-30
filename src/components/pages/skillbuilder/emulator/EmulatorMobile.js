import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import EmulatorVoicePanel from './EmulatorVoicePanel'

const EmulatorMobile = ({ actions }) => {
	let [ emulatorMobileHeight, setEmulatorMobileHeight ] = useState(0)
	let emulatorMobileRef = useRef(null)

	useEffect(() => {
		console.log({ emulatorMobileRef })
		if (emulatorMobileRef.current) {
			setEmulatorMobileHeight(emulatorMobileRef.current.clientHeight)
		}
	}, [ emulatorMobileRef ])

	useEffect(() => {
		console.log({ emulatorMobileHeight })
	}, [ emulatorMobileHeight ])

	return (
		<Container ref={ emulatorMobileRef } currentHeight={ emulatorMobileHeight }>
			<MobileFrame src="assets/illustrations/iphone.svg" />
			<Content>
				<EmulatorVoicePanel actions={ actions } />
			</Content>
		</Container>
	)
}

export default EmulatorMobile

const Container = styled.div`
	position: relative;
	width: ${ p => p.currentHeight > 0 ? p.currentHeight * 0.497 + 'px' : '100%'};
	height: 100%;
	max-width: 427px;
	max-height: 858px;
	flex: 1;
	z-index: 10;
	display: flex;
	align-items: center;
	justify-content: center;
`

const MobileFrame = styled.img`
	width: 100%;
	z-index: 100;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
`

const Content = styled.div`
	position: relative;
	width: 88%;
	height: 95%;
	background-color: #000;
	z-index: 50;
`