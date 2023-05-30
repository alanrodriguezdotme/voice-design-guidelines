import SendAMessage from './skills/create/SendAMessage'
import SomethingElse from './skills/create/SomethingElse'

//This determines what pre-built skill will be sent to the emulator. If "something-else" is chosen, it goes to the skill creator.
const SkillRenderer = (props, skillCreatorDialog) => {
    let skill;

    switch (props.currentSkill) {
        case 'send-message':
            skill = SendAMessage(props)
            break;
        case 'something-else':
            skill = SomethingElse(props, skillCreatorDialog)
            break;
        default: 
            skill = SomethingElse(props, skillCreatorDialog)
            break;
    }
    return skill;
}

export default SkillRenderer