/* eslint-disable */
import React from 'react'
import styled from 'styled-components';
import { VerCenterDiv } from 'common_resources/CommonStyle';

const RightPannelContainer = styled(VerCenterDiv)`
    width: 20%;
    height: 100%;
    background-color: blue;
    position: absolute;
    z-index: 2;
    right: 0;
    justify-content: flex-start;
    padding-top: 8%;
`
const ClockBox = styled(VerCenterDiv)`
    width: 100%;
    height: 50%;
    background-color: yellow;
`
function RightPannel() {
  return (
    <RightPannelContainer>
        <ClockBox></ClockBox>
    </RightPannelContainer>
  )
}

export default RightPannel