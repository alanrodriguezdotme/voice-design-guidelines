import React, { useContext } from 'react'
import styled from 'styled-components'
import { VoicePatternsContext } from './../contexts/VoiceContextProvider'
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType'
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Link } from 'office-ui-fabric-react/lib/Link';

//This is the button at the bottom of the footer that allows a user to send a bug report via email. Using Microsoft Flow, once I receive the email, a bug is filed in DevOps and assigned to me.
const BugFiling = ({ inline, text }) => {
	const { currentBuild } = useContext(VoicePatternsContext);

	//Dynamically set the mailto: string
	const renderEmailTemplate = () => {
		let emailAddress = "alanro@microsoft.com";
		let subject = "[INSERT SHORT BUG TITLE HERE]";
		let body = renderEmailBody();

		return 'mailto:' + emailAddress + '?subject=' + subject + '&body=' + body
	}

	const renderEmailBody = () => {
		let attributeList = [
			{
				title: "Please fill out the sections below with repro steps to help better understand this bug. After you send this mail, a bug will automatically be created and tracked in DevOps.",
				value: ""
			},
			{
				title: "%0D%0A",
				value: ""
			},
			{
				title: "Repro steps: ",
				value: ""
			},
			{
				title: "1. ",
				value: ""
			},
			{
				title: "2. ",
				value: ""
			},
			{
				title: "3. ",
				value: ""
			},
			{
				title: "%0D%0A",
				value: ""
			},
			{
				title: "Expected: ",
				value: ""
			},
			{
				title: "%0D%0A",
				value: ""
			},
			{
				title: "%0D%0A",
				value: ""
			},
			{
				title: "Actual: ",
				value: ""
			},
			{
				title: "%0D%0A",
				value: ""
			},
			{
				title: "%0D%0A",
				value: ""
			},
			{
				title: "%0D%0A",
				value: ""
			},
			{
				title: "DIAGNOSTIC INFORMATION",
				value: ""
			},
			{
				title: "------------------------------------------",
				value: ""
			},
			{
				title: "currentBuild: ",
				value: currentBuild
			},
			{
				title: "platform: ",
				value: navigator.platform
			},
			{
				title: "userAgent: ",
				value: navigator.userAgent
			},
			{
				title: "language: ",
				value: navigator.language
			},
			{
				title: "tag: ",
				value: "VoicePatternsBug020491"
			}
		]

		var concatString = "";

		var bodyArray = attributeList.map((data, index) => {
			concatString = concatString + data.title + " " + data.value + "%0D%0A";
			return data
		})

		return concatString;
	}

	return (
		<BugFilingDiv className={ inline ? "inline" : "" }>
			{ !inline && <Icon iconName="BugSolid" className="creationBar-chooserIcon" /> }

			<Link href={renderEmailTemplate()} className={ !inline ? "bugFiling-link" : "bugFiling-link-inline" }>
				{ text && inline ? text : 'Submit a bug' }
			</Link>
		</BugFilingDiv>
	);
}

export default BugFiling;

const BugFilingDiv = styled.div`
	display: flex;
	align-items: center;

	&.inline {
		display: inline-block;
	}

	.bugFiling-link {		
		font-family: 'Segoe UI Semibold', sans-serif;
		font-size: ${FontSizes.size12};
		margin-left: 12px;
		color: #fff;
	}
`