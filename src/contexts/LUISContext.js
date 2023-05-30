import React, { createContext, useContext } from 'react'
import * as _ from 'underscore'
import { VoicePatternsContext } from './VoiceContextProvider'

export const LUISContext = createContext()

const LUISContextProvider = (props) => {

	const getLuisResponse = (utterance, actions) => {
		let {		
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
		} = actions

		const LUIS_URL = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/292c612f-1259-48a8-ab9e-5899080c0dae?verbose=true&timezoneOffset=0&subscription-key=8edb8b2894a444d9901ca260129a77b9&q='

		return new Promise((resolve, reject) => {
			fetch(LUIS_URL + utterance)
				.then((response) => {
					return response.json()
				})
				.then((data) => {
					let nameEntity = _.findWhere(data.entities, { type: "builtin.personName" })

					let timeDateEntity = _.filter(data.entities, function (entity) { return entity.type.match(new RegExp('builtin.datetimeV2')); })

					let durationEntity = _.findWhere(data.entities, { type: "builtin.datetimeV2.duration" })

					let locationEntity = _.filter(data.entities, function (entity) { return entity.type.match(new RegExp('builtin.geographyV2')); })

					let numberEntity = _.findWhere(data.entities, { type: "builtin.number" })

					let serviceEntity = _.findWhere(data.entities, { type: "service" })

					let deviceTypeEntity = _.findWhere(data.entities, { type: "deviceType" })

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
					if (actions.freeformTextState === true && typeMessage === null) {
							setTypeMessage({entity: data.query})
							actions.setFreeformTextState(false)
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

					actions.setLuisResponse(data);
					resolve(data)
				})
				.catch((error) => {
						reject(error)
				})
	})
}

	return (
		<LUISContext.Provider value={{
			getLuisResponse
		}}>
			{ props.children }
		</LUISContext.Provider>
	)
}

export default LUISContextProvider
