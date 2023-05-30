import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import classNames from 'classnames'

const SkillBuilderContent = ({ data, error }) => {
	const { currentContent, dialog, addEntity, updateEntity, selectedEntityIndex, setCurrentStep, setSelectedEntityIndex, errorMessage, setErrorMessage, isDialogComplete, setShowEmulator } = data
	const { name, subheader, title, description, list, buttonText, showCancel, fields, skipDialogChange } = currentContent
	const [ shouldAnimateIn, setShouldAnimateIn ] = useState(false)
	const [ shouldAnimateOut, setShouldAnimateOut ] = useState(false)
	const [ intentFieldValue, setIntentFieldValue ] = useState('')
	const [ ttsPromptValue, setTTSPromptValue ] = useState('')
	const [ guiPromptValue, setGUIPromptValue ] = useState('')
	const [ entityTypeValue, setEntityTypeValue ] = useState(null)

	let emptyEntity = {
		entity: "",
		type: "",
		freeform: false,
		userResponse: "",
		defaultUserResponse: "",
		properties: {
			required: false,
			label: "",
			defaultValue: ""
		},
		prompt: {
			guiString: "",
			ttsString: ""
		},
		reprompt: {
			guiString: "",
			ttsString: ""
		},
	}
	
	useEffect(() => {
		setShouldAnimateIn(true)
	}, [currentContent])

	useEffect(() => {
		if (selectedEntityIndex === dialog.length - 1) {
			setGUIPromptValue(dialog[selectedEntityIndex].prompt.guiString)
			setTTSPromptValue(dialog[selectedEntityIndex].prompt.ttsString)
			setCurrentStep('success')
		} else if (selectedEntityIndex === dialog.length - 2) {
			setGUIPromptValue(dialog[selectedEntityIndex].prompt.guiString)
			setTTSPromptValue(dialog[selectedEntityIndex].prompt.ttsString)
			setCurrentStep('confirm')
		} else if (selectedEntityIndex === 0) {
			setCurrentStep('intent')
			setIntentFieldValue(dialog[selectedEntityIndex].userResponse)
		} else if (selectedEntityIndex) {
			setGUIPromptValue(dialog[selectedEntityIndex].prompt.guiString)
			setTTSPromptValue(dialog[selectedEntityIndex].prompt.ttsString)
			setCurrentStep('ask')
		}
	}, [selectedEntityIndex])

	let containerClasses = classNames({
		'animateIn': shouldAnimateIn && !shouldAnimateOut,
		'animateOut': shouldAnimateOut
	})

	function updateDialog() {
		switch (name) {
			case "intent":
				let newIntent = dialog[0]
				newIntent.userResponse = intentFieldValue
				console.log({ newIntent })
				updateEntity(newIntent, 0)
				break
			case "entity":
				let newEntity = emptyEntity
				emptyEntity.entity = entityTypeValue.text
				emptyEntity.type = "Ask"
				console.log({ newEntity })
				addEntity(newEntity, dialog.length - 3)
				clearFieldValues()
				break
			case 'ask':
				let thisEntity = dialog[selectedEntityIndex ? selectedEntityIndex : dialog.length - 3]
				thisEntity.prompt.guiString = guiPromptValue
				thisEntity.prompt.ttsString = ttsPromptValue
				console.log({ thisEntity })
				updateEntity(thisEntity, selectedEntityIndex ? selectedEntityIndex : dialog.length - 3)
				clearFieldValues()
				break
			case 'confirm':
				let confirmEntity = dialog[dialog.length - 2]
				confirmEntity.prompt.guiString = guiPromptValue
				confirmEntity.prompt.ttsString = ttsPromptValue
				console.log({ confirmEntity })
				updateEntity(confirmEntity, dialog.length - 2)
				clearFieldValues()
				break
			case 'success':
				let successEntity = dialog[dialog.length - 1]
				successEntity.prompt.guiString = guiPromptValue
				successEntity.prompt.ttsString = ttsPromptValue
				console.log({ successEntity })
				updateEntity(successEntity, dialog.length - 1)
				clearFieldValues()
				break
			case 'startEmulator':
				if (isDialogComplete(true)) {
					setShowEmulator(true)
				}
		}
	}

	function checkPromptValues() {
		if (guiPromptValue.length === 0 || ttsPromptValue.length === 0) {
			setErrorMessage('This field is required.')
			return true
		} else {
			return false
		}
	}

	function checkForErrors() {
		switch (name) {
			case "intent":
				if (intentFieldValue.length === 0) {
					setErrorMessage('This field is required.')
					return true
				}
				break
			case "entity":
				if (!entityTypeValue) {
					setErrorMessage('Please select the type of information you want to gather.')
					return true
				}
				break
			case "ask":
				return checkPromptValues()
			case "confirm":
				return checkPromptValues()
			case "success":
				return checkPromptValues()
			default:
				setErrorMessage(null)
				return false
		}
	}

	function handleButtonClick(action) {
		setErrorMessage(null)
		if (!checkForErrors()) {
			// setShouldAnimateOut(true)
			// setTimeout(() => {
				if (!skipDialogChange) { updateDialog() }
				setShouldAnimateOut(false)
				setShouldAnimateIn(false)
				action()
			// }, 700)
		}		
	}

	function clearFieldValues() {
		setErrorMessage(null)
		setIntentFieldValue("")
		setEntityTypeValue(null)
		setGUIPromptValue("")
		setTTSPromptValue("")
		setSelectedEntityIndex(null)
	}

	function renderFields() {
		return fields.map((field, i) => {
			switch (field.type) {
				case 'text':
					return (
						<TextField
							key={ 'textField' + i }
							className="textField"
							value={ intentFieldValue }
							onChange={ (event) => setIntentFieldValue(event.target.value) }
							label={ field.label }
							placeholder={ field.placeholder }
							required={ field.required }
							description={ field.caption && field.caption }
							errorMessage={ errorMessage && errorMessage }
						/>
					)
				case 'dropdown':
					return (
						<Dropdown
							key={ 'dropdown' + i }
							className="dropdown"
							label={ field.label && field.label }
							placeholder={ field.placeholder }
							required={ field.required }
							options={ field.options }
							selectedKey={ entityTypeValue ? entityTypeValue.key : undefined }
							onChange={ (event, item) => setEntityTypeValue(item) }
							description={ field.caption }
							errorMessage={ errorMessage && errorMessage }
						/>
					)
				case 'spokenPrompt':
					return (
						<TextField
							key={ 'spokenPrompt' + i }
							className="textField"
							value={ ttsPromptValue }
							onChange={ (event) => setTTSPromptValue(event.target.value) }
							label={ field.label }
							placeholder={ field.placeholder }
							required={ field.required }
							description={ field.caption && field.caption }
							errorMessage={ errorMessage && errorMessage }
						/>
					)
				case 'displayPrompt':
					return (
						<TextField
							key={ 'displayPrompt' + i }
							className="textField"
							value={ guiPromptValue }
							onChange={ (event) => setGUIPromptValue(event.target.value) }
							label={ field.label }
							placeholder={ field.placeholder }
							required={ field.required }
							description={ field.caption && field.caption }
							errorMessage={ errorMessage && errorMessage }
						/>
					)
				default:
					return null;
			}
			
		})
	}

	return (
		<Container className={ containerClasses }>
			{ subheader && <Subheader>{ subheader }</Subheader> }
			<Title>{ title }</Title>
			{ description && <Description>{ description }</Description> }
			{ list && 
				<List>
					{ list.map((item, i) => 
						<Item key={'list' + i }>
							<Bullet>{ i + 1 }</Bullet>
							{ item }
						</Item> )}
				</List> }
			{ fields && renderFields() }
			<Actions>
				{ showCancel && <Button className="cancel">Cancel</Button> }
				<Button onClick={ () => handleButtonClick(currentContent.action) }>{ buttonText }</Button>
			</Actions>
		</Container>
	)
}

export default SkillBuilderContent

const animateInDown = keyframes`
	0% { 
		transform: translateY(-50px); 
		opacity: 0;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
`

const animateOutUp = keyframes`
	0% { 
		transform: translateY(0); 
		opacity: 1;
	}
	100% {
		transform: translateY(50px);
		opacity: 0;
	}
`

const Container = styled.div`
	width: 50%;
	flex: 1;
	padding: 0 24px 0 24px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	z-index: 20;
	/* animation: ${ animateInDown } 650ms cubic-bezier(.04, .69, .38, 1);
	animation-fill-mode: forwards; */
	opacity: 0;
	transform: translateY(-50px);
	transition: transform 350ms cubic-bezier(.04, .69, .38, 1), opacity 350ms cubic-bezier(.04, .69, .38, 1);

	&.animateIn {
		opacity: 1;
		transform: translateY(0);
	}

	&.animateOut {
		opacity: 0;
		transform: translateY(50px);
	}

	.textField, .dropdown {
		max-width: 80%;
		margin-bottom: 24px;
	}
`

const Subheader = styled.h2`
	margin: 0 0 12px 0;
`

const Title = styled.h1`
	margin: 0 0 20px 0;
`

const Description = styled.div`

`

const Actions = styled.div`
	display: flex;
	align-items: center;
	margin-top: 24px;
`

const Button = styled.div`
	font-size: 16px;
	font-family: 'Segoe UI Semibold', sans-serif;
	font-weight: 600;
	text-align: center;
	cursor: pointer;
	padding: 0 16px;
	height: 48px;
	background-color: #CA83FC;
	color: #000;
	border-radius: 24px;
	text-transform: uppercase;
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 180px;

	&:hover {

	}
`

const List = styled.div`

`

const Item = styled.div`
	display: flex;
	align-items: center;
	margin-top: 12px;
`

const Bullet = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 36px;
	width: 36px;
	background: #CA83FC;
	border-radius: 50%;
	color: #000;
	margin-right: 12px;
	font-weight: 600;
`