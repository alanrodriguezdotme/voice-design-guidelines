# Voice Patterns Guidelines

This is the repository for the [Voice Patterns Guidelines website](https://voicepatterns.azurewebsites.net/), created and managed by the Cortana Design Team. It was built using the following:

- **React** (using `create-react-app`)
- **Styled Components** (CSS)
- **Strapi** (CMS/Backend - repo can be found [here](https://cortanadesignteam.visualstudio.com/VoicePatterns/_git/VoicePatternsCMS))
- **Azure Cognitive Services** (Skill Builder)

## Install packages
`npm install`

## Run locally
`npm start`

## Deployment
No streamlined method for deployment yet. For now, simply run `npm run build`, then upload the contents of the `/build` folder via FTP.

## Strapi CMS
Strapi is a headless CMS that allows you to create custom components and pages. We use this to manage the content for the home page, Patterns section, and Building Blocks section, with plans to include the content for the Skill Builder.

Here are some useful links:

- [CMS access](https://voicepatternsadmin.azurewebsites.net/editor/plugins/users-permissions/auth/login)
- [Repo](https://cortanadesignteam.visualstudio.com/VoicePatterns/_git/VoicePatternsCMS)
- [Azure resource group](https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/resource/subscriptions/b0021c09-0888-46cd-878f-8267dc7be8b9/resourceGroups/VoicePatterns/overview)

## Any questions?
Please contact Shelley Bjornstad (shbjor), Lisa Stifelman (Lisa.Stifelman), August Niehaus (augustw), or Alan Rodriguez (alanro) for any assistance.