import React from 'react'
import styled from 'styled-components'
// import { Link } from 'react-router-dom'

const HomeMultiModal = ({ data }) => {
	let { Title, Description, Bucket } = data && data.VoiceVisualBetterTogether

	return (
		<Container>
			<Wrapper className="content-container">
				<Left className="col2">
					<TitleContainer>{ Title }</TitleContainer>
					{ Description && 
						<DescriptionContainer>
							{ Description }
						</DescriptionContainer>
					}
				</Left>
				<List className="col2">
					<Item>
						<ItemTitle>{ Bucket[0].Title }</ItemTitle>
						<Equal color="#6FCF97" />
						<ItemText>
							{ Bucket[0].Description }
						</ItemText>
					</Item>
					<Item>
						<ItemTitle>{ Bucket[1].Title }</ItemTitle>
						<Equal color="#56CCF2" />
						<ItemText>
							{ Bucket[1].Description }
						</ItemText>
					</Item>
					<Item>
						<ItemTitle>{ Bucket[2].Title }</ItemTitle>
						<Equal color="#CA83FC" />
						<ItemText>
							{ Bucket[2].Description }
						</ItemText>
					</Item>
					{/* <ul className="left">
						<li>
							<Link to="/guidelines/21">Learn Microsoft's voice design principles</Link>
						</li>
					</ul> */}
				</List>
			</Wrapper>
		</Container>
	)
}

export default HomeMultiModal

const Container = styled.div`
	width: 100%;
	background-color: #000;
	color: #fff;
`

const Wrapper = styled.div`
	padding: 100px 0;
	margin: 0 auto;
`

const List = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: initial;
	min-width: 368px;
	
	ul {
		padding-top: 20px;
	}
	
	@media all and (max-width: 1199px) { 
		padding: 0 24px 24px 24px;
	}
`

const Item = styled.div`
	padding-bottom: 20px;
	height: 33%;
	display: flex;
	align-items: center;
	flex: 1;

	@media all and (max-width: 1199px) {
		width: 100%;
	}
`

const ItemTitle = styled.h2`
	display: flex;
	align-items: center;
	flex: 1;
	margin-bottom: 0;

	@media all and (max-width: 1199px) {
		font-size: 20px !important;
		line-height: 30px !important;
		justify-content: flex-end;
		text-align: right;
	}
`

const ItemText = styled.h2`
	display: flex;
	align-items: center;
	flex: 1;
	margin-bottom: 0;

	@media all and (max-width: 1199px) {
		font-size: 20px !important;
		line-height: 30px !important;
	}
`

const Equal = styled.div`
	border-width: 14px 0;
	border-color: ${ p => p.color };
	border-style: solid;
	height: 42px;
	width: 64px;
	margin: 0 64px;

	
	@media all and (max-width: 1199px) {
		width: 36px;
		border-width: 8px 0;
		height: 24px;
		margin: 0 24px;
	}
`

const Left = styled.div`
	padding-right: 50px;

	@media all and (max-width: 1199px) {
		margin-bottom: 50px;
		padding: 0 24px 24px 24px;
	}
`

const TitleContainer = styled.h1`
	max-width: 600px;
	padding-bottom: 40px;
`

const DescriptionContainer = styled.div`
	max-width: 600px;
`