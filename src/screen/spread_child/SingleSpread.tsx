/*eslint-disable */

import React from 'react'
import styled from 'styled-components'
import {HorCenterDiv, VerCenterDiv} from 'common_resources/CommonStyle'

const SingleContainer = styled(HorCenterDiv)`
    width: 100%;
    height: 100%;
    background-color: transparent;
    position: relative;
`
const InSingleContainer = styled(HorCenterDiv)`
  width: 100%;
  height: 100%;
  background-color: inherit;
`

function SingleSpread() {
  return (
    <SingleContainer>
      <InSingleContainer>
        
      </InSingleContainer>
    </SingleContainer>
  )
}

export default SingleSpread