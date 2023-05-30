import React, { useContext } from 'react'
import styled from 'styled-components'

const SendAMessage = (props) => {
    let confirmationCard = <ConfirmationCardDiv></ConfirmationCardDiv>
    let completionCard = <CompletionCardDiv></CompletionCardDiv>

    const skillData = [
        // slots: [
        //     {
        //         type: props.name,
        //         prompt: "Who would you like to message?",
        //         freeform: false
        //     },
        //     {
        //         type: props.location,
        //         prompt: "Where is this person?",
        //         freeform: false
        //     },
        //     {
        //         type: props.message,
        //         prompt: "What's your message?",
        //         freeform: true
        //     },
        // ],
        // confirmation: {
        //     prompt: "Should I send it?",
        //     card: confirmationCard
        // },
        // completion: {
        //     prompt: "I've sent that for you.",
        //     card: completionCard
        // }

        {
			entity: "Intent",
			freeform: false,
			userResponse: props.intent,
			defaultUserResponse: "Send a message",
			properties: {
				required: false,
				label: "Send a message",
				defaultValue: "Send a message"
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
			entity: "Person",
			freeform: false,
			userResponse: props.person,
			defaultUserResponse: "",
			properties: {
				required: false,
				label: "Who would you like to message?",
				defaultValue: "Who would you like to message?"
			},
			prompt: {
				guiString: "Who would you like to message?",
				ttsString: "Who would you like to message?"
			},
			reprompt: {
				guiString: "Who would you like to message?",
				ttsString: "Who would you like to message?"
			},
        },
        {
			entity: "Place",
			freeform: false,
			userResponse: props.place,
			defaultUserResponse: "",
			properties: {
				required: false,
				label: "Where is this person?",
				defaultValue: "Where is this person?"
			},
			prompt: {
				guiString: "Where is this person?",
				ttsString: "Where is this person?"
			},
			reprompt: {
				guiString: "Where is this person?",
				ttsString: "Where is this person?"
			},
        },
        {
			entity: "Text",
			freeform: true,
			userResponse: props.text,
			defaultUserResponse: "",
			properties: {
				required: false,
				label: "What's your message?",
				defaultValue: "What's your message?"
			},
			prompt: {
				guiString: "What's your message?",
				ttsString: "What's your message?"
			},
			reprompt: {
				guiString: "What's your message?",
				ttsString: "What's your message?"
			},
        },
        {
			entity: "Summary",
			defaultUserResponse: "",
			freeform: true,
			userResponse: props.confirm,
			properties: {
				required: false,
				label: "Should I send it?",
				defaultValue: "Should I send it?"
			},
			prompt: {
				guiString: "Should I send it?",
				ttsString: "Should I send it?"
			},
			reprompt: {
				guiString: "Should I send it?",
				ttsString: "Should I send it?"
			},
        },
        {
			entity: "Rollup",
			freeform: false,
			userResponse: props.success,
			defaultUserResponse: "",
			properties: {
				required: false,
				label: "I've sent that for you.",
				defaultValue: "I've sent that for you."
			},
			prompt: {
				guiString: "I've sent that for you.",
				ttsString: "I've sent that for you."
			},
			reprompt: {
				guiString: "I've sent that for you.",
				ttsString: "I've sent that for you."
			},
        },
        
        
    ]

    return skillData;
}

export default SendAMessage

const ConfirmationCardDiv = styled.div`
    height: 100px;
    width: 100%;
    background: yellow;
`

const CompletionCardDiv = styled.div`
    height: 100px;
    width: 100%;
    background: green;
`