import React, { createContext, useEffect, useState } from 'react'
import * as _ from 'underscore'

import defaultDialog from '../skills/defaultDialog'
import sendMessage from '../skills/sendMessage'

export const SkillBuilderContext = createContext()

const SkillBuilderContextProvider = (props) => {
	const [ currentEntitySelection, setCurrentEntitySelection ] = useState("")
	const [ dialog, setDialog ] = useState([])
	const [ creationCanvasState, setCreationCanvasState ] = useState("landing")
	const [ selectedEntityIndex, setSelectedEntityIndex ] = useState(null)
	const [ demoReset, toggleDemoReset ] = useState(false)
	const [ isEyesOff, setIsEyesOff ] = useState(true)
	const [ currentStep, setCurrentStep  ] = useState('landing')
	const [ showFlow, setShowFlow ] = useState(false)
	const [ currentContent, setCurrentContent ] = useState(null)
	const [ showEmulator, setShowEmulator ] = useState(false)
	const [ errorMessage, setErrorMessage ] = useState(null)
	const [ skillBuilderData, setSkillBuilderData ] = useState(null)

	// This is the JSON object that the user starts out with and slowly edits and adds to over time.
	// TODO: Find a better place for this

	useEffect(() => {
		let query = window.location.search
		let params = new URLSearchParams(query)
		let skillName = params.get('skill')
		console.log({ query, skillName })
		if (skillName) {			
			setCurrentStep('intent')
			setShowFlow(true)
			setSelectedEntityIndex(0)
		}

		switch (skillName) {
			case 'sendMessage':
				setDialog(sendMessage)
				break
			default:
				setDialog(defaultDialog)
				break
		}
	}, [])

	const addEntity = (entity) => {
		let newDialog = dialog
		newDialog.splice(dialog.length - 2, 0, entity)
		console.log({ newDialog })
		setDialog([...newDialog])
	}

	const updateEntity = (entity, index) => {
		let newDialog = dialog
		newDialog.splice(index, 1, entity)
		console.log({ newDialog, index, entity })
		setDialog([...newDialog])
	}

	const deleteEntity = (index) => {
		let newDialog = dialog
		newDialog.splice(index, 1)
		console.log({ newDialog, index })
		setDialog([...newDialog])
		setSelectedEntityIndex(0)
	}

	const moveEntity = (from, to) => {
		let newDialog = dialog
		let thisSlot = newDialog[from]
		let replacingSlot = newDialog[to]
		newDialog.splice(to, 1, thisSlot)
		newDialog.splice(from, 1, replacingSlot)
		// console.log({ newDialog, from, to })
		setDialog([...newDialog])
	}

	const isDialogComplete = (showErrors) => {		
		if (dialog[0].userResponse.length === 0) {
			if (showErrors) {
				setSelectedEntityIndex(0)
				setErrorMessage("This field is required.")
			}
			return false
		}

		for (let i = 1; i < dialog.length; i++) {
			if (dialog[i].prompt.guiString.length === 0 || dialog[i].prompt.ttsString.length === 0) {
				if (showErrors) {
					console.log('found error on index: ' + i)
					setSelectedEntityIndex(i)
					setErrorMessage("This field is required.")
				}
				return false
			}
		}
		
		return true
	}

	const entityTypes = [
		{ key: 'person', text: 'Person' },
		{ key: 'datetime', text: 'Time or Date' },
		{ key: 'duration', text: 'Duration' },
		{ key: 'place', text: 'Place' },
		{ key: 'text', text: 'Text' },
		{ key: 'number', text: 'Number' },
		{ key: 'service', text: 'Service' },
		{ key: 'device', text: 'Device Type' }
	]

	const content = [
		{
			name: 'landing',
			title: 'Welcome to the skill builder',
			description: 'Do you have a cool idea for a new skill in Cortana? Do you want to play around with patterns? Then this is the place for you!',
			buttonText: 'Get started',
			imageUrl: './assets/illustrations/woman-speech-bubbles.svg',
			skipDialogChange: true,
			action: () => {
				setCurrentStep('overview')
				setShowFlow(true)
			},
		},
		{
			name: 'overview',
			subheader: 'Before we begin...',
			title: 'An overview of the skill builder',
			list: [
				'Your customer tells Cortana what they want',
				'Cortana asks clarifying questions',
				'The customer confirms their choices',
				'Cortana completes the task'
			],
			buttonText: 'NEXT STEP: INTENT ➜',
			imageUrl: './assets/illustrations/man-laptop-headset.svg',
			skipDialogChange: true,
			action: () => {
				setCurrentStep('intent')
			}
		},
		{
			name: 'intent',
			subheader: "Let's get started",
			title: 'What is your customer trying to do?',
			fields: [
				{
					type: 'text',
					label: 'Intent',
					placeholder: 'Send a message',
					required: true,
					caption: 'What you write here will also be the utterance that initiates your scenario - try to keep it simple.'
				}
			],
			buttonText: 'NEXT STEP: ASK ➜',
			imageUrl: './assets/illustrations/woman-gardening.svg',
			action: () => {
				setCurrentStep('entity')
			}
		},
		{
			name: 'entity',
			subheader: "Defining the task",
			title: 'What type of information do you need to gather?',
			fields: [
				{
					type: 'dropdown',
					placeholder: 'Select an option',
					required: true,
					options: entityTypes,
					caption: 'What you write here will also be the utterance that initiates your scenario - try to keep it simple.'
				}
			],
			buttonText: 'NEXT STEP: ASK ➜',
			imageUrl: './assets/illustrations/man-papers.svg',
			action: () => {
				setCurrentStep('ask')
			}
		},
		{
			name: 'ask',
			subheader: "Ask",
			title: "How do you want Cortana to ask the user?",
			fields: [
				{
					type: 'spokenPrompt',
					label: 'Spoken prompt',
					placeholder: "Who do you want to message?",
					required: true,
					caption: null
				},{
					type: 'displayPrompt',
					label: 'Display prompt',
					placeholder: "Who do you want to message?",
					required: true,
					caption: null
				}
			],
			buttonText: 'SAVE CHANGES ➜',
			imageUrl: './assets/illustrations/woman-driving.svg',
			action: () => {
				setCurrentStep('entity')
			}
		},
		{
			name: 'confirm',
			subheader: "Summary",
			title: "How do you want Cortana to confirm with the user?",
			fields: [
				{
					type: 'spokenPrompt',
					label: 'Spoken prompt',
					placeholder: "Do you want to send the message?",
					required: true,
					caption: null
				},{
					type: 'displayPrompt',
					label: 'Display prompt',
					placeholder: "Do you want to send the message?",
					required: true,
					caption: null
				}
			],
			buttonText: 'SAVE CHANGES ➜',
			imageUrl: './assets/illustrations/man-laptop-headset.svg',
			action: () => {
				setCurrentStep('success')
			}
		},
		{
			name: 'success',
			subheader: "Success",
			title: "How do you want to wrap things up with the user?",
			fields: [
				{
					type: 'spokenPrompt',
					label: 'Spoken prompt',
					placeholder: "Message sent.",
					required: true,
					caption: null
				},{
					type: 'displayPrompt',
					label: 'Display prompt',
					placeholder: "I've sent the message.",
					required: true,
					caption: null
				}
			],
			buttonText: 'SAVE CHANGES ➜',
			imageUrl: './assets/illustrations/dog-holding-leash.svg',
			action: () => {
				setCurrentStep('startEmulator')
			}
		},
		{
			name: 'startEmulator',
			subheader: "Done!",
			title: "Your new skill is ready to try out in the emulator",
			buttonText: 'RENDER IN EMULATOR ➜',
			imageUrl: './assets/illustrations/man-walking-dog.svg',
			caption: "Or you can still make changes below. Just tap the 'Render in emulator' button when you're ready.",
			action: () => {
				
			}
		}
	]

	return (
		<SkillBuilderContext.Provider value={{
			currentEntitySelection, setCurrentEntitySelection,
			dialog, setDialog,
			creationCanvasState, setCreationCanvasState,
			selectedEntityIndex, setSelectedEntityIndex,
			demoReset, toggleDemoReset,
			isEyesOff, setIsEyesOff,
			currentStep, setCurrentStep,
			showFlow, setShowFlow,
			currentContent, setCurrentContent,
			showEmulator, setShowEmulator,
			errorMessage, setErrorMessage,
			addEntity,
			updateEntity,
			deleteEntity,
			moveEntity,
			content,
			isDialogComplete,
			skillBuilderData
		}}>
			{ props.children }
		</SkillBuilderContext.Provider>
	)
}

export default SkillBuilderContextProvider
