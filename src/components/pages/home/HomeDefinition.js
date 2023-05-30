import React from 'react'
import styled from 'styled-components'

const HomeDefinition = ({ data }) => {
	let { Title, Description } = data && data.WhatIsVoiceDesign

	return (
		<Container>
        <Wrapper className="content-container"> 
          <TitleContainer className="col2">{ Title }</TitleContainer>
          <DescriptionContainer className="col2">{ Description }</DescriptionContainer>
        </Wrapper>
		</Container>
	)
}

export default HomeDefinition

const Container = styled.div`
	width: 100%;
  min-height: 400px;
  position: relative;
  background: rgb(164, 237, 217);
  overflow: hidden;
  background: #6FCF97;
  color: #000;

  .parallax { 
    width: 100%;
    height: 100%;

    .react-parallax-background-children {	
      width: 100%;

      .background {	
        width: 100%;

        img {	width: 100%; }
      }
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  max-width: 1000px;
  padding: 100px 0;
  margin: 0 auto;
  height: 100%;
`

const TitleContainer = styled.h1`
  flex: 1;
	min-width: 50%;
  padding: 0 24px 24px 24px;
`

const Bottom = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`

const DescriptionContainer = styled.div`
  width: 100%;
  padding: 0 24px 24px 24px;
`