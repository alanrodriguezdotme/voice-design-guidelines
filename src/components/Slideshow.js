import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Slideshow = ({ images }) => {
	let [ currentSlide, setCurrentSlide ] = useState(0)

	// reset slider on change
	useEffect(() => { setCurrentSlide(0) }, [images])
	
	function renderImages() {
		return images.map((image, i) => {
			return (
				<Image key={ "image" + i }>
					<img src={ "https://voicepatternsadmin.azurewebsites.net" + image.url } />
				</Image>
			)
		})
	}

	return (
		<Container>
			<Wrapper>
				<Images 
					imagesAmount={ images.length }
					currentSlide={ currentSlide }>
					{ renderImages() }
				</Images>
			</Wrapper>
			<Controls>
				<div className="left">
					{ currentSlide > 0 && 
						<Button onClick={ () => setCurrentSlide(currentSlide - 1) }>&lt;</Button> }
				</div>
				<div className="middle">
					<Dots>
						{ images.map((image, i) => 
							<Dot className={ currentSlide === i && 'selected' } key={ 'dot' + i }></Dot>
						)}
					</Dots>
				</div>
				<div className="right">
					{ currentSlide < images.length - 1 && 
						<Button onClick={ () => setCurrentSlide(currentSlide + 1) }>&gt;</Button>
					}
				</div>
			</Controls>
		</Container>
	)
}

export default Slideshow

const Container = styled.div`
	width: 100%;
	min-width: 712px;
	height: 100%;
	min-height: 600px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`

const Wrapper = styled.div`
	height: 546px;
	width: 100%;
	position: relative;
`

const Images = styled.div`
	position: absolute;
	top: 0;
	left: ${ p => p.currentSlide * -712 + 'px' };
	display: flex;
	height: 546px;
	width: ${ p => p.imagesAmount * 100 + '%' };
	transition: left 170ms ease-in-out;
`

const Image = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	
	img {
		height: 100%;
	}
`

const Controls = styled.div`
	display: flex;
	height: 42px;
	width: 100%;
	padding-top: 12px;

	.middle {
		flex: 1;
	}

	.left, .right {
		width: 42px;
	}
`

const Dots = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`

const Dot = styled.div`
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background-color: #eaeaea;

	&.selected {
		background-color: #666;
	}

	&:not(:last-child) {
		margin-right: 8px;
	}
`

const Button = styled.div`
	height: 36px;
	width: 36px;
	border-radius: 50%;
	background: #8686F9;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
	font-weight: bold;

	&:hover {
		cursor: pointer;
	}
`