import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SkillBuilderEntity from './SkillBuilderEntity'
import * as _ from 'underscore'

const SkillBuilderFlow = ({ data }) => {
	let { dialog, setCurrentStep, setShowEmulator, isDialogComplete } = data
	let confirmIndex = dialog.length - 2
	let successIndex = dialog.length - 1
	let [ renderId, setRenderId ] = useState(0)

	useEffect(() => {
		// force re-render when moving entities
		setRenderId(_.random(1, 100))
		console.log({ dialog })
	}, [ dialog ])


	function renderEntities() {
		return dialog.map((slot, i) => {	
			const moveItem = (from, to) => {
				// remove `from` item and store it
				var captureData = slot.splice(from, 1)[0]
				// insert stored item into position `to`
				slot.splice(to, 0, captureData)
			}
			
			//don't render the last two items which are "Confirm" and "Success"
			if (i < confirmIndex) {
				return (
					<SkillBuilderEntity
						index={ i }
						data={ data }
						key={ 'entity-' + i }
					/>
				)
			}
		})
	}

	function handleAddButtonClick() {
		setCurrentStep('entity')
	}

	function handleStartEmulatorButtonClick() {
		if (isDialogComplete(true)) {
			setShowEmulator(true)
		}
	}

	return (
		<Container key={ 'skillbuilderflow-' + renderId }>
			{ renderEntities() }
			<AddButton
				onClick={ () => handleAddButtonClick() }>
				New slot 
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
					<path d="M2048 960v128h-960v960H960v-960H0V960h960V0h128v960h960z" />
				</svg>
			</AddButton>
			<SkillBuilderEntity
				index={ confirmIndex }
				data={ data }
				key={ 'entity-' + confirmIndex }	/>
			<SkillBuilderEntity
				index={ successIndex }
				data={ data }
				key={ 'entity-' + successIndex }	/>
			{ isDialogComplete(false) &&	
				<StartEmulatorButton
					onClick={ () => handleStartEmulatorButtonClick() }>
					<h4>RENDER IN EMULATOR</h4>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
						<path d="M1792 1024L512 1920V128l1280 896zM640 1674l929-650-929-650v1300z" />
					</svg>
				</StartEmulatorButton> }
		</Container>
	)
}

export default SkillBuilderFlow

const Container = styled.div`
	width: 100%;
	height: 168px;
	background: #EBEBF6;
	padding: 12px;
	display: flex;
	align-items: center;
	position: fixed;
	z-index: 200;
	bottom: 0;
	left: 0;
`

const AddButton = styled.div`
	height: 48px;
	min-width: 80px;
	border-radius: 24px;
	background-color: #CA83FC;
	color: #000;
	display: flex;
	align-items: center;
	text-align: center;
	cursor: pointer;
	padding: 0px 16px;
	text-transform: uppercase;
	font-size: 16px;
	font-family: "Segoe UI Semibold", sans-serif;
	font-weight: 600;

	svg {
		fill: #000;
		margin-left: 12px;
		width: 16px;
		height: 16px;
	}
`

const StartEmulatorButton = styled.div`
	height: 144px;
	width: 208px;
	border-radius: 28px;
	padding: 24px;
	display: flex;
	align-items: center;
	margin-right: 12px;
	background: #6FCF97;
	cursor: pointer;

	svg {
		fill: #000;
		width: 32px;
		margin: 0 8px;
	}
`