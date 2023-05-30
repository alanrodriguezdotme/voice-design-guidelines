import React, { useContext } from 'react'
import styled from 'styled-components'
import * as _ from 'underscore';

import { getTheme } from 'office-ui-fabric-react'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType'

import { VoicePatternsContext } from './../../../contexts/VoiceContextProvider'
import Slideshow from '../../Slideshow'
import ExampleSlideshow from '../../ExampleSlideshow';
import PatternExamples from '../../../contexts/PatternExampleContent'

const ReactMarkdown = require('react-markdown')

const PatternsTemplate = ({ data }) => {

	// render custom theme
	const theme = getTheme();

	const { setCurrentURL } = useContext(VoicePatternsContext)
	let cmsURL = "https://voicepatternsadmin.azurewebsites.net"

	const renderBasicList = (list) => {
		return list.map((data, index) => {
			return <li className="template-basicListItem" key={_.uniqueId()}>{data.text}</li>
		})
	}

	const renderBasicColumnedList = (list) => {
		return list.map((data, index) => {
			return <li className="template-basicColumnedListItem" key={_.uniqueId()}>
				<div className="template-columnedListTitle">{data.title} <br /></div>
				{data.text}
			</li>
		})
	}

	const renderLinkList = (list) => {
		return list.map((data, index) => {
			return <li key={_.uniqueId()}>
				<a href={data.linkURL} target={"_blank"} onClick={() => setCurrentURL(window.location.href)}>{data.linkTitle}</a>
			</li>
		})
	}

	const renderIconList = (list, icon, color) => {
		return list.map((data, index) => {
			return <li className="template-iconListItem" key={_.uniqueId()}>
				<Icon iconName={icon} className="template-iconListIcon" style={{ color: color }} />
				{data.text}
			</li>
		})
	}

	const renderIconButtonList = (list) => {
		return list.map((data, index) => {
			return (
				<li className="template-examplesItem" key={_.uniqueId()}>
					<Icon iconName={ data.icon } className="template-examplesItemIcon" />
					<span>{ data.text }</span>
					{/* <ActionButton
						style={{ paddingLeft: "0", fontSize: FontSizes.size16 }}
						iconProps={{ iconName: data.icon }}
						allowDisabledFocus >
						{data.text}
					</ActionButton> */}
				</li>
			)
		})
	}

	const renderHorizontalIconList = (list) => {
		return list.map((data, index) => {
			return <div className="template-horizontalIconListItem" key={_.uniqueId()}>
				<Icon iconName={data.icon} className="template-horizontalIconListIcon" style={{ color: data.color }} />
				<h3 className="template-horizontalIconListHeader">{data.title}</h3>
				<div className="template-horizontalIconListSubheader">{data.text}</div>
			</div>
		})
	}

	const renderDetailedPrinciplesList = (list) => {
		return list.map((data, index) => {
			return <div className="template-principlesDetailedListItem" key={_.uniqueId()}>
				{/* { data.Image && <div className="template-principlesDetailedListImage" style={{ backgroundImage: "url(" + cmsURL + data.Image.url + ")" }}></div> } */}
				<h4 className="template-horizontalIconListHeader">{data.title}</h4>
				<div>{data.text}</div>
			</div>
		})
	}

	const renderBannerImage = (list) => {
		if (list.length > 1) {
			return <Slideshow images={ list } />
		} else if (list.length === 1 && list[0].url) {
			console.log(list)
			return <img className="template-bannerImage" src={cmsURL + list[0].url} />
		} else {
			return null
		}
	}

	const renderPatternExamples = () => {
		let examples = null
		let isEyesOff = false
		
		switch (data.pageHeader.header) {
			case 'Recall pattern':
				examples = PatternExamples.RecallPatternExamples
				break
			case 'Create pattern':
				examples = PatternExamples.CreatePatternExamples
				break
			case 'Present pattern':
				examples = PatternExamples.PresentPatternExamples
				isEyesOff = true
				break
			case 'Navigate pattern':
				examples = PatternExamples.NavigatePatternExmaples
				break
			default:
				break
		}

		if (examples !== null) {
			return (				
				<div className="template-exampleSlideshow">
					<ExampleSlideshow 
						slides={ examples }
						isEyesOff={ isEyesOff } />
				</div>
			)
		} else { return null }
	}

	return (
		<PatternsTemplateDiv data={data} theme={theme}>

			{data && data.pageHeader.header &&
				<h1 className="template-pageHeader">{data.pageHeader.header}</h1>
			}

			{data && data.pageHeader.description &&
				<div className="template-pageHeaderDescription text">{data.pageHeader.description}</div>
			}

			{data && data.pageHeader.bannerImage.length > 0 &&
				renderBannerImage(data.pageHeader.bannerImage)
			}

			<div className="template-2-column">
				<div className="template-left-column">
					{data && data.description &&
						<div className="template-description">
							<h2 className="template-pageSubheader">{data.description.header}</h2>
							<ReactMarkdown source={data.description.description} />
						</div>
					}

					{/*
					{data.description.list &&
						<ul className="template-basicColumnedList">{renderBasicColumnedList(data.description.list)}</ul>
					} */}

					{data && data.keyCriteria &&
						<h2 className="template-pageSubheader">{data.keyCriteria.header}</h2>
					}

					{data && data.keyCriteria &&
						<ul className="template-basicList">{renderBasicList(data.keyCriteria.list)}</ul>
					}

					{data && data.patternOverview &&
						<h2 className="template-pageSubheader" >{data.patternOverview.header}</h2>
					}

					{data && data.patternOverview && data.patternOverview.bannerImage.length > 0 &&
						<div className="template-patternOverviewImageWrapper">
							<img className="template-patternOverviewImage" src={cmsURL + data.patternOverview.bannerImage[0].url} />
						</div>
					}

					{data && data.patternsUsed &&
						<h2 className="template-pageSubheader">{data.patternsUsed.header}</h2>
					}
		
					{data && data.patternsUsed &&
						<ul className="template-basicList">{renderLinkList(data.patternsUsed.list)}</ul>
					}
				</div>

				{data && data.pageHeader.header && renderPatternExamples() }

			</div>

			{data && data.whenToUse &&
				<h2 className="template-pageSubheader">{data.whenToUse.header}</h2>
			}

			{data && data.whenToUse &&
				<ul className="template-basicList">{renderBasicList(data.whenToUse.list)}</ul>
			}

			{data && data.bestPractices &&
				<h2 className="template-pageSubheader">{data.bestPractices.header}</h2>
			}

			{data && data.bestPractices &&
				<div className="template-bestPractices">
					<div className="template-bestPracticesSection">
						<div className="template-bestPracticesSubheader">Do's</div>
						<ul className="template-basicList">{renderIconList(data.bestPractices.dosList, "CheckMark", "#6FCF97")}</ul>
					</div>
					<div className="template-bestPracticesSection">
						<div className="template-bestPracticesSubheader">Dont's</div>
						<ul className="template-basicList">{renderIconList(data.bestPractices.dontsList, "Cancel", "#E23030")}</ul>
					</div>
				</div>
			}

			{data && data.modeGuidelines &&
				<h2 className="template-pageSubheader">{data.modeGuidelines.header}</h2>
			}

			{data && data.modeGuidelines &&
				<div className="template-horizontalIconList">{renderHorizontalIconList(data.modeGuidelines.list)}</div>
			}

			{data && data.principles &&
				<h2 className="template-pageSubheader">{data.principles.header}</h2>
			}

			{data && data.principles &&
				<ul className="template-basicList">{renderBasicList(data.principles.list)}</ul>
			}

			{data && data.detailedList &&
				<div className="template-principlesDetailedList">{renderDetailedPrinciplesList(data.detailedList.list)}</div>
			}

			{data && data.documentationLinks &&
				<h2 className="template-pageSubheader">{data.documentationLinks.header}</h2>
			}

			{data && data.documentationLinks &&
				<ul className="template-basicList">{renderLinkList(data.documentationLinks.list)}</ul>
			}


			{data && data.examples &&
				<h2 className="template-pageSubheader" >{data.examples.header}</h2>
			}

			{data && data.examples &&
				<ul className="template-examplesList">{renderIconButtonList(data.examples.list)}</ul>
			}

			{data && data.inContext &&
				<h4 className="template-inContextHeader">{data.inContext.header}</h4>
			}

			{data && data.inContext &&
				<ul className="template-examplesList" >{renderIconButtonList(data.inContext.list)}</ul>
			}

			{/* {data.next.header &&
				<div className="template-nextHeader">{data.next.header}</div>
			} */}

			{/* {data.next.nextPage &&
				<ActionButton className="template-nextLink" style={{ fontSize: FontSizes.size20, fontWeight: FontWeights.semibold }} href={data.next.link} onClick={setCurrentURL(window.location.href)} >
					{data.next.nextPage}
					<Icon theme="themePrimary" iconName="ChevronRight" className="template-chevronNext" />
				</ActionButton>
			} */}
		</PatternsTemplateDiv>
	);
}

export default PatternsTemplate;

const PatternsTemplateDiv = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 12px 12px 0 24px;

	a {
		color: #0078d4;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	.template-pageHeader {
		margin: 4px 0 12px 0;
	}

	.template-pageSubheader {
		margin: 32px 0 20px 0;
	}

	.template-pageHeaderDescription {

	}

	.template-2-column {
		display: flex;
		align-items: baseline;
		
		@media all and (max-width: 1199px) {
			flex-direction: column;
			justify-content: flex-start;
		}
	}

	.template-left-column {
		flex: 1; 
		padding-right: 40px;

		@media all and (max-width: 1199px) {
			padding-right: 0;
		}
	}

	.template-exampleSlideshow {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 50%;

		@media all and (max-width: 1599px) and (min-width: 1200px) {
			width: 42%;
		}
		
		@media all and (max-width: 1199px) {
			width: 100%;
		}
	}

	.template-bannerImage {
		width: 100%;
		/* min-height: 180px; */
		background-size: cover;
		margin: 24px 0 0 0;
	}

	.template-description {
		ul {
			list-style: none;
			padding: 0;
			margin: 0;
		}

		li {
			font-size: inherit;
			font-weight: inherit;
			outline: none;
		}

		a {
			text-decoration: none;
			color: #0078d4;
			font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;

			&:hover {
				text-decoration: underline;
			}
		}
	}

	.template-descriptionText {
	}

	.template-basicList {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.template-basicColumnedList {
		list-style: none;
		padding: 0;
		margin: 32px 0 0 0;
		column-count: 2;
	}

	.template-examplesList {
		list-style: none;
		padding: 0;
		margin: 0 auto 0 0;
	}

	.template-basicListItem {
		border-left: 4px solid ${(props) => props.theme.palette.themePrimary};;
		padding: 0px 0 0px 12px;
		margin-bottom: 16px;
	}

	.template-iconListItem {
		padding: 0px 24px 0px 0;
		margin-bottom: 16px;
	}

	.template-basicColumnedListItem {
		border-left: 4px solid ${(props) => props.theme.palette.themePrimary};;
		padding: 0px 0 0px 12px;
		margin-bottom: 32px;
		min-height: 112px;
	}

	.template-patternOverviewImageWrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.template-patternOverviewImage {
		background-size: cover;
		width: 100%;

		@media all and (max-width: 1199px) {
			width: 80%;
		}
	}

	.template-examplesItem {
		margin-bottom: 4px;
		margin-right: 24px;
		height: 40px;
	}

	.template-examplesItemIcon {
		margin-right: 12px;
		color: #0078d4;
	}

	.template-nextHeader {
		font-size: ${FontSizes.size14};
		margin: 112px auto 6px auto;
		opacity: .4;
	}

	.template-nextLink {
		margin: 0 auto 100px auto;
	}

	.template-inContextHeader {
		margin: 6px 0 12px 0;
	}

	.template-chevronNext {
		margin: 4px 0 0 6px;
	}

	.template-columnedListTitle {
		margin-bottom: 6px;
	}

	.template-bestPractices {
		display: flex;
		background: #f3f3f3;
		padding: 24px;
		border-radius: 12px;
	}

	.template-bestPracticesSection {
		flex: 1;
	}

	.template-bestPracticesSubheader {
		margin-bottom: 12px;
	}

	.template-iconListItem {
		display: flex;
	}

	.template-iconListIcon {
		margin: 2px 10px 0 0;
	}

	.template-horizontalIconList {
		display: flex;
	}

	.template-horizontalIconListItem {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding-right: 24px;
	}

	.template-horizontalIconListHeader {
		margin-bottom: 6px;
	}

	.template-horizontalIconListSubheader {
	}

	.template-horizontalIconListIcon {
		margin-bottom: 12px;
	}

	.template-principlesDetailedList {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
	}

	.template-principlesDetailedListItem {
		margin-top: 48px;
		width: 50%;
		padding-right: 24px;
	}

	.template-principlesDetailedListImage {
		height: 72px;
		width: 72px;
		background-size: cover;
		border-radius: 100%;
		margin-bottom: 12px;
	}
`
