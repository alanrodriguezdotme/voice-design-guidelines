import React, { useEffect, useState, useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import classNames from 'classnames'
import { VoicePatternsContext } from '../../contexts/VoiceContextProvider';

const SideNavGroup = ({ data, header, hideHeader, title, shouldBeCollapsed }) => {
	let [ links, setLinks ] = useState([])
	let [ isCollapsed, setIsCollapsed ] = useState(shouldBeCollapsed)
	let { setPage, page } = useContext(VoicePatternsContext)

	useEffect(() => {
		if (data) { 
			createLinks()
		}
	}, [data, page])

	useEffect(() => {
		setIsCollapsed(shouldBeCollapsed)
	}, [shouldBeCollapsed])

	function createLinks() {
		let array = []
		let linkClasses = classNames({
			'hideHeader': hideHeader
		})

		data.map((item, i) => {
			let url = '/' + title.toLowerCase() + '/' + item.id
			array.push(
				<LinkWrapper 
					className={ linkClasses }
					key={ item.navigationSection + i }>
					<Link 
						className="link"
						onClick={ () => setPage(item.id) }
						to={ url }>
						{ item.nameOfPage }
						<Highlight
							className="highlight"
							style={{
								width: page === item.id ? '100%' : '0'
							}} />
					</Link>
				</LinkWrapper>
			)
		})

		setLinks(array)
	}

	let headerClasses = classNames({
		'collapsed': isCollapsed,
		'menu-link-header': true
	})

	return (
		<Container className={ hideHeader && 'hideHeader' }>
			{ !hideHeader && 
				<Title
					className={ headerClasses }
					onClick={ () => setIsCollapsed(!isCollapsed) }>
						<Icon iconName="ChevronUp" className="chevron" />
						<span>{ header }</span>
				</Title> }
			<Links
				hideHeader={ hideHeader }
				className={ headerClasses }>
				{ links.length > 0 &&
					links.map(link => link)
				}			
			</Links>
		</Container>
	)
}

export default SideNavGroup

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 0 12px 36px 12px;

	&.hideHeader {
		margin: 12px 0;
	}

	@media all and (max-width: 1199px) {
		margin: 0 24px 36px 24px;
	}
`

const Title = styled.div`
	display: flex;
	height: 44px;
	border-bottom: 1px solid rgb(234, 234, 234);
	align-items: center;
	font-size: 18px;
	margin-right: 12px;
	cursor: pointer;

	&.collapsed {
		.chevron {
			transform: rotate(90deg);
		}
	}

	.chevron {
		font-size: 12px;
		width: 28px;
		text-align: center;
		transition: transform 250ms cubic-bezier(.1,.9,.2,1);
	}
`

const Links = styled.ul`
	display: flex;
	flex-direction: column;
	height: 100%;
	opacity: 1;
	transform: translateY(0);
	visibility: visible;
	margin: 0;
	padding: 0;
	transition: 
		transform 350ms cubic-bezier(.1,.9,.2,1) 100ms, 
		height 350ms cubic-bezier(.1,.9,.2,1), 
		opacity 350ms cubic-bezier(.1,.9,.2,1) 100ms;

	&.collapsed {
		height: 0;
		opacity: 0;
		transform: translateY(-7px);
		visibility: hidden;
		transition: none;
	}
`

const LinkWrapper = styled.li`
	list-style-type: none;
	padding: 12px 36px 12px 28px;
	margin-right: 12px;
	font-size: 20px;
	font-family: "Segoe UI Semibold", sans-serif;
	font-weight: 600;

	&.hideHeader {
		padding: 12px 0 12px 24px;
	}

	a {
		text-decoration: none;
		color: #000;
		height: 100%;
		width: fit-content;
		display: flex;
		flex-direction: column;
		justify-content: center;
		cursor: pointer;

		&:hover {

			.highlight {
				width: 100% !important;
			}
		}
	}
`

const Highlight = styled.div`
	height: 2px;
	margin-top: 6px;
	transition: background-color 150ms cubic-bezier(.04, .69, .38, 1), width 150ms cubic-bezier(.04, .69, .38, 1);
	background-color: #000;
`