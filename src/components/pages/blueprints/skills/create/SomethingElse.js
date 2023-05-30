import React, { useContext } from 'react'
import styled from 'styled-components'
import * as _ from 'underscore';

const SomethingElse = (props, skillCreatorDialog) => {
    let confirmationCard = <ConfirmationCardDiv></ConfirmationCardDiv>
    let completionCard = <CompletionCardDiv></CompletionCardDiv>

    const renderUserResponse = (element) => {
        let userResponse;

        switch (element.entity) {
            case 'Intent':
                userResponse = props.intent
                break;
            case 'Person':
                userResponse = props.person
                break;
            case 'Time/date':
                userResponse = props.timeDate
                break;
            case 'Duration':
                userResponse = props.duration
                break;
            case 'Place':
                userResponse = props.place
                break;
            case 'Text':
                userResponse = props.text
                break;
            case 'Number':
                userResponse = props.number
                break;
            case 'Service':
                userResponse = props.service
                break;
            case 'Device type':
                userResponse = props.deviceType
                break;
            case 'Summary':
                userResponse = props.confirm
                break;
            case 'Rollup':
                userResponse = props.success
                break;
            default: break;
        }
        return userResponse;
    }

    //after LUIS response, add userResponse to object
    const skillData = _.each(skillCreatorDialog, function (element, index) {
        _.extend(element, { userResponse: renderUserResponse(element) });
    });

    return skillData;
}

export default SomethingElse

const ConfirmationCardDiv = styled.div`
    height: 100px;
    width: 100%;
    background: yellow;
`

const CompletionCardDiv = styled.div`
    height: 100px;
    width: 100%;
    background: green;
`