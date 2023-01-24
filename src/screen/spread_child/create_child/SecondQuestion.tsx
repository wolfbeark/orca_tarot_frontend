/* eslint-disable */
import React from 'react'
import styled from 'styled-components'
import { HorCenterDiv, VerCenterDiv } from 'common_resources/CommonStyle'
import { useRecoilState } from 'recoil'
import { createControlManager } from 'recoil/CreateAtom'

const SecondContainer = styled(VerCenterDiv)`
  width: 60%;
  height: 50%;
  background-color: ${(props) => props.theme.boxColors.opaqueBlack};
  border-radius: ${(props) => props.theme.borders.small};
`
const SingleNormalSetting = styled(VerCenterDiv)`
    width: 100%;
    height: 100%;
    background-color: skyblue;
`

function SecondQuestion() {
    const [createManager, setCreateManager] = useRecoilState(createControlManager);
    const {
        projectType,
        isSandbox
    } = createManager
  return (
    <SecondContainer>
        {(projectType === false && isSandbox === false) &&
        <SingleNormalSetting>

        </SingleNormalSetting>
        }
    </SecondContainer>
  )
}

export default SecondQuestion