import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import Speech from 'speak-tts'
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { getTheme, Callout, getId, mergeStyleSets, DirectionalHint, CommandBarButton, FontWeights } from 'office-ui-fabric-react';
// import { TextToSpeechContext } from './../../../../utils/TextToSpeech'
import { VoicePatternsContext } from './../../../../contexts/VoiceContextProvider'
import SkillRenderer from './../SkillRenderer'
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';
import * as _ from 'underscore'
import SpeechAnimation from './SpeechAnimation';
import TextToSpeech from './../../../../utils/TextToSpeech';
import { STTContext } from '../../../../contexts/STTContext';
import { LUISContext } from '../../../../contexts/LUISContext';

const CortanaPanel = ({ actions }) => {
	const theme = getTheme();
	let tts = new TextToSpeech(process.env.ACCESS_TOKEN)
	let {
		typeIntent,
		typeName,
		typeTimeDate,
		typeDuration,
		typeLocation,
		typeMessage,
		typeNumber,
		typeService,
		typeDeviceType,
		typeConfirm,
		typeSuccess,
		patternsPage,
		skillCreatorDialog,
		rendererOverlayState,
		demoReset,
		luisResponse,
		repromptTurn, 
		setRepromptTurn,
		ttsVoice,
		confirmationState,
		setConfirmationState,
		cortanaResponse,
		setCortanaResponse,
		isMicOpen,
		userHypothesis,
		startListening, 
		stopListening, 
		setFreeformTextState,
		getLuisResponse
	} = actions

	const [openSlots, setOpenSlots] = useState(null)
	const [voiceDialog, setVoiceDialog] = useState(null)
	const [initialSlotLength, setInitialSlotLength] = useState(0)
	const [triggerVoiceDialogUpdate, forceTriggerDialogUpdate] = useState(false)
	const [triggerTurnUpdate, forceTriggerTurnUpdate] = useState(false)
	const [micCalloutState, isMicCalloutActive] = useState(false)
	const [panelHeight, setPanelHeight] = useState("164px")
	const [rollupCardState, setRollupCardState] = useState(false)

	const typesObject = {
		intent: typeIntent,
		person: typeName,
		timeDate: typeTimeDate,
		duration: typeDuration,
		place: typeLocation,
		text: typeMessage,
		number: typeNumber,
		service: typeService,
		deviceType: typeDeviceType,
		confirm: typeConfirm,
		success: typeSuccess,
		currentSkill: patternsPage
	}

	useEffect(() => {
		console.log({ typesObject, skillCreatorDialog })
		setVoiceDialog(SkillRenderer({ ...typesObject }, skillCreatorDialog))

		setTimeout(() => {isMicCalloutActive(true)}, 350);
	}, []);

	useEffect(() => {
		if (rendererOverlayState) {
			setPanelHeight("164px");
			setRollupCardState(false);
		}
	}, [demoReset]);

	//after LUIS is done, check to see what entities were gathered
	useEffect(() => {
		console.log("LUIS RESPONSE")
		console.log(luisResponse)
		if (luisResponse) {
			setVoiceDialog(SkillRenderer({ ...typesObject }, skillCreatorDialog))

			//force a re-render of voiceDialog so that we can move on to next useEffect
			forceTriggerDialogUpdate(!triggerVoiceDialogUpdate);
		}
	}, [luisResponse]);

	//once the skill dialog is updated, check for missing slots to be filled
	useEffect(() => {
		if (skillCreatorDialog && luisResponse) {
			setOpenSlots(_.where(voiceDialog, { userResponse: null, defaultUserResponse: "" }));
		}
	}, [triggerVoiceDialogUpdate]);

	//once missing slots is determined, check and see if slot was filled during last utterance to decide whether to speak prompt vs reprompt
	useEffect(() => {
		if (openSlots) {
			if (initialSlotLength > openSlots.length) {
				setRepromptTurn(1)
			}
			else {
				setRepromptTurn(repromptTurn + 1)
			}
			//force a re-render of repromptTurn so that we can move on to next useEffect
			forceTriggerTurnUpdate(!triggerTurnUpdate);
		}
	}, [openSlots]);

	useEffect(() => {
		console.log({voiceDialog})
		if (repromptTurn !== 0) {
			if (openSlots.length > 0) {
				setCortanaResponse(openSlots[0].prompt.ttsString)
				if (openSlots[0].freeform === true) {
					setFreeformTextState(true);
					tts.speak(
						openSlots[0].prompt.ttsString,
						ttsVoice,
						function () {
							startListening(actions)
						});
				}
				else {
					setCortanaResponse(openSlots[0].prompt.ttsString)
					tts.speak(
						repromptTurn > 1 ? openSlots[0].reprompt.ttsString : openSlots[0].prompt.ttsString,
						ttsVoice,
						function () {
							setInitialSlotLength(openSlots.length);
							startListening(actions);
						});
				}
			}
			else if (voiceDialog && voiceDialog[voiceDialog.length - 2].entity === "Summary" && confirmationState === false) {
				setCortanaResponse(voiceDialog[voiceDialog.length - 2].prompt.ttsString);
				setPanelHeight("80%");
				setRollupCardState(true);
				tts.speak(
					voiceDialog[voiceDialog.length - 2].prompt.ttsString,
					ttsVoice,
					function () {
						setConfirmationState(true);
						startListening(actions)
					});
			}
			else if (voiceDialog && voiceDialog[voiceDialog.length - 1].entity === "Rollup") {
				setCortanaResponse(voiceDialog[voiceDialog.length - 1].prompt.ttsString)
				tts.speak(
					voiceDialog[voiceDialog.length - 1].prompt.ttsString,
					ttsVoice,
					function () {

					});
			}
		}
	}, [triggerTurnUpdate]);

	const openMicrophone = () => {
		isMicCalloutActive(false);
		startListening(actions);
	}

	let _labelId = getId('callout-label');
	let _descriptionId = getId('callout-description');

	const micCalloutStyle = mergeStyleSets({
		callout: {
			fontFamily: "SegoeUI, system-ui",
			width: 164,
			padding: 12,
		},
		action: [
			{
				display: "flex",
				width: "100%",
				margin: "0 auto 0 0",
				padding: "12px 12px",
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

	const renderRollupCard = () => {
		return voiceDialog && voiceDialog.map((data, index) => {
			return index !== 0 &&
				index !== voiceDialog.length - 1 &&
				index !== voiceDialog.length - 2 &&
				<div key={_.uniqueId()}>
					<div className="cortanaPanel-rollupHeader">{data.entity}</div>
					<div className="cortanaPanel-userResponse">{data.userResponse ? data.userResponse.entity : data.defaultUserResponse}</div>
				</div>
		})
	}

	return (
		<CortanaPanelDiv panelHeight={panelHeight}>
			<div className="cortanaPanel-handle"></div>
			<div className="cortanaPanel-cortanaResponse">{cortanaResponse}</div>

			{rollupCardState &&
				<div className="cortanaPanel-rollupCard">
					{renderRollupCard()}
				</div>
			}

			<div className="cortanaPanel-input">
				{isMicOpen
					?
					[<div className="cortanaPanel-userHypothesis" key={"CUH"}>{userHypothesis}</div>,
					<SpeechAnimation key={"CSA"} />]
					:
					<Icon id="micButton" iconName="Microphone" className="cortanaPanel-micButton" onClick={() => openMicrophone()} />
				}
				{micCalloutState && voiceDialog.length > 0 &&
					<Callout
						className={micCalloutStyle.callout}
						ariaLabelledBy={_labelId}
						ariaDescribedBy={_descriptionId}
						role="alertdialog"
						gapSpace={0}
						directionalHint={DirectionalHint.topCenter}
						target="#micButton"
						setInitialFocus={true}
						onDismiss={() => isMicCalloutActive(false)}>

						To begin, click the microphone and say, <strong>"{voiceDialog[0].prompt.guiString}"</strong>

					</Callout>
				}
			</div>
		</CortanaPanelDiv>
	);
}

export default CortanaPanel;

const CortanaPanelDiv = styled.div`
	height: ${props => props.panelHeight};
	transition: height 350ms cubic-bezier(.04, .69, .38, 1);
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	background: white;
	bottom: 0;
	position: absolute;
	box-shadow: 3px 3px 15px 4px rgba(0,0,0,0.14);
	padding: 0 12px;
	border-radius: 16px 16px 0 0;

	.cortanaPanel-input {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		justify-content: center;
		margin: auto 0 12px 0;
	}

	.cortanaPanel-rollupCard {
		margin: 12px 0 0 0;
		padding: 0 12px 12px 12px;
		box-shadow: 3px 3px 15px 4px rgba(0,0,0,0.14);
		background: white;
		display: flex;
		flex-direction: column;
		width: 100%;
		font-size: ${FontSizes.size14};
	}

	.cortanaPanel-rollupHeader {
		width: 100%;
		margin: 12px 0 0 0;
		font-weight: ${FontWeights.bold};
	}

	.cortanaPanel-userResponse {
		text-transform: capitalize;
	}

	.cortanaPanel-micButton {
		height: 48px;
		width: 48px;
		font-size: ${FontSizes.size24};
		display: flex;
		justify-content: center;
		align-items: center;

		&:hover {
			cursor: pointer;
		}
	}

	.cortanaPanel-userHypothesis{
		font-size: ${FontSizes.size12};
		padding: 0 12px
	}

	.cortanaPanel-cortanaResponse {
		font-weight: ${FontWeights.semibold};
		margin: 12px 0 0 0;
		padding: 0 12px;
		text-align: center;
	}

	.cortanaPanel-handle {
		height: 4px;
		width: 72px;
		margin: 12px auto 0 auto;
		background: lightgray;
		border-radius: 3px;
	}
`