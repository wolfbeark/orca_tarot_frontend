/*eslint-disable */

import React from 'react'
import styled from 'styled-components'
import { HorCenterDiv } from 'common_resources/CommonStyle'

const MultiContainer = styled(HorCenterDiv)`
    width: 100%;
    height: 100%;
    background-color: greenyellow;
    opacity: 0.2;
`

function MultiSpread() {
  return (
    <MultiContainer>
        Multi
    </MultiContainer>
  )
}

export default MultiSpread