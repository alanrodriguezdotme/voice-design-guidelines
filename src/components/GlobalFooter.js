import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'office-ui-fabric-react/lib/Link';
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';
import { FontWeights } from '@uifabric/styling';
import BugFiling from './BugFiling';
import { VoicePatternsContext } from './../contexts/VoiceContextProvider'

//The footer at the bottom of most pages.
const GlobalFooter = (props) => {
	const { patternsPage } = useContext(VoicePatternsContext);

	return (
		<GlobalFooterDiv currentPage={patternsPage}>
			<div className="globalFooter-contentContainer">
				<svg viewBox="0 0 24 24" width="16" className="globalFooter-msLogo">
					<rect className="globalFooter-msLogoSquare" width="11" height="11"></rect>
					<rect className="globalFooter-msLogoSquare" x="13" width="11" height="11"></rect>
					<rect className="globalFooter-msLogoSquare" y="13" width="11" height="11"></rect>
					<rect className="globalFooter-msLogoSquare" x="13" y="13" width="11" height="11"></rect>
				</svg>

				<div className="globalFooter-linkGroup">
					<Link href="https://support.microsoft.com/en-us/contactus" className="globalFooter-link">
						Contact Microsoft
					</Link>

					<Link href="https://go.microsoft.com/fwlink/?LinkId=521839" className="globalFooter-link">
						Privacy & cookies
					</Link>

					<Link href="https://go.microsoft.com/fwlink/?LinkID=206977" className="globalFooter-link">
						Terms of use
					</Link>

					<Link href="https://www.microsoft.com/trademarks" className="globalFooter-link">
						Trademarks
					</Link>

					<Link href="https://choice.microsoft.com/" className="globalFooter-link">
						About our ads
					</Link>
				</div>
				<BugFiling />
			</div>
		</GlobalFooterDiv>
	);
}

export default GlobalFooter;

const GlobalFooterDiv = styled.div`
	background: #000;
	color: #fff;
	display: ${props => props.currentPage !== "Skill Builder" ? 'flex' : "none"};
	justify-content: center;
	align-items: center;
	font-family: 'Segoe UI Semibold', sans-serif;
	font-size: ${FontSizes.size20};
	font-weight: ${FontWeights.semibold};
	width: 100%;
	min-height: 100px;
	margin-top: auto;
	text-align: center;

	.globalFooter-contentContainer {
		max-width: 1600px;
		display: flex;
		width: 100%;

		@media all and (max-width: 1599px) {
			max-width: 1200px;
		}

		@media all and (max-width: 1199px) {
			max-width: 800px;
			padding: 0 24px;
		}

		@media all and (max-width: 679px) {
			flex-direction: column;
			padding: 24px;
		}
	}

	.globalFooter-linkGroup {
		display: flex;
		margin: 0 auto;

		a {
			color: #fff;
		}

		@media all and (max-width: 679px) {
			flex-direction: column;
			align-items: flex-start;
			margin: 0;
			padding: 12px 0;
		}
	}

	.globalFooter-link {
		flex: 1;
		font-family: 'Segoe UI Semibold', sans-serif;
		font-size: ${FontSizes.size12};
		min-width: fit-content;
		padding: 12px;

		@media all and (max-width: 679px) {
			padding: 12px 12px 12px 0;
		}
	}

	.globalFooter-msLogoSquare {
		fill: #fff;
	}
`