import React, { createContext, useState, useContext } from 'react'
import { VoicePatternsContext } from './VoiceContextProvider'

export const HomePageContext = createContext()

const HomePageContextProvider = (props) => {
	let { setGlobalPage } = useContext(VoicePatternsContext)
	let [ homePageData, setHomePageData ] = useState(null)

	return (
		<HomePageContext.Provider value={
			{
				homePageData, setHomePageData
			}
		}>
			{ props.children }
		</HomePageContext.Provider>
	)
}

export default HomePageContextProvider
