import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Parallax, Background } from 'react-parallax'

const HomeLearnMore = ({ data }) => {
	let { Title, Description, Bucket } = data && data.WantToLearnMore

	function renderBuckets() {
		return Bucket.map((item, i) => {
			let link
			let linkText
			switch(i) {
				case 0:	
					link = '/patterns'
					linkText = 'Go to Patterns'
					break
				case 1:	
					link = '/guidelines'
					linkText = 'Go to Building Blocks'
					break
				case 2:	
					link = '/skill-builder'
					linkText = 'Go to Skill Builder'
					break
			}

			return (
				<BucketContainer className="col1" key={ 'coretypebucket' + i }>
					<BucketWrapper>
						{/* <Image src={ 'https://voicepatternsadmin.azurewebsites.net' + item.Image[0].url } /> */}
						<BucketTitle>{ item.Title }</BucketTitle>
						<BucketText>{ item.Description }</BucketText>
						<BucketLink>
							<img src="assets/icons/arrow-right.svg" />
							<Link to={ link }>{ linkText }</Link>
						</BucketLink>
					</BucketWrapper>
				</BucketContainer>
			)
		})
	}

	return (
		<Container>
			<Parallax strength={ 300 } className="parallax">
				<Wrapper className="content-container">
					<Top className="col4">
						<TitleContainer>{ Title }</TitleContainer>
						<DescriptionContainer>{ Description }</DescriptionContainer>
					</Top>
					<Bottom className="content-container">
						{ data && renderBuckets() }
						<BucketContainer className="col1" key={ 'coretypebucket3' }>
							<Image className="illustration" src="assets/illustrations/navigation-marker-map.svg" />
						</BucketContainer>
					</Bottom>
				</Wrapper>
				<Background className="background">
					<img src="assets/illustrations/background-learn-more.svg" />
				</Background>		
			</Parallax>
		</Container>
	)
}

export default HomeLearnMore

const Container = styled.div`
	color: #000;
	background-color: #fff;
	width: 100%;

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
	padding: 100px 0 150px 0;
	margin: 0 auto;
	flex-direction: column;
  background-image: url('assets/illustrations/navigation-marker-map.svg');
	background-repeat: no-repeat;
	background-position: right 45%;
	background-size: 25% 65%;

	@media all and (max-width: 1199px) {
		background-image: none;
		padding: 100px 0 50px 0;
	}
`

const Top = styled.div`
	padding-bottom: 100px;

	@media all and (max-width: 1199px) { 
		padding: 0 24px 40px 24px;
	}
`

const TitleContainer = styled.h1`
	padding-bottom: 40px;
`

const DescriptionContainer = styled.div`
`

const Bottom = styled.div`
	display: flex;
	width: 100%;
	
	@media all and (max-width: 1199px) {
		padding: 0 24px 24px 24px;
		flex-wrap: wrap;
		flex-direction: row !important;
	}
`

const BucketContainer = styled.div`
	.illustration {
		display: none;
	}

	@media all and (max-width: 1199px) {
		padding-bottom: 100px;
		.illustration {
			display: block;
			width: 60%;
			margin: 0 auto;
		}
	}

	@media all and (max-width: 679px) {
		width: 100% !important;
		padding-bottom: 50px;

		.illustration {
			width: 50%;
		}
	}
`

const BucketWrapper = styled.div`
	display: flex;
	flex-direction: column;
`

const Image = styled.img`
`

const BucketTitle = styled.h3`
	@media all and (max-width: 679px) {
		margin-bottom: 12px;
	}
`

const BucketText = styled.div`
	padding: 0 20px 20px 0;
	flex: 1;

	@media all and (min-width: 1200px) and (max-width: 1599px) {
		min-height: 110px;
	}

	@media all and (max-width: 679px) {
		padding: 0 20px 12px 0;
	}
`

const BucketLink = styled.div`

	img {
		height: 18px;
		margin-right: 12px;
	}

	a { 
		color: #000;
		text-decoration: none;
	}
`