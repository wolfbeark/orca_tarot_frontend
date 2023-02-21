/*eslint-disable */

import React, { useState } from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { HorCenterDiv, VerCenterDiv } from 'common_resources/CommonStyle'
import { createControlManager } from 'recoil/CreateAtom'
import { Typing } from 'components/common_res/typing_res/Typing'
import FirstQuestion from 'components/spread_res/create_res/FirstQuestion'
import SecondQuestion from 'components/spread_res/create_res/SecondQuestion'
import { AnimatePresence } from 'framer-motion'
import IChingMaker from 'components/spread_res/create_res/IChingMaker'
import SingleDraw from 'components/spread_res/create_res/SingleDraw'
import DrawPannel from 'components/spread_res/create_res/draw_res/DrawPannel'
import { EWhatDrawMode } from 'components/spread_res/create_res/draw_res/DrawPannel.interfaces'
import DrawIChingPannel from 'components/spread_res/create_res/draw_res/iching_res/DrawIChingPannel'

const CreateContainer = styled(HorCenterDiv)`
    width: 100%;
    height: 100%;
    position: relative;
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
        {createManager.creatingStep === 1 &&
        <SecondQuestion />
        }
        {(createManager.creatingStep === 2 && createManager.oracleType === 2) &&
        <DrawIChingPannel 
          whatDrawMode={EWhatDrawMode.SINGLE}
          oracleType={createManager.oracleType}
        />
        }
        {/* {(createManager.creatingStep === 2 && createManager.oracleType !== 2) &&
        <SingleDraw />
        } */}
        {(createManager.creatingStep === 2 && createManager.oracleType !== 2) &&
        <DrawPannel 
          whatDrawMode={EWhatDrawMode.SINGLE}
          oracleType={createManager.oracleType}
        />
        }
      </AnimatePresence>
    </CreateContainer>
  )
}

export default React.memo(CreateSpread)