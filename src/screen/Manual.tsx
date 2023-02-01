/* eslint-disable */
import React from 'react'
import styled from 'styled-components'
import { HorCenterDiv, VerCenterDiv } from 'common_resources/CommonStyle';
import {IContainer} from 'common_resources/CommonInterfaces'
import {useRecoilValue} from 'recoil';
import { totalManagerAtom } from 'recoil/TotalAtom';

const ManualContainer = styled(VerCenterDiv)<IContainer>`
  width: 100%;
  height: ${(props) => `${props.wheight}px`};
  position: relative;
  *{
    font-family: "Anton";
    font-display: block;
  }
`
const Container = styled(HorCenterDiv)`
  width: 100%;
  height: 91%;
  background-color: yellow;
`

function Manual() {

  const { wheight } = useRecoilValue(totalManagerAtom);

  return (
    // <ManualContainer
    //     wheight={wheight}
    // >

    // </ManualContainer>
    <Container></Container>
  )
}

export default Manual