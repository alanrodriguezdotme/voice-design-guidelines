import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Parallax, Background } from 'react-parallax'

const HomeRightChoice = ({ data }) => {
	useEffect(() => { console.log(data) }, [data])

	let { AdaptToContext } = data ? data : { 
		AdaptToContext: {
			Title: 'When is voice the right choice?'
		}
	}
	
	AdaptToContext["Description"] = "Design the dialog for your customer’s context. Where are they? What else are they doing? In an eyes-off scenario, such as walking the dog, voice must carry the burden of task completetion; when your eyes are on a display, the screen can be referenced to make the dialog efficient."

	return (
		<Container>
			<Parallax strength={ 300 } className="parallax">
				<Wrapper className="content-container">
					<Left className="col2">
						<Image src="assets/illustrations/woman-gardening.svg" />
					</Left>
					<Right className="col2">
						<Title>{ AdaptToContext.Title }</Title>
						<Description>
							{ AdaptToContext.Description && AdaptToContext.Description }
						</Description>
					</Right>
				</Wrapper>
				<Background className="background">
					<img src="assets/illustrations/background-context.svg" />
				</Background>	
			</Parallax>
		</Container>
	)
}

export default HomeRightChoice

const Container = styled.div`
	width: 100%;
	z-index: 2;
	position: relative;
	background-color: #6FCF97;
	color: #000;
`

const Wrapper = styled.div`
	display: flex;
	margin: 0 auto;
	min-height: 500px;
	align-items: flex-end;
  position: relative;

	@media all and (max-width: 1199px) {  
		background-position: bottom center;
		background-size: 100% 50%;
		flex-direction: column-reverse !important;
	}
`

const Left = styled.div`
	display: flex;
	align-items: stretch;
	justify-content: center;
	width: 100%;
	height: 100%;
	z-index: 3;
	position: relative;
`

const Image = styled.img`
  /* position: absolute;
  bottom: 0;
  left: 0; */
  position: relative;
  width: 60%;
  z-index: 1;

  @media all and (max-width: 1599px) and (min-width: 1200px) {
    width: 75%;
  }

  @media all and (max-width: 1199px) {
    width: 50%;
  }
`

const Right = styled.div`
	padding: 100px 0;

  @media all and (max-width: 1199px) {
		padding: 100px 24px 24px 24px;
	}
`

const Title = styled.h1`
	padding-bottom: 40px;
`

const Description = styled.div`
	max-width: 800px;
`

// const Image = styled.img`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
// 	background-image: url("assets/illustrations/woman-gardening.svg");
// 	background-repeat: no-repeat;
// 	background-position: bottom left;
// 	background-size: 40% 90%;
//   z-index: 1;

//   @media all and (max-width: 1199px) {
//     background-position: bottom center;
//     background-size: 90% inherit;
//   }
// `