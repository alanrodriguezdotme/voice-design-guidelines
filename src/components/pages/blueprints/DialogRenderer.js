import React, { useContext, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import CortanaPanel from './../blueprints/blueprintRenderer/CortanaPanel'
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';
import { getTheme, Callout, DirectionalHint, mergeStyleSets } from 'office-ui-fabric-react';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { VoicePatternsContext } from './../../../contexts/VoiceContextProvider'
import CortanaPanelEyesOff from './blueprintRenderer/CortanaPanelEyesOff';
import { LUISContext } from '../../../contexts/LUISContext';
import { STTContext } from '../../../contexts/STTContext';

//This overlay is the emulator that allows the user to test out their scenarios.
//TO-DO: Add different modes other than an iPhone (Invoke, car, etc)
const DialogRenderer = ({ actions }) => {
	const theme = getTheme();
	let {
		ttsVoice,
		setTTSVoice,
		demoReset,
		toggleDemoReset,
		isEyesOff,
	} = actions

	let [voiceCalloutState, isVoiceCalloutActive] = useState(false)
	let [iphoneFrameLoadState, isIphoneFrameLoaded] = useState(false)

	//Define the two different neural voices.
	const options = [
		{
			key: 'Microsoft Server Speech Text to Speech Voice (en-US, EvaNeural)',
			text: 'Eva (neural) - Microsoft'
		},
		{
			key: 'Microsoft Server Speech Text to Speech Voice (en-US, EvanNeural)',
			text: 'Evan (neural) - Microsoft'
		}
	];

	const handleVoiceCalloutClick = () => {
		isVoiceCalloutActive(!voiceCalloutState);
	}

	//Toggle between the male and female voices.
	const handleVoiceChange = (ev, option) => {
		if (option.key === "Microsoft Server Speech Text to Speech Voice (en-US, EvaNeural)") {
			setTTSVoice("Microsoft Server Speech Text to Speech Voice (en-US, EvaNeural)")
		}
		else if (option.key === "Microsoft Server Speech Text to Speech Voice (en-US, EvanNeural)") {
			setTTSVoice("Microsoft Server Speech Text to Speech Voice (en-US, EvanNeural)")
		}
	}

	//Handle the demo reset.
	const handleRestartClick = () => {
		toggleDemoReset(!demoReset)
	}

	//Custom styling for the Fluent callout control.
	const voiceButtonCalloutStyle = mergeStyleSets({
		callout: {
			fontFamily: "SegoeUI, system-ui",
			maxWidth: 300,
			padding: 24
		},
		action: [
			{
				display: "flex",
				width: "100%",
				margin: "0 auto 0 0",
				padding: "8px 12px",
				alignItems: "center",
			}
		],
		icon: [
			{
				fontSize: FontSizes.size16,
				marginRight: "12px",
				color: theme.palette.themePrimary
			}
		]
	});

	return (
		<DialogRendererDiv iphoneFrameLoadState={iphoneFrameLoadState}>
			<div className="dialogRenderer-contentContainer">
				{ isEyesOff ? <CortanaPanelEyesOff actions={ actions } /> : <CortanaPanel actions={ actions } /> }
				<img className="dialogRenderer-iphoneShell" src="./assets/iphoneX.png" onLoad={() => isIphoneFrameLoaded(true)} />
			</div>
			<DialogRendererControlsDiv iphoneFrameLoadState={iphoneFrameLoadState}>
				<div className="dialogRenderer-controlsButton" onClick={() => handleRestartClick()} >
					<Icon iconName="Refresh" className="dialogRenderer-controlsIcon" />
					<div className="dialogRenderer-title" >Restart</div>
				</div>

				<div className="dialogRenderer-controlsButton" id="voiceButton" onClick={() => handleVoiceCalloutClick()}>
					<Icon iconName="ChatBot" className="dialogRenderer-controlsIcon" />
					<div className="dialogRenderer-title">Voice</div>
				</div>

				<div className="dialogRenderer-controlsButton" onClick={() => alert("Coming soon!")}>
					<Icon iconName="ContextMenu" className="dialogRenderer-controlsIcon" />
					<div className="dialogRenderer-title">Change mode</div>
				</div>
			</DialogRendererControlsDiv>

			{voiceCalloutState &&
				<Callout
					className={voiceButtonCalloutStyle.callout}
					role="alertdialog"
					gapSpace={0}
					directionalHint={DirectionalHint.bottomCenter}
					target="#voiceButton"
					setInitialFocus={true}
					onDismiss={() => isVoiceCalloutActive(false)}>

					<ChoiceGroup
						onChange={handleVoiceChange}
						label="Choose a voice"
						defaultSelectedKey={ttsVoice}
						selectedKey={ttsVoice}
						options={options} />

				</Callout>
			}
		</DialogRendererDiv>
	);
}

export default DialogRenderer;

const fadeInControls = keyframes`
	0% { 
		opacity: 0;
		transform: translate3d(0, -24px, 0);
		}
	100% {
		opacity: 1;
		transform: translate3d(0, 0, 0);
		}
`

const fadeInIphone = keyframes`
	0% { 
		opacity: 0;
		transform: translate3d(0, -24px, 0);
		}
	100% {
		opacity: 1;
		transform: translate3d(0, 0, 0);
		}
`

const DialogRendererDiv = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	position: relative;

	.dialogRenderer-contentContainer {
		background: #242424;
		height: 530px;
		width: 246px;
		position: relative;
		opacity: 0;
		margin-top: 48px;
		animation: ${(props) => props.iphoneFrameLoadState && fadeInIphone} 500ms ease-in-out;
		animation-delay: 150ms;
		animation-fill-mode: forwards;
	}

	.dialogRenderer-iphoneShell {
		max-height: 600px;
		margin: -34px 0 0 -36px;
		pointer-events: none;
		position: absolute;
		top: 0;
	}
`

const DialogRendererControlsDiv = styled.div`
	height: 100px;
	width: 434px;
	background: #e3e3e3;
	display: flex;
	border-radius: 24px;
	margin-top: 32px;
	overflow: hidden;
	opacity: 0;
	animation: ${(props) => props.iphoneFrameLoadState && fadeInControls} 500ms ease-in-out;
	animation-delay: 300ms;
	animation-fill-mode: forwards;

	.dialogRenderer-controlsIcon {
		font-size: ${FontSizes.size24};
		margin-bottom: 8px;
	}

	.dialogRenderer-controlsButton {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		&:hover {
			cursor: pointer;
			background: rgba(0, 0, 0, .1)
		}
	}
`
