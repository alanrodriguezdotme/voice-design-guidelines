import React from 'react'
import styled from 'styled-components'

const HomeCoreTypes = ({ data }) => {
	let { Title, Description, Bucket } = data && data.CoreTypesOfVoiceInteractions
	let newImages =[
		"core-types-traverse.svg",
		"core-types-transform.svg",
		"core-types-end-to-end.svg",
		"core-types-delegate.svg"
	]

	function renderBuckets() {
		return Bucket.map((item, i) => {
			let description = item.Description.split(/"(.+)/)

			return (
				<BucketContainer className="col1" key={ 'coretypebucket' + i }>
					<Image>
						<img src={ 'assets/illustrations/' + newImages[i] } />
					</Image>
					<BucketTitle>{ item.Title }</BucketTitle>
					<BucketText className="text">{ description[0] }</BucketText><br />
					<BucketExample className="text">{ '"' + description[1] }</BucketExample>
				</BucketContainer>
			)
		})
	}

	return (
		<Container>
			<Wrapper className="content-container">
				<Top className="col4">
					<TitleContainer className="col4">{ Title }</TitleContainer>
					<DescriptionContainer className="text col4">{ Description }</DescriptionContainer>
				</Top>
				<Bottom>
					{ data && renderBuckets() }
				</Bottom>
			</Wrapper>
		</Container>
	)
}

export default HomeCoreTypes

const Container = styled.div`
	width: 100%;
	background-color: #56CCF2;
	color: #000;
`

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 100px 0;
	margin: 0 auto;
`

const Top = styled.div`
	padding-bottom: 50px;

	@media all and (max-width: 1199px) { 
		padding: 0 24px 24px 24px;
	}
`

const TitleContainer = styled.h1`
	padding-bottom: 40px;
`

const DescriptionContainer = styled.div`
	max-width: 1015px;
`

const Bottom = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	max-width: 1600px;
	
	@media all and (max-width: 1199px) {
		flex-wrap: wrap;
		padding: 0 24px 24px 24px;
	}
`

const BucketContainer = styled.div`
	width: 25%;
	padding-right: 24px;
	text-align: left;

	@media all and (max-width: 1199px) {
		width: 50% !important;
	}

	@media all and (max-width: 680px) {
		width: 100% !important;
		padding: 24px 0;
	}
`

const Image = styled.div`
	position: relative;
	height: 125px;
	margin-bottom: 44px;

	img {
		position: absolute;
		left: 0;
		bottom: 0;
		transform: scale(0.8);
		transform-origin: bottom left;
	}

	@media all and (max-width: 679px) {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 24px;

		img {
			position: relative;
			transform-origin: bottom center;
		}
	}
`

const BucketTitle = styled.h3`
	padding-bottom: 8px;

	@media all and (max-width: 679px) {
		padding-bottom: 12px;
		margin-bottom: 0;
	}
`

const BucketText = styled.span`
`

const BucketExample = styled.span`
`