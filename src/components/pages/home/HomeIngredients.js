import React from 'react'
import styled from 'styled-components'
import { Parallax, Background } from 'react-parallax'
// import { Link } from 'react-router-dom'

const HomeIngredients = ({ data }) => {
	let { Title, Description, Bucket } = data && data.IngredientsOfGoodVoiceDesign

	return (
		<Container>
			<Parallax strength={ 300 } className="parallax">
				<Wrapper className="content-container">
					<Text className="col2">
						<TitleContainer>{ Title }</TitleContainer>
						{ Description && 
							<DescriptionContainer>
								{ Description }
							</DescriptionContainer>
						}
					</Text>
					<List className="col2">
						<Item>
							<ItemTitle>{ Bucket[0].Title }</ItemTitle>
							<ItemText>
								{ Bucket[0].Description }
							</ItemText>
						</Item>
						<Item>
							<ItemTitle>{ Bucket[1].Title }</ItemTitle>
							<ItemText>
								{ Bucket[1].Description }
							</ItemText>
						</Item>
						<Item>
							<ItemTitle>{ Bucket[2].Title }</ItemTitle>
							<ItemText>
								{ Bucket[2].Description }
							</ItemText>
						</Item>
						<Item>
							<ItemTitle>{ Bucket[3].Title }</ItemTitle>
							<ItemText>
								{ Bucket[3].Description }
							</ItemText>
						</Item>
						{/* <ul className="left">
							<li>
								<Link to="/guidelines/21">Learn Microsoft's voice design principles</Link>
							</li>
						</ul> */}
					</List>
				</Wrapper>
				<Background className="background">
					<img src="assets/illustrations/background-ingredients.svg" />
				</Background>		
			</Parallax>	
		</Container>
	)
}

export default HomeIngredients

const Container = styled.div`
	width: 100%;
	background-color: #CA83FC;

	.parallax { 
		width: 100%;

		.react-parallax-background-children {	
			width: 100%;

			.background {	
				width: 50%;
				position: absolute;
				right: 0;

				img {	width: 100%; }
			}
		}
	}

	@media all and (max-width: 1199px) { 
		.parallax .background {
			display: none;
		}
	}
`

const Wrapper = styled.div`
	display: flex;
	width: 1000px;
	padding: 100px 0;
	margin: 0 auto;
	align-items: baseline;
	color: #000;
`

const List = styled.div`
	display: flex;
	flex-direction: column;
  width: 50%;
	min-width: 368px;
	
	ul {
		padding-top: 20px;
	}

	@media all and (max-width: 1199px) { 
		padding: 0 24px 24px 24px;
	}
`

const Item = styled.div`
	padding-bottom: 40px;
`

const ItemTitle = styled.h2`
`

const ItemText = styled.div`
	line-height: 20px;
`

const Text = styled.div`
	display: flex;
	flex-direction: column;
	align-items: left;
	padding: 0 50px 50px 0;

	@media all and (max-width: 1199px) { 
		padding: 0 24px 24px 24px;
	}
`

const TitleContainer = styled.h1`
	flex: 1;
	padding-bottom: 40px;
`

const DescriptionContainer = styled.div`
	max-width: 560px;
`