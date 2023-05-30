import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { getTheme, DefaultButton, PrimaryButton, Link } from 'office-ui-fabric-react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType'
import { FontWeights } from '@uifabric/styling'
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown'
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'
import { VoicePatternsContext } from './../../../../contexts/VoiceContextProvider'
import { ControlsStylingContext } from './../../../../contexts/ControlsStylingProvider'
import * as _ from 'underscore'

//This component houses the canvas that sits above the creation bar, including all skill creation screens.
//TO-DO: componentize this better so it's not such a large file.
const BlueprintLanding = (props) => {
	const theme = getTheme();
	const {
		setLandingPageDialog,
		skillCreatorDialog,
		setSkillCreatorDialog,
		setCurrentEntitySelection,
		currentEntitySelection,
		setCreationBarState,
		currentWizardScreen,
		setWizardScreen,
		setRendererOverlayState,
		setTypeIntent,
		typeIntent,
		setTypeName,
		typeName,
		setTypeTimeDate,
		typeTimeDate,
		setTypeDuration,
		typeDuration,
		setTypeLocation,
		typeLocation,
		setTypeMessage,
		typeMessage,
		setTypeNumber,
		typeNumber,
		setTypeService,
		typeService,
		setTypeDeviceType,
		typeDeviceType,
		setTypeConfirm,
		typeConfirm,
		setConfirmationState,
		setTypeSuccess,
		typeSuccess,
		setUserResponse,
		setUserHypothesis,
		setLuisResponse,
		setRepromptTurn,
		setSelectedEntityIndex,
		setCortanaResponse,
		selectedEntityIndex,
		pushNewEntity,
		editExistingEntity,
		isEyesOff,
		setIsEyesOff,
		setIsMicOpen
	} = useContext(VoicePatternsContext);

	const {
		primaryButtonStyle,
		secondaryButtonStyle,
		textfieldStyle,
		dropdownStyle
	} = useContext(ControlsStylingContext);

	const [labelTextfieldState, setLabelTextfieldState] = useState("");
	const [dialogTextfieldState, setDialogTextfieldState] = useState("");
	const [heroImageURL, setHeroImageURL] = useState("./assets/blueprintLanding-1.svg");
	const [wizardAnimationState, setWizardAnimationState] = useState(true);
	const [wizardContent, changeWizardContent] = useState("landing");
	const [imageLoadState, setImageLoadState] = useState(false);
	const [promptGUITextfieldState, setPromptGUITextfieldState] = useState("");
	const [promptTTSTextfieldState, setPromptTTSTextfieldState] = useState("");
	const [promptTipsTextfieldState, setPromptTipsTextfieldState] = useState("");
	const [defaultValueTextfieldState, setDefaultValueTextfieldState] = useState("");
	const [repromptGUITextfieldState, setRepromptGUITextfieldState] = useState("");
	const [repromptTTSTextfieldState, setRepromptTTSTextfieldState] = useState("");
	const [defaultToggleState, setDefaultToggleState] = useState(false);

	//Change all the data in the fields based on the selected index in the creation bar.
	useEffect(() => {
		if (selectedEntityIndex < skillCreatorDialog.length) {
			setLabelTextfieldState(skillCreatorDialog[selectedEntityIndex].properties.label);
			setDefaultValueTextfieldState(skillCreatorDialog[selectedEntityIndex].properties.defaultValue);
			setPromptGUITextfieldState(skillCreatorDialog[selectedEntityIndex].prompt.guiString);
			setPromptTTSTextfieldState(skillCreatorDialog[selectedEntityIndex].prompt.ttsString);
			setPromptTipsTextfieldState(skillCreatorDialog[selectedEntityIndex].prompt.tips);
			setRepromptGUITextfieldState(skillCreatorDialog[selectedEntityIndex].reprompt.guiString);
			setRepromptTTSTextfieldState(skillCreatorDialog[selectedEntityIndex].reprompt.ttsString);
		}
	}, [selectedEntityIndex]);

	//On mount, find out whether the "default response" field has previously been checked or not.
	useEffect(() => {
		if (defaultValueTextfieldState !== "") {
			setDefaultToggleState(true)
		}
		else {
			setDefaultToggleState(false)
		}

	}, [defaultValueTextfieldState]);

	//When the "default response" checkbox is checked, reset the prompt fields.
	const handleRequiredToggle = (ev, checked) => {
		if (checked) {
			setDefaultToggleState(true);
			setPromptGUITextfieldState("");
			setPromptTTSTextfieldState("");
		}
		else {
			setDefaultToggleState(false);
			setDefaultValueTextfieldState("");
		}
	}

	//Toggles EyesOff UI in emulator
	const handleEyesOffToggle = (ev, checked) => {
		if (checked) {
			setIsEyesOff(true);
		} else {
			setIsEyesOff(false)
		}
	}

	//This is the field that captures the intent (very first field the user fills out)
	const handleDialogTextfield = (ev, text) => {
		setDialogTextfieldState(ev.target.value);
		setLandingPageDialog(ev.target.value);
	}

	//When the wizard screen changes, animate between screens.
	useEffect(() => {
		//Reset trigger that starts animation.
		setWizardAnimationState(false)

		if (currentWizardScreen !== "landing") {
			setWizardAnimationState(true)
			console.log({ currentWizardScreen })
			//After current svg and content is faded out, change to next svg and new content.
			setTimeout(() => {
				renderWizardImage();
				renderWizardScreen();
				changeWizardContent(currentWizardScreen)
				setImageLoadState(false)
			}, 350)
		}
	}, [currentWizardScreen]);

	//Stall the transition animation until the new SVG has loaded.
	useEffect(() => {
		if (imageLoadState === true) {
			setWizardAnimationState(false);
		}
	}, [imageLoadState]);

	//This is the JSON object that the user starts out with and slowly edits and adds to over time.
	let defaultDialog = [
		{
			entity: "Intent",
			type: "Create",
			freeform: false,
			userResponse: typeIntent,
			defaultUserResponse: "",
			properties: {
				required: false,
				label: dialogTextfieldState,
				defaultValue: ""
			},
			prompt: {
				guiString: dialogTextfieldState,
				ttsString: "",
				tipsString: ""
			},
			reprompt: {
				guiString: "",
				ttsString: "",
				tipsString: ""
			},
		},
		{
			entity: "Summary",
			type: "Confirm",
			freeform: false,
			userResponse: typeConfirm,
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
		},
		{
			entity: "Rollup",
			type: "Success",
			freeform: false,
			userResponse: null,
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
	]
	
	let testDialog = [
		{
			entity: "Intent",
			type: "Create",
			freeform: false,
			userResponse: typeIntent,
			defaultUserResponse: "",
			properties: {
				required: false,
				label: dialogTextfieldState,
				defaultValue: ""
			},
			prompt: {
				guiString: "Send a message",
				ttsString: "Send a message",
				tipsString: "Send a message, Send Brian a message"
			},
			reprompt: {
				guiString: "Send a message",
				ttsString: "Send a message",
				tipsString: "Send a message, Send Brian a message"
			},
		},
		{
			entity: "Person",
			type: "Ask",
			freeform: false,
			userResponse: typeConfirm,
			defaultUserResponse: "",
			properties: {
				required: false,
				label: "",
				defaultValue: ""
			},
			prompt: {
				guiString: "Who's the message for?",
				ttsString: "Who's the message for?",
				tipsString: "Linda, Kareem Johnson, my manager"
			},
			reprompt: {
				guiString: "Who's the message for?",
				ttsString: "Who's the message for?",
				tipsString: "Linda, Kareem Johnson, my manager"
			},
		},
		{
			entity: "Text",
			type: "Ask",
			freeform: false,
			userResponse: typeConfirm,
			defaultUserResponse: "",
			properties: {
				required: false,
				label: "",
				defaultValue: ""
			},
			prompt: {
				guiString: "What's your message?",
				ttsString: "What's your message?",
				tipsString: "I'm running late, Call me when you can"
			},
			reprompt: {
				guiString: "What's your message?",
				ttsString: "What's your message?",
				tipsString: "I'm running late, Call me when you can"
			},
		},
		{
			entity: "Summary",
			type: "Confirm",
			freeform: false,
			userResponse: typeConfirm,
			defaultUserResponse: "",
			properties: {
				required: false,
				label: "",
				defaultValue: ""
			},
			prompt: {
				guiString: "Do you want to send it?",
				ttsString: "Do you want to send it?"
			},
			reprompt: {
				guiString: "Do you want to send it?",
				ttsString: "Do you want to send it?"
			},
		},
		{
			entity: "Rollup",
			type: "Success",
			freeform: false,
			userResponse: null,
			defaultUserResponse: "",
			properties: {
				required: false,
				label: "",
				defaultValue: ""
			},
			prompt: {
				guiString: "Message sent.",
				ttsString: "Sent"
			},
			reprompt: {
				guiString: "Message sent.",
				ttsString: "Sent"
			},
		}
	]

	//This is the entity selector at the top of the canvas.
	const handleEntityDropdownSelection = (event, item) => {
		setCurrentEntitySelection(item.key)
	}

	//Handle the very first click in the flow by setting the default dialog and then going to the next step.
	const handleGetStartedClick = () => {
		setWizardScreen("overview");
		setCreationBarState(true);
		setSkillCreatorDialog(defaultDialog)
	}

	//Once user has read overview, take them to the intent capture screen.
	const handleNextStepClick = () => {
		setWizardScreen("captureIntent");
	}

	//Once the intent is captured, set it, then go to the entity selection screen.
	const handleContinueButtonClick = () => {
		setSkillCreatorDialog(defaultDialog)
		setWizardScreen("captureEntity");
	}

	//Once entity type is selected, take user to the prompts screen.
	const handleAddDetailsClick = () => {
		setWizardScreen("capturePrompt");
	}

	//Capture the GUI prompt field text. This is what is shown to the user via GUI text.
	const handlePromptGUITextfield = (ev, text) => {
		setPromptGUITextfieldState(ev.target.value);
	}

	//Capture the TTS prompt field text. This is what is read out to the user via TTS.
	const handlePromptTTSTextfield = (ev, text) => {
		setPromptTTSTextfieldState(ev.target.value);
	}

	//Capture the Tips prompt field text. This is what is shown to the user.
	const handlePromptTipsTextField = (ev, text) => {
		setPromptTipsTextfieldState(ev.target.value);
	}

	//If the default value checkbox is checked, capture the text in the default response checkbox.
	const handleDefaultValueTextfield = (ev, text) => {
		setDefaultValueTextfieldState(ev.target.value);
	}

	//A reset of all captured user responses (NOT the dialog JSON object) so that the user can retry their flow from the beginning.
	const resetEntityTypes = () => {
		setTypeIntent("");
		setTypeName(null);
		setTypeTimeDate(null);
		setTypeDuration(null);
		setTypeLocation(null);
		setTypeMessage(null);
		setTypeNumber(null);
		setTypeService(null);
		setTypeDeviceType(null);
		setTypeConfirm("");
		setConfirmationState(false);
		setTypeSuccess("");
		setUserResponse("");
		setUserHypothesis("");
		setIsMicOpen(false);
		setLuisResponse(null);
		setRepromptTurn(0);
		setCortanaResponse("How can I help?");
	}

	//This starts the emulator where the user can try out their skill. Do a reset first so that the user starts from the beginning.
	const handlePlayButtonClick = () => {
		resetEntityTypes();
		setRendererOverlayState(true);
	}

	//This determines which screen to show in the wizard process.
	const renderWizardScreen = () => {
		let currentScreen;

		//This list shows up only on the overview screen.
		const renderOverviewList = () => {
			let overviewList = [
				{
					text: "Your customer tells Cortana what they want"
				},
				{
					text: "Cortana asks clarifying questions"
				},
				{
					text: "The customer confirms their choices"
				},
				{
					text: "Cortana completes the task"
				}
			]

			return overviewList.map((data, index) => {
				return <div className="blueprintLanding-overviewItem" key={_.uniqueId()}>
					<div className="blueprintLanding-overviewIndex">{index + 1}</div>
					<div className="blueprintLanding-overviewText">{data.text}</div>
				</div>
			})
		}

		//This handles the dynamic link that is placed under the "add new item" screen. Takes the user to the Summary item if requirements are met.
		const handleConfirmationLinkClick = () => {
			setCurrentEntitySelection("Summary");
			setWizardScreen("editExistingSlot");
			setSelectedEntityIndex(skillCreatorDialog.length - 2);
		}

		//This handles the dynamic link that is placed under the "add new item" screen. Takes the user to the Rollup item if requirements are met.
		const handleSuccessLinkClick = () => {
			setCurrentEntitySelection("Rollup");
			setWizardScreen("editExistingSlot");
			setSelectedEntityIndex(skillCreatorDialog.length - 1);
		}

		//Dynamically set the user response based on the currently selected entity.
		const renderUserResponse = (props) => {
			let userResponse;

			switch (currentEntitySelection) {
				case 'Intent':
					userResponse = typeIntent
					break;
				case 'Person':
					userResponse = typeName
					break;
				case 'Time/date':
					userResponse = typeTimeDate
					break;
				case 'Duration':
					userResponse = typeDuration
					break;
				case 'Place':
					userResponse = typeLocation
					break;
				case 'Text':
					userResponse = typeMessage
					break;
				case 'Number':
					userResponse = typeNumber
					break;
				case 'Service':
					userResponse = typeService
					break;
				case 'Device type':
					userResponse = typeDeviceType
					break;
				case 'Summary':
					userResponse = typeConfirm
					break;
				case 'Rollup':
					userResponse = typeSuccess
					break;
				default: break;
			}
			return userResponse;
		}

		//This seems to be deprecated but I'm still including it just in case. Every entity used to have a type associated with it like "ask" or "create" that would link back to the documentation.
		const renderEntityType = () => {
			let entityType;

			switch (currentEntitySelection) {
				case 'Intent':
					entityType = "Create"
					break;
				case 'Person':
					entityType = "Ask"
					break;
				case 'Time/date':
					entityType = "Ask"
					break;
				case 'Duration':
					entityType = "Ask"
					break;
				case 'Place':
					entityType = "Ask"
					break;
				case 'Text':
					entityType = "Ask"
					break;
				case 'Number':
					entityType = "Ask"
					break;
				case 'Service':
					entityType = "Ask"
					break;
				case 'Device type':
					entityType = "Ask"
					break;
				case 'Summary':
					entityType = "Confirm"
					break;
				case 'Rollup':
					entityType = "Success"
					break;
				default: break;
			}
			return entityType;
		}

		const handleCancelClick = () => {
			resetTextfields();

			if (skillCreatorDialog[skillCreatorDialog.length - 2].prompt.guiString !== "" && skillCreatorDialog[skillCreatorDialog.length - 1].prompt.guiString !== "") {
				setWizardScreen("renderBlueprint");
				setCurrentEntitySelection("");
			}
			else {
				setWizardScreen("addNewSlot");
				setCurrentEntitySelection("");
			}
		}

		const handleSaveDetailsClick = () => {
			// event.preventDefault();

			let formEntity = {
				entity: currentEntitySelection,
				type: renderEntityType(),
				freeform: currentEntitySelection === "Text" ? true : false,
				userResponse: renderUserResponse(),
				defaultUserResponse: defaultValueTextfieldState,
				properties: {
					required: false,
					label: labelTextfieldState,
					defaultValue: defaultValueTextfieldState
				},
				prompt: {
					guiString: promptGUITextfieldState,
					ttsString: promptTTSTextfieldState,
					tips: promptTipsTextfieldState
				},
				reprompt: {
					guiString: "Sorry, " + promptGUITextfieldState,
					ttsString: "Sorry, " + promptGUITextfieldState,
					tips: promptTipsTextfieldState
				},
			}

			if (currentWizardScreen === "capturePrompt") {
				pushNewEntity(formEntity)
			}
			else if (currentWizardScreen === 'editExistingSlot') {
				editExistingEntity(formEntity)
			}

			//wait for animation to finish
			setTimeout(() => { resetTextfields(); }, 350)
			//set index to something that will not match current indexes
			setSelectedEntityIndex(100);


			if (skillCreatorDialog[skillCreatorDialog.length - 2].prompt.guiString !== "" && currentEntitySelection === "Rollup") {
				setWizardScreen("renderBlueprint");
				//wait for animation to finish
				setTimeout(() => { setCurrentEntitySelection("") }, 350)
			}
			else {
				setWizardScreen("addNewSlot");
				//wait for animation to finish
				setTimeout(() => { setCurrentEntitySelection("") }, 350)
			}
		}

		const resetTextfields = () => {
			setDefaultValueTextfieldState("");
			setPromptGUITextfieldState("");
			setPromptTTSTextfieldState("");
		}

		//If the user has a selected index in the creation bar that is an intent, Summary, or Rollup entity then disable the ability to change the entity in the entity chooser.
		const optionsDisabled = (key) => {
			if (currentEntitySelection === 'Intent' ||
				currentEntitySelection === 'Summary' ||
				currentEntitySelection === 'Rollup' ||
				_.findWhere(skillCreatorDialog, { entity: key })) {
				return true
			}
			else {
				return false
			}
		}

		const options = [
			{
				key: 'Intent',
				text: 'Intent',
				hidden: true,
				disabled: optionsDisabled("Intent")
			},
			{
				key: 'Person',
				text: 'Person',
				disabled: optionsDisabled("Person")
			},
			{
				key: 'Time/date',
				text: 'Time/date',
				disabled: optionsDisabled("Time/date")
			},
			{
				key: 'Duration',
				text: 'Duration',
				disabled: optionsDisabled("Duration")
			},
			{
				key: 'Place',
				text: 'Place',
				disabled: optionsDisabled("Place")
			},
			{
				key: 'Text',
				text: 'Text',
				disabled: optionsDisabled("Text")
			},
			{
				key: 'Number',
				text: 'Number',
				disabled: optionsDisabled("Number")
			},
			{
				key: 'Service',
				text: 'Service',
				disabled: optionsDisabled("Service")
			},
			{
				key: 'Device type',
				text: 'Device type',
				disabled: optionsDisabled("Device type")
			},
			{
				key: 'Summary',
				text: 'Summary',
				hidden: true,
				disabled: optionsDisabled("Summary")
			},
			{
				key: 'Rollup',
				text: 'Rollup',
				hidden: true,
				disabled: optionsDisabled("Rollup")
			},
		];

		const dropdownStyles = {
			dropdown: {
				fontFamily: "SegoeUI, system-ui",
				width: 200,
			},
			callout: {
				fontFamily: "SegoeUI, system-ui",
			},
			title: {
				display: 'inline-block',
				background: "transparent",
				fontSize: FontSizes.size20,
				color: "#929292",
				border: 0,
				paddingLeft: 0,
				paddingRight: 20
			},
			caretDownWrapper: {
				position: 'relative',
				display: 'inline-block',
				top: -10
			},
			label: {
				opacity: .4
			}
		};

		const renderHintText = () => {
			let hintText;

			switch (currentEntitySelection) {
				case 'Intent':
					hintText = {
						defaultValueHintText: 'Not applicable for an intent entity',
						promptGUIHintText: 'Not applicable for an intent entity',
						promptTTSHintText: 'Not applicable for an intent entity',
					}
					break;
				case 'Person':
					hintText = {
						defaultValueHintText: 'Ex: "No one"',
						promptGUIHintText: 'Ex: "Who would you like to message?"',
						promptTTSHintText: 'Ex: "Who would you like to message?"',
					}
					break;
				case 'Time/date':
					hintText = {
						defaultValueHintText: 'Ex: "5:00pm"',
						promptGUIHintText: 'Ex: "What time would you like to be reminded?"',
						promptTTSHintText: 'Ex: "What time would you like to be reminded?"',
					}
					break;
				case 'Duration':
					hintText = {
						defaultValueHintText: 'Ex: "30 minutes"',
						promptGUIHintText: 'Ex: "How long would you like to set the timer for?"',
						promptTTSHintText: 'Ex: "How long would you like to set the timer for?"',
					}
					break;
				case 'Place':
					hintText = {
						defaultValueHintText: 'Ex: "Home"',
						promptGUIHintText: 'Ex: "Where would you like to be reminded?"',
						promptTTSHintText: 'Ex: "Where would you like to be reminded?"',
					}
					break;
				case 'Text':
					hintText = {
						defaultValueHintText: 'Ex: "See you soon."',
						promptGUIHintText: `Ex: "What's your message?"`,
						promptTTSHintText: `Ex: "What's your message?"`,
					}
					break;
				case 'Number':
					hintText = {
						defaultValueHintText: 'Ex: "10"',
						promptGUIHintText: `Ex: "How many would you like to purchase?"`,
						promptTTSHintText: `Ex: "How many would you like to purchase?"`,
					}
					break;
				case 'Service':
					hintText = {
						defaultValueHintText: 'Ex: "Microsoft Teams"',
						promptGUIHintText: `Ex: "Which app would you like to use?"`,
						promptTTSHintText: `Ex: "Which app would you like to use?"`,
					}
					break;
				case 'Device type':
					hintText = {
						defaultValueHintText: 'Ex: "iPhone"',
						promptGUIHintText: `Ex: "Which device would you like to use?"`,
						promptTTSHintText: `Ex: "Which device would you like to use?"`,
					}
					break;
				case 'Summary':
					hintText = {
						defaultValueHintText: 'Ex: "No"',
						promptGUIHintText: 'Ex: "Should I send your message?"',
						promptTTSHintText: 'Ex: "Should I send your message?"',
					}
					break;
				case 'Rollup':
					hintText = {
						defaultValueHintText: "Not applicable for rollup entity",
						promptGUIHintText: "Not applicable for rollup entity",
						promptTTSHintText: "Not applicable for rollup entity",
					}
					break;
				default: hintText = {
					defaultValueHintText: "",
					promptGUIHintText: "",
					promptTTSHintText: "",
				};
			}
			return hintText;
		}

		switch (wizardContent) {
			case 'landing':
				currentScreen = <div className="blueprintLanding-landingPane">
					<h1 className="blueprintLanding-title">Welcome to the pattern builder</h1>
					<div className="blueprintLanding-description">Do you have a cool idea for a new skill in Cortana? Do you want to play around with patterns? Then this is the place for you!</div>

					<div className="blueprintLanding-actions">
						<PrimaryButton styles={primaryButtonStyle} text="Get started" allowDisabledFocus className="blueprintLanding-primaryButton" onClick={() => handleGetStartedClick()} />
					</div>
				</div>
				break
			case 'overview':
				currentScreen = <div className="blueprintLanding-landingPane">
					<div className="blueprintLanding-subheader">Before we begin...</div>
					<div className="blueprintLanding-title">An overview of the creation pattern</div>
					{renderOverviewList()}
					<PrimaryButton styles={primaryButtonStyle} text="Next step: Intent ➜" allowDisabledFocus className="blueprintLanding-nextStepButton" onClick={() => handleNextStepClick()} />
				</div>
				break
			case 'captureIntent':
				currentScreen = <div className="blueprintLanding-landingPane">
					<div className="blueprintLanding-subheader">Let's get started.</div>
					<div className="blueprintLanding-title">What is your customer trying to do?</div>

					<TextField
						styles={textfieldStyle}
						className="blueprintLanding-textField"
						onChange={handleDialogTextfield}
						value={dialogTextfieldState}
						placeholder="i.e., Send a pizza to Switzerland" />

					<div className="blueprintLanding-textFieldDescription">What you write here will also be the utterance that initiates your scenario - try to keep it simple.</div>				

					<TextField
							styles={textfieldStyle}
							className="blueprintLanding-textField"
							onChange={handlePromptTipsTextField}
							value={promptTipsTextfieldState}
							label="Tips"
							placeholder='Use a comma to separate tips'
							key={"tipstf"} />

					<PrimaryButton
						text="Next step: Ask ➜"
						styles={primaryButtonStyle}
						allowDisabledFocus
						className="blueprintLanding-continueButton"
						onClick={() => handleContinueButtonClick()}
						disabled={!dialogTextfieldState.length > 0} />

				</div>
				break
			case 'captureEntity':
				currentScreen = <div className="blueprintLanding-landingPane">
					<div className="blueprintLanding-subheader">Defining the task</div>
					<div className="blueprintLanding-title">What type of information do you need to gather?</div>

					<Dropdown
						placeholder="Select an option"
						options={options}
						style={{ maxWidth: 300 }}
						styles={dropdownStyle}
						onChange={handleEntityDropdownSelection}
						defaultSelectedKey={currentEntitySelection} />

					<div className="blueprintLanding-textFieldDescription">Don't worry, you can add more later.</div>

					<PrimaryButton
						text="Add the details ➜"
						styles={primaryButtonStyle}
						allowDisabledFocus
						disabled={currentEntitySelection === "" ? true : false}
						className="blueprintLanding-continueButton"
						onClick={() => handleAddDetailsClick()} />

				</div>
				break
			case 'capturePrompt':
				currentScreen = <div className="blueprintLanding-landingPane">
					<Dropdown
						options={options}
						styles={dropdownStyles}
						onChange={handleEntityDropdownSelection}
						defaultSelectedKey={currentEntitySelection} />
					<div className="blueprintLanding-title">How do you want Cortana to ask the user?</div>

					{currentEntitySelection !== "Summary" && currentEntitySelection !== "Rollup" &&
						<Checkbox
							label="Don't ask the user, infer a value for them instead"
							onChange={handleRequiredToggle}
							checked={defaultToggleState}
							onClick={() => setDefaultToggleState(!defaultToggleState)} />
					}

					{defaultToggleState ?
						<TextField
							styles={textfieldStyle}
							className="blueprintLanding-textField"
							onChange={handleDefaultValueTextfield}
							value={defaultValueTextfieldState}
							label="Default input value"
							required
							placeholder={renderHintText().defaultValueHintText} />
						:

						[<TextField
							styles={textfieldStyle}
							className="blueprintLanding-textField"
							onChange={handlePromptTTSTextfield}
							value={promptTTSTextfieldState}
							label="Spoken prompt"
							required
							placeholder={renderHintText().promptTTSHintText}
							key={"ttstf"} />,

						<TextField
							styles={textfieldStyle}
							className="blueprintLanding-textField"
							onChange={handlePromptGUITextfield}
							value={promptGUITextfieldState}
							label="Written prompt"
							required
							placeholder={renderHintText().promptGUIHintText}
							key={"guitf"} />,

						<TextField
							styles={textfieldStyle}
							className="blueprintLanding-textField"
							onChange={handlePromptTipsTextField}
							value={promptTipsTextfieldState}
							label="Tips"
							placeholder={renderHintText().promptTipsHintText}
							key={"tipstf"} />]
					}

					<div>
						<DefaultButton
							style={{ minWidth: 140 }}
							text="CANCEL"
							styles={secondaryButtonStyle}
							allowDisabledFocus
							disabled={currentEntitySelection === "" ? true : false}
							className="blueprintLanding-continueButton"
							onClick={() => handleCancelClick()} />

						<PrimaryButton
							text="SAVE DETAILS ➜"
							style={{ marginLeft: 16 }}
							styles={primaryButtonStyle}
							allowDisabledFocus
							disabled={currentEntitySelection === "" ? true : false}
							className="blueprintLanding-continueButton"
							onClick={() => handleSaveDetailsClick()} />
					</div>
				</div>
				break
			case 'editExistingSlot':
				currentScreen = <div className="blueprintLanding-landingPane">
					{currentEntitySelection === "Intent" ?
						[<div className="blueprintLanding-subheader" key="lgs">Let's get started.</div>,
						<div className="blueprintLanding-title" key="wiyc">What is your customer trying to do?</div>,

						<TextField
							styles={textfieldStyle}
							className="blueprintLanding-textField"
							onChange={handlePromptGUITextfield}
							value={promptGUITextfieldState}
							placeholder={renderHintText().promptGUIHintText}
							required
							placeholder={`"Send a pizza to Switzerland"`}
							key={"guitfj"}
							key="sapts" />,

						<div className="blueprintLanding-textFieldDescription" key="wywh">What you write here will also be the utterance that initiates your scenario - try to keep it simple.</div>,

						<TextField
								styles={textfieldStyle}
								className="blueprintLanding-textField"
								onChange={handlePromptTipsTextField}
								value={promptTipsTextfieldState}
								label="Tips"
								placeholder='Send a message, Remind me to do laundry'
								key={"tipstf"} />,

						<div className="blueprintLanding-textFieldDescription" key="wywh">Separate your tips with a comma. Max. of 3.</div>]
						:

						[<Dropdown
							options={options}
							styles={dropdownStyles}
							onChange={handleEntityDropdownSelection}
							defaultSelectedKey={currentEntitySelection}
							key="uwq" />,
						<div className="blueprintLanding-title" key="bltr">
							{currentEntitySelection !== "Summary" && currentEntitySelection !== "Rollup" && "How do you want Cortana to ask the user?"}

							{currentEntitySelection === "Summary" && "How do you want Cortana to confirm with the user?"}

							{currentEntitySelection === "Rollup" && "How do you want Cortana to tell the user?"}
						</div>,

						currentEntitySelection !== "Summary" && currentEntitySelection !== "Rollup" &&
						<Checkbox
							label="Don't ask the user, infer a value for them instead"
							onChange={handleRequiredToggle}
							checked={defaultToggleState}
							onClick={() => setDefaultToggleState(!defaultToggleState)}
							key="datu" />,

						defaultToggleState ?
							<TextField
								styles={textfieldStyle}
								className="blueprintLanding-textField"
								onChange={handleDefaultValueTextfield}
								value={defaultValueTextfieldState}
								label="Default input value"
								required
								placeholder={renderHintText().defaultValueHintText}
								key="btfl" />
							:
							[<TextField
								styles={textfieldStyle}
								className="blueprintLanding-textField"
								onChange={handlePromptTTSTextfield}
								value={promptTTSTextfieldState}
								label="Spoken prompt"
								placeholder={renderHintText().promptTTSHintText}
								required
								placeholder={`"Who do you want to message?"`}
								key={"ttstf"} />,

							<TextField
								styles={textfieldStyle}
								className="blueprintLanding-textField"
								onChange={handlePromptGUITextfield}
								value={promptGUITextfieldState}
								label="Written prompt"
								placeholder={renderHintText().promptGUIHintText}
								required
								placeholder={`"Who do you want to message?"`}
								key={"guitf"} />,

							<TextField
								styles={textfieldStyle}
								className="blueprintLanding-textField"
								onChange={handlePromptTipsTextField}
								value={promptTipsTextfieldState}
								label="Tips"
								placeholder={ renderHintText().promptTipsHintText }
								key={"tipstf"} />]]}

					<div>
						<DefaultButton
							style={{ minWidth: 124 }}
							text="CANCEL"
							styles={secondaryButtonStyle}
							allowDisabledFocus
							disabled={currentEntitySelection === "" ? true : false}
							className="blueprintLanding-continueButton"
							onClick={() => handleCancelClick()} />

						<PrimaryButton
							style={{ marginLeft: 16 }}
							text="SAVE CHANGES ➜"
							styles={primaryButtonStyle}
							allowDisabledFocus
							disabled={currentEntitySelection === "" ? true : false}
							className="blueprintLanding-continueButton"
							onClick={() => handleSaveDetailsClick()} />
					</div>
				</div>
				break
			case 'addNewSlot':
				currentScreen = <div className="blueprintLanding-landingPane">
					<div className="blueprintLanding-subheader">Defining the task</div>
					<div className="blueprintLanding-title">Do you want to add another slot to your scenario?</div>

					<div className="blueprintLanding-newSlotSubmit">
						<Dropdown
							placeholder="Select an option"
							options={options}
							style={{ minWidth: 300 }}
							styles={dropdownStyle}
							onChange={handleEntityDropdownSelection} />

						<PrimaryButton
							text={<Icon
								iconName="Add"
							/>}
							styles={primaryButtonStyle}
							style={{ maxWidth: 48, minWidth: 0 }}
							allowDisabledFocus
							disabled={currentEntitySelection === "" ? true : false}
							className="blueprintLanding-newSlotButton"
							onClick={() => handleAddDetailsClick()} />
					</div>

					{skillCreatorDialog[skillCreatorDialog.length - 2].prompt.guiString === "" ?
						<div className="blueprintLanding-textFieldDescription">Or, you can fill out the <Link onClick={() => handleConfirmationLinkClick()}>summary component</Link></div>
						:
						<div className="blueprintLanding-textFieldDescription">Or, you can fill out the <Link onClick={() => handleSuccessLinkClick()}>rollup component</Link></div>
					}

				</div>
				break
			case 'renderBlueprint':
				currentScreen = <div className="blueprintLanding-landingPane">
					<div className="blueprintLanding-subheader">Liftoff!</div>
					<div className="blueprintLanding-title">Your new skill is ready to try out in the emulator</div>

					<div className="blueprintLanding-newSlotSubmit">
						<Checkbox 
							label='Use "Eyes Off" UI' 
							checked={ isEyesOff }
							onClick={ () => setDefaultToggleState(!defaultToggleState) }
							onChange={ handleEyesOffToggle } />
						<br />
						<PrimaryButton
							text={<div className="blueprintLanding-buttonIconContainer">RENDER IN EMULATOR <Icon iconName="Play" className="blueprintLanding-playIcon" /></div>}
							styles={primaryButtonStyle}
							allowDisabledFocus
							onClick={() => handlePlayButtonClick()} />
					</div>


					<div className="blueprintLanding-textFieldDescription">Or you can still make changes below. Just tap the 'Render in emulator' button when you're ready.</div>

				</div>
				break
		}

		return currentScreen
	}

	const renderExistingSlotImage = () => {
		if (currentEntitySelection === "Summary") {
			return "./assets/blueprintLanding-7.svg"
		}
		else if (currentEntitySelection === "Rollup") {
			return "./assets/blueprintLanding-8.svg"
		}
		else {
			return "./assets/blueprintLanding-5.svg"
		}
	}

	const renderWizardImage = () => {
		let currentImage;

		switch (currentWizardScreen) {
			case 'landing':
				currentImage = "./assets/blueprintLanding-1.svg"
				break
			case 'overview':
				currentImage = "./assets/blueprintLanding-2.svg"
				break
			case 'captureIntent':
				currentImage = "./assets/blueprintLanding-3.svg"
				break
			case 'captureEntity':
				currentImage = "./assets/blueprintLanding-4.svg"
				break
			case 'capturePrompt':
				currentImage = "./assets/blueprintLanding-5.svg"
				break
			case 'editExistingSlot':
				currentImage = renderExistingSlotImage()
				break
			case 'addNewSlot':
				currentImage = "./assets/blueprintLanding-6.svg"
				break
			case 'renderBlueprint':
				currentImage = "./assets/blueprintLanding-9.svg"
				break
		}
		setHeroImageURL(currentImage)
	}

	return (
		<BlueprintLandingDiv theme={theme} wizardAnimationState={wizardAnimationState}>
			{renderWizardScreen()}

			<img className="blueprintLanding-heroImage"
				src={heroImageURL}
				onLoad={() => setImageLoadState(true)} />
		</BlueprintLandingDiv>
	);
}

export default BlueprintLanding;

const BlueprintLandingDiv = styled.div`
	margin: 0 auto 168px auto;
	padding: 24px;
	display: flex;
	position: relative;
	max-width: 1032px;

	.blueprintLanding-heroImage {
		/* max-width: 649px; */
		max-height: 540px;
		max-width: 650px;
		position: absolute;
		right: 24px;
		transition: transform 350ms ease-in-out, opacity 350ms ease-in-out;
		top: 0;
		transform: ${props => props.wizardAnimationState ? "translate3d(0, -48px, 0)" : "translate3d(0, 0, 0)"};
		opacity: ${props => props.wizardAnimationState ? 0 : 1};
	}

	.blueprintLanding-title {
		font-size: 36px;
		font-weight: ${FontWeights.bold};
		margin-bottom: 20px;
		max-width: 432px;
	}

	.blueprintLanding-landingPane {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		max-width: 524px;
		min-height: 480px;
		z-index: 100;
		transition: transform 350ms ease-in-out, opacity 350ms ease-in-out;
		transform: ${props => props.wizardAnimationState ? "translate3d(0, 48px, 0)" : "translate3d(0, 0, 0)"};
		opacity: ${props => props.wizardAnimationState ? 0 : 1};
	}

	.blueprintLanding-enterDialogPane {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 332px;
	}

	.blueprintLanding-primaryButton {
		min-width: 180px;
	}

	.blueprintLanding-secondaryButton {
		margin-left: 12px;
		min-width: 180px;
		font-size: ${FontSizes.size12};
	}

	.blueprintLanding-continueButton {
		margin-top: 32px;
		max-width: 200px;
	}

	.blueprintLanding-description {
		margin: 0 0 12px 0;
		max-width: 330px;
	}

	.blueprintLanding-textField {
		margin-top: 12px;
		max-width: 300px;
	}

	.blueprintLanding-actions {
		display: flex;
		align-items: center;
		margin-top: 24px;
	}

	.blueprintLanding-overviewItem {
		display: flex;
		align-items: center;
		margin-top: 12px;
	}

	.blueprintLanding-overviewIndex {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 36px;
		width: 36px;
		background: ${(props) => props.theme.palette.themePrimary};
		border-radius: 100%;
		color: white;
		margin-right: 12px;
		font-weight: ${FontWeights.semibold};
	}

	.blueprintLanding-nextStepButton {
		max-width: 200px;
		margin-top: 24px;
	}

	.blueprintLanding-subheader {
		font-size: ${FontSizes.size20};
		color: #929292;
		margin-bottom: 8px;
	}

	.blueprintLanding-textFieldDescription {
		font-size: ${FontSizes.size12};
		color: #929292;
		margin-top: 8px;
		max-width: 300px;
	}

	.blueprintLanding-newSlotSubmit {
		display: flex;
		width: 100%;
		align-items: flex-start;
		flex-direction: column;
	}

	.blueprintLanding-newSlotButton {
		margin-left: 12px;
	}

	.blueprintLanding-playIcon {
		margin: 0 0 0 12px;
	}

	.blueprintLanding-buttonIconContainer {
		display: flex;
		align-items: center;
	}
`
