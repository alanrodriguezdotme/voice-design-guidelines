import React, { createContext, useState } from 'react'

export const VoicePatternsContext = createContext()

const VoicePatternsContextProvider = (props) => {
	const [globalPage, setGlobalPage] = useState("Home")
	const [guidelinesPage, setGuidelinesPage] = useState(21)
	const [patternsData, setPatternsData] = useState([])
	const [patternsPage, setPatternsPage] = useState(2)
	const [page, setPage] = useState(11)
	const [currentURL, setCurrentURL] = useState("")
	const [currentBuild, setCurrentBuild] = useState("VoicePatterns_20200123")
	const [guidelinesData, setGuidelinesData] = useState([])
	const [showFeedbackForm, setShowFeedbackForm] = useState(false)

	//cognitive services hooks
	const [userResponse, setUserResponse] = useState("")
	const [userHypothesis, setUserHypothesis] = useState("")
	const [luisResponse, setLuisResponse] = useState(null)
	const [ttsVoice, setTTSVoice] = useState("Microsoft Server Speech Text to Speech Voice (en-US, EvaNeural)")

	//entity type hooks
	const [typeIntent, setTypeIntent] = useState("")
	const [typeName, setTypeName] = useState(null)
	const [typeTimeDate, setTypeTimeDate] = useState(null)
	const [typeDuration, setTypeDuration] = useState(null)
	const [typeLocation, setTypeLocation] = useState(null)
	const [typeMessage, setTypeMessage] = useState(null)
	const [typeNumber, setTypeNumber] = useState(null)
	const [typeService, setTypeService] = useState(null)
	const [typeDeviceType, setTypeDeviceType] = useState(null)
	const [typeConfirm, setTypeConfirm] = useState("")
	const [confirmationState, setConfirmationState] = useState(false)
	const [typeSuccess, setTypeSuccess] = useState("")

	//blueprints renderer
	const [rendererOverlayState, setRendererOverlayState] = useState(false)
	const [cortanaResponse, setCortanaResponse] = useState("How can I help?")
	const [isMicOpen, setIsMicOpen] = useState(false)

	//blueprints creator
	const [currentEntitySelection, setCurrentEntitySelection] = useState("")
	const [skillCreatorDialog, setSkillCreatorDialog] = useState([])
	const [creationCanvasState, setCreationCanvasState] = useState("landing")
	const [selectedEntityIndex, setSelectedEntityIndex] = useState(0)
	const [repromptTurn, setRepromptTurn] = useState(0)
	const [landingPageDialog, setLandingPageDialog] = useState("")
	const [isCreationBarVisible, setCreationBarState] = useState(false)
	const [currentWizardScreen, setWizardScreen] = useState("landing")
	const [demoReset, toggleDemoReset] = useState(false)
	const [isEyesOff, setIsEyesOff] = useState(true)
	
	const insert = (arr, index, newItem) => [
		// part of the array before the specified index
		...arr.slice(0, index),
		// inserted item
		newItem,
		// part of the array after the specified index
		...arr.slice(index)
	]

	const pushNewEntity = (newEntity) => {
		setSkillCreatorDialog(insert(skillCreatorDialog, skillCreatorDialog.length - 2, newEntity))
	}

	const replace = (arr, index, newItem) => [
		// part of the array before the specified index
		...arr.slice(0, index),
		// inserted item
		newItem,
		// part of the array after the specified index
		...arr.slice(index + 1)
	]

	const editExistingEntity = (newEntity) => {
		setSkillCreatorDialog(replace(skillCreatorDialog, selectedEntityIndex, newEntity))
	}

	// const removeExistingEntity = (index) => {
	// 	skillCreatorDialog.splice(index, 1)[0]
	// 	setSkillCreatorDialog(skillCreatorDialog)
	// }

	return (
		<VoicePatternsContext.Provider value={
			{
				globalPage,
				setGlobalPage,
				guidelinesPage,
				setGuidelinesPage,
				patternsData, 
				setPatternsData,
				patternsPage,
				setPatternsPage,
				page, 
				setPage,
				currentURL,
				setCurrentURL,
				showFeedbackForm, 
				setShowFeedbackForm,
				rendererOverlayState,
				setRendererOverlayState,
				userResponse,
				setUserResponse,
				userHypothesis,
				setUserHypothesis,
				luisResponse,
				setLuisResponse,
				typeName,
				setTypeName,
				typeLocation,
				setTypeLocation,
				typeMessage,
				setTypeMessage,
				confirmationState,
				setConfirmationState,
				currentEntitySelection,
				setCurrentEntitySelection,
				skillCreatorDialog,
				setSkillCreatorDialog,
				pushNewEntity,
				creationCanvasState,
				setCreationCanvasState,
				selectedEntityIndex,
				setSelectedEntityIndex,
				editExistingEntity,
				typeIntent,
				setTypeIntent,
				typeTimeDate,
				setTypeTimeDate,
				typeDuration,
				setTypeDuration,
				typeNumber,
				setTypeNumber,
				typeService,
				setTypeService,
				typeDeviceType,
				setTypeDeviceType,
				typeConfirm,
				setTypeConfirm,
				typeSuccess,
				setTypeSuccess,
				repromptTurn,
				setRepromptTurn,
				currentBuild,
				setCurrentBuild,
				// removeExistingEntity,
				landingPageDialog, 
				setLandingPageDialog,
				cortanaResponse, 
				setCortanaResponse,
				isCreationBarVisible, 
				setCreationBarState,
				currentWizardScreen, 
				setWizardScreen,
				ttsVoice, 
				setTTSVoice,
				guidelinesData, 
				setGuidelinesData,
				demoReset, 
				toggleDemoReset,
				isEyesOff,
				setIsEyesOff,
				isMicOpen, 
				setIsMicOpen
			}
		}>
			{props.children}
		</VoicePatternsContext.Provider>
	);
}

export default VoicePatternsContextProvider;