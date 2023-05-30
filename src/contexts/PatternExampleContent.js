let CreatePatternExamples = {
	eyesOn: [
		{ image: 'create-eyes-on-1.png' },
		{ 
			image: 'create-eyes-on-2.png',
			cortana: 'Earcon',
			audio: 'earcon-listening.wav'
		},
		{ 
			image: 'create-eyes-on-3.png',
			user: 'Send a message to Jon',
			audio: 'send-a-message-to-jon.wav'
		},
		{ 
			image: 'create-eyes-on-4.png',
			cortana: "What's your message to Jon?",
			audio: 'whats-your-message-to-jon.wav'
		},
		{ 
			image: 'create-eyes-on-5.png',
			user: 'Want to meet for coffee later this afternoon to talk about how the meeting went?',
			audio: 'want-to-meet-for-coffee.wav'
		},
		{ 
			image: 'create-eyes-on-6.png',
			cortana: 'Ready to send it?',
			audio: 'ready-to-send-it.wav'
		},
		{ 
			image: 'create-eyes-on-7.png'
		},
	],
	eyesOff: [
		{ 
			image: 'create-eyes-off-1.png',
			cortana: "You've got messages from Karin and Jon, plus several group chats. Which ones should I read?",
			audio: "youve-got-messages.wav" 
		},
		{ image: 'create-eyes-off-2.png' },
		{ 
			image: 'create-eyes-off-3.png',
			user: 'Send a message to Jon',
			audio: 'send-a-message-to-jon.wav'
		},
		{ 
			image: 'create-eyes-off-4.png',
			cortana: "What's your message to Jon?",
			audio: 'whats-your-message-to-jon.wav'
		},
		{ 
			image: 'create-eyes-off-5.png',
			user: 'Want to meet for coffee later this afternoon to talk about how the meeting went?',
			audio: 'want-to-meet-for-coffee.wav'
		},
		{ 
			image: 'create-eyes-off-6.png',
			cortana: 'Ready to send it?',
			audio: 'ready-to-send-it.wav'
		},
		{ 
			image: 'create-eyes-off-7.png',
			user: 'Yes',
			audio: 'yes.wav'
		},
		{
			image: 'create-eyes-off-8.png',
			audio: 'earcon-success.wav'
		}
	]
}

let RecallPatternExamples = {
	eyesOn: [
		{	image: 'recall-eyes-on-1.png'	},
		{ 
			image: 'recall-eyes-on-2.png',
			cortana: 'Earcon',
			audio: 'earcon-listening.wav'
		},
		{
			image: 'recall-eyes-on-3.png',
			user: "What's my next meeting with Jon?",
			audio: "whats-my-next-meeting-with-jon.wav"
		},
		{
			image: 'recall-eyes-on-4.png',
			cortana: `Up next with Jon in "Planning progress" on Friday at 3.`,
			audio: 'up-next-with-jon.wav'
		},
		{ image: 'recall-eyes-on-5.png' }
	],
	eyesOff: [
		{
			image: 'recall-eyes-off-1.png',
			cortana: 'Earcon',
			audio: 'earcon-listening.wav'
		},
		{
			image: 'recall-eyes-off-2.png',
			user: "What's my next meeting with Jon?",
			audio: "whats-my-next-meeting-with-jon.wav"
		},
		{
			image: 'recall-eyes-off-3.png',
			cortana: `Up next with Jon is "Planning progress" on Friday at 3.`,
			audio: 'cortana-up-next.wav'
		},
		{	image: 'recall-eyes-off-4.png' }
	]
}

let PresentPatternExamples = {
	eyesOff: [
		{ image: 'present-eyes-off-1.png' },
		{ image: 'present-eyes-off-2.png',
			cortana: 'Earcon',
			audio: 'earcon-listening.wav'
		},
		{ 
			image: 'present-eyes-off-3.png',
			user: 'Play my email',
			audio: 'play-my-email.wav'
		},
		{ 
			image: 'present-eyes-off-4.png',
			cortana: "Hi Brad, you’ve got 14 new emails including a change to your day...",
			audio: 'hi-brad-youve-got-mail.wav'
		},
		{ 
			image: 'present-eyes-off-5.png',
			cortana: 'Jon sent you and email about “Budget Review”. I need your input for the meeting next week, thanks!',
			audio: 'jon-sent-you-an-email.wav'
		},
		{ 
			image: 'present-eyes-off-6.png',
			user: 'Reply to him',
			audio: 'reply-to-him.wav'
		},
		{ 
			image: 'present-eyes-off-7.png',
			cortana: "Ok, what's your reply?",
			audio: 'ok-whats-your-reply.wav'
		},
		{ 
			image: 'present-eyes-off-8.png',
			user: "I’ll get that to you by the end of week.",
			audio: 'ill-get-that-to-you.wav'
		},
		{ 
			image: 'present-eyes-off-9.png',
			cortana: "Okay, I’ve got “I’ll get that to you by the end of the week”. Ready to send it?",
			audio: 'ok-ive-got-ill-get-that.wav'
		},
		{ 
			image: 'present-eyes-off-10.png',
			user: "Yes",
			audio: 'yes.wav'
		},
		{ 
			image: 'present-eyes-off-11.png',
			cortana: "I've sent it.",
			audio: 'ive-sent-it.wav'
		},
		{ image: 'present-eyes-off-12.png' },
		{ 
			image: 'present-eyes-off-12.png' }
	]
}

let NavigatePatternExmaples = {
	eyesOn: [
		{ image: 'navigate-eyes-on-1.png' },
		{ image: 'navigate-eyes-on-2.png',
			cortana: 'Earcon',
			audio: 'earcon-listening.wav'
		},
		{ 
			image: 'navigate-eyes-on-3.png',
			user: "Join my next meeting",
			audio: "join-my-next-meeting.wav"
		},
		{ 
			image: 'navigate-eyes-on-4.png',
			cortana: 'Ready to join the 10:30AM "Substrate AI Portal Office Hours"?',
			audio: 'ready-to-join-meeting.wav'
		},
		{ 
			image: 'navigate-eyes-on-4.png',
			user: 'Yes',
			audio: 'yes.wav'
		},
		{ 
			image: 'navigate-eyes-on-5.png',
			audio: 'earcon-success.wav'
		}
	],
	eyesOff: [
		{ 
			image: 'navigate-eyes-off-1.png',
			cortana: 'Earcon',
			audio: 'earcon-listening.wav' 
		},
		{ 
			image: 'navigate-eyes-off-2.png',
			user: "Join my next meeting",
			audio: "join-my-next-meeting.wav"
		},
		{ 
			image: 'navigate-eyes-off-3.png',
			cortana: 'Ready to join the 10:30AM "Substrate AI Portal Office Hours"?',
			audio: 'ready-to-join-meeting.wav'
		},
		{ 
			image: 'navigate-eyes-off-3.png',
			user: 'Yes',
			audio: 'yes.wav'
		},
		{ 
			image: 'navigate-eyes-off-4.png',
			audio: 'earcon-success.wav'
		}
	]
}

export default { 
	CreatePatternExamples,
	RecallPatternExamples,
	PresentPatternExamples,
	NavigatePatternExmaples
}