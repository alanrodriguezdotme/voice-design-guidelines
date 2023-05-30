import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const ExampleSlideshow = ({ slides, isEyesOff }) => {
	let [ isPlaying, setIsPlaying ] = useState(false)
	let [ currentSlideIndex, setCurrentSlideIndex ] = useState(0)
	let [ eyesOff, setEyesOff ] = useState(isEyesOff)
	let [ currentUI, setCurrentUI ] = useState(isEyesOff ? 'eyesOff' : 'eyesOn')
	let [ currentSlide, setCurrentSlide ] = useState(slides['eyesOn'] ? slides['eyesOn'][currentSlideIndex] : slides['eyesOff'][currentSlideIndex])
	let [ intervalDuration, setIntervalDuration ] = useState(3000)
	let [ audioType, setAudioType ] = useState('audio/wav')

	useEffect(() => {
		setIsPlaying(false)

		if (slides['eyesOn'] === undefined) {
			setEyesOff(true)
			setCurrentUI('eyesOff')
			setCurrentSlide(slides['eyesOff'][0])
		} else {
			setEyesOff(false)
			setCurrentUI('eyesOn')
			setCurrentSlide(slides['eyesOn'][0])
		}
	}, [slides])

	// if eyesOff or currentUI changes
	useEffect(() => {
		console.log({ currentUI })
		setCurrentSlide(slides[currentUI][0] )
	}, [currentUI])

	// detect change
	useEffect(() => {
		// set audio type
		if (slides[currentUI][currentSlideIndex].audio) {
			let audioString = slides[currentUI][currentSlideIndex].audio
			if (audioString.endsWith('m4a')) {
				setAudioType('audio/mp4')
			} else {
				setAudioType('audio/wav')
			}
		}

		// set the current slide content
		slides[currentUI] && setCurrentSlide(slides[currentUI][currentSlideIndex])

		if (isPlaying && slides[currentUI].length <= currentSlideIndex + 1) {
			setIsPlaying(false)
		}

	}, [currentSlideIndex])

	useEffect(() => {
		console.log({ eyesOff })
		let currentUIValue = eyesOff ? 'eyesOff' : 'eyesOn'
		// check to see if there is any 'eyesOn' content to show
		if (!slides['eyesOn']) { currentUIValue = 'eyesOff' }
		setCurrentUI(currentUIValue)
	}, [eyesOff])

	// reset slider on change
	useEffect(() => { setCurrentSlideIndex(0) }, [slides])

	useEffect(() => {
		if (isPlaying && slides[currentUI].length > currentSlideIndex + 1) {
			console.log({ intervalDuration })
			let slideshow = setInterval(() => {
				handleSlideChange(1)
			}, intervalDuration)

			return () => clearInterval(slideshow)
		} else if (isPlaying) {
			setCurrentSlideIndex(0)
		}
	}, [isPlaying, currentSlideIndex, intervalDuration])

	useEffect(() => {
		console.log({ currentSlide })
		let audio = document.getElementById('audio')

		if (currentSlide.audio && audio) {
			audio.load()
			audio.pause()
			audio.onloadedmetadata = (event) => {
				// set intervalDuration if it's more than 3 seconds
				if (audio.duration > 3) { setIntervalDuration(audio.duration * 1000 + 1500) }
			}
			console.log('playing now')
			audio.play() 
			// }
		} else {
			setIntervalDuration(3000)
		}

	}, [currentSlide])

	function handleEyesOffToggleClick() {
		setEyesOff(!eyesOff)
		setCurrentSlideIndex(0)
	}

	function handleSlideChange(offset) {
		if (offset > 0 && currentSlideIndex < slides[currentUI].length - 1) {
			setCurrentSlideIndex(prevIndex => prevIndex + 1)
		} else if (offset < 0 && currentSlideIndex > 0) {
			setCurrentSlideIndex(prevIndex => prevIndex - 1)
		}
	}

	function handleChevronClick(offset) {
		if (isPlaying) {
			setIsPlaying(false)
		}

		handleSlideChange(offset)
	}

	return (
		<Container>
			<Top onClick={() => handleEyesOffToggleClick()}>
				<Title>Eyes</Title>
				{ slides['eyesOn'] && <ToggleButton className={ !eyesOff && 'active' }>On</ToggleButton> }
				{ slides['eyesOff'] && <ToggleButton className={ eyesOff && 'active' }>Off</ToggleButton> }
			</Top>
			<Main>
				<Wrapper>
					<Images>
						<MobileFrame src="assets/patterns/mobile-frame.png" />
						<Image>
							<img src={ 'assets/patterns/' + currentSlide.image } />
						</Image>
					</Images>
					<Dialog>
						{ currentSlide.user && 
							<SpeechBubble className="user">
								{ currentSlide.user && currentSlide.user }
							</SpeechBubble>
						}
						{ currentSlide.cortana && 
							<SpeechBubble className="cortana">
								{ currentSlide.cortana && currentSlide.cortana }
							</SpeechBubble>
						}
						{ currentSlide.audio &&
							<audio id="audio">
								<source src={ 'assets/patterns/audio/' + currentSlide.audio } type={ audioType } />
							</audio>
						}
					</Dialog>
				</Wrapper>
				<Controls>
					{/* <Button
						className="play"
						onClick={ () => setIsPlaying(!isPlaying) }>
						{ isPlaying ?
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
								<path d="M512 1877V171h341v1706H512zm683-1706h341v1706h-341V171z" />
							</svg>
							:
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
								<path d="M1792 1024L512 1920V128l1280 896z" />
							</svg>
						}
					</Button> */}
					<Button 
						className={ currentSlideIndex === 0 && 'disabled' }
						onClick={ () => handleChevronClick(-1) }>
						<svg className="left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
							<path d="M1443 2045L421 1024 1443 3l90 90-930 931 930 931-90 90z" />
						</svg>
					</Button>
					<Button 
						className={ slides[currentUI] && (currentSlideIndex >= slides[currentUI].length - 1) && 'disabled' }
						onClick={ () => handleChevronClick(1) }>
						<svg className="right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
							<path d="M515 1955l930-931L515 93l90-90 1022 1021L605 2045l-90-90z" />
						</svg>
					</Button>
				</Controls>
			</Main>
		</Container>
	)
}

export default ExampleSlideshow

const Container = styled.div`
	width: 100%;
	max-width: 512px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex: 1;

	@media all and (max-width: 1199px) {
		max-width: 100%;
	}
`

const Top = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 20px;
	cursor: pointer;
`

const Main = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`

const Wrapper = styled.div`
	flex: 1;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	max-width: 427px;
`

const Title = styled.h3`
	padding-right: 12px;
	text-align: center;
`

const ToggleButton = styled.div`
	font-family: "Segoe UI Bold", sans-serif;
	font-size: 16px;
	text-transform: uppercase;
	height: 32px;
	border-radius: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #000;
	background-color: #e8e8e8;
	padding: 0 12px;
	margin-right: 8px;

	&.active {
		color: #fff;
		background-color: #1DAEFF;
	}
`

const Images = styled.div`
	position: relative;
	width: 427px;
	height: 858px;
	flex: 1;

	@media all and (max-width: 1599px) {
		width: fit-content;
		height: fit-content;
	}
`

const animateImageOut = keyframes`
	0% { opacity: 1; }
	100% { opacity: 0; }
`

const animateImageIn = keyframes`
	0% { opacity: 0; }
	100% { opacity: 1; }
`

const MobileFrame = styled.img`
	position: absolute;
	width: 100%;
	z-index: 1000;
`

const Image = styled.div`
	width: 100%;
	height: 100%;
	z-index: 1;
	display: flex;
	align-items: flex-start;
	justify-content: center;

	img {
		transform: translateY(2.5%);
		width: 88%;
	}
`

const Dialog = styled.div`
	height: 100px;
	width: 100%;
`

const SpeechBubble = styled.div`
	position: relative;
	color: #fff;
	border-radius: 10px;
	width: 100%;
	margin-top: 20px;
	padding: 12px 18px;
	font-family: "Segoe UI Semibold", sans-serif;
	font-size: 18px;
	
	&:after {
    content: "";
    position: absolute;
    display: block;
    width: 0;
		border-style: solid;
	}

	&.user {
		background-color: #474747;

		&:after {
			bottom: -12px;
			left: 50px;
			border-width: 12px 8px 0;
			border-color: #474747 transparent;
		}
    
	}

	&.cortana {
		background-color: #1DAEFF;

		&:after {
			top: -12px;
			right: 50px;
			border-width: 0 8px 12px;
			border-color: #1DAEFF transparent;
		}
	}

	@media all and (max-width: 1599px) {
		margin-top: 50px;
	}
`

const Controls = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const Button = styled.div`
	height: 60px;
	width: 60px;
	border: 1px solid #8d8d8d;
	border-radius: 30px;
	color: #8d8d8d;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 6px 12px;
	cursor: pointer;

	&.play {
		background-color: #1DAEFF;
		color: #fff;
		border: none;

		svg {
			fill: #fff;
		}
	}

	&.disabled {
		opacity: 0.5;
		cursor: default;
	}

	svg {
		fill: #8d8d8d;
		height: 24px;

		&.left { transform: translateX(-1px); }
		&.right { transform: translateX(1px); }
	}
`
