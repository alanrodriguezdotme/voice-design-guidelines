import React, { useContext, useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { getTheme, Callout, getId, DefaultButton, PrimaryButton, mergeStyleSets, DirectionalHint } from 'office-ui-fabric-react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';
import { FontWeights } from '@uifabric/styling';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import * as _ from 'underscore';
import BlueprintLanding from './blueprintLanding';
import { VoicePatternsContext } from './../../../../contexts/VoiceContextProvider'
import { ControlsStylingContext } from './../../../../contexts/ControlsStylingProvider'

const CreationCanvas = (props) => {
    const theme = getTheme();
    const {
        pushNewEntity,
        currentEntitySelection,
        setCurrentEntitySelection,
        skillCreatorDialog,
        creationCanvasState,
        setCreationCanvasState,
        selectedEntityIndex,
        setSelectedEntityIndex,
        editExistingEntity,
        typeIntent,
        typeName,
        setTypeName,
        typeTimeDate,
        setTypeTimeDate,
        typeDuration,
        setTypeDuration,
        typeLocation,
        setTypeLocation,
        typeMessage,
        setTypeMessage,
        typeNumber,
        setTypeNumber,
        typeService,
        setTypeService,
        typeDeviceType,
        setTypeDeviceType,
        typeConfirm,
        typeSuccess,
        setWizardScreen
    } = useContext(VoicePatternsContext);

    const {
        primaryButtonStyle,
        secondaryButtonStyle,
        textfieldStyle,
        dropdownStyle
    } = useContext(ControlsStylingContext);

    const [labelTextfieldState, setLabelTextfieldState] = useState("");
    const [defaultValueTextfieldState, setDefaultValueTextfieldState] = useState("");
    const [promptGUITextfieldState, setPromptGUITextfieldState] = useState("");
    const [promptTTSTextfieldState, setPromptTTSTextfieldState] = useState("");
    const [repromptGUITextfieldState, setRepromptGUITextfieldState] = useState("");
    const [repromptTTSTextfieldState, setRepromptTTSTextfieldState] = useState("");
    const [cardAnimationState, setCardAnimationState] = useState(false);
    const [defaultToggleState, setDefaultToggleState] = useState(true);

    //callout states
    const [isPropertiesCalloutVisible, setPropertiesCalloutState] = useState(false);
    const [isPromptCalloutVisible, setPromptCalloutState] = useState(false);
    const [isRepromptCalloutVisible, setRepromptCalloutState] = useState(false);

    useEffect(() => {
        if (selectedEntityIndex < skillCreatorDialog.length) {
            setLabelTextfieldState(skillCreatorDialog[selectedEntityIndex].properties.label);
            setDefaultValueTextfieldState(skillCreatorDialog[selectedEntityIndex].properties.defaultValue);
            setPromptGUITextfieldState(skillCreatorDialog[selectedEntityIndex].prompt.guiString);
            setPromptTTSTextfieldState(skillCreatorDialog[selectedEntityIndex].prompt.ttsString);
            setRepromptGUITextfieldState(skillCreatorDialog[selectedEntityIndex].reprompt.guiString);
            setRepromptTTSTextfieldState(skillCreatorDialog[selectedEntityIndex].reprompt.ttsString);
        }

    }, [selectedEntityIndex]);

    useEffect(() => {
        if (defaultValueTextfieldState !== "") {
            setDefaultToggleState(false)
        }
        else {
            setDefaultToggleState(true)
        }

    }, [defaultValueTextfieldState]);

    useEffect(() => {
        if (creationCanvasState === 'edit') {
            //force the animation to occuring by letting it set to false on mount
            setTimeout(() => { setCardAnimationState(true) }, 5)
        }
    }, [creationCanvasState === 'edit']);

    useEffect(() => {
        if (creationCanvasState === 'new') {
            //force the animation to occuring by letting it set to false on mount
            setTimeout(() => { setCardAnimationState(true) }, 5)
            resetTextfields();
        }
    }, [creationCanvasState === 'new']);

    useEffect(() => {
        if (creationCanvasState === 'idle') {
            if (skillCreatorDialog[skillCreatorDialog.length - 2].prompt.guiString !== "" && skillCreatorDialog[skillCreatorDialog.length - 1].prompt.guiString !== "") {
                setWizardScreen("renderBlueprint");
                setCurrentEntitySelection("");
            }
            else {
                setWizardScreen("addNewSlot");
                setCurrentEntitySelection("");
            }
        }
    }, [creationCanvasState === 'idle']);

    const renderUserResponse = (props) => {
        let userResponse;

        switch (currentEntitySelection) {
            case 'Intent':
                userResponse = typeIntent
                break;
            case 'Person':
                userResponse = typeName
                break;
            case 'Time/date':
                userResponse = typeTimeDate
                break;
            case 'Duration':
                userResponse = typeDuration
                break;
            case 'Place':
                userResponse = typeLocation
                break;
            case 'Text':
                userResponse = typeMessage
                break;
            case 'Number':
                userResponse = typeNumber
                break;
            case 'Service':
                userResponse = typeService
                break;
            case 'Device type':
                userResponse = typeDeviceType
                break;
            case 'Summary':
                userResponse = typeConfirm
                break;
            case 'Rollup':
                userResponse = typeSuccess
                break;
            default: break;
        }
        return userResponse;
    }

    const renderEntityType = () => {
        let entityType;

        switch (currentEntitySelection) {
            case 'Intent':
                entityType = "Create"
                break;
            case 'Person':
                entityType = "Ask"
                break;
            case 'Time/date':
                entityType = "Ask"
                break;
            case 'Duration':
                entityType = "Ask"
                break;
            case 'Place':
                entityType = "Ask"
                break;
            case 'Text':
                entityType = "Ask"
                break;
            case 'Number':
                entityType = "Ask"
                break;
            case 'Service':
                entityType = "Ask"
                break;
            case 'Device type':
                entityType = "Ask"
                break;
            case 'Summary':
                entityType = "Confirm"
                break;
            case 'Rollup':
                entityType = "Success"
                break;
            default: break;
        }
        return entityType;
    }

    const handleFormSubmit = () => {

        event.preventDefault();
        setCardAnimationState(false);

        setTimeout(() => {
            let formEntity = {
                entity: currentEntitySelection,
                type: renderEntityType(),
                freeform: currentEntitySelection === "Text" ? true : false,
                userResponse: renderUserResponse(),
                defaultUserResponse: defaultValueTextfieldState,
                properties: {
                    required: false,
                    label: labelTextfieldState,
                    defaultValue: defaultValueTextfieldState
                },
                prompt: {
                    guiString: promptGUITextfieldState,
                    ttsString: promptTTSTextfieldState
                },
                reprompt: {
                    guiString: "Sorry, " + promptGUITextfieldState,
                    ttsString: "Sorry, " + promptGUITextfieldState
                },
            }

            if (creationCanvasState === 'new') {
                pushNewEntity(formEntity)
            }
            else if (creationCanvasState === 'edit') {
                editExistingEntity(formEntity)
            }

            // if (skillCreatorDialog[skillCreatorDialog.length - 2].prompt.guiString !== "" && skillCreatorDialog[skillCreatorDialog.length - 1].prompt.guiString !== "") {
            //     setWizardScreen("renderBlueprint");
            //     setCurrentEntitySelection("");
            // }
            // else {
            //     setWizardScreen("addNewSlot");
            //     setCurrentEntitySelection("");
            // }

            resetTextfields();
            //set index to something that will not match current indexes
            setSelectedEntityIndex(100);
            setCreationCanvasState("idle");
        }, 350)
    }

    const resetTextfields = () => {
        //reset textfields
        setLabelTextfieldState("");
        setDefaultValueTextfieldState("");
        setPromptGUITextfieldState("");
        setPromptTTSTextfieldState("");
        setRepromptGUITextfieldState("");
        setRepromptTTSTextfieldState("");
    }

    const handleCancelClick = () => {
        setCreationCanvasState("idle");
    }

    const handleLabelTextfield = (ev, text) => {
        setLabelTextfieldState(ev.target.value);
        setPromptGUITextfieldState(ev.target.value);
    }

    const handleDefaultValueTextfield = (ev, text) => {
        setDefaultValueTextfieldState(ev.target.value);
    }

    const handlePromptGUITextfield = (ev, text) => {
        setPromptGUITextfieldState(ev.target.value);
    }

    const handlePromptTTSTextfield = (ev, text) => {
        setPromptTTSTextfieldState(ev.target.value);
    }

    const handleRepromptGUITextfield = (ev, text) => {
        setRepromptGUITextfieldState(ev.target.value);
    }

    const handleRepromptTTSTextfield = (ev, text) => {
        setRepromptTTSTextfieldState(ev.target.value);
    }

    const optionsDisabled = (key) => {
        if (currentEntitySelection === 'Intent' ||
            currentEntitySelection === 'Summary' ||
            currentEntitySelection === 'Rollup' ||
            _.findWhere(skillCreatorDialog, { entity: key })) {
            return true
        }
        else {
            return false
        }
    }

    const options = [
        {
            key: 'Intent',
            text: 'Intent',
            hidden: true,
            disabled: optionsDisabled("Intent")
        },
        {
            key: 'Person',
            text: 'Person',
            disabled: optionsDisabled("Person")
        },
        {
            key: 'Time/date',
            text: 'Time/date',
            disabled: optionsDisabled("Time/date")
        },
        {
            key: 'Duration',
            text: 'Duration',
            disabled: optionsDisabled("Duration")
        },
        {
            key: 'Place',
            text: 'Place',
            disabled: optionsDisabled("Place")
        },
        {
            key: 'Text',
            text: 'Text',
            disabled: optionsDisabled("Text")
        },
        {
            key: 'Number',
            text: 'Number',
            disabled: optionsDisabled("Number")
        },
        {
            key: 'Service',
            text: 'Service',
            disabled: optionsDisabled("Service")
        },
        {
            key: 'Device type',
            text: 'Device type',
            disabled: optionsDisabled("Device type")
        },
        {
            key: 'Summary',
            text: 'Summary',
            hidden: true,
            disabled: optionsDisabled("Summary")
        },
        {
            key: 'Rollup',
            text: 'Rollup',
            hidden: true,
            disabled: optionsDisabled("Rollup")
        },
    ];

    const dropdownStyles = {
        dropdown: {
            fontFamily: "SegoeUI, system-ui",
            width: 200,
        },
        callout: {
            fontFamily: "SegoeUI, system-ui",
        },
        title: {
            display: 'inline-block',
            background: "transparent",
            border: 0,
            paddingLeft: 0,
            paddingRight: 20
        },
        caretDownWrapper: {
            position: 'relative',
            display: 'inline-block',
            top: -6
        },
        label: {
            opacity: .4
        }
    };

    const handleEntityDropdownSelection = (event, item) => {
        setCurrentEntitySelection(item.key)
    }

    let _labelId = getId('callout-label');
    let _descriptionId = getId('callout-description');

    const calloutStyle = mergeStyleSets({
        buttonArea: {
            verticalAlign: 'top',
            display: 'inline-block',
            textAlign: 'center',
            margin: '0 100px',
            minWidth: 130,
            height: 32
        },
        callout: {
            fontFamily: "SegoeUI, system-ui",
            maxWidth: 300
        },
        header: {
            padding: '18px 24px 12px'
        },
        title: [
            {
                fontSize: FontSizes.size12,
                opacity: .6,
                margin: "12px 0 0 0",
                fontWeight: FontWeights.semilight
            }
        ],
        inner: {
            height: '100%',
            padding: '0 24px 20px'
        },
        actions: {
            position: 'relative',
            marginTop: 20,
            width: '100%',
            whiteSpace: 'nowrap'
        },
        subtext: [
            {
                margin: "12px 0 0 0",
            }
        ],
        link: [
            theme.fonts.medium,
            {
                color: theme.palette.neutralPrimary
            }
        ]
    });

    const handleRequiredToggle = (ev, checked) => {
        if (checked) {
            setDefaultToggleState(true)
        }
        else {
            setDefaultToggleState(false)
            setDefaultValueTextfieldState("");
        }
    }

    const renderHintText = () => {
        let hintText;

        switch (currentEntitySelection) {
            case 'Intent':
                hintText = {
                    labelHintText: 'Ex: Send a message',
                    defaultValueHintText: 'Not applicable for an intent entity',
                    promptGUIHintText: 'Not applicable for an intent entity',
                    promptTTSHintText: 'Not applicable for an intent entity',
                    repromptGUIHintText: 'Not applicable for an intent entity',
                    repromptTTSHintText: 'Not applicable for an intent entity',
                }
                break;
            case 'Person':
                hintText = {
                    labelHintText: 'Ex: Ask for name',
                    defaultValueHintText: 'Ex: "No one"',
                    promptGUIHintText: 'Ex: "Who would you like to message?"',
                    promptTTSHintText: 'Ex: "Who would you like to message?"',
                    repromptGUIHintText: 'Ex: "Sorry, who would you like to message?"',
                    repromptTTSHintText: 'Ex: "Sorry, who would you like to message?"',
                }
                break;
            case 'Time/date':
                hintText = {
                    labelHintText: 'Ex: Ask for time',
                    defaultValueHintText: 'Ex: "5:00pm"',
                    promptGUIHintText: 'Ex: "What time would you like to be reminded?"',
                    promptTTSHintText: 'Ex: "What time would you like to be reminded?"',
                    repromptGUIHintText: 'Ex: "Sorry, what time would you like to be reminded?"',
                    repromptTTSHintText: 'Ex: "Sorry, what time would you like to be reminded?"',
                }
                break;
            case 'Duration':
                hintText = {
                    labelHintText: 'Ex: Ask for how long',
                    defaultValueHintText: 'Ex: "30 minutes"',
                    promptGUIHintText: 'Ex: "How long would you like to set the timer for?"',
                    promptTTSHintText: 'Ex: "How long would you like to set the timer for?"',
                    repromptGUIHintText: 'Ex: "Sorry, for how long?"',
                    repromptTTSHintText: 'Ex: "Sorry, for how long?"',
                }
                break;
            case 'Place':
                hintText = {
                    labelHintText: 'Ex: Ask for location',
                    defaultValueHintText: 'Ex: "Home"',
                    promptGUIHintText: 'Ex: "Where would you like to be reminded?"',
                    promptTTSHintText: 'Ex: "Where would you like to be reminded?"',
                    repromptGUIHintText: 'Ex: "Sorry, where would you like to be reminded?"',
                    repromptTTSHintText: 'Ex: "Sorry, where would you like to be reminded?"',
                }
                break;
            case 'Text':
                hintText = {
                    labelHintText: 'Ex: Ask for message content',
                    defaultValueHintText: 'Ex: "See you soon."',
                    promptGUIHintText: `Ex: "What's your message?"`,
                    promptTTSHintText: `Ex: "What's your message?"`,
                    repromptGUIHintText: `Ex: "Sorry, what's your message?"`,
                    repromptTTSHintText: `Ex: "Sorry, what's your message?"`,
                }
                break;
            case 'Number':
                hintText = {
                    labelHintText: 'Ex: Ask for how many',
                    defaultValueHintText: 'Ex: "10"',
                    promptGUIHintText: `Ex: "How many would you like to purchase?"`,
                    promptTTSHintText: `Ex: "How many would you like to purchase?"`,
                    repromptGUIHintText: `Ex: "Sorry, how many would you like?"`,
                    repromptTTSHintText: `Ex: "Sorry, how many would you like?"`,
                }
                break;
            case 'Service':
                hintText = {
                    labelHintText: 'Ex: Ask for app name',
                    defaultValueHintText: 'Ex: "Microsoft Teams"',
                    promptGUIHintText: `Ex: "Which app would you like to use?"`,
                    promptTTSHintText: `Ex: "Which app would you like to use?"`,
                    repromptGUIHintText: `Ex: "Sorry, which app?"`,
                    repromptTTSHintText: `Ex: "Sorry, which app?"`,
                }
                break;
            case 'Device type':
                hintText = {
                    labelHintText: 'Ex: Ask for device',
                    defaultValueHintText: 'Ex: "iPhone"',
                    promptGUIHintText: `Ex: "Which device would you like to use?"`,
                    promptTTSHintText: `Ex: "Which device would you like to use?"`,
                    repromptGUIHintText: `Ex: "Sorry, which device?"`,
                    repromptTTSHintText: `Ex: "Sorry, which device?"`,
                }
                break;
            case 'Summary':
                hintText = {
                    labelHintText: 'Ex: Confirm with the user',
                    defaultValueHintText: 'Ex: "No"',
                    promptGUIHintText: 'Ex: "Should I send your message?"',
                    promptTTSHintText: 'Ex: "Should I send your message?"',
                    repromptGUIHintText: 'Ex: "Sorry, should I send your message?"',
                    repromptTTSHintText: 'Ex: "Sorry, should I send your message?"',
                }
                break;
            case 'Rollup':
                hintText = {
                    labelHintText: 'Ex: Show rollup',
                    defaultValueHintText: "Not applicable for rollup entity",
                    promptGUIHintText: "Not applicable for rollup entity",
                    promptTTSHintText: "Not applicable for rollup entity",
                    repromptGUIHintText: "Not applicable for rollup entity",
                    repromptTTSHintText: "Not applicable for rollup entity",
                }
                break;
            default: break;
        }
        return hintText;
    }

    return (
        <CreationCanvasDiv theme={theme} cardAnimationState={cardAnimationState}>
            {creationCanvasState === "new" || creationCanvasState === "edit" ?
                <form onSubmit={() => handleFormSubmit()} className="creationCanvas-formContainer">
                    <div className="creationCanvas-languageOutput">
                        <div className="creationCanvas-languageOutputColumn ">
                            <div className="creationCanvas-formColumn">
                                <div className="creationCanvas-header">
                                    <Dropdown
                                        placeholder="Select an option"
                                        label="Slot type"
                                        options={options}
                                        styles={dropdownStyles}
                                        onChange={handleEntityDropdownSelection}
                                        defaultSelectedKey={currentEntitySelection} />
                                </div>

                                <div className="creationCanvas-entityDescription">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua.
                        </div>
                            </div>
                        </div>

                        {currentEntitySelection === "Intent" &&
                            <div className="creationCanvas-languageOutputColumn" style={{ margin: "0 16px", transitionDelay: "50ms" }}>
                                <div style={{ display: "flex" }}>
                                    <div className="creationCanvas-formColumn">
                                        <div className="creationCanvas-controlGroupHeader">What is your customer trying to do?
                                <Icon
                                                id="promptCalloutButton"
                                                iconName="Info"
                                                className="creationCanvas-infoIcon"
                                                onClick={() => setPromptCalloutState(!isPromptCalloutVisible)} />
                                        </div>
                                        <TextField
                                            styles={textfieldStyle}
                                            label="Trigger phrase"
                                            required
                                            className="creationCanvas-textField"
                                            onChange={handleLabelTextfield}
                                            value={labelTextfieldState}
                                            placeholder={renderHintText().labelHintText} />
                                    </div>
                                </div>
                            </div>
                        }

                        {currentEntitySelection !== "Intent" &&
                            <div className="creationCanvas-languageOutputColumn " style={{ margin: "0 16px", transitionDelay: "50ms" }}>
                                <div style={{ display: "flex" }}>
                                    <div className="creationCanvas-formColumn">
                                        <div className="creationCanvas-controlGroupHeader">
                                            {currentEntitySelection !== "Rollup" ?
                                                "What do you want Cortana to ask the user?"
                                                :
                                                "How do you want Cortana to tell the user?"}
                                            <Icon
                                                id="promptCalloutButton"
                                                iconName="Info"
                                                className="creationCanvas-infoIcon"
                                                onClick={() => setPromptCalloutState(!isPromptCalloutVisible)} />
                                        </div>

                                        <TextField
                                            label="Spoken prompt"
                                            styles={textfieldStyle}
                                            disabled={currentEntitySelection === "Intent" ? true : false}
                                            required
                                            className="creationCanvas-textField"
                                            onChange={handlePromptGUITextfield}
                                            value={promptGUITextfieldState}
                                            placeholder={renderHintText().promptGUIHintText} />

                                        <div className="creationCanvas-controlDescription">This is what Cortana will ask the user via voice, with or without a screen.</div>

                                        <div className="creationCanvas-hr"></div>

                                        <TextField
                                            label="Written prompt"
                                            styles={textfieldStyle}
                                            disabled={currentEntitySelection === "Intent" ? true : false}
                                            required
                                            className="creationCanvas-textField"
                                            onChange={handlePromptTTSTextfield}
                                            value={promptTTSTextfieldState}
                                            placeholder={renderHintText().promptTTSHintText} />

                                        <div className="creationCanvas-controlDescription">This is what Cortana will ask the user via GUI text on a screen.</div>
                                    </div>
                                </div>
                            </div>
                        }

                        {currentEntitySelection !== "Intent" && currentEntitySelection !== "Summary" && currentEntitySelection !== "Rollup" &&
                            <div className="creationCanvas-languageOutputColumn" style={{ transitionDelay: "100ms" }} >
                                <div style={{ display: "flex" }}>
                                    <div className="creationCanvas-formColumn">
                                        <div className="creationCanvas-controlGroupHeader">In what ways can the user respond?
                                <Icon
                                                id="propertiesCalloutButton"
                                                iconName="Info"
                                                className="creationCanvas-infoIcon"
                                                onClick={() => setPropertiesCalloutState(!isPropertiesCalloutVisible)} />
                                        </div>
                                        <Toggle
                                            label="Is user input required?"
                                            checked={defaultToggleState}
                                            // defaultChecked={() => handleToggleCheckedState()}
                                            onClick={() => setDefaultToggleState(!defaultToggleState)}
                                            onText="Required"
                                            offText="Not required"
                                            onChange={handleRequiredToggle} />

                                        <div className="creationCanvas-controlDescription">Use this toggle switch if explicit input from the user is required in order to continue.</div>

                                        <div className="creationCanvas-hr"></div>

                                        <TextField
                                            label="Default input value"
                                            styles={textfieldStyle}
                                            required
                                            disabled={defaultToggleState}
                                            className="creationCanvas-textField"
                                            onChange={handleDefaultValueTextfield}
                                            value={defaultValueTextfieldState}
                                            placeholder={renderHintText().defaultValueHintText} />

                                        <div className="creationCanvas-controlDescription">If the user doesn’t fill the slot, Cortana will suggest this value for them.</div>
                                    </div>
                                </div>
                            </div>
                        }

                        {isPropertiesCalloutVisible &&
                            <Callout
                                className={calloutStyle.callout}
                                ariaLabelledBy={_labelId}
                                ariaDescribedBy={_descriptionId}
                                role="alertdialog"
                                gapSpace={0}
                                directionalHint={DirectionalHint.rightCenter}
                                target="#propertiesCalloutButton"
                                setInitialFocus={true}
                                style={{ maxWidth: 300, padding: "12px 24px 24px 24px" }}
                                onDismiss={() => setPropertiesCalloutState(false)}>

                                <div className={calloutStyle.title}>Best practices</div>
                                <Link href="#">Style guide - Disambig</Link>
                                <div className={calloutStyle.subtext}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua. </div>
                                <div className={calloutStyle.title}>Examples</div>
                                <div>"Blah blah blah"</div>
                                <div className={calloutStyle.title}>Resources</div>
                                <Link href="#">Style guide - Disambig</Link><br />
                                <Link href="#">Components - Disambig</Link>

                            </Callout>
                        }

                        {isPromptCalloutVisible &&
                            <Callout
                                className={calloutStyle.callout}
                                ariaLabelledBy={_labelId}
                                ariaDescribedBy={_descriptionId}
                                role="alertdialog"
                                gapSpace={0}
                                directionalHint={DirectionalHint.rightCenter}
                                target="#promptCalloutButton"
                                setInitialFocus={true}
                                style={{ maxWidth: 300, padding: "12px 24px 24px 24px" }}
                                onDismiss={() => setPromptCalloutState(false)}>

                                <div className={calloutStyle.title}>Best practices</div>
                                <Link href="#">Style guide - Disambig</Link>
                                <div className={calloutStyle.subtext}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua. </div>
                                <div className={calloutStyle.title}>Examples</div>
                                <div>"Blah blah blah"</div>
                                <div className={calloutStyle.title}>Resources</div>
                                <Link href="#">Style guide - Disambig</Link><br />
                                <Link href="#">Components - Disambig</Link>

                            </Callout>
                        }

                        {isRepromptCalloutVisible &&
                            <Callout
                                className={calloutStyle.callout}
                                ariaLabelledBy={_labelId}
                                ariaDescribedBy={_descriptionId}
                                role="alertdialog"
                                gapSpace={0}
                                directionalHint={DirectionalHint.rightCenter}
                                target="#repromptCalloutButton"
                                setInitialFocus={true}
                                style={{ maxWidth: 300, padding: "12px 24px 24px 24px" }}
                                onDismiss={() => setRepromptCalloutState(false)}>

                                <div className={calloutStyle.title}>Best practices</div>
                                <Link href="#">Style guide - Disambig</Link>
                                <div className={calloutStyle.subtext}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore aliqua. </div>
                                <div className={calloutStyle.title}>Examples</div>
                                <div>"Blah blah blah"</div>
                                <div className={calloutStyle.title}>Resources</div>
                                <Link href="#">Style guide - Disambig</Link><br />
                                <Link href="#">Components - Disambig</Link>

                            </Callout>
                        }
                    </div>
                    <div className="creationCanvas-submitActions">
                        <DefaultButton
                            styles={secondaryButtonStyle}
                            text="Cancel"
                            allowDisabledFocus
                            style={{ width: 144 }}
                            onClick={() => handleCancelClick()}
                            className="creationCanvas-cancelButton" />

                        {creationCanvasState === "new" &&
                            <PrimaryButton
                                styles={primaryButtonStyle}
                                text="Add"
                                allowDisabledFocus
                                style={{ width: 144, marginLeft: 8 }}
                                type="submit"
                                className="creationCanvas-saveButton" />}

                        {creationCanvasState === "edit" &&
                            <PrimaryButton
                                styles={primaryButtonStyle}
                                text="Save"
                                allowDisabledFocus
                                style={{ width: 144, marginLeft: 8 }}
                                type="submit"
                                className="creationCanvas-saveButton" />}


                    </div>
                </form>
                :
                <BlueprintLanding />
            }
        </CreationCanvasDiv>
    );
}

export default CreationCanvas;

const cardsIn = keyframes`
	0% { 
        transform: translate3d(0, -48px, 0);
        opacity: 0;
        }
	100% { 
        transform: translate3d(0, 0, 0);
        opacity: 1;
        }
`

const CreationCanvasDiv = styled.div`
    min-height: 566px;
    width: 100%;
    margin: 12px 0;
    padding: 24px 0;

    .creationCanvas-languageOutput {
        display: flex;
    }

    .creationCanvas-header {
        font-size: ${FontSizes.size12};
        
        span {
            font-size: 32px;
            font-weight: ${FontWeights.bold};
        }
    }

    .creationCanvas-entityDescription {
        opacity: .6;
        margin-top: 12px;
    }

    .creationCanvas-formContainer {
        width: fit-content;
        margin: 0 auto 168px auto;
    }

    .creationCanvas-formColumn {
        flex: 1;
        padding: 0 24px;
    }

    .creationCanvas-infoColumn {
        flex: 1;
        padding: 0 24px;
    }

    .creationCanvas-languageOutputColumn {
        display: flex;
        flex-direction: column;
        transition: transform 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 350ms ease-in;
        max-width: 320px;
        background: white;
        border-radius: 32px;
        min-height: 420px;
        padding: 24px 0;
        box-shadow: 0 2px 22px 4px rgba(0,0,0,0.05);
        opacity: 0;
        /* animation-name: ${cardsIn};
        animation-duration: 350ms;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards; */
        transform: ${props => props.cardAnimationState ? "translate3d(0, 0, 0)" : "translate3d(0, -48px, 0)"};
        opacity: ${props => props.cardAnimationState ? 1 : 0};
        /* transition: transform 350ms ease-in-out, opacity 350ms ease-in-out; */
    }

    .creationCanvas-languageOutputHeader {
        font-size: ${FontSizes.size24};
        font-weight: ${FontWeights.semibold};
        margin-left: 24px;
    }

    .creationCanvas-controlGroupHeader {
        color: ${(props) => props.theme.palette.themePrimary};
        font-weight: ${FontWeights.semibold};
        margin: 12px 0 12px 0;
        display: flex;
        align-items: center;
    }

    .creationCanvas-submitActions {
        display: flex;
        justify-content: flex-end;
        padding-right: 16px;
        margin-top: 12px;
    }

    .creationCanvas-infoIcon {
        margin-left: 12px;

        &:hover {
            cursor: pointer;
        }
    }

    .creationCanvas-textField {
        margin-bottom: 12px;
    }

    .creationCanvas-idleMessage {
        margin: auto;
        font-size: ${FontSizes.size24};
    }

    .creationCanvas-calloutHeader {
        font-size: ${FontSizes.size12};
        opacity: .6;
    }

    .creationCanvas-controlDescription {
        font-size: ${FontSizes.size12};
        opacity: .5;
    }

    .creationCanvas-hr {
        height: 1px;
        background: rgba(0,0,0,.06);
        margin: 20px 0;
    }

    .creationCanvas-cancelButton {
        opacity: 0;
        transition: transform 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 350ms ease-in;
        transform: ${props => props.cardAnimationState ? "translate3d(0, 0, 0)" : "translate3d(0, -48px, 0)"};
        opacity: ${props => props.cardAnimationState ? 1 : 0};
    }

    .creationCanvas-saveButton {
        opacity: 0;
        transition: transform 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 350ms ease-in;
        transition-delay: 50ms;
        transform: ${props => props.cardAnimationState ? "translate3d(0, 0, 0)" : "translate3d(0, -48px, 0)"};
        opacity: ${props => props.cardAnimationState ? 1 : 0};
    }
`