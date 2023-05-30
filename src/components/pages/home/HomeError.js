import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import { Link } from 'react-router-dom'

const HomeError = ({ data}) => {
	let { DesignForError } = data && data
	DesignForError["Description"] = "Voice technology makes mistakes, so we need to always be prepared with a back up plan. When unsure, ask, always allow for correction, and show progress along the way."
	DesignForError["Statements"] = [
		"When you get it right",
		"When you get close",
		"When you get it wrong",
		"When something goes wrong"
	]

	function renderStatements() {
		return DesignForError.Statements.map((statement, i) => { 
			return (
					<h2 key={'statement' + i}>{ statement }</h2> 
				)}
		)
	}

	return (
		<Container>
				<Wrapper className="content-container">
					<Left className="col2">
						<Title>
							{ DesignForError.Title }
						</Title>
						<Description>
							{ DesignForError.Description }
						</Description>
						<Statements>
							{ renderStatements() }
						</Statements>
					</Left>
					<Right className="col2">
						<Image src="assets/illustrations/error.svg" />
					</Right>
				</Wrapper>
		</Container>
	)
}

export default HomeError

const Container = styled.div`
	color: #000;
	background-color: #CA83FC;
	width: 100%;
`

const Wrapper = styled.div`
	padding: 100px 0;
	margin: 0 auto;

	@media all and (max-width: 1199px) {
		padding: 100px 0 50px 0;
	}
`

const Left = styled.div`
	p {
		margin: 0;
	}

	@media all and (max-width: 1199px) { 
		padding: 0 24px 24px 24px;
		width: 100%;
	}	
`

const Description = styled.div`
	max-width: 800px;
	padding-bottom: 40px;

	h2 {
		line-height: 60px;
	}
`

const Title = styled.h1`
	padding-bottom: 40px;
`

const Statements = styled.div`
	@media all and (max-width: 1199px) { 

		h2 {
			font-size: 24px !important;
			line-height: 36px !important;
		}
	}
`

const Right = styled.div`
	@media all and (max-width: 1199px) {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}	
`

const Image = styled.img`
  /* position: absolute;
  bottom: 0;
  left: 0; */
  position: relative;
  width: 85%;
  z-index: 1;
  bottom: 0;

  @media all and (max-width: 1599px) and (min-width: 1200px) {
    width: 75%;
  }

  @media all and (max-width: 1199px) {
    width: 50%;
  }
`