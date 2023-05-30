import React from 'react'
import styled from 'styled-components'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

const EmulatorControls = ({ actions }) => {
	let { ttsVoice, setTTSVoice, ttsVoiceOptions } = actions

	function handleVoiceChangeClick(item) {
		setTTSVoice(item.key)
	}

	return (
		<Container>
			<Control>
				<Dropdown
					className="dropdown"
					label="Choose a voice"
					options={ ttsVoiceOptions }
					defaultSelectedKey={ ttsVoice }
					onChange={ (event, item) => handleVoiceChangeClick(item) }	/>
			</Control>
		</Container>
	)
}

export default EmulatorControls

const Container = styled.div`
	position: relative;
	z-index: 50;
	padding: 0 24px;
	height: 100px;
	display: flex;
	align-items: center;
`

const Control = styled.div`

	.dropdown {
		max-width: 200px;

		label {
			color: #fff;
		}
	}
`