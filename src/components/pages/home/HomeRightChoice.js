import React, { useEffect } from 'react'
import styled from 'styled-components'

const HomeRightChoice = ({ data }) => {
	useEffect(() => { console.log(data) }, [data])

	let { WhenIsVoiceTheRightChoice } = 
	// data ? data : 
	{ 
		WhenIsVoiceTheRightChoice: 
		{	Title: 'When is voice the right choice?',
			Description: `Selecting the right scenario is the most critical step in creating a voice experience. "Voice is great at everything it's not terrible at," researcher Bill Buxton once quipped. Amusing, but true; voice is best in specific scenarios and contexts.`,
			Rows: [
				{
					Image: 'woman-driving.svg',
					Text: "When you're distracted",
					Description: " doing something else, such as driving, or walking the dog."
				},
				{
					Image: 'game-controller-remote-control.svg',
					Text: "When typing is hard",
					Description: ", such as searching for a movie with a TV remote."
				},
				{
					Image: 'man-laptop-headset.svg',
					Text: "When you're multitasking",
					Description: ", such as controlling the background music while editing a doc."
				},
				{
					Image: 'man-papers.svg',
					Text: "When you need a third arm",
					Description: " such as getting that next recipe step while cooking."
				}
			]
	}}

	function renderRows() {
		return WhenIsVoiceTheRightChoice.Rows.map((row, i) => {
			if (i % 2) {
				return (
					<Row className={ "content-container even row" + (i + 1) } key={ 'rightchoicerow' + i }>
						<Strings className="col2">
							<Text>
								{ row.Text }
							</Text>
							{ row.Description && 
								<Subtext className="subtext">{ row.Description }</Subtext>
							}
						</Strings>
						<Image className="image col2">
							<img src={ "assets/illustrations/" + row.Image } />
						</Image>
					</Row>
				)
			} else {
			return <Row className={ "content-container odd row" + (i + 1) } key={ 'rightchoicerow' + i }>
				<Image className="image col2">
					<img src={ "assets/illustrations/" + row.Image } />
				</Image>
				<Strings className="col2">
					<Text>
						{ row.Text }
					</Text>
					{ row.Description && 
						<Subtext className="subtext">{ row.Description }</Subtext>
					}
				</Strings>
			</Row>
			}
		})
	}

	return (
		<Container>
			<Wrapper className="content-container">  
				<Header className="content-container">
					<Title className="col2">{ WhenIsVoiceTheRightChoice.Title }</Title>
					<Description className="col2">
						{ WhenIsVoiceTheRightChoice.Description && WhenIsVoiceTheRightChoice.Description }
					</Description>
				</Header>
				<Content>
					{ renderRows() }
				</Content>
			</Wrapper>
		</Container>
	)
}

export default HomeRightChoice

const Container = styled.div`
	width: 100%;
	z-index: 2;
	position: relative;
	background-color: #fff;
	color: #000;
`

const Wrapper = styled.div`
	flex-direction: column;
	width: 100%;
	padding: 100px 0;
	margin: 0 auto;
	background: url("assets/illustrations/background-right-choice.svg") no-repeat;
	background-size: 100% 90%;
	background-position: center center;

  @media all and (max-width: 1199px) { 
		background-image: none;
	}
`

const Header = styled.div`
	display: flex;
	width: 100%;
	padding-bottom: 50px;
	align-items: baseline;
`

const Title = styled.h1`
	min-width: 50%;
	padding: 0 24px 24px 24px;
`

const Description = styled.div`
	flex: 1;
	padding: 0 24px 24px 24px;
`

const Content = styled.div`
	display: flex;
	flex-direction: column;
`

const Row = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	position: relative;
	padding: 50px 0;

  @media all and (max-width: 1199px) {  
    &.even {
			flex-direction: column-reverse !important;
		}
  }
`

const Image = styled.div`
	height: 350px;
	width: 345px;
	z-index: 1;
	position: relative;
	text-align: center;

	img {
		height: 400px;
	}

	@media all and (max-width: 1199px) {  
		img {
			width: 50%;
			height: inherit;
		}
	}

	@media all and (max-width: 599px) {
		img {
			width: 90%;
		}
	} 
`

const Strings = styled.div`
	z-index: 2;
	position: relative;
  padding: 150px 0;

  @media all and (max-width: 1199px) {  
		padding: 24px 12px 24px 24px;
  }
`

const Text = styled.span`
	font-family: 'Segoe UI Bold';
	font-size: 32px;
	line-height: 46px;
	flex: 1;
`

const Subtext = styled.span`
	font-family: 'Segoe UI Semibold';
	font-size: 32px;
	line-height: 46px;
`