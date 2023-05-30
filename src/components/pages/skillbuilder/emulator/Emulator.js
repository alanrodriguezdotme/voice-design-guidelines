import React, { useState } from 'react'
import styled from 'styled-components'
import EmulatorContextProvider from '../../../../contexts/EmulatorContextProvider'
import EmulatorWrapper from './EmulatorWrapper'

const Emulator = ({ dialog, closeAction }) => {

	return (
		<EmulatorContextProvider dialog={ dialog }>
			<EmulatorWrapper closeAction={ closeAction } />
		</EmulatorContextProvider>
	)
}

export default Emulator