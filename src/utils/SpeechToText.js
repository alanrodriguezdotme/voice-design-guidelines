import React, { createContext, useContext, useEffect, useState } from 'react'
import * as SDK from 'microsoft-speech-browser-sdk';
import * as _ from 'underscore';
import { VoicePatternsContext } from '../contexts/VoiceContextProvider';
let subscriptionKey = '5bb1fd777df040f18623d946d3ae2833';
let recognizer;
let forceFreeformState;

export const SpeechToTextContext = createContext();

const SpeechToTextContextProvider = (props) => {
    const {
        userResponse,
        setUserResponse,
        setUserHypothesis,
        setSpeechState,
        luisResponse,
        setLuisResponse,
        typeName,
        setTypeName,
        typeLocation,
        setTypeLocation,
        typeMessage,
        setTypeMessage,
        setTypeTimeDate,
        typeTimeDate,
        setTypeDuration,
        typeDuration,
        setTypeNumber,
        typeNumber, 
        typeService,
        setTypeService,
        typeDeviceType,
        setTypeDeviceType
    } = useContext(VoicePatternsContext);

    const [freeformTextState, setFreeformTextState] = useState(false)

    useEffect(() => {
        forceFreeformState = freeformTextState
    }, [freeformTextState]);

    const init = () => {
        recognizer = RecognizerSetup(
            SDK,
            SDK.RecognitionMode.Interactive,
            'en-US',
            'Detailed',
            subscriptionKey
        )
    }

    const RecognizerSetup = (SDK, recognitionMode, language, format, subscriptionKey) => {
        let recognizerConfig = new SDK.RecognizerConfig(
            new SDK.SpeechConfig(
                new SDK.Context(
                    new SDK.OS(navigator.userAgent, "Browser", null),
                    new SDK.Device("SpeechSample", "SpeechSample", "1.0.00000"))),
            recognitionMode, // SDK.RecognitionMode.Interactive  (Options - Interactive/Conversation/Dictation)
            language, // Supported languages are specific to each recognition mode Refer to docs.
            format); // SDK.SpeechResultFormat.Simple (Options - Simple/Detailed)

        // Alternatively use SDK.CognitiveTokenAuthentication(fetchCallback, fetchOnExpiryCallback) for token auth
        let authentication = new SDK.CognitiveSubscriptionKeyAuthentication('5bb1fd777df040f18623d946d3ae2833');

        return SDK.CreateRecognizer(recognizerConfig, authentication);
    }

    const handleMicClick = () => {
        RecognizerStart(SDK, recognizer);
    }

    const RecognizerStart = (SDK, recognizer) => {
        recognizer.Recognize((event) => {
            /*
                Alternative syntax for typescript devs.
                if (event instanceof SDK.RecognitionTriggeredEvent)
            */
            switch (event.Name) {
                case "RecognitionTriggeredEvent":
                    setUserHypothesis('')
                    setSpeechState('RecognitionTriggeredEvent')
                    var audio = new Audio('./assets/earcon.wav');
                    audio.play();
                    console.log("Initializing");
                    break;
                case "ListeningStartedEvent":
                    setSpeechState('ListeningStartedEvent')
                    console.log("Listening");
                    break;
                case "RecognitionStartedEvent":
                    console.log("Listening_Recognizing");
                    break;
                case "SpeechStartDetectedEvent":
                    console.log("Listening_DetectedSpeech_Recognizing");
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    break;
                case "SpeechHypothesisEvent":
                    setSpeechState('SpeechHypothesisEvent')
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    setUserHypothesis(event.result.Text)
                    break;
                case "SpeechFragmentEvent":
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    break;
                case "SpeechEndDetectedEvent":
                    OnSpeechEndDetected();
                    console.log("Processing_Adding_Final_Touches");
                    console.log(JSON.stringify(event.Result)); // check console for other information in result
                    break;
                case "SpeechSimplePhraseEvent":
                    UpdateRecognizedPhrase(JSON.stringify(event.Result, null, 3));
                    break;
                case "SpeechDetailedPhraseEvent":
                    UpdateRecognizedPhrase(JSON.stringify(event.Result, null, 3));
                    setUserResponse(event.Result.NBest[0].ITN);
                    getLuisResponse(event.Result.NBest[0].ITN);
                    break;
                case "RecognitionEndedEvent":
                    setSpeechState('RecognitionEndedEvent')
                    console.log("Idle");
                    console.log(JSON.stringify(event)); // Debug information
                    break;
            }
        })
            .On(() => {
                // The request succeeded. Nothing to do here.
            },
                (error) => {
                    console.error(error);
                });
    }

    const getLuisResponse = (utterance) => {
        const LUIS_URL = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/292c612f-1259-48a8-ab9e-5899080c0dae?verbose=true&timezoneOffset=0&subscription-key=8edb8b2894a444d9901ca260129a77b9&q=';

        return new Promise((resolve, reject) => {
            fetch(LUIS_URL + utterance)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let nameEntity = _.findWhere(data.entities, { type: "builtin.personName" });

                    let timeDateEntity = _.filter(data.entities, function (entity) { return entity.type.match(new RegExp('builtin.datetimeV2')); });

                    let durationEntity = _.findWhere(data.entities, { type: "builtin.datetimeV2.duration" });

                    let locationEntity = _.filter(data.entities, function (entity) { return entity.type.match(new RegExp('builtin.geographyV2')); });

                    let numberEntity = _.findWhere(data.entities, { type: "builtin.number" });

                    let serviceEntity = _.findWhere(data.entities, { type: "service" });

                    let deviceTypeEntity = _.findWhere(data.entities, { type: "deviceType" });

                    //handle name entity extraction
                    if (typeName === null) {
                        nameEntity && setTypeName(nameEntity)
                    }

                    //handle time/date entity extraction
                    if (typeTimeDate === null) {
                        timeDateEntity.length > 0 && setTypeTimeDate(timeDateEntity[0])
                        console.log("HIT")
                    }

                    //handle duration entity extraction
                    if (typeDuration === null) {
                        durationEntity && setTypeDuration(durationEntity)
                    }

                    //handle location entity extraction
                    if (typeLocation === null) {
                        locationEntity.length > 0 && setTypeLocation(locationEntity[0])
                    }

                    //handle freeform entity extraction
                    if (forceFreeformState === true && typeMessage === null) {
                        setTypeMessage({entity: data.query});
                        setFreeformTextState(false);
                    }

                    //handle number entity extraction
                    if (typeNumber === null) {
                        console.log("DURATION ENTITY")
                        console.log(durationEntity)
                        console.log("NUMBER ENTITY")
                        console.log(numberEntity)
                        console.log("TIMEDATE ENTITY")
                        console.log(timeDateEntity)
                        console.log("NAME ENTITY")
                        console.log(nameEntity)
                        if (timeDateEntity.length > 0 && numberEntity && timeDateEntity[0].entity.includes(numberEntity.entity) ||
                            durationEntity && numberEntity && durationEntity.entity.includes(numberEntity.entity) ||
                            locationEntity.length > 0 && numberEntity && locationEntity[0].entity.includes(numberEntity.entity)
                        ) {
                            setTypeNumber(null)
                        }
                        else {
                            numberEntity && setTypeNumber(numberEntity)
                        }
                    }

                    //handle service entity extraction
                    if (typeService === null) {
                        serviceEntity && setTypeService(serviceEntity)
                    }

                    //handle deviceType entity extraction
                    if (typeDeviceType === null) {
                        deviceTypeEntity && setTypeDeviceType(deviceTypeEntity)
                    }

                    setLuisResponse(data);
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });

        });
    }

    const OnSpeechEndDetected = () => {
        //DO SOMETHING
        console.log('SpeechEnd')
    }

    const UpdateRecognizedPhrase = (json) => {
        //DO SOMETHING
        console.log(json)
    }

    const RecognizerStop = () => {
        // recognizer.AudioSource.Detach(audioNodeId) can be also used here. (audioNodeId is part of ListeningStartedEvent)
        recognizer.AudioSource.TurnOff();
    }

    return (
        <SpeechToTextContext.Provider value={{
            init, handleMicClick, RecognizerStop, freeformTextState,
            setFreeformTextState
        }}>
            {props.children}
        </SpeechToTextContext.Provider>
    );
}

export default SpeechToTextContextProvider;