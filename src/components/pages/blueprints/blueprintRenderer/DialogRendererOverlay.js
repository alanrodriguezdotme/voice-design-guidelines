import React, { useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { VoicePatternsContext } from './../../../../contexts/VoiceContextProvider'
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';
import DialogRenderer from './../DialogRenderer'
import { IconButton } from 'office-ui-fabric-react';
import { STTContext } from '../../../../contexts/STTContext';
import { LUISContext } from '../../../../contexts/LUISContext';

const DialogRendererOverlay = (props) => {
	let actions = useContext(VoicePatternsContext)
	let { getLuisResponse } = useContext(LUISContext)
	let { startListening, stopListening, freeformTextState, setFreeformTextState } = useContext(STTContext)
	actions = {
		...actions,
		getLuisResponse,
		startListening, 
		stopListening, 
		freeformTextState, 
		setFreeformTextState
	}
	const { 
		setRendererOverlayState
	} = actions

	const handleCancelClick = () => {
		setRendererOverlayState(false);
		stopListening(actions)
	}

	return (
		<DialogRendererOverlayDiv>
			<div className="rendererOverlay-overlay" ></div>
			<DialogRenderer actions={ actions } />
			<div className="rendererOverlay-actions">
				<Icon iconName="Share" className="rendererOverlay-actionButton" />
				<Icon iconName="Cancel" className="rendererOverlay-actionButton" onClick={() => handleCancelClick()} />
			</div>
		</DialogRendererOverlayDiv>
	);
}

export default DialogRendererOverlay;

const fadeInOverlay = keyframes`
	0% { 
		opacity: 0
		}
	100% {
		opacity: 1
		}
`

const fadeInActions = keyframes`
	0% { 
		opacity: 0
		transform: translate3d(0, -24px, 0);
		}
	100% {
		opacity: 1,
		transform: translate3d(0, 0, 0);
		}
`

const DialogRendererOverlayDiv = styled.div`
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 200;

	.rendererOverlay-overlay {
		position: absolute;
		background: rgba(0, 0, 0, .6);
		backdrop-filter: blur(10px);
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		animation: ${fadeInOverlay} 350ms cubic-bezier(.04, .69, .38, 1);
	}

	.rendererOverlay-actions {
		display: flex;
		position: absolute;
		top: 24px;
		right: 24px;
		animation: ${fadeInActions} 350ms cubic-bezier(.04, .69, .38, 1);
	}

	.rendererOverlay-actionButton {
		height: 48px;
		width: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 24px;

		&:hover {
			background: rgba(255, 255, 255, .1);
			cursor: pointer;
		}
	}
`