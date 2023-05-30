import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { loadTheme, getTheme } from 'office-ui-fabric-react';
import { initializeIcons } from '@uifabric/icons';
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';

import VoicePatternsContextProvider from './contexts/VoiceContextProvider';
import ControlsStylingContextProvider from './contexts/ControlsStylingProvider';
import GlobalFooter from './components/GlobalFooter';
import HomePageContextProvider from './contexts/HomePageContextProvider';
import Wrapper from './components/Wrapper';
import STTContextProvider from './contexts/STTContext';
import LUISContextProvider from './contexts/LUISContext';
import SkillBuilderContextProvider from './contexts/SkillBuilderContext';

const App = (props) => {
	//Initialize Fabric icons
	initializeIcons(undefined, { disableWarnings: true });

	useEffect(() => {
		let currentURL = window.location.href;

		//Redirect to the CMS editor if user has URL that contains "editor"
		if (currentURL.includes("editor")) {
			window.location.replace("https://voicepatternsadmin.azurewebsites.net/editor");
		}
	}, [])

	//Set custom theme using Fluent
	loadTheme({
		palette: {
			themePrimary: '#0078d4',
			themeLighterAlt: '#f3f9fd',
			themeLighter: '#d0e7f8',
			themeLight: '#a9d3f2',
			themeTertiary: '#5ca9e5',
			themeSecondary: '#1a86d9',
			themeDarkAlt: '#0078d4',
			themeDark: '#0078d4',
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
			black: '#494847',
			white: '#ffffff',
		}
	});

	// Render custom theme
	const theme = getTheme();

	return (
			<AppDiv theme={theme}>
				<VoicePatternsContextProvider>
					<ControlsStylingContextProvider>
						<STTContextProvider>
							<LUISContextProvider>
								<HomePageContextProvider>
									<SkillBuilderContextProvider>
										<BrowserRouter>
											<Wrapper />
											<GlobalFooter />
										</BrowserRouter>
									</SkillBuilderContextProvider>
								</HomePageContextProvider>
							</LUISContextProvider>
						</STTContextProvider>
					</ControlsStylingContextProvider>
				</VoicePatternsContextProvider>
			</AppDiv>
	);
}

export default App;

const AppDiv = styled.div`
  display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	font-size: ${FontSizes.size16};
	color: #000;
	background: #fff;
`