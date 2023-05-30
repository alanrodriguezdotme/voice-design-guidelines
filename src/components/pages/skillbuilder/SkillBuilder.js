import React, { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import * as _ from 'underscore'

import SkillBuilderMain from './SkillBuilderMain'
import SkillBuilderFlow from './SkillBuilderFlow'
import { SkillBuilderContext } from '../../../contexts/SkillBuilderContext'
import Emulator from './emulator/Emulator'

const SkillBuilder = () => {
	const data = useContext(SkillBuilderContext)
	const { currentContent, setCurrentContent, selectedEntityIndex, showFlow, showEmulator, setShowEmulator, content, currentStep, dialog } = data

	useEffect(() => {
		console.log({ selectedEntityIndex })
	}, [ dialog, selectedEntityIndex ])

	useEffect(() => {
		setCurrentContent(_.findWhere(content, { name: currentStep }))
	}, [currentStep])

	return (
		<Container className={ showFlow && "showFlow" } >
			{ currentContent && 
				<SkillBuilderMain
					className={ showFlow && "showFlow" } 
					data={ data } /> }
			{ showFlow && 
				<SkillBuilderFlow 
					data={ data } /> }
			{ showEmulator &&
				<Emulator
					dialog={ dialog }
					closeAction={ () => setShowEmulator(false) } /> }
		</Container>
	)
}

export default SkillBuilder

const Container = styled.div`
	width: 100%;
	height: calc(100vh - 180px);
	display: flex;
	flex-direction: column;
	font-size: 16px;
	background-image: url("assets/illustrations/background-skill-builder.svg");
	background-size: 60% 100%;
	background-repeat: no-repeat;
	background-position: right center;

	&.showFlow {
		height: calc(100vh - 248px);
	}

  h1 {
    font-family: 'Segoe UI Bold', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 42px;
    line-height: 50px;
  }

  h2 {
    font-size: 28px;
    line-height: 36px;
    font-family: "Segoe UI Semibold", sans-serif;
  }

  h3 {
    font-family: 'Segoe UI Bold', sans-serif;
    font-size: 24px;
    line-height: 32px;
  }
`
