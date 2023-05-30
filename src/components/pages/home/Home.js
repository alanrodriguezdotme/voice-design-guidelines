import React, { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import HomeHero from './HomeHero'
import { HomePageContext } from '../../../contexts/HomePageContextProvider'
import HomeDefinition from './HomeDefinition'
import { VoicePatternsContext } from '../../../contexts/VoiceContextProvider'
import HomeIngredients from './HomeIngredients'
import HomeRightChoice from './HomeRightChoice'
import HomeCoreTypes from './HomeCoreTypes'
import HomeContext from './HomeContext'
import HomeError from './HomeError'
import HomeLearnMore from './HomeLearnMore'
import HomeMultiModal from './HomeMultiModal'

const Home = () => {
  let { homePageData, setHomePageData } = useContext(HomePageContext)
  let { setGlobalPage } = useContext(VoicePatternsContext)

  useEffect(() => {
		const strapiEndpoint = 'https://voicepatternsadmin.azurewebsites.net/home-pages'
		// const strapiEndpoint = 'http://localhost:1337/home-pages'
    const token = '?token=8s0g949gjhd8f8342hjfehdf89409ggd0984wjf897sd'

		new Promise((resolve, reject) => {
			fetch(strapiEndpoint + token)
				.then((response) => {
          console.log({ response })
					return response.json()
				})
				.then((data) => {
          // DO SOMETHING WITH THE DATA
          console.log(data)
          setHomePageData(data[0])
					resolve(data[0])
				})
				.catch((error) => {
          console.error(error)
					reject(error)
				})
		})
  }, [])

  return (
    homePageData &&
      <Container>
        <HomeHero
          data={ homePageData }
          setGlobalPage={ setGlobalPage } />
        <HomeDefinition
          data={ homePageData }
          setGlobalPage={ setGlobalPage } />
        <HomeRightChoice
          data={ homePageData }
          setGlobalPage={ setGlobalPage } />
        <HomeIngredients
          data={ homePageData }
          setGlobalPage={ setGlobalPage } />
        <HomeCoreTypes
          data={ homePageData } />
        <HomeMultiModal
          data={ homePageData }
          setGlobalPage={ setGlobalPage } />
        <HomeContext
          data={ homePageData }
          setGlobalPage={ setGlobalPage } />
        <HomeError data={ homePageData } />
        <HomeLearnMore data={ homePageData } />
      </Container>
  )
}

export default Home

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 20px;
  font-family: "Segoe UI Semibold", sans-serif;
  line-height: 30px;

  .content-container {
    width: 100%;
    height: 100%;
    max-width: 1600px;
    display: flex;
  }
  .col1 { width: 25%; }
  .col2 { width: 50%; }
  .col3 { width: 75%; }
  .col4 { width: 100%; }

  .text {
    font-size: 20px;
    font-family: "Segoe UI Semibold", sans-serif;
    line-height: 30px;
  }

  h1 {
    font-family: 'Segoe UI Bold', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 64px;
    line-height: 80px;
    margin: 0;
  }

  h2 {
    font-size: 32px;
    line-height: 46px;
    font-family: "Segoe UI Semibold", sans-serif;
    margin: 0;
  }

  h3 {
    font-family: 'Segoe UI Bold', sans-serif;
    font-size: 32px;
    line-height: 20px;
    margin-top: 0;
  }

  ul {
    margin: 0;
    height: 100%;
    padding-left: 0;

    &.right {
      padding-left: 100px;
      width: 50%;
    }
  }

  li {
    cursor: pointer;
    list-style-type: none;
    padding-bottom: 20px;
    font-family: 'Segoe UI';
    font-weight: 600;

    a {
      text-decoration: none;
      color: rgb(71, 71, 71);
    }

    &:hover {
      color: teal;
    }

    &:before {
      content: '';
      padding-right: 12px;
    }
  }

  @media all and (max-width: 1600px) and (min-width: 1200px) {
    .content-container {
      max-width: 1200px;
    }
  }

  @media all and (max-width: 1199px) {    
    .content-container {
      flex-direction: column;
      align-items: center;
      max-width: 800px;
    }

    .col1 {
      width: 50%;
    }

    .col2 {
      width: 100%;
      height: 50%;
      max-width: 800px;
    }

    h1 {
      font-size: 42px;
      line-height: 54px;
    }
  }
`

const HomeStatus = styled.div`
  width: 100%;
  height: 50px;
  background: #CA83FC;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;

  a {
    text-decoration: none;
    color: #fff;
    font-family: "Segoe UI Semibold", sans-serif;

    &:hover {
      color: rgb(0,67,119);
      text-decoration: underline;
    }
  }
`