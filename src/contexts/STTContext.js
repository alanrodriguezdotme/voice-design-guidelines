import React, { createContext, useState } from 'react'
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk'

let subscriptionKey = 'ab3918c52b51410cae05d545fe5ce17f'
let authEndpoint = 'https://westus.api.cognitive.microsoft.com/sts/v1.0/issuetoken'
let authToken
let serviceRegion = "westus"
let recognizer

export const STTContext = createContext()

const STTContextProvider = (props) => {
	const [ freeformTextState, setFreeformTextState ] = useState(false)

	function requestAuthToken() {
		if (authEndpoint) {
			let a = new XMLHttpRequest()
			a.open("GET", authEndpoint)
			a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
			a.send("")
			a.onload = function() {
				console.log('responseText:', this)
				let token = JSON.parse(atob(this.responseText.split(".")[1]))
				serviceRegion = token.region
				authToken = this.responseText
				console.log("Got an auth token: " + token)
			}
		}
	}

	const startListening = (actions, shouldSkipLUIS, nextTurn) => {
		console.log({ actions })
		let { setIsMicOn, setCortanaResponse, setHypothesis, setUtterance, getLuisResponse, currentDialogIndex, setCurrentDialogIndex } = actions
		let speechConfig
		if (authToken) {
			speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(authToken, serviceRegion)
		} else {
			speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion)
		}

		speechConfig.speechRecognitionLanguage = "en-US"
		let audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput()
		recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig)

		console.log("listening...")
		playEarcon('listening')
		setIsMicOn(true)
		setCortanaResponse("Listening...")

		recognizer.recognizing = (sender, event) => {
			setHypothesis(event.result.text)
		}
		
		recognizer.recognizeOnceAsync(
			(result) => {
				console.log({result})
				setHypothesis(null)
				setUtterance(result.text)
				if (!shouldSkipLUIS) {
					getLuisResponse(result.text, actions)
				}
				stopListening(actions)
				if (nextTurn) {
					setCurrentDialogIndex(currentDialogIndex + 1)
				}
			},
			(error) => {
				console.log({error})
				stopListening(actions)
			} 
		)		
	}

	function playEarcon(state) {
		let audio = new Audio('assets/earcons/earcon-' + state + '.wav')
		audio.play()
	}

	const stopListening = (actions) => {
		if (recognizer) {
			recognizer.close()
			recognizer = undefined
			playEarcon('stoplistening')
			actions.setIsMicOn(false)
			console.log("stopped listening")
		}
	}

	return (
		<STTContext.Provider value={{
			requestAuthToken,
			startListening,
			stopListening,
			freeformTextState, setFreeformTextState
		}}>
			{props.children}
		</STTContext.Provider>
	)
}

export default STTContextProvider