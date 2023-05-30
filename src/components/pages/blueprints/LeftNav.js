import React, { useContext, useStore } from 'react'
import styled from 'styled-components'
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { VoicePatternsContext } from './../../../contexts/VoiceContextProvider'
import { ControlsStylingContext } from './../../../contexts/ControlsStylingProvider'

//This component is the left navigation on the Patterns homepage.
//TO-DO: Once this is fully designed, it will need to be hooked up to the CMS like the Guidelines navigation is.
const LeftNav = (props) => {
  const { setPatternsPage } = useContext(VoicePatternsContext);
  const { sideNavStyle } = useContext(ControlsStylingContext);

  const handleLinkClick = (ev, item) => {
    setPatternsPage(item.key)
  }

  return (
    <LeftNavDiv>
      <div className="leftNav-navHeader">Patterns</div>
      <Nav
        styles={sideNavStyle}
        ariaLabel="Nav example similiar to one found in this demo page"
        onLinkClick={handleLinkClick}
        groups={[
          {
            name: 'Create',
            expandAriaLabel: 'Create expanded section',
            collapseAriaLabel: 'Create collapsed section',
            links: [
              {
                key: 'send-message',
                name: 'Send a message',
                url: '#/blueprints/send-message',
              },
              {
                key: 'send-email',
                name: 'Send an email',
                url: '#/blueprints/send-email',
                disabled: true
              },
              {
                key: 'create-reminder',
                name: 'Create a reminder',
                url: '#/blueprints/create-reminder',
                disabled: true
              },
              {
                key: 'add-appointment',
                name: 'Add an appointment',
                url: '#/blueprints/add-appointment',
                disabled: true
              },
              {
                key: 'book-meeting',
                name: 'Book a meeting',
                url: '#/blueprints/book-meeting',
                disabled: true
              },
              {
                key: 'something-else',
                name: 'Something else',
                url: '#/blueprints/something-else',
              },
            ]
          },
          {
            name: 'Manage',
            collapseByDefault: true,
            expandAriaLabel: 'Manage expanded section',
            collapseAriaLabel: 'Manage collapsed section',
            links: [
              {
                key: 'delete-reminder',
                name: 'Delete a reminder',
                url: '#/blueprints/delete-reminder',
                disabled: true
              },
              {
                key: 'forward-email',
                name: 'Forward an email',
                url: '#/blueprints/forward-email',
                disabled: true
              },
              {
                key: 'move-event',
                name: 'Move an event',
                url: '#/blueprints/move-event',
                disabled: true
              },
              {
                key: 'cancel-event',
                name: 'Cancel an event',
                url: '#/blueprints/cancel-event',
                disabled: true
              },
            ]
          },
          {
            name: 'Act',
            collapseByDefault: true,
            expandAriaLabel: 'Act expanded section',
            collapseAriaLabel: 'Act collapsed section',
            links: [
              {
                key: 'share-file',
                name: 'Share a file',
                url: '#/blueprints/share-file',
                disabled: true
              },
              {
                key: 'make-call',
                name: 'Make a call',
                url: '#/blueprints/make-call',
                disabled: true
              },
              {
                key: 'join-meeting',
                name: 'Join a meeting',
                url: '#/blueprints/join-meeting',
                disabled: true
              },
              {
                key: 'add-someone',
                name: 'Add someone to a meeting or call',
                url: '#/blueprints/add-someone',
                disabled: true
              },
            ]
          },
          {
            name: 'Recall',
            collapseByDefault: true,
            expandAriaLabel: 'Recall expanded section',
            collapseAriaLabel: 'Recall collapsed section',
            links: [
              {
                key: 'simple-recall',
                name: 'Simple recall',
                url: '#/blueprints/simple-recall',
                disabled: true
              },
              {
                key: 'search-refine',
                name: 'Search and refine',
                url: '#/blueprints/search-refine',
                disabled: true
              },
            ]
          },
          {
            name: 'Present',
            collapseByDefault: true,
            expandAriaLabel: 'Present expanded section',
            collapseAriaLabel: 'Present collapsed section',
            links: [
              {
                key: 'answer',
                name: 'Answer',
                url: '#/blueprints/answer',
                disabled: true
              },
              {
                key: 'summary',
                name: 'Summary',
                url: '#/blueprints/summary',
                disabled: true
              },
              {
                key: 'triage',
                name: 'Triage',
                url: '#/blueprints/triage',
                disabled: true
              },
              {
                key: 'podcast',
                name: 'Podcast',
                url: '#/blueprints/podcast',
                disabled: true
              },
            ]
          },
          {
            name: 'Command & Control',
            collapseByDefault: true,
            expandAriaLabel: 'Command & control expanded section',
            collapseAriaLabel: 'Command & control collapsed section',
            links: [
              {
                key: 'settings-control',
                name: 'Settings control',
                url: '#/blueprints/settings-control',
                disabled: true
              },
              {
                key: 'navigation',
                name: 'Navigation',
                url: '#/blueprints/navigation',
                disabled: true
              },
            ]
          }
        ]}
      />
    </LeftNavDiv>
  );
}

export default LeftNav;

const LeftNavDiv = styled.div`
    height: 100%;
    position: sticky;
    top: 0;
    margin-left: auto;

    .leftNav-navHeader {
      font-weight: bold;
      margin: 24px 0 12px 0;
    }
`
