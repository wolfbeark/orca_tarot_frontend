/*eslint-disable */

import React, { useState } from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { HorCenterDiv, VerCenterDiv } from 'common_resources/CommonStyle'
import { createControlManager } from 'recoil/CreateAtom'
import { Typing } from 'components/common_res/typing_res/Typing'
import FirstQuestion from './create_child/FirstQuestion'
import SecondQuestion from './create_child/SecondQuestion'
import { AnimatePresence } from 'framer-motion'

const CreateContainer = styled(HorCenterDiv)`
    width: 100%;
    height: 100%;
`
const QuestionBox = styled(HorCenterDiv)`
  width: 40%;
  height: 50%;
  background-color: ${(props) => props.theme.boxColors.opaqueBlack};
  border-radius: ${(props) => props.theme.borders.small};
  padding: 0.5%;
  user-select: none;

`

function CreateSpread() {
  // First Question - Single, Multi
  // First Sub - Normal, Sandbox
  const [createManager, setCreateManager] = useRecoilState(createControlManager)
  
  return (
    <CreateContainer>
      <AnimatePresence>
        {createManager.creatingStep === 0 &&
        <QuestionBox
          exit={{opacity: 0}}
        >
          <FirstQuestion />
        </QuestionBox>
        }
        {createManager.creatingStep !== 0 &&
        <SecondQuestion />
        }
      </AnimatePresence>
    </CreateContainer>
  )
}

export default React.memo(CreateSpread)