import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as _ from 'underscore'

import SideNavGroup from './SideNavGroup'

const SideNav = ({ data, title, hideHeader }) => {
	let [ sections, setSections ] = useState(null)
	let [ windowDimensions, setWindowDimensions ] = useState(null)

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions())
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		// console.log({ windowDimensions })
	}, [windowDimensions])
	
	useEffect(() => {
		// get sections of data
		if (!sections && data) {
			let array = []

			// for patterns
			if (data[0].navigationSection === 'Patterns') {
				array = [
					{
						title: 'Create',
						isCollapsed: true,
						links: []
					},
					{
						title: 'Recall',
						isCollapsed: true,
						links: []
					},
					{
						title: 'Present',
						isCollapsed: true,
						links: []
					},
					{
						title: 'Navigate',
						isCollapsed: true,
						links: []
					}
				]

				array[0].links.push(data[1])
				array[1].links.push(data[5])
				array[2].links.push(data[8])
				array[3].links.push(data[13])

			// for guidelines
			} else {
				for (let i = 0; i < data.length; i++) {
					if (data[i].navigationSection !== 'Root') {
						let newSection = {
							title: data[i].navigationSection,
							isCollapsed: true,
							links: _.where(data, { navigationSection: data[i].navigationSection })
						}
						if (array.length === 0) {
							array.push(newSection)
						} else {
							if (!_.findWhere(array, { title: data[i].navigationSection })) {
								array.push(newSection)
							}
						}
					}
				}
			}
			
			setSections(array)
		}
	}, [data])

	function getWindowDimensions() {
		const { innerWidth: width, innerHeight: height } = window
		return { width, height }
	}

	function insertSpaces(string) {
		string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
		string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
		return string
	}

	function renderSideNavGroups() {
		return sections.map((section, index) => {
			return (
				<SideNavGroup
					shouldBeCollapsed={ data[0].navigationSection !== 'Patterns' && windowDimensions && windowDimensions.width < 1200 ? true : false }
					hideHeader={ hideHeader }
					title={ title }
					header={ insertSpaces(section.title) }
					data={ section.links }
					key={ 'navSection' + index } />
			)
		})
	}

	return (
		<Container>
			{ sections && renderSideNavGroups() }
		</Container>
	);
}

export default SideNav

const Container = styled.div`
	height: 100%;
	width: 100%;
	
	@media all and (max-width: 1199px) {
		display: flex;
	}
`
