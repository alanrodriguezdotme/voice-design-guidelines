import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HomeHero = ({ data, setGlobalPage }) => {
  let { Title, Description } = data && data.Hero

  return (
    <Container>
      <Wrapper className="content-container">       
        <Left className="col2">
          <TitleContainer>{ Title }</TitleContainer>
          <DescriptionContainer>
            { Description }
          </DescriptionContainer>
        </Left>
        <Right className="col2">
          <Image src="assets/illustrations/woman-speech-bubbles.svg" />
        </Right>
      </Wrapper>
    </Container>
  )
}

export default HomeHero

const Container = styled.div`
  width: 100%;
  min-height: 350px;
  background-color: #000;
  z-index: 2;
  position: relative;
  background: #000;
  color: #fff;
  position: relative;
`

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  align-items: flex-end;

  @media all and (max-width: 1199px) {  
    padding: 50px 0 0 0;
    background-image: none;
  }
`

const Left = styled.div`
  width: 100%;
  z-index: 2;
  padding: 100px 0;

  @media all and (max-width: 1199px) {   
    padding: 50px 0 50px 0;
  }
`

const TitleContainer = styled.h1`
  flex: 1;
  width: 100%;
  padding: 0 24px 24px 24px;
`

const DescriptionContainer = styled.div`
  width: 100%;
  padding: 0 24px 24px 24px;
`

const Right = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 3;
  position: relative;

  @media all and (max-width: 1199px) {    
    min-height: 200px;
    padding: 0 24px;
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
    width: 100%;
  }

  @media all and (max-width: 1199px) {
    width: 100%;
  }
`