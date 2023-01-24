/* eslint-disable */
import React from 'react'
import styled from 'styled-components';
import {HorCenterDiv} from 'common_resources/CommonStyle';
import { IHoverProps } from './homeIntrefaces';

const Container = styled(HorCenterDiv)`
    width: 100%;
    height: 100%;
    background-color: inherit;
    justify-content: space-between;
    padding: 0.5%;
    border-radius: ${(props) => props.theme.borders.small};
    color: ${(props) => props.theme.textColors.swanWhite};
    font-size: 120%;
    letter-spacing: 0.05em;
`
const DescriptionName = styled(HorCenterDiv)`
  width : 20%;
  height: 100%;
  background-color: inherit;
  justify-content: left;
  padding-left: 2%;
`
const DescriptionContent = styled(HorCenterDiv)`
  width: 79.5%;
  height: 100%;
  background-color: inherit;
  justify-content: left;
  padding-left: 2%;
`

function ModeDescription({hoverData, modeData} : IHoverProps) {

  const S_DesNameArr = [
    "Single - Normal",
    "Single - Sandbox"
  ]
  const M_DesNameArr = [
    "Multi - Normal",
    "Multi - Sandbox"
  ]
  const S_DesContentArr = [
    "Use a single spread",
    "Set the card freely, using a single spread",
  ]
  const M_DesContentArr = [
    "Use 5 spreads at the same time",
    "Set the card freely, using five spreads at the same time"
  ]
  return (
    <Container
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
    >
        <DescriptionName>
            {
                hoverData.isSingle && modeData.isSelected === false
                ? S_DesNameArr[hoverData.hoveringType]
                : M_DesNameArr[hoverData.hoveringType]
            }
        </DescriptionName>
        <DescriptionContent>
            {
                hoverData.isSingle && modeData.isSelected === false
                ? S_DesContentArr[hoverData.hoveringType]
                : M_DesContentArr[hoverData.hoveringType]
            }
        </DescriptionContent>
    </Container>
  )
}

export default React.memo(ModeDescription)