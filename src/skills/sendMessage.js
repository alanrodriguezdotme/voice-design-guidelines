let dialog = [ 
	{
		entity: "Intent",
		type: "Create",
		freeform: false,
		userResponse: "Send a message",
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
		entity: "Person",
		type: "Ask",
		freeform: false,
		userResponse: "",
		properties: {
			required: false,
			label: "",
			defaultValue: ""
		},
		prompt: {
			guiString: "Who do you want to message?",
			ttsString: "Who do you want to message?"
		},
		reprompt: {
			guiString: "",
			ttsString: ""
		},
	},
	{
		entity: "Text",
		type: "Ask",
		freeform: false,
		userResponse: "",
		properties: {
			required: false,
			label: "",
			defaultValue: ""
		},
		prompt: {
			guiString: "What's your message?",
			ttsString: "What's your message?"
		},
		reprompt: {
			guiString: "",
			ttsString: ""
		},
	},
	{
		entity: "Summary",
		type: "Confirm",
		freeform: false,
		userResponse: "",
		properties: {
			required: false,
			label: "",
			defaultValue: ""
		},
		prompt: {
			guiString: "Ready to send it?",
			ttsString: "Ready to send it?"
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
		userResponse: "",
		properties: {
			required: false,
			label: "",
			defaultValue: ""
		},
		prompt: {
			guiString: "Message sent.",
			ttsString: "Message sent."
		},
		reprompt: {
			guiString: "",
			ttsString: ""
		},
	}
]

export default dialog