import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { VoicePatternsContext } from './../contexts/VoiceContextProvider'
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';
import { FontWeights } from '@uifabric/styling';
import { Link } from 'react-router-dom';

//The navigation at the top of the site across all pages.
const GlobalNavigation = (props) => {
	let [ showMenu, setShowMenu ] = useState(false)

	const {
		globalPage,
		setGlobalPage,
		setPatternsPage,
		currentURL,
		setCurrentURL
	} = useContext(VoicePatternsContext);

	//Toggle between the Guidelines section and the Patterns section based on the URL. This allows us to deeplink.
	useEffect(() => {
		if (currentURL.includes("guidelines")) {
			if (currentURL.includes("34")) {
				setGlobalPage("Framework")
			}
			setGlobalPage("Guidelines")
		}
		else if (currentURL.includes("blueprints")) {
			setGlobalPage("Patterns")

			//Capture the blueprints page by taking the text after "/blueprints/"
			const getPage = currentURL.match(/blueprints\/(.*)/)[1];
			setPatternsPage(getPage);
		}
	}, [currentURL]);

	//Capture the documentation ID that is coming from the CMS and set the page to that ID to correlate with the side navigation.
	useEffect(() => {
		setCurrentURL(window.location.href)
	}, [globalPage === "Guidelines"]);

	const renderNavItemsContainer = () => {
		let navItems = [
			{
				name: "Framework",
				to: "/guidelines/34"
			},
			{
				name: "Patterns",
				to: "/patterns/32"
			},
			{
				name: "Building Blocks",
				to: "/guidelines/21"
			},
			{
				name: "Skill Builder",
				to: "/skill-builder"
			}
		]

		return navItems.map((data, index) => {
			return (
					<NavItemDiv onClick={() => handleNavClick(data.name) } key={"gni" + index}>
						<Link to={ data.to }>
							{ data.name }
							<div
								className="globalNavigation-highlight"
								style={{
									background: data.name === globalPage ? "#fff" : "transparent",
									width: data.name === globalPage ? "100%" : "0px"
								}}></div>
						</Link>
					</NavItemDiv>
			)
		})
	}

	function handleNavClick(name) {
		setGlobalPage(name)
		setShowMenu(false)
	}

	//Handle the "Voice Guidelines" header logo click
	const handleHomeClick = () => {
		// window.location = '/';
		setPatternsPage('home');
		setGlobalPage("Home");
	}

	function handleMenuClick() {
		setShowMenu(!showMenu)
	}

	return (
		<GlobalNavigationDiv>
			<div className="globalNavigation-wrapper">
				<Link id="homeLink" to="/" onClick={ () => handleHomeClick() }>
					<div className="globalNavigation-header">
						<svg viewBox="0 0 24 24" width="16" className="globalNavigation-msLogo">
							<rect className="globalFooter-msLogoSquare" width="11" height="11"></rect>
							<rect className="globalFooter-msLogoSquare" x="13" width="11" height="11"></rect>
							<rect className="globalFooter-msLogoSquare" y="13" width="11" height="11"></rect>
							<rect className="globalFooter-msLogoSquare" x="13" y="13" width="11" height="11"></rect>
						</svg>
						Voice Interaction Guidelines
					</div>
				</Link>
				<NavMenuButton 
					onClick={ () => handleMenuClick() }>
					{
						showMenu ?
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="28" height="28">
							<path d="M1115 1024l690 691-90 90-691-690-691 690-90-90 690-691-690-691 90-90 691 690 691-690 90 90-690 691z" />
						</svg>
						:
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="28" height="28">
							<path d="M2048 640H0V512h2048v128zm0 1024H0v-128h2048v128zm0-513H0v-127h2048v127z" />
						</svg>
					}
				</NavMenuButton>
				<NavMenu className={ showMenu ? 'show' : '' }>
					{ renderNavItemsContainer() }
				</NavMenu>
			</div>
		</GlobalNavigationDiv>
	);
}

export default GlobalNavigation;

const GlobalNavigationDiv = styled.div`
	background: #000;
	font-size: ${FontSizes.size20};
	font-weight: ${FontWeights.semibold};
	width: 100%;
	box-shadow: 0 2px 22px 4px rgba(0,0,0,0.05);
	position: relative;
	z-index: 100;
	color: #fff;
	

	.globalNavigation-wrapper {
		max-width: 1600px;
		position: sticky;
		height: 48px;
		display: flex;
		align-items: center;
		margin: 0 auto;
		padding: 0 24px;

		#homeLink {
			text-decoration: none;
			color: #fff;
			flex: 1;
		}

		@media all and (max-width: 1600px) and (min-width: 1200px) {
			max-width: 1200px;
		}

		@media all and (max-width: 1199px) {
			max-width: 800px;
		}
	}

	.globalNavigation-logo {
		width: 32px;
		margin: 4px 12px 0 0;
	}

	.globalNavigation-header {
		display: flex;
		align-items: center;
		margin-right: auto;
		height: 32px;
		width: inherit;
		font-size: 16px;
		font-weight: 600;
		font-family: "Segoe UI Semibold", sans-serif;

		&:hover {
			cursor: pointer;
		}
	}

	.globalNavigation-divider {
		width: 1px;
		height: 32px;
		background: rgba(0,0,0,.4);
		margin: 0 24px;
	}

	.globalNavigation-cortanaText {
		background: linear-gradient(45deg, #78BAFA, #A1A1DF);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		margin-right: 6px;
	}

	.globalNavigation-headerImage {
		height: 32px;
		margin-right: 12px;
	}

	.globalNavigation-msLogo {
		margin-right: 12px;
	}

	.globalFooter-msLogoSquare {
		fill: #fff;
	}
`

const NavMenu = styled.div`
	width: 50%;
	position: relative;
	display: flex;
	z-index: 10;

	@media all and (max-width: 1199px) {
		width: 200px;
		/* height: 0; */
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		position: absolute;
		top: 16px;
		right: 0;
		opacity: 0;
		transform: translateY(-100%);
		transition: 
			/* transform 350ms cubic-bezier(.04, .69, .38, 1),  */
			opacity 350ms cubic-bezier(.04, .69, .38, 1);

		&.show {
			/* height: initial; */
			opacity: 1;
			transform: translateY(32px);
		}
	}
`

const NavMenuButton = styled.div`
	display: none;
	height: 100%;
	width: 48px;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	position: relative;
	z-index: 12;
	background: #000;

	svg {
		fill: #fff;
	}

	@media all and (max-width: 1199px) {
		display: flex;
	}
`

const NavItemDiv = styled.div`
	display: flex;
	align-items: center;
	padding: 6px 12px 0 12px;
	justify-content: center;
	height: 100%;
	flex: 1;
	cursor: pointer;
	
	a {
		text-decoration: none;
		font-weight: 600;
		color: #fff;
		font-size: 16px;
		line-height: 21px;
		text-align: right;
		font-family: "Segoe UI Semibold", sans-serif;
	}
	
	.globalNavigation-highlight {
		height: 2px;
		margin-top: 6px;
		transition: background-color 150ms cubic-bezier(.04, .69, .38, 1), width 150ms cubic-bezier(.04, .69, .38, 1);
	}

	&:hover {

		.globalNavigation-highlight {
			width: 100% !important;
			background-color: #fff !important;
		}
	}

	@media all and (max-width: 1199px) {
		padding: 12px;
		margin-right: 24px;
		background-color: #000;
		justify-content: flex-end;
	}
`