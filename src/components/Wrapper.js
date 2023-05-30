import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Guidelines from './pages/guidelines/Guidelines'
import Patterns from './pages/patterns/Patterns'
import BlueprintCreator from './pages/blueprints/blueprintCreator/blueprintCreator'
import SkillBuilder from './pages/skillbuilder/SkillBuilder'
import styled from 'styled-components'
import { VoicePatternsContext } from '../contexts/VoiceContextProvider'
import Feedback from './feedback/Feedback'
import FeedbackButton from './feedback/FeedbackButton'
import GlobalNavigation from './GlobalNavigation'
import BugFiling from './BugFiling'

const Wrapper = () => {
	let { showFeedbackForm, setShowFeedbackForm } = useContext(VoicePatternsContext)
	return (
		<Container>
			{/* { showFeedbackForm && <Feedback data={{ showFeedbackForm, setShowFeedbackForm }} /> }
			<FeedbackButton data={{ showFeedbackForm, setShowFeedbackForm }} /> */}
			<GlobalNavigation />
			{/* <StatusBar>
				<div className="content">
					This site is a work in progress. Thanks for your patience. Please send any bugs to <BugFiling inline={ true } text="alanro@microsoft.com" />
				</div>
			</StatusBar> */}
			<Switch>
				<Route exact path="/" component={ Home } />
				<Route exact path="/guidelines" component={ Guidelines } />
				<Route path="/guidelines/:id" component={ Guidelines } />
				<Route exact path="/patterns" component={ Patterns } />
				<Route path="/patterns/:id" component={ Patterns } />
				{/* <Route path="/skill-builder" component={ BlueprintCreator } /> */}
				<Route path="/skill-builder" component={ SkillBuilder } />
			</Switch>
		</Container>
	)
}

export default Wrapper

const Container = styled.div`
	width: 100%;
	height: 100%;
`

const StatusBar = styled.div`
	width: 100%;
	background-color: #000;

	.content {
		max-width: 1600px;
		padding: 8px 24px;
		margin: 0 auto;
		text-align: center;
		color: #fff;
		font-size: 12px;
		font-family: "Segoe UI Semibold", sans-serif;
	}
`