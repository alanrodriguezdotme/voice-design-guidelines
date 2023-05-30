import React, { useEffect, useState, useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { getTheme } from 'office-ui-fabric-react';
import { VoicePatternsContext } from './../../../../contexts/VoiceContextProvider'

const VoiceMeter = () => {
    const theme = getTheme();
    const {
        isMicOpen,
        userHypothesis
    } = useContext(VoicePatternsContext);
    let [isAnimationVisible, setIsAnimationVisible] = useState(true)
    let [speechAnimation, triggerSpeechAnimation] = useState(false)

    useEffect(() => {
        if (isMicOpen) {
            setIsAnimationVisible(true)
            renderSpeechAnimation()
        } else {
            setIsAnimationVisible(false)
        }
    }, [isMicOpen])

    useEffect(() => {
        if (userHypothesis) {
        triggerSpeechAnimation(true)
        setTimeout(() => {triggerSpeechAnimation(false)}, 300)

        // triggerSpeechAnimation(false)
        }
    }, [userHypothesis])

    const renderSpeechAnimation = () => {
        let animationNodes = [
            // {
            //     size: "xs",
            //     delay: 0
            // },
            // {
            //     size: "s",
            //     delay: -2
            // },
            // {
            //     size: "m",
            //     delay: -.8
            // },
            // {
            //     size: "l",
            //     delay: -.2
            // },
            // {
            //     size: "m",
            //     delay: -.7
            // },
            {
                size: "s",
                delay: -1
            },
            {
                size: "xs",
                delay: -.2
            },
            {
                size: "s",
                delay: -.8
            },
            {
                size: "m",
                delay: -.4
            },
            {
                size: "l",
                delay: -.6
            },
            {
                size: "xl",
                delay: -.2
            },
            {
                size: "l",
                delay: -.7
            },
            {
                size: "m",
                delay: -.4
            },
            {
                size: "s",
                delay: -2.3
            },
            {
                size: "xs",
                delay: -1.5
            },
            {
                size: "s",
                delay: -.3
            },
            // {
            //     size: "m",
            //     delay: -.1
            // },
            // {
            //     size: "l",
            //     delay: -0
            // },
            // {
            //     size: "m",
            //     delay: -2
            // },
            // {
            //     size: "s",
            //     delay: -2.2
            // },
            // {
            //     size: "xs",
            //     delay: -0
            // },
        ]

        return animationNodes.map((nodes, index) => {

            let randomValue = Math.random() + .2;

            return (
                <div
                    className="speechAnimation-floatingContainer"
                    key={"nd" + index}
                    style={{ transform: speechAnimation && "scale(1, 1.5)" }}>

                    <div className={"speechAnimation-node speechAnimation-node--" + nodes.size} style={{ animationDelay: nodes.delay + 's', transform: "scaleY(" + randomValue + ")" }}></div>
                </div>
            )
        })
    }

    return (
        <Container theme={theme}>
            {renderSpeechAnimation()}
        </Container>
    )
}

export default VoiceMeter

const randomNum = (min, max) => {
    let r = Math.random();
    let randomNumber = min + Math.floor(r * ((max - min) + 1));
    return randomNumber
}

const changeHeightXS = keyframes`
	0% { 
        height: 4px;
        transform: scale3d(1, 1, 1);
        }
	50% { 
        height: 4px;
        transform: scale3d(1, 1.5, 1);
        }
	100% { 
        height: 4px;
        transform: scale3d(1, 1, 1);
        }
`

const changeHeightS = keyframes`
	0% {
        height: 8px;
        transform: scale3d(1, 1, 1);
        }
	50% {
        height: 8px; 
        transform: scale3d(1, 1.5, 1);
    }
	100% {
        height: 8px;
        transform: scale3d(1, 1, 1);
        }
`

const changeHeightM = keyframes`
	0% { 
        height: 12px;
        transform: scale3d(1, 1, 1);
        }
	50% {
        height: 12px;
        transform: scale3d(1, .4, 1);
    }
	100% {
        height: 12px;
        transform: scale3d(1, 1, 1);
        }
`

const changeHeightL = keyframes`
	0% {
        height: 20px; 
        transform: scale3d(1, 1, 1);
        }
	50% {
        height: 20px; 
        transform: scale3d(1, .8, 1);
        }
	100% {
        height: 20px; 
        transform: scale3d(1, 1, 1);
        }
`

const changeHeightXL = keyframes`
	0% { 
        height: 26px; 
        transform: scale3d(1, 1, 1)
        }
	50% {
        height: 26px; 
        transform: scale3d(1, .8, 1);
        }
	100% {
        height: 26px; 
        transform: scale3d(1, 1, 1);
        }
`

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 40px;
	position: relative;
	z-index: 200;

.speechAnimation-floatingContainer {
    transition: transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.speechAnimation-node {
    width: 2px;
    background: ${(props) => props.theme.palette.themePrimary};
    border-radius: 3px;
    margin: 0 2px;
    transition: transform 150ms ease-in-out, height 150ms ease-in-out;
    height: 0px;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;

    &--xs {
            height: 4px;
            animation-name: ${changeHeightXS};
            animation-duration: ${randomNum(765, 1111) + 'ms'};
    }

    &--s {
            height: 9px;
            animation-name: ${changeHeightS};
            animation-duration: ${randomNum(888, 1200) + 'ms'};
    }

    &--m {
            height: 12px;
            animation-name: ${changeHeightM};
            animation-duration: ${randomNum(697, 1100) + 'ms'};
    }

    &--l {
            height: 20px;
            animation-name: ${changeHeightL};
            animation-duration: ${randomNum(750, 1138) + 'ms'};
    }

    &--xl {
            height: 26px;
            animation-name: ${changeHeightXL};
            animation-duration: ${randomNum(805, 1000) + 'ms'};
    }
}
`