import React, { useEffect } from 'react'
import styled from 'styled-components'
import SkillBuilderContent from './SkillBuilderContent'
import SkillBuilderImage from './SkillBuilderImage'

const SkillBuilderMain = ({ data }) => {

	return (
		<Container>
			<Wrapper>
				<SkillBuilderContent data={ data } />
				<SkillBuilderImage data={ data } />
			</Wrapper>
		</Container>
	)
}

export default SkillBuilderMain

const Container = styled.div`
	width: 100%;
	height: 100%;
	flex: 1;
	display: flex;
	justify-content: center;

	&.showFlow {
		height: calc(100vh - 200px - 56px);
	}
`

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	width: 1600px;
	height: 100%;
	position: relative;

	@media all and (max-width: 1599px) and (min-width: 1200px) {
		width: 1200px;
	}
`
