import React, {createContext, useState } from 'react'

export const EmulatorContext = createContext()

const EmulatorContextProvider = (props) => {
	let originalDialog = props.dialog
	let [ dialog, setDialog ] = useState(props.dialog)
	let [ isMicOn, setIsMicOn ] = useState(false)
	let [ cortanaResponse, setCortanaResponse ] = useState(null)
	let [ utterance, setUtterance ] = useState(null)
	let [ hypothesis, setHypothesis ] = useState(null)
	let [ currentDialogIndex, setCurrentDialogIndex ] = useState(0)
	let [ ttsVoice, setTTSVoice ] = useState("Microsoft Server Speech Text to Speech Voice (en-US, EvaNeural)")
	let [ showSummary, setShowSummary ] = useState(false)

	const resetEmulator = () => {
		setCortanaResponse(null)
		setUtterance(null)
		setHypothesis(null)
		setCurrentDialogIndex(0)
		setShowSummary(false)
		setIsMicOn(false)
		setDialog(originalDialog)
	}

	const ttsVoiceOptions = [
		{
			key: 'Microsoft Server Speech Text to Speech Voice (en-US, EvaNeural)',
			text: 'Eva (neural) - Microsoft'
		},
		{
			key: 'Microsoft Server Speech Text to Speech Voice (en-US, EvanNeural)',
			text: 'Evan (neural) - Microsoft'
		}
	];

	return (
		<EmulatorContext.Provider value={{
			isMicOn, setIsMicOn,
			cortanaResponse, setCortanaResponse,
			utterance, setUtterance,
			hypothesis, setHypothesis, 
			currentDialogIndex, setCurrentDialogIndex,
			ttsVoice, setTTSVoice, ttsVoiceOptions,
			dialog, setDialog,
			showSummary, setShowSummary,
			resetEmulator, 
		}}>
			{ props.children }
		</EmulatorContext.Provider>
	)
}

export default EmulatorContextProvider
