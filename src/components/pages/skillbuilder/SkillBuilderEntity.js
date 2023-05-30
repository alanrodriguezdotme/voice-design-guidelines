import React, { useEffect } from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

const SkillBuilderEntity = ({ index, data }) => {
	let { dialog, setSelectedEntityIndex, selectedEntityIndex, deleteEntity, moveEntity } = data
	let { type, entity, prompt, userResponse } = dialog[index]

	function handleEntityClick() {
		setSelectedEntityIndex(index)
	}

	function handleDeleteClick(e) {
		e.preventDefault()
		deleteEntity(index)
	}

	function handleArrowClick(e, direction) {
		e.stopPropagation()
		e.preventDefault()
		moveEntity(index, index + direction)
	}

	let containerClasses = classNames({
		'filled': prompt.guiString !== "" || userResponse !== "",
		'selected': selectedEntityIndex === index,
		'confirm': type === 'Confirm'
	})

	return ( dialog[index] && 
		<Container 
			onClick={ () => handleEntityClick() }
			className={ containerClasses }>
			<Type>{ type }</Type>
			<Title>{ entity }</Title>
			<Label>
				{ prompt.guiString && prompt.guiString }
				{ userResponse && userResponse }
			</Label>
			{ type === 'Ask' && 
				<Controls>
					{ index > 1 &&
						<Button onClick={ (e) => { handleArrowClick(e, -1) }}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
								<path d="M2048 1088H250l787 787-90 90L6 1024 947 83l90 90-787 787h1798v128z" />
							</svg>
						</Button>
					} 
					<Button	onClick={ (e) => handleDeleteClick(e) }>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
							<path d="M1792 384h-128v1472q0 40-15 75t-41 61-61 41-75 15H448q-40 0-75-15t-61-41-41-61-15-75V384H128V256h512V128q0-27 10-50t27-40 41-28 50-10h384q27 0 50 10t40 27 28 41 10 50v128h512v128zM768 256h384V128H768v128zm768 128H384v1472q0 26 19 45t45 19h1024q26 0 45-19t19-45V384zM768 1664H640V640h128v1024zm256 0H896V640h128v1024zm256 0h-128V640h128v1024z" />
						</svg>
					</Button>
					{ index < dialog.length - 3 &&
						<Button onClick={ (e) => { handleArrowClick(e, 1) }}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
								<path d="M2042 1024l-941 941-90-90 787-787H0V960h1798l-787-787 90-90 941 941z" />
							</svg>
						</Button>
					} 
				</Controls> }
			
		</Container>
	)
}

export default SkillBuilderEntity

const Container = styled.div`
	height: 144px;
	width: 208px;
	border-radius: 28px;
	padding: 24px;
	display: flex;
	flex-direction: column;
	margin-right: 12px;
	border-width: 2px;
	border-color: rgba(0, 0, 0, 0.2);
	border-style: dashed;
	cursor: pointer;

	&.filled {
		background-color: #fff;
		border-width: 0;
	}

	&.selected {
		border-width: 2px;
		border-color: #CA83FC;
		border-style: solid;
		padding: 22px;
	}

	&.confirm {
		margin-left: auto;
	}
`

const Type = styled.div`
	font-size: 10px;
	color: white;
	background: #000;
	margin: -32px auto 0 auto;
	padding: 2px 8px;
	border-radius: 12px;
	text-transform: uppercase;
`

const Title = styled.div`
	font-size: 12px;
	font-family: 'Segoe UI Bold', sans-serif;
	text-transform: uppercase;
	margin: 6px 0 6px 0;
	color: #CA83FC;
`

const Label = styled.div`
	font-size: 14px;
	font-family: 'Segoe UI', sans-serif;
	height: 50px;
	overflow-y: auto;
`

const Controls = styled.div`
	display: flex;
`

const Button = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.125);

	&:hover {
		background-color: #CA83FC;
	}

	&:not(:last-child) {
		margin-right: 8px;
	}

	svg {
		fill: black;
		width: 16px;
		height: 16px;
	}
`