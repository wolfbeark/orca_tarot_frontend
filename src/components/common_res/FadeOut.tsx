/* eslint-disable */
import React from 'react'
import styled from 'styled-components'
import { HorCenterDiv } from 'common_resources/CommonStyle'
import * as Loader from 'react-spinners'
const FadeOutWrapper = styled(HorCenterDiv)`
    width: 100%;
    height: 100%;
    position: absolute;
    //background-color: black;
`
const FadeOutVar = {
    initial:{
        backgroundColor: "rgba(20, 20, 20, 0)",
    },
    start: {
        backgroundColor: "rgba(20, 20, 20, 0.5)",
        transition:{
            duration: 1
        }
    },
    end: {
        backgroundColor: "rgba(20, 20, 20, 1)",
    }
}
function FadeOut() {

  return (
    <FadeOutWrapper
        variants={FadeOutVar}
        initial={FadeOutVar.initial}
        animate={FadeOutVar.start}
    >
        <div style={{
            position: "fixed", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)" 
        }}>
            <Loader.FadeLoader
                width={5}
                height={15}
                margin={2}
                color={'rgba(240, 147, 43, 1.0)'}
            />
        </div>
    </FadeOutWrapper>
  )
}

export default FadeOut