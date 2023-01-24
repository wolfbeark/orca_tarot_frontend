/* eslint-disable */

import React, {CSSProperties} from 'react'
import styled from 'styled-components'
import { HorCenterDiv } from 'common_resources/CommonStyle';
import * as Loader from 'react-spinners';

const FadeInContainer = styled(HorCenterDiv)`
    width: 100%;
    height: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
`


const FadeInVar = {
    initial :{
        //opacity: 1,
        backgroundColor: "rgba(20, 20, 20, 1)",
    },
    start: {
        //opacity: 0,
        backgroundColor: "rgba(20, 20, 20, 0.5)",
        transition: {
            duration: 1
        }
    },
    end: {
        backgroundColor: "rgba(20, 20, 20, 0)"
    }
}
function FadeIn() {
    const style = { 
        position: "fixed", 
        top: "50%", 
        left: "50%", 
        transform: "translate(-50%, -50%)" 
    };
  return (
    <FadeInContainer
        variants={FadeInVar}
        initial={FadeInVar.initial}
        animate={FadeInVar.start}
        exit={FadeInVar.end}
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
    </FadeInContainer>
  )
}

export default FadeIn