import React, { useContext } from 'react'
import styled from 'styled-components'
import { EmulatorContext } from '../../../../contexts/EmulatorContextProvider'
import { STTContext } from '../../../../contexts/STTContext'
import EmulatorControls from './EmulatorControls'
import EmulatorMobile from './EmulatorMobile'
import EmulatorOverlay from './EmulatorOverlay'

const EmulatorWrapper = ({ closeAction }) => {
	let actions = useContext(EmulatorContext)
	let { stopListening } = useContext(STTContext)
	let { resetEmulator } = actions


	const closeEmulator = () => {
		stopListening(actions)
		resetEmulator()
		closeAction()
	}

	return (
		<Container>
			<Content>
				<EmulatorMobile actions={ actions } />
				<EmulatorControls actions={ actions } />
			</Content>
			<EmulatorOverlay closeAction={ closeEmulator } />			
		</Container>
	)
}

export default EmulatorWrapper

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: 1000;
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
`

const Content = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`