import React, { useContext, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

import { STTContext } from '../../../../contexts/STTContext'
import TextToSpeech from '../../../../utils/TextToSpeech'

const EmulatorVoicePanel = ({ actions }) => {	
	let tts = new TextToSpeech(process.env.ACCESS_TOKEN)
	let { startListening, stopListening } = useContext(STTContext)
	let { isMicOn, utterance, hypothesis, setHypothesis, cortanaResponse, dialog, currentDialogIndex, setCurrentDialogIndex, ttsVoice, setCortanaResponse, setUtterance, setDialog, showSummary, setShowSummary, resetEmulator } = actions
	const previous = usePrevious({ currentDialogIndex })

	useEffect(() => {
		if (currentDialogIndex <= dialog.length - 1) {
			let currentPrompt = dialog[currentDialogIndex].prompt
			if (currentPrompt) {
				if (dialog[currentDialogIndex - 1] && dialog[currentDialogIndex - 1].type === 'Ask' && utterance) {
					let updatedDialog = dialog
					updatedDialog[currentDialogIndex - 1].userResponse = utterance
					setDialog(updatedDialog)
				}
				setCortanaResponse(currentPrompt.guiString)
				tts.speak(currentPrompt.ttsString, ttsVoice, () => {
					if (currentDialogIndex < dialog.length - 1) {
						startListening(actions, true, true)
						setUtterance(null)
					}
				})
			} 

			// show summary after intent
			if (currentDialogIndex === 1) {	setShowSummary(true) }
			
			if (currentDialogIndex === dialog.length - 1) { // show rollup at the end
				setCortanaResponse(null)
				setUtterance(null)
				setHypothesis(null)
			}
		}
	}, [ currentDialogIndex ])

	function handleMicrophoneClick() {
		if (isMicOn) {
			stopListening(actions)
			resetEmulator()
		} else {
			setShowSummary(false)
			startListening(actions, true, true)
		}
		setCurrentDialogIndex(0)
	}
	
	function usePrevious(value) {
		const ref = useRef();
		useEffect(() => {
			ref.current = value;
		});
		return ref.current;
	}

	function renderSummary() {
		return dialog.map((slot, i) => {
			if (slot.type === 'Ask' && i <= currentDialogIndex) {
				console.log({ i, currentDialogIndex })
				
				return (
					<SummarySlot key={ 'slot' + i }>
						<h4 className='animateIn waitABit'>{ slot.prompt.guiString }</h4>
						{ slot.userResponse.length > 0 && <div className={ 'animateIn' }>{ slot.userResponse }</div> }
					</SummarySlot>
				)
			}
		})
	}

	return (
		<Container showSummary={ showSummary }>
			{ showSummary &&
				<Summary>
					<SummaryIntent>{ dialog[0].userResponse }</SummaryIntent>
					{ renderSummary() }
				</Summary>
			}
			<Content>
				<CortanaResponse>{ cortanaResponse ? cortanaResponse : 'What do you want me to do?' }</CortanaResponse>
				<UserInput>
					{ utterance && <Utterance>{ utterance }</Utterance> }
					{ hypothesis && <Hypothesis>{ hypothesis }</Hypothesis> }
				</UserInput>
				<Microphone 
					isMicOn={ isMicOn }
					classNames={ isMicOn ? 'micOn' : 'micOff' }
					onClick={ () => handleMicrophoneClick() }>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
						<path d="M704 1344q-38 0-73-15t-61-42-42-62-16-73V192q0-38 15-73t42-61 62-42 73-16h512q35 0 67 13t58 37 40 55 15 67v490q0 243-1 490 0 38-15 73t-42 61-62 42-73 16H704zm832-448h192v346q0 86-33 163t-91 134-135 91-163 34h-244v192h218v192H640v-192h217v-192H601q-84 0-160-34t-135-93-92-135-35-160V896h205v320q0 53 20 99t55 82 81 55 100 20h640q53 0 99-20t82-55 55-81 20-100V896z" />
					</svg>
				</Microphone>
			</Content>
		</Container>
	)
}

export default EmulatorVoicePanel

const animateIn = keyframes`
	0% {
		transform: translateY(20px);
		opacity: 0;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
`

const Container = styled.div`
	width: 100%;
	height: ${ p => p.showSummary ? '90%' : '200px' };
	background: #fff;
	color: #000;
	bottom: 0;
	position: absolute;
	border-radius: 14px;
	display: flex;
	flex-direction: column;
	align-items: center;
	transition: height 250ms ease-in-out;
	/* justify-content: center; */
`

const Content = styled.div`
	width: 100%;
	height: 200px;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #000;
`

const CortanaResponse = styled.div`
	width: 100%;
	padding: 24px 24px 12px 24px;
	font-family: "Segoe UI Semibold", sans-serif;
	font-size: 18px;
`

const UserInput = styled.div`
	flex: 1;
	padding: 12px 24px;
`

const Utterance = styled.div`

`

const Hypothesis = styled.div`
	color: #797775;
`

const Summary = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	padding: 12px 24px;
	width: 100%;
	flex: 1;
`

const SummaryIntent = styled.h3`
	animation: ${ animateIn } 250ms ease-in-out;
	animation-delay: 300ms;
	animation-fill-mode: forwards;
	opacity: 0;
`

const SummarySlot = styled.div`

	.animateIn {
		animation: ${ animateIn } 250ms ease-in-out;
		animation-delay: 300ms;
		animation-fill-mode: forwards;
		opacity: 0;

		&.waitABit {
			animation-delay: 600ms;
		}
	}
`

const Microphone = styled.div`
	width: 50px;
	height: 50px;
	margin: 24px auto;
	border-radius: 25px;
	background-color: ${ p => p.isMicOn ? '#CA83FC' : '#fff' };
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		fill: ${ p => p.isMicOn ? '#fff' : '#CA83FC' };
		height: 24px;
		width: 24px;
	}

	&.micOn {
		background-color: #fff;

		svg { fill: #CA83FC; }
	}
`