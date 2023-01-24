/* eslint-disable */
import React  from 'react'
import styled from 'styled-components'
import {HorCenterDiv} from 'common_resources/CommonStyle'
import { Typing } from 'components/common_res/typing_res/Typing';
import { ISelectProps } from './homeIntrefaces';

const DesTypingContainer = styled(HorCenterDiv)`
    width: 100%;
    height: 45%;
    color : ${(props) => props.theme.textColors.swanWhite};
    justify-content: left;
    font-size: 150%;
    padding-left: 2%;
    letter-spacing: 0.1em;
`

function DesTyping({modeData} : ISelectProps) {
    
  return (
    <DesTypingContainer>
        <Typing 
            text={modeData.typingData}
            letterSpacing={0.1}
            cursorThickness={0}
        />
    </DesTypingContainer>
  )
}

export default React.memo(DesTyping)