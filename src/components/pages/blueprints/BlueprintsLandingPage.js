import React, { useContext, useStore } from 'react'
import styled from 'styled-components'
import LeftNav from './LeftNav'
import DialogRenderer from './DialogRenderer'
import { VoicePatternsContext } from './../../../contexts/VoiceContextProvider'
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';
import * as _ from 'underscore';
import BlueprintCreator from './blueprintCreator/blueprintCreator'

//This is the homepage of the Blueprints section of the site.
//TO-DO: convert this page to a section in the CMS so it is editable from there.
const LandingPage = (props) => {
    const { patternsPage } = useContext(VoicePatternsContext);

    const renderPatterns = () => {
        let patternItems = [
            {
                title: "Create",
                description: "2-3 line description of what this is. Enough to help someone have high level understanding without being too heavy.",
                example: "“Here is an utterance”",
                image: "./assets/placeholder.png"
            },
            {
                title: "Manage",
                description: "2-3 line description of what this is. Enough to help someone have high level understanding without being too heavy.",
                example: "“Here is an utterance”",
                image: "./assets/placeholder.png"
            },
            {
                title: "Act",
                description: "2-3 line description of what this is. Enough to help someone have high level understanding without being too heavy.",
                example: "“Here is an utterance”",
                image: "./assets/placeholder.png"
            },
            {
                title: "Recall",
                description: "2-3 line description of what this is. Enough to help someone have high level understanding without being too heavy.",
                example: "“Here is an utterance”",
                image: "./assets/placeholder.png"
            },
            {
                title: "Present",
                description: "2-3 line description of what this is. Enough to help someone have high level understanding without being too heavy.",
                example: "“Here is an utterance”",
                image: "./assets/placeholder.png"
            },
            {
                title: "Command & Control",
                description: "2-3 line description of what this is. Enough to help someone have high level understanding without being too heavy.",
                example: "“Here is an utterance”",
                image: "./assets/placeholder.png"
            }
        ]

        return patternItems.map((data, index) => {
            return <PatternItemDiv key={_.uniqueId()}>
                <div className="landingPage-patternImage" style={{ backgroundImage: "url(" + data.image + ")" }}></div>
                <div className="landingPage-patternContainer">
                    <div className="landingPage-patternTitle">{data.title}</div>
                    <div className="landingPage-patternDescription">{data.description}</div>
                    <div className="landingPage-patternExampleHeader">Example:</div>
                    <div className="landingPage-patternExample">{data.example}</div>
                </div>
            </PatternItemDiv>
        })
    }

    return (
        <LandingPageDiv>
            {patternsPage === "home" &&
                [<LeftNav key={_.uniqueId()} />,
                <div className="landingPage-scrollDiv" key={_.uniqueId()}>
                    <div className="landingPage-contentContainer">
                        <div className="landingPage-banner" ></div>
                        <div className="landingPage-patternHeader" >What are you trying to enable your user to do?</div>
                        <div className="landingPage-patternsContainer" >
                            {renderPatterns()}
                        </div>
                    </div>
                </div>]
            }
            {patternsPage === "something-else" && <BlueprintCreator />}
            {/* TO-DO: This needs to be converted to a switch case so it can handle more than just "send-message" */}
            {patternsPage === "send-message" && <DialogRenderer />
            }

        </LandingPageDiv>
    );
}

export default LandingPage;

const LandingPageDiv = styled.div`
    width: 100%;
    display: flex;

    .landingPage-contentContainer {
    }

    .landingPage-banner {
        min-height: 312px;
        width: 100%;
        background: url("./assets/placeholder.png");
        background-size: cover;
        margin: 24px 0 0 0;
    }

    .landingPage-patternHeader {
        font-size: ${FontSizes.size16};
        font-weight: bold;
        margin: 24px 0;
    }

    .landingPage-patternsContainer {
        display: grid;
        margin-bottom: 100px;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 10px;
    }

    .landingPage-scrollDiv {
        display: flex;
        flex-direction: column;
        height: 100%;
        margin-right: auto;
        flex: 1;
        max-width: 748px;
        padding: 0 12px 0 24px;
    }
`

const PatternItemDiv = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 456px;
    min-width: 200px;
    position: relative;
    transition: box-shadow 350ms ease-in, transform 350ms linear;

    &:hover {
        z-index: 200;
        box-shadow: 3px 3px 15px 4px rgba(0,0,0,0.14);
        cursor: pointer;
        transform: scale(1.02);
    }

    .landingPage-patternImage {
        width: 100%;
        background-size: cover;
        flex: 1;
    }

    .landingPage-patternContainer {
        padding: 24px;
        background: #efefef;
    }

    .landingPage-patternTitle {
        font-weight: bold;
        font-size: ${FontSizes.size16};
        color: #464646;
    }

    .landingPage-patternDescription {
        color: #676767;
        margin-top: 4px;
        line-height: 20px;
    }

    .landingPage-patternExampleHeader {
        font-size: ${FontSizes.size12};
        color: #898989;
        font-weight: bold;
        margin-top: 12px;
    }

    .landingPage-patternExample {
        font-size: ${FontSizes.size12};
        color: #898989;
        font-style: italic;
        margin-top: 6px;
    }
`


