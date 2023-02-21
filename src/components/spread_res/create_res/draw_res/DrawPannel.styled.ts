/*eslint-disable */
import styled from 'styled-components'
import {motion, Variants} from 'framer-motion'

import { 
    HorCenterDiv,
    VerCenterDiv 
} from 'common_resources/CommonStyle'
import { 
    IHaveImageProps 
} from 'definition/CommonDefinition'

export namespace DrawCommon {
    export const Container = styled(VerCenterDiv)`
        width: 70%;
        height: 90%;
        background-color: ${(props) => props.theme.boxColors.opaqueBlack};
        border-radius: ${(props) => props.theme.borders.small};
        padding: 0.5%;
        position: absolute;
        top: 5%;
        user-select: none;
    `
    export const InContainer = styled(VerCenterDiv)`
        width: 100%;
        height: 100%;
        background-color: inherit;
        border-radius : inherit;
        justify-content: flex-start;
        position: relative;
    `
    export const DesStepBox = styled(HorCenterDiv)`
        width: 100%;
        height: 12%;
        padding-left: 5%;
        justify-content: flex-start;
        font-size: 200%;
        color: ${(props) => props.theme.textColors.swanWhite};
        user-select : none;
    `
    export const DrawContainer = styled(HorCenterDiv)`
        width: 100%;
        height: 80%;
        justify-content: space-between;
        align-items: flex-start;
        padding: 0.5%;
        position: relative;
    `
    export const DrawZone = styled(HorCenterDiv)`
        width: 80%;
        height: 100%;
        background-color: skyblue;
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
        border-radius: ${(props) => props.theme.borders.small};
        padding: 1.5%;
        display: grid;
        justify-content: center;
        align-items: center;
        grid-template-columns: repeat(auto-fit, minmax(9%, 9%));
        grid-template-rows: repeat(auto-fit, minMax(30%, 30%));
        grid-auto-columns: 9%;
        grid-auto-rows: 30%;
        grid-gap: 3%;
        scroll-behavior: auto;
        overflow: overlay;
        overflow-x: hidden;
        position: relative;
        ::-webkit-scrollbar {
            width: 1vw;
        }
        ::-webkit-scrollbar-thumb {
            background-color: hsla(0, 0%, 42%, 0.49);
            border-radius: 100px;
        }
    `
    export const DrawControlBox = styled(VerCenterDiv)`
        width: 19%;
        height: 100%;
        //background-color: pink;
        justify-content: space-between;
        padding: 0.5%;
        border-radius: ${(props) => props.theme.borders.small};
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
    `
    export const TestCard = styled(VerCenterDiv)<IHaveImageProps>`
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        
        color: white;
        cursor: pointer;
        border-radius: ${(props) => props.theme.borders.small};
        padding: 5%;
        & > div{
            width: 100%;
            height: 100%;
            background: url(${(props) => props.imgsrc});
            background-size: 100% 100%;
            image-rendering: -webkit-optimize-contrast;
            display: inherit;
            justify-content: space-evenly;
            align-items: inherit;
            flex-direction: column;
            border-radius: inherit;
            will-change: background;
            div{
                width: 50%;
                height: 30%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgba(255, 255, 255, 0.5);
                border-radius: inherit;
                :first-child{
                    color: rgba(0, 73, 140);
                }
                :last-child{
                    color: red;
                    //background-color: teal;
                }
            }
        }
        
    `
    export const CountNoticeBox = styled(VerCenterDiv)`
        width: 100%;
        height: 30%;
        background-color: inherit;
        border-radius: inherit;
        justify-content: space-evenly;
        padding: 1%;
    `
    export const CountDesTextBox = styled(HorCenterDiv)`
        width: 100%;
        height: 48%;
        background-color: inherit;
        border-radius: inherit;
        justify-content: space-between;
        padding: 1%;
        //font-family: ${(props) => props.theme.korFont};
        color: white;
        border : ${(props) => props.theme.spreadBtnDefaultborder};
    `
    export const CountText = styled(HorCenterDiv)`
        width: 70%;
        height: 100%;
        background-color: transparent;
        font-family: inherit;
        justify-content: flex-start;
        padding-left: 5%;
        //font-weight: 600;
    `
    export const CountNumber = styled(HorCenterDiv)`
        width: 30%;
        height: 100%;
        background-color: inherit;
        border-radius: inherit;

        font-family: inherit;
        //font-weight: 600;
        font-size: 120%;

    `
    export const DrawOptionBox = styled(VerCenterDiv)`
        width: 100%;
        height: 69%;
        background-color: inherit;
        border-radius: inherit;
        justify-content: space-evenly;
        //align-items: flex-end;
        padding: 0 2% 0 2%;
    `
    export const OptionBtn = styled(HorCenterDiv)`
        width: 100%;
        height: 17%;
        background-color: navy;
        cursor: pointer;
        color: ${(props) => props.theme.textColors.swanWhite};
        border-radius: ${(props) => props.theme.borders.small};
    `

    export const PrevBtn = styled(HorCenterDiv)`
        width: 8%;
        height: 6%;
        //background-color: ${(props) => props.theme.boxColors.soaring};
        background-color: rgba(20, 20, 20, 0.7);
        border-radius: ${(props) => props.theme.borders.small};
        color: ${(props) => props.theme.textColors.swanWhite};
        position: absolute;
        bottom: 0;
        left: 0;
        //background-color: skyblue;
        cursor: pointer;
    `
    export const FadeInContainer = styled(HorCenterDiv)`
        width: 100%;
        height: 100%;
        //background-color: skyblue;
        opacity: 0.6;
        position: absolute;
        border-radius: inherit;
    `
    export const ModifyBox = styled(HorCenterDiv)`
        width: 100%;
        height: 100%;
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
        background-color: rgba(20, 20, 20, 0.5);
        border-radius: ${(props) => props.theme.borders.small};
        position: absolute;   
    `
    export const ModifyPannel = styled(VerCenterDiv)`
        width: 50%;
        height: 70%;
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
        border-radius: inherit;
        padding: 1%;
        position: relative;
        justify-content: space-evenly;
    `
    export const ModifyDesBox = styled(HorCenterDiv)`
        width: 100%;
        height: 20%;
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
        border-radius: inherit;
        justify-content: flex-start;
        padding-left: 3%;
        font-size: 150%;
        color: ${(props) => props.theme.spreadDefaultTextColor};
    `
    export const ModifyControlBox = styled(VerCenterDiv)`
        width: 100%;
        height: 75%;
        justify-content: space-evenly;
        border-radius: inherit;
        padding: 1%;
    `
    export const ModifyContent = styled(HorCenterDiv)`
        width: 100%;
        height: 80%;
        justify-content: space-between;
        border-radius: inherit;
        margin-bottom: 1%;
    `
    export const ModifyInputBox = styled(VerCenterDiv)`
        width: 70%;
        height: 100%;
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
        justify-content: space-evenly;
        border-radius: inherit;
        padding: 1%;
        & div, input{
            width: 100%;
            height: 30%;
            background-color: inherit;
            color: ${(props) => props.theme.spreadDefaultTextColor};
            padding-left: 1%;
            border-radius: inherit;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
    `
    export const ModifyError = styled(HorCenterDiv)`
        width: 100%;
        height: 15%;
        color: ${(props) => props.theme.spreadDefaultTextColor};
        padding-left: 3%;
        justify-content: flex-start;
    `
    export const ModifyBtnBox = styled(VerCenterDiv)`
        width: 29%;
        height: 100%;
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
        border-radius: inherit;
        justify-content: space-evenly;
        padding: 1%;
        & div{
            width: 100%;
            height: 30%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: ${(props) => props.theme.spreadCarpet};
            border : ${(props) => props.theme.spreadBtnDefaultborder};
            border-radius: inherit;
            cursor: pointer;
        }
    `
    export const LoadingBox = styled(HorCenterDiv)`
        width: 100%;
        height: 100%;
        background-color: black;
        //opacity: 0.5;
        position : absolute;
    `
}