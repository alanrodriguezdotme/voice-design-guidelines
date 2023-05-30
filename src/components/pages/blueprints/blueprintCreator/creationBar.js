import React, { useContext, useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { getTheme, Callout, getId, mergeStyleSets, DirectionalHint, CommandBarButton, PrimaryButton, } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';
import { FontWeights } from '@uifabric/styling';
import * as _ from 'underscore';
import { VoicePatternsContext } from './../../../../contexts/VoiceContextProvider'
import { ControlsStylingContext } from './../../../../contexts/ControlsStylingProvider'

const CreationBar = (props) => {
    const theme = getTheme();
    const {
        setCurrentEntitySelection,
        skillCreatorDialog,
        selectedEntityIndex,
        setSelectedEntityIndex,
        setRendererOverlayState,
        setTypeIntent,
        setTypeName,
        setTypeTimeDate,
        setTypeDuration,
        setTypeLocation,
        setTypeMessage,
        setTypeNumber,
        setTypeService,
        setTypeDeviceType,
        setTypeConfirm,
        setConfirmationState,
        setTypeSuccess,
        setUserResponse,
        setUserHypothesis,
        setIsMicOpen,
        setLuisResponse,
        setRepromptTurn,
        removeExistingEntity,
        setCortanaResponse,
        currentWizardScreen,
        setWizardScreen,
        demoReset,
        toggleDemoReset,
        rendererOverlayState
    } = useContext(VoicePatternsContext);

    const {
        primaryButtonStyle,
    } = useContext(ControlsStylingContext);

    const [chooserState, setChooserState] = useState(false)
    const [playButtonState, isPlayButtonActive] = useState(true)

    useEffect(() => {
        if (rendererOverlayState) {
            resetEntityTypes();
        }
    }, [demoReset]);


    const handleItemClick = (index) => {
        // setSelectedEntityIndex(index);
        //force the animation to start by setting to unknown wizard screen
        setWizardScreen("")

        //after animation is finished, set to correct wizard screen
        setTimeout(() => {
            setSelectedEntityIndex(index);
            setCurrentEntitySelection(skillCreatorDialog[index].entity);
            setWizardScreen("editExistingSlot")
        }, 350)
    }

    const renderBorderColor = (data, index) => {
        if (index === selectedEntityIndex) {
            return "2px dashed " + theme.palette.themePrimary
        }

        if (data.prompt.guiString === "") {
            return "2px dashed rgba(0,0,0,.2)"
        }
        else {
            return "0"
        }
    }

    const renderEntityItems = () => {
        return skillCreatorDialog.map((data, index) => {
            const moveItem = (from, to) => {
                // remove `from` item and store it
                var captureData = skillCreatorDialog.splice(from, 1)[0];
                // insert stored item into position `to`
                skillCreatorDialog.splice(to, 0, captureData);
            }

            //don't render the last two items which are "Confirm" and "Success"
            return index < skillCreatorDialog.length - 2 &&
                <EntityItem
                    theme={theme}
                    key={_.uniqueId()}
                    onClick={() => handleItemClick(index)}
                    className={index === selectedEntityIndex && "creationBar-selectedEntity"}
                    style={
                        {
                            background: data.prompt.guiString === "" && data.defaultUserResponse === "" ? "transparent" : "white",
                            border: renderBorderColor(data, index),
                        }
                    }>
                    <div className="creationBar-entityType">{data.type.toUpperCase()}</div>
                    <div className="creationBar-entityItemTitle">{data.entity}</div>
                    <div className="creationBar-entityItemLabel">{
                        data.prompt.guiString === "" && data.defaultUserResponse === "" ? "Incomplete" : data.prompt.guiString !== "" && data.prompt.guiString || data.defaultUserResponse !== "" && data.defaultUserResponse
                    }
                    </div>

                    {data.type === "Ask" &&
                        <div className="creationBar-entityActions" onClick={(e) => e.stopPropagation()}>
                            <Icon
                                iconName="Back"
                                className={selectedEntityIndex === index ? "creationBar-entityActionButtonSelected" : "creationBar-entityActionButton"}
                                onClick={() => (setSelectedEntityIndex(index - 1), moveItem(index, index - 1))} />

                            <Icon
                                style={{ margin: "0 auto" }}
                                iconName="Delete"
                                className={selectedEntityIndex === index ? "creationBar-entityActionButtonSelected" : "creationBar-entityActionButton"}
                                onClick={() => (removeExistingEntity(index), setSelectedEntityIndex(_.random(101, 1000)))} />

                            <Icon
                                iconName="Forward"
                                className={selectedEntityIndex === index ? "creationBar-entityActionButtonSelected" : "creationBar-entityActionButton"}
                                onClick={() => (setSelectedEntityIndex(index + 1), moveItem(index, index + 1))} />
                        </div>
                    }
                </EntityItem>
        })
    }

    useEffect(() => {
        console.log("selectedEntityIndex: " + selectedEntityIndex)
    }, [selectedEntityIndex]);

    useEffect(() => {
        console.log("WIZARD SCREEN")
        console.log(currentWizardScreen)
    }, [currentWizardScreen]);

    useEffect(() => {
        console.log(skillCreatorDialog)
    }, [skillCreatorDialog]);

    const addButtonCalloutStyle = mergeStyleSets({
        callout: {
            fontFamily: "SegoeUI, system-ui",
            width: 200,
        },
        action: [
            {
                display: "flex",
                width: "100%",
                margin: "0 auto 0 0",
                padding: "12px 12px",
                alignItems: "center",
            }
        ],
        icon: [
            {
                fontSize: FontSizes.size16,
                marginRight: "12px",
                color: theme.palette.themePrimary
            }
        ]
    });

    const playButtonCalloutStyle = mergeStyleSets({
        callout: {
            fontFamily: "SegoeUI, system-ui",
            maxWidth: 300,
            padding: 12
        },
        action: [
            {
                display: "flex",
                width: "100%",
                margin: "0 auto 0 0",
                padding: "8px 12px",
                alignItems: "center",
            }
        ],
        icon: [
            {
                fontSize: FontSizes.size16,
                marginRight: "12px",
                color: theme.palette.themePrimary
            }
        ]
    });

    const renderEntityChooser = (props) => {
        let entityChooserList = [
            {
                title: "Person",
                icon: 'Contact'
            },
            {
                title: "Time/date",
                icon: 'DateTime2'
            },
            {
                title: "Duration",
                icon: 'Timer'
            },
            {
                title: "Place",
                icon: 'POI'
            },
            {
                title: "Text",
                icon: 'TextField'
            },
            {
                title: "Number",
                icon: 'NumberField'
            },
            {
                title: "Service",
                icon: 'Favicon'
            },
            {
                title: "Device type",
                icon: 'Phone'
            },
        ]

        const handleChooserItemClick = (menuSelection) => {
            setChooserState(false);
            setCurrentEntitySelection(menuSelection);
            setSelectedEntityIndex(skillCreatorDialog.length);
            setWizardScreen("capturePrompt")
        }

        return entityChooserList.map((data, index) => {
            return <CommandBarButton
                iconProps={{ iconName: data.icon }}
                text={data.title}
                key={_.uniqueId()}
                className={addButtonCalloutStyle.action}
                onClick={() => handleChooserItemClick(data.title)}
                disabled={_.findWhere(skillCreatorDialog, { entity: data.title })}>
            </CommandBarButton>
        })
    }

    const handleAddClick = () => {
        setChooserState(!chooserState);
    }

    const resetEntityTypes = () => {
        setTypeIntent("");
        setTypeName(null);
        setTypeTimeDate(null);
        setTypeDuration(null);
        setTypeLocation(null);
        setTypeMessage(null);
        setTypeNumber(null);
        setTypeService(null);
        setTypeDeviceType(null);
        setTypeConfirm("");
        setConfirmationState(false);
        setTypeSuccess("");
        setUserResponse("");
        setUserHypothesis("");
        setIsMicOpen(false);
        setLuisResponse(null);
        setRepromptTurn(0);
        setCortanaResponse("How can I help?");
    }

    const handlePlayButtonClick = () => {
        if (skillCreatorDialog[0].prompt.guiString === "" ||
            skillCreatorDialog[skillCreatorDialog.length - 2].prompt.guiString === "" ||
            skillCreatorDialog[skillCreatorDialog.length - 1].prompt.guiString === ""
        ) {
            isPlayButtonActive(false)
        }
        else {
            isPlayButtonActive(true)
            resetEntityTypes();
            setRendererOverlayState(true);
        }
    }

    let _labelId = getId('callout-label');
    let _descriptionId = getId('callout-description');

    return (
        <CreationBarDiv theme={theme}>
            {renderEntityItems()}

            {currentWizardScreen === "captureIntent" || currentWizardScreen === "capturePrompt" &&
                < EntityItem theme={theme} className="creationBar-tempItem">
                    <div className="creationBar-tempTitle">DRAFT</div>
                </EntityItem>}

            <PrimaryButton
                id="addButton"
                className="creationBar-addItemButton"
                style={{ color: "white" }}
                styles={primaryButtonStyle}
                text={<div className="creationBar-buttonIconContainer">ADD A NEW SLOT <Icon iconName="Add" className="creationBar-addIcon" /></div>}
                allowDisabledFocus
                disabled={currentWizardScreen === "captureIntent" ||
                    currentWizardScreen === "captureEntity" ||
                    currentWizardScreen === "capturePrompt" ||
                    currentWizardScreen === "editExistingSlot"}
                onClick={() => handleAddClick()} />

            <EntityItem
                theme={theme}
                onClick={() => handleItemClick(skillCreatorDialog.length - 2)}
                className={skillCreatorDialog.length - 2 === selectedEntityIndex && "creationBar-selectedEntity"}
                style={
                    {
                        marginLeft: "auto",
                        background: skillCreatorDialog[skillCreatorDialog.length - 2].prompt.guiString !== "" ? "white" : "transparent",
                        border: renderBorderColor(skillCreatorDialog[skillCreatorDialog.length - 2], skillCreatorDialog.length - 2),
                    }
                }>

                <div className="creationBar-entityType"> {skillCreatorDialog[skillCreatorDialog.length - 2].type.toUpperCase()}</div>

                <div className="creationBar-entityItemTitle">
                    {skillCreatorDialog[skillCreatorDialog.length - 2].entity}
                </div>

                <div className="creationBar-entityItemLabel">{
                    skillCreatorDialog[skillCreatorDialog.length - 2].prompt.guiString === "" ? "Incomplete" : skillCreatorDialog[skillCreatorDialog.length - 2].prompt.guiString
                }
                </div>
            </EntityItem>

            <EntityItem
                theme={theme}
                onClick={() => handleItemClick(skillCreatorDialog.length - 1)}
                className={skillCreatorDialog.length - 1 === selectedEntityIndex && "creationBar-selectedEntity"}
                style={
                    {
                        background: skillCreatorDialog[skillCreatorDialog.length - 1].prompt.guiString !== "" ? "white" : "transparent",
                        border: renderBorderColor(skillCreatorDialog[skillCreatorDialog.length - 1], skillCreatorDialog.length - 1),
                    }
                }>

                <div className="creationBar-entityType">{skillCreatorDialog[skillCreatorDialog.length - 1].type.toUpperCase()}</div>

                <div className="creationBar-entityItemTitle">
                    {skillCreatorDialog[skillCreatorDialog.length - 1].entity}
                </div>

                <div className="creationBar-entityItemLabel">{
                    skillCreatorDialog[skillCreatorDialog.length - 1].prompt.guiString === "" ? "Incomplete" : skillCreatorDialog[skillCreatorDialog.length - 1].prompt.guiString
                }
                </div>
            </EntityItem>

            <PrimaryButton
                theme={theme}
                id="playButton"
                styles={primaryButtonStyle}
                allowDisabledFocus
                text={<div className="creationBar-buttonIconContainer"><span className="creationBar-renderButtonText">Render in emulator</span> <Icon iconName="Play" className="creationBar-playIcon" /></div>}
                style={{
                    width: "208px",
                    height: "144px",
                    color: "white",
                    fontWeight: "bold",
                    marginRight: "12px"
                }}
                disabled={skillCreatorDialog[0].prompt.guiString === "" ||
                    skillCreatorDialog[skillCreatorDialog.length - 2].prompt.guiString === "" ||
                    skillCreatorDialog[skillCreatorDialog.length - 1].prompt.guiString === ""}
                onClick={() => handlePlayButtonClick()} />

            {chooserState &&
                <Callout
                    className={addButtonCalloutStyle.callout}
                    ariaLabelledBy={_labelId}
                    ariaDescribedBy={_descriptionId}
                    role="alertdialog"
                    gapSpace={0}
                    directionalHint={DirectionalHint.rightBottomEdge}
                    target="#addButton"
                    setInitialFocus={true}
                    onDismiss={() => setChooserState(false)}>

                    {renderEntityChooser()}

                </Callout>
            }

            {playButtonState === false &&
                <Callout
                    className={playButtonCalloutStyle.callout}
                    ariaLabelledBy={_labelId}
                    ariaDescribedBy={_descriptionId}
                    role="alertdialog"
                    gapSpace={0}
                    directionalHint={DirectionalHint.topAutoEdge}
                    target="#playButton"
                    setInitialFocus={true}
                    onDismiss={() => isPlayButtonActive(true)}>

                    You still have undefined entity fields. Please make sure you've filled out every required field.

                </Callout>
            }
        </CreationBarDiv >
    );
}

export default CreationBar;

const creationBarIn = keyframes`
	0% { 
        transform: translate3d(0, 300px, 0);
        }
	100% { 
        transform: translate3d(0, 0, 0);
        }
`

const CreationBarDiv = styled.div`
    /* height: 152px; */
    background: #f4e6f3;
    padding: 12px 0 12px 12px;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    animation-name: ${creationBarIn};
    animation-duration: 350ms;
    animation-timing-function: cubic-bezier(.04, .69, .38, 1);

    .creationBar-addItemButton {
        margin: auto 0 auto 12px;
    }

    .creationBar-renderButton {
        font-size: ${FontSizes.size24};
    }

    .creationBar-tempItem {
        background: transparent;
        border: 2px dashed rgba(0, 0, 0, .2);
    }

    .creationBar-tempTitle {
        margin: auto;
        color: rgba(0, 0, 0, .2);
    }

    .creationBar-selectedEntity {
        /* border-color: red; */
    }

    .creationBar-buttonIconContainer {
        display: flex;
        align-items: center;
    }

    .creationBar-addIcon {
        margin-left: 12px;
    }

    .creationBar-playIcon {
        margin-left: 12px;
        font-size: ${FontSizes.size24};
    }

    .creationBar-renderButtonText {
        font-size: ${FontSizes.size16};
        font-weight: ${FontWeights.bold};
        max-width: 100px;
        line-height: 24px;
    }
`

const EntityItem = styled.div`
        height: 144px;
        width: 208px;
        border-radius: 28px;
        padding: 24px;
        display: flex;
        flex-direction: column;
        margin-right: 12px;
        /* border-color: blue; */

        &:hover {
            cursor: pointer;
        }

        .creationBar-entityItemTitle {
            font-weight: ${FontWeights.bold};
            font-size: ${FontSizes.size12};
            text-transform: uppercase;
            margin: 6px 0 6px 0;
            color: ${(props) => props.theme.palette.themePrimary};
        }

        .creationBar-entityItemLabel {
            font-size: ${FontSizes.size16};
            font-weight: ${FontWeights.bold};
        }

        .creationBar-entityType {
            font-size: ${FontSizes.size10};
            color: white;
            background: ${(props) => props.theme.palette.black};;
            margin: -32px auto 0 auto;
            padding: 2px 8px;
            border-radius: 12px;
        }

        .creationBar-entityActions {
            display: flex;
            margin-top: auto;
        }

        .creationBar-entityActionButton {
            flex: 1;
            height: 32px;
            max-width: 32px;
            background: #F8F8F8;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .creationBar-entityActionButtonSelected {
            flex: 1;
            height: 40px;
            max-width: 40px;
            background: rgba(255, 255, 255, .2);
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
`

const EntityChooser = styled.ul`
    position: absolute;
    background: white;
    width: 192px;
    left: 72px;
    bottom: -24px;
    list-style: none;
    padding: 0;
    box-shadow: 3px 3px 15px 4px rgba(0,0,0,0.14);
    font-size: ${FontSizes.size16};
    
        .creationBar-chooserItem {
            display: flex;
            margin: 0 auto 0 0;
            padding: 8px 12px;
            align-items: center;

            &:hover {
                cursor: pointer;
                background: rgba(0, 0, 0, .05);
            }
        }

        .creationBar-chooserIcon {
            font-size: ${FontSizes.size16};
            margin-right: 12px ;
            color: ${(props) => props.theme.palette.themePrimary};
        }
`
