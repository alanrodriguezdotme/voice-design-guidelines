import React, { useContext } from 'react'
import styled from 'styled-components'
import * as _ from 'underscore'

import { ActionButton, IIconProps, getTheme } from 'office-ui-fabric-react'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { FontWeights } from '@uifabric/styling'
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType'
import { Link } from 'office-ui-fabric-react/lib/Link'

import { VoicePatternsContext } from './../../../contexts/VoiceContextProvider'
import Slideshow from '../../Slideshow'

const ReactMarkdown = require('react-markdown')

const GuidelinesTemplate = ({ data, hideBreadcrumb }) => {

	// render custom theme
	const theme = getTheme();

	const { setCurrentURL } = useContext(VoicePatternsContext)
	let cmsURL = "https://voicepatternsadmin.azurewebsites.net"

	const renderBasicList = (list) => {
		return list.map((data, index) => {
			return <li className="template-basicListItem" key={_.uniqueId()}>{ data.text}</li>
		})
	}

	const renderBasicColumnedList = (list) => {
		return list.map((data, index) => {
			return <li className="template-basicColumnedListItem" key={_.uniqueId()}>
				<div className="template-columnedListTitle">{ data.title} <br /></div>
				{ data.text}
			</li>
		})
	}

	const renderLinkList = (list) => {
		return list.map((data, index) => {
			return <li key={_.uniqueId()}>
				<Link href={ data.linkURL} target={"_blank"} onClick={() => setCurrentURL(window.location.href)}>{ data.linkTitle}</Link>
			</li>
		})
	}

	const renderIconList = (list, icon, color) => {
		return list.map((data, index) => {
			return <li className="template-iconListItem" key={_.uniqueId()}>
				<Icon iconName={icon} className="template-iconListIcon" style={{ color: color }} />
				{ data.text}
			</li>
		})
	}

	const renderIconButtonList = (list) => {
		return list.map((data, index) => {
			return <li className="template-examplesItem" key={_.uniqueId()}>
				<ActionButton style={{ paddingLeft: "0", fontSize: FontSizes.size16 }} iconProps={{ iconName: data.icon }} allowDisabledFocus >
					{ data.text}
				</ActionButton>
			</li>
		})
	}

	const renderHorizontalIconList = (list) => {
		return list.map((data, index) => {
			return <div className="template-horizontalIconListItem" key={_.uniqueId()}>
				<Icon iconName={ data.icon} className="template-horizontalIconListIcon" style={{ color: data.color }} />
				<div className="template-horizontalIconListHeader">{ data.title}</div>
				<div className="template-horizontalIconListSubheader">{ data.description}</div>
			</div>
		})
	}

	const renderDetailedPrinciplesList = (list) => {
		return list.map((data, index) => {
			return <div className="template-principlesDetailedListItem" key={_.uniqueId()}>
				{/* <div className="template-principlesDetailedListImage" style={{ backgroundImage: "url(" + cmsURL + data.Image.url + ")" }}></div> */}
				<div className="template-horizontalIconListHeader">{ data.title}</div>
				<div>{ data.text}</div>
			</div>
		})
	}

	const renderBannerImage = (list) => {
		if (list.length === 2) {
			return (
				<div className="template-two-images">
					{ list.map((item, i) => 
						<div key={ 'template-two-images-' + i }>
							<img className="template-bannerImage" src={ cmsURL + item.url } />
						</div>	 
					)}
				</div>
			)
		} else if (list.length > 1) {
			return <Slideshow images={ list } />
		} else if (list.length === 1) {
			return <img className="template-bannerImage" src={cmsURL + list[0].url} />
		}
	}

	return (
		data ? 
			<TemplateDiv className="templateDiv" data={ data} theme={theme}>
				{ data && data.pageHeader.header &&
					<h1 className="template-pageHeader">{ data.pageHeader.header}</h1>
				}
				
				{ data && data.navigationSection && !hideBreadcrumb &&
					<div className="template-pageBreadcrumb">{ data.navigationSection }</div>
				}

				{ data && data.pageHeader.description &&
					<div className="template-pageHeaderDescription">{ data.pageHeader.description}</div>
				}

				{ data && data.pageHeader.bannerImage.length > 0 && 
					renderBannerImage(data.pageHeader.bannerImage)
				}

				{ data && data.description &&
				<div className="template-description">
					<h2 className="template-pageSubheader">{data.description.header}</h2>
					<ReactMarkdown source={ data.description.description} />
				</div>
				}
				{/* 
				{ data.description.list &&
					<ul className="template-basicColumnedList">{renderBasicColumnedList(data.description.list)}</ul>
				} */}

				{ data && data.keyCriteria &&
					<h2 className="template-pageSubheader">{ data.keyCriteria.header}</h2>
				}

				{ data && data.keyCriteria &&
					<ul className="template-basicList">{renderBasicList(data.keyCriteria.list)}</ul>
				}

				{ data && data.patternOverview &&
					<h2 className="template-pageSubheader" >{ data.patternOverview.header}</h2>
				}

				{ data && data.patternOverview &&
					<img className="template-patternOverviewImage" src={cmsURL + data.patternOverview.bannerImage.url} />
				}

				{ data && data.patternsUsed &&
					<h2 className="template-pageSubheader">{ data.patternsUsed.header}</h2>
				}

				{ data && data.patternsUsed &&
					<ul className="template-basicList">{renderLinkList(data.patternsUsed.list)}</ul>
				}

				{ data && data.whenToUse &&
					<h2 className="template-pageSubheader">{ data.whenToUse.header}</h2>
				}

				{ data && data.whenToUse &&
					<ul className="template-basicList">{renderBasicList(data.whenToUse.list)}</ul>
				}

				{ data && data.bestPractices &&
					<h2 className="template-pageSubheader">{ data.bestPractices.header}</h2>
				}

				{ data && data.bestPractices &&
					<div className="template-bestPractices">
						<div className="template-bestPracticesSection">
							<div className="template-bestPracticesSubheader">Do's</div>
							<ul className="template-basicList">{renderIconList(data.bestPractices.dosList, "CheckMark", "#37B82F")}</ul>
						</div>
						<div className="template-bestPracticesSection">
							<div className="template-bestPracticesSubheader">Dont's</div>
							<ul className="template-basicList">{renderIconList(data.bestPractices.dontsList, "Cancel", "#E23030")}</ul>
						</div>
					</div>
				}

				{ data && data.modeGuidelines &&
					<h2 className="template-pageSubheader">{ data.modeGuidelines.header}</h2>
				}

				{ data && data.modeGuidelines &&
					<div className="template-horizontalIconList">{renderHorizontalIconList(data.modeGuidelines.list)}</div>
				}

				{ data && data.principles &&
					<h2 className="template-pageSubheader">{ data.principles.header}</h2>
				}

				{ data && data.principles &&
					<ul className="template-basicList">{renderBasicList(data.principles.list)}</ul>
				}

				{ data && data.detailedList &&
					<ul className="template-principlesDetailedList">{renderDetailedPrinciplesList(data.detailedList.list)}</ul>
				}

				{ data && data.documentationLinks &&
					<h2 className="template-pageSubheader">{ data.documentationLinks.header}</h2>
				}

				{ data && data.documentationLinks &&
					<ul className="template-basicList">{renderLinkList(data.documentationLinks.list)}</ul>
				}


				{ data && data.examples &&
					<h2 className="template-pageSubheader" >{ data.examples.header}</h2>
				}

				{ data && data.examples &&
					<ul className="template-examplesList">{renderIconButtonList(data.examples.list)}</ul>
				}

				{ data && data.inContext &&
					<h4 className="template-inContextHeader">{ data.inContext.header}</h4>
				}

				{ data && data.inContext &&
					<ul className="template-examplesList" >{renderIconButtonList(data.inContext.list)}</ul>
				}
			</TemplateDiv> :
			<div></div>
	);
}

export default GuidelinesTemplate;

const TemplateDiv = styled.div`
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

	.template-pageBreadcrumb {
		font-size: ${FontSizes.size12};
		opacity: .4;
		margin-bottom: 50px;
	}

	.template-pageHeader {
		margin: 4px 0 0 0;
	}

	.template-pageSubheader {
		margin: 32px 0 20px 0;
	}

	.template-pageHeaderDescription {

	}

	.template-bannerImage {
		/* width: 100%; */
		/* min-height: 180px; */
		background-size: cover;
		margin: 24px 0 0 0;
	}

	.template-two-images {
		display: flex;
		min-height: 500px;
		
		div {
			width: 50%;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;

			.template-bannerImage {
				width: 125%;
				margin: 0;
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

	.template-patternOverviewImage {
		background-size: cover;
		margin: 12px auto 0 0;
		max-width: 100%;
	}

	.template-examplesItem {
		margin-bottom: 4px;
		margin-right: 24px;
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
		font-weight: ${FontWeights.semibold};
		margin: 6px 0 12px 0;
	}

	.template-chevronNext {
		font-size: ${FontSizes.size14};
		margin: 4px 0 0 6px;
	}

	.template-columnedListTitle {
		font-weight: ${FontWeights.semibold};
		margin-bottom: 6px;
	}

	.template-bestPractices {
		display: flex;
		background: #f3f3f3;
		padding: 24px;
	}

	.template-bestPracticesSection {
		flex: 1;
	}

	.template-bestPracticesSubheader {
		font-weight: ${FontWeights.semibold};
		margin-bottom: 12px;
	}

	.template-iconListItem {
		display: flex;
	}

	.template-iconListIcon {
		margin: 2px 10px 0 0;
		font-size: 20px;
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
		font-size: ${FontSizes.size16};
		font-weight: ${FontWeights.semibold};
		margin-bottom: 6px;
	}

	.template-horizontalIconListSubheader {
		font-size: ${FontSizes.size14}
	}

	.template-horizontalIconListIcon {
		font-size: ${FontSizes.size32};
		color: ${(props) => props.theme.palette.themePrimary};
		margin-bottom: 12px;
	}

	.template-principlesDetailedListItem {
		margin-top: 48px;
		display: inline-block;
	}

	.template-principlesDetailedList {
		list-style: none;
		padding: 0;
		margin: 0;
		columns: 2;
		column-gap: 32px;
	}

	.template-principlesDetailedListImage {
		height: 72px;
		width: 72px;
		background-size: cover;
		border-radius: 100%;
		margin-bottom: 12px;
	}
`
