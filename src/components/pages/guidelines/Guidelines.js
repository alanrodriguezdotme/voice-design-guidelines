import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as _ from 'underscore'

import { VoicePatternsContext } from '../../../contexts/VoiceContextProvider'
import SideNav from '../../sidenav/SideNav'
import GuidelinesTemplate from './GuidelinesTemplate'

const Guidelines = ({ match }) => {
	let { params } = match && match
	let { setGuidelinesData, guidelinesData, page, setPage } = useContext(VoicePatternsContext)

	useEffect(() => {
		if (!params.id) {
			setPage(21)
		} else if (parseInt(params.id, 10) !== page) {
			setPage(parseInt(params.id, 10))
		}
	}, [params])

	useEffect(() => {
		// get guidelines data
		const strapiEndpoint = 'https://voicepatternsadmin.azurewebsites.net/documentation-pages'
		// const strapiEndpoint = 'http://localhost:1337/documentation-pages'
		const token = '?token=8s0g949gjhd8f8342hjfehdf89409ggd0984wjf897sd'

		new Promise((resolve, reject) => {
			fetch(strapiEndpoint + token)
				.then((response) => {
					return response.json()
				})
				.then((data) => {
					// DO SOMETHING WITH THE DATA
					let newData = []

					for (let i = 0; i < data.length; i++) {
						if (data[i].navigationSection != 'Patterns') {
							newData.push(data[i])
						}
					}
					console.log(newData)
					setGuidelinesData([...newData])
					resolve(newData);
				})
				.catch((error) => {
					reject(error)
				});
		});
	}, [])

	return ( guidelinesData.length > 0 && 
		<Container>
			{ page != 34 && 
				<Menu>
					<Title>
						<Link 
							to="/guidelines/21"
							onClick={ () => setPage(21) }>
							Building blocks			
							<Highlight
								className="highlight"
								style={{
									width: page === 21 ? '100%' : '0'
								}} />
						</Link>
					</Title>
					<SideNav 
						hideHeader={ false }
						data={ guidelinesData } 
						title="Guidelines" />
				</Menu>
			}
			<Content className={ page === 32 ? 'framework' : ''}>
				<GuidelinesTemplate data={ _.findWhere(guidelinesData, { id: page }) } hideBreadcrumb={ page === 32 } />
			</Content>
		</Container>
	)
}

export default Guidelines

const Container = styled.div`
	width: 100%;
	display: flex;
	align-items: baseline;
	margin: 0 auto;
	padding-bottom: 100px;
	max-width: 1600px;
	font-size: 16px;
	font-family: "Segoe UI", sans-serif;
	line-height: 24px;

	h1 {
		font-family: 'Segoe UI Bold', sans-serif;
		font-style: normal;
		font-weight: bold;
		font-size: 42px;
		line-height: 80px;
		margin: 0;
	}

	h2 {
		font-family: 'Segoe UI Semibold', sans-serif;
		font-size: 32px;
		line-height: 40px;
		margin-top: 0;
	}

	h3 {
		font-size: 32px;
		line-height: 40px;
		font-family: "Segoe UI Semibold", sans-serif;
		margin: 0;
	}

	h4 {
		font-family: 'Segoe UI Bold', sans-serif;
		font-size: 28px;
		line-height: 36px;
		margin-top: 0;
	}

	@media all and (max-width: 1599px) and (min-width: 1200px) {
		max-width: 1200px;
	}

	@media all and (max-width: 1199px) {
		max-width: 800px;
		flex-direction: column;
	}
`
const Title = styled.h2`
	margin: 24px 0 12px 0;
	padding: 8px 0;
	padding-left: 24px;

	a {
		text-decoration: none;
		width: fit-content;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #000;
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

const Menu = styled.div`
	width: 25%;
	position: sticky;
	top: 0;

	@media all and (max-width: 1199px) {
		width: 100%;
		position: relative;
	}
`

const Content = styled.div`
	width: 75%;
	height: 100%;
	display: flex;
	flex-direction: column;
	flex: 1;
	margin-right: auto;
	padding-right: 24px;

	@media all and (max-width: 1199px) {
		width: 100%;
	}
`
