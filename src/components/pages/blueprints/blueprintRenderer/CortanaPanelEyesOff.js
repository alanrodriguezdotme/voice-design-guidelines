import React, { useContext, useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import * as _ from 'underscore'
import { getTheme, Callout, getId, mergeStyleSets, DirectionalHint, CommandBarButton, FontWeights } from 'office-ui-fabric-react'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType'

import { STTContext } from '../../../../contexts/STTContext'
import TextToSpeech from './../../../../utils/TextToSpeech'
import { VoicePatternsContext } from './../../../../contexts/VoiceContextProvider'
import SkillRenderer from './../SkillRenderer'
import SpeechAnimation from './SpeechAnimation'

const CortanaPanelEyesOff = ({ actions }) => {
	const theme = getTheme();
	const tts = new TextToSpeech(process.env.ACCESS_TOKEN)
	const {
		userHypothesis,
		luisResponse,
		skillCreatorDialog,
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
		repromptTurn,
		setRepromptTurn,
		cortanaResponse,
		setCortanaResponse,
		ttsVoice,
		demoReset,
		rendererOverlayState,
		isMicOpen,
		setIsMicOpen,
		setFreeformTextState,
		confirmationState,
		setConfirmationState
	} = actions
	const { startListening, stopListening } = useContext(STTContext)
	const [ openSlots, setOpenSlots ] = useState(null)
	const [voiceDialog, setVoiceDialog] = useState(null)
	const [initialSlotLength, setInitialSlotLength] = useState(0)
	const [triggerVoiceDialogUpdate, forceTriggerDialogUpdate] = useState(false)
	const [triggerTurnUpdate, forceTriggerTurnUpdate] = useState(false)
	const [micCalloutState, isMicCalloutActive] = useState(false)
	let _labelId = getId('callout-label');
	let _descriptionId = getId('callout-description');

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

	//after LUIS is done, check to see what entities were gathered
	useEffect(() => {
		console.log("LUIS RESPONSE")
		console.log(luisResponse)
		if (luisResponse) {
			setVoiceDialog(SkillRenderer({ ...typesObject }, skillCreatorDialog))

			// force a re-render of voiceDialog so that we can move on to next useEffect
			forceTriggerDialogUpdate(!triggerVoiceDialogUpdate)
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
		console.log({ voiceDialog, repromptTurn, openSlots })
		if (repromptTurn !== 0) {
			// if (openSlots.length > 0) {
			// 	setCortanaResponse(openSlots[0].prompt.ttsString)
			// 	if (openSlots[0].freeform === true) {
			// 		setFreeformTextState(true);
			// 		tts.speak(
			// 			openSlots[0].prompt.ttsString,
			// 			ttsVoice,
			// 			function () {
			// 				startListening(actions)
			// 			});
			// 	} else {
			// 		setCortanaResponse(openSlots[0].prompt.ttsString)
			// 		tts.speak(
			// 			repromptTurn > 1 ? openSlots[0].reprompt.ttsString : openSlots[0].prompt.ttsString,
			// 			ttsVoice,
			// 			() => {
			// 				setInitialSlotLength(openSlots.length);
			// 				startListening(actions);
			// 			})
			// 	}
			// }
			if (voiceDialog && repromptTurn < voiceDialog.length - 3) {
				setCortanaResponse(voiceDialog[repromptTurn].prompt.ttsString)
				if (openSlots[0].freeform === true) {
					setFreeformTextState(true);
					tts.speak(
						openSlots[0].prompt.ttsString,
						ttsVoice,
						function () {
							startListening(actions)
						});
				} else {
					setCortanaResponse(openSlots[0].prompt.ttsString)
					tts.speak(
						repromptTurn > 1 ? openSlots[0].reprompt.ttsString : openSlots[0].prompt.ttsString,
						ttsVoice,
						() => {
							setInitialSlotLength(openSlots.length);
							startListening(actions);
						})
				}
			}
			else if (voiceDialog && voiceDialog[voiceDialog.length - 2].entity === "Summary" && confirmationState === false) {
				setCortanaResponse(voiceDialog[voiceDialog.length - 2].prompt.ttsString);
				tts.speak(
					voiceDialog[voiceDialog.length - 2].prompt.ttsString,
					ttsVoice,
					function () {
						setConfirmationState(true)
						startListening(actions)
					})
			}
			else if (voiceDialog && voiceDialog[voiceDialog.length - 1].entity === "Rollup") {
				setCortanaResponse(voiceDialog[voiceDialog.length - 1].prompt.ttsString)
				tts.speak(
					voiceDialog[voiceDialog.length - 1].prompt.ttsString,
					ttsVoice,
					function () {

					})
			}
		}
	}, [triggerTurnUpdate]);
	
	const openMicrophone = () => {
		isMicCalloutActive(false);
		startListening(actions);
	}

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

	function renderTips() {
		let { tipsString } = voiceDialog[repromptTurn].prompt
		let tips = tipsString.split(', ')

		return tips.map((tip, i) => {
			return (
				<Tip key={ 'tip-' + i }>{ tip }</Tip>
			)
		})
	}
		
	return (
		<Container>
			<AvatarWrapper>
				<Avatar>
					<OuterCircle />
					<InnerCircle />
				</Avatar>
			</AvatarWrapper>
			<CortanaResponse className={ isMicOpen && !userHypothesis ? 'listening' : '' }>{ cortanaResponse }</CortanaResponse>
			<Tips>
				{ voiceDialog && repromptTurn && voiceDialog[repromptTurn].prompt.tipsString ? renderTips() : null }
			</Tips>
			<Hypothesis>
				{ isMicOpen && userHypothesis }
			</Hypothesis>
			<Controls>
				{ isMicOpen ?
					<SpeechAnimation />
					:
					<Icon id="micButton" iconName="Microphone" className="cortanaPanel-micButton" onClick={() => openMicrophone()} /> }
			</Controls>
			{ micCalloutState && voiceDialog.length > 0 &&
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

					To begin, click the microphone and say, <strong>"{voiceDialog && voiceDialog[0].prompt.guiString}"</strong>

				</Callout>
			}
		</Container>
	)
}

export default CortanaPanelEyesOff

const animateCalm = keyframes`
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.05);
	}
	100% {
		transform: scale(1);
	}
`

const Container = styled.div`
	position: absolute;
	bottom: 0;
	background: white;
	width: 100%;
	height: 500px;
	display: flex;
	align-items: center;
	flex-direction: column;
	border-radius: 16px 16px 0 0;
	box-shadow: 3px 3px 15px 4px rgba(0,0,0,0.14);
`

const AvatarWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 40px 0 12px;
`

const Avatar = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 120px;
	width: 120px;
	animation-timing-function: ease-in-out;

	.calm {
		animation-name: ${ animateCalm };
	}
`

const InnerCircle = styled.div`
	position: absolute;
	width: 94px;
	height: 94px;
	border: #0078D4 solid 7px;
	border-radius: 50% 50%;
	background-color: white;
	z-index: 2;
	animation-delay: 150ms;
`

const OuterCircle = styled.div`
	position: absolute;
	width: 110px;
	height: 110px;
	background-color: #0078D4;
	border-radius: 50% 50%;
	opacity: 0.3;
	z-index: 1;
`

const CortanaResponse = styled.div`
	font-weight: ${FontWeights.semibold};
	margin: 12px 0 0 0;
	padding: 0 12px;
	text-align: center;
	width: 100%;

	&.listening {
		opacity: 0.4;
	}
`

const Tips = styled.div`
	flex: 1;
	padding: 12px;
	display: flex;
	flex-direction: column;
	align-content: center;
`

const Tip = styled.div`
	color: rgba(69, 69, 69, 0.55);
	text-align: center;
	font-size: 12px;
`

const Hypothesis = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;	
	font-size: ${FontSizes.size12};
	padding: 0 12px;
`

const Controls = styled.div`
	width: 100%;
	padding: 20px 0 30px;
	display: flex;
	align-items: center;
	justify-content: center;
`