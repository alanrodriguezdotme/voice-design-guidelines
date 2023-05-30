import React, { useContext, useStore } from 'react'
import styled from 'styled-components'
import { loadTheme } from 'office-ui-fabric-react';
import CreationBar from './creationBar'
import BlueprintLanding from './blueprintLanding';
import { VoicePatternsContext } from './../../../../contexts/VoiceContextProvider'
// import DialogRenderer from '../DialogRenderer';
import DialogRendererOverlay from '../blueprintRenderer/DialogRendererOverlay';

//This component houses all the main components for the blueprint creator.
const BlueprintCreator = (props) => {
	const { isCreationBarVisible, rendererOverlayState } = useContext(VoicePatternsContext);
	
	loadTheme({
		palette: {
			themePrimary: '#CA83FC',
			themeLighterAlt: '#f3f9fd',
			themeLighter: '#d0e7f8',
			themeLight: '#a9d3f2',
			themeTertiary: '#5ca9e5',
			themeSecondary: '#1a86d9',
			themeDarkAlt: '#CA83FC',
			themeDark: '#CA83FC',
			themeDarker: '#004377',
			neutralLighterAlt: '#f8f8f8',
			neutralLighter: '#d7d7f6',
			neutralLight: '#eaeaea',
			neutralQuaternaryAlt: '#dadada',
			neutralQuaternary: '#d0d0d0',
			neutralTertiaryAlt: '#c8c8c8',
			neutralTertiary: '#bab8b7',
			neutralSecondary: '#a3a2a0',
			neutralPrimaryAlt: '#8d8b8a',
			neutralPrimary: '#323130',
			neutralDark: '#605e5d',
			black: '#000',
			white: '#ffffff',
		}
	});

	return (
		<BlueprintCreatorDiv className="blueprintCreator">
			{ rendererOverlayState && <DialogRendererOverlay /> }
			<BlueprintLanding />
			{isCreationBarVisible && <CreationBar key={"creationBar"} />}
		</BlueprintCreatorDiv>
	);
}

export default BlueprintCreator;

const BlueprintCreatorDiv = styled.div`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	padding-right: 24px;
`
