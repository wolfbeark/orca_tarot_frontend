/* eslint-disable */

import styled from "styled-components";
import { HorCenterDiv, VerCenterDiv } from "common_resources/CommonStyle";

import { IHaveImageProps } from "definition/CommonDefinition";

export namespace DrawIChingCommon {
    export const Container = styled(VerCenterDiv)`
        width: 70%;
        height: 80%;
        background-color: ${(props) => props.theme.boxColors.opaqueBlack};
        border-radius: ${(props) => props.theme.borders.small};
        padding: 0.5%;
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
        height: 15%;
        padding-left: 5%;
        justify-content: flex-start;
        font-size: 200%;
        color: ${(props) => props.theme.textColors.swanWhite};
        user-select : none;
    `
    export const IChingMakerBox = styled(HorCenterDiv)`
        width: 100%;
        height: 85%;
        //background-color: skyblue;
        justify-content: space-evenly;
        align-items: flex-start;
        padding: 0.5%;
    `
    export const IChingMakerContainer = styled(HorCenterDiv)`
        width: 100%;
        height: 85%;
        justify-content: space-between;
        align-items: flex-start;
        padding: 0.5%;
    `
    export const IChingWrapperContainer = styled(HorCenterDiv)`
        width: 60%;
        height : 95%;
        justify-content: space-evenly;
    `
    export const IChingWrapper = styled(HorCenterDiv)`
        width: 45%;
        height: 88%;
        //background-color: gray;
        padding: 0.5%;
    `
    export const IChingItem = styled(HorCenterDiv)<IHaveImageProps>`
        width: 100%;
        height: 15%;
        //background-color: inherit;
        //background-image: url(${(props) => props.imgsrc});
        //background-size: 100% 100%;
        & div{
            width: 100%;
            height: 100%;
            background-image: url(${(props) => props.imgsrc});
            background-size: 100% 100%;
            transition: background-image 0.5s ease-in-out;
        }
    `
    export const IChingBox = styled(VerCenterDiv)`
        width: 100%;
        height: 100%;
        justify-content: space-evenly;
        flex-direction: column-reverse;
        background-color: ${(props) => props.theme.boxColors.opaqueBlack};
        border-radius: ${(props) => props.theme.borders.small};
        padding: 2%;
        position: relative;

    `
    export const ControlBox = styled(VerCenterDiv)`
        width: 40%;
        //background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
        height: 88%;
        padding: 1%;
        padding-left: 5%;
        align-items: flex-start;
        & > div:first-child{
            //padding-left: 5%;
            width: 100%;
            height: 15%;
            font-size: 130%;
            width: 100%;
            //background-color: tomato;
            color: ${(props) => props.theme.spreadDefaultTextColor};
            display : flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 5%;
        }
        //justify-content: space-evenly;
    `

    export const IChingMakeBtn = styled(HorCenterDiv)`
        width: 40%;
        height: 15%;
        background-color: ${(props) => props.theme.boxColors.soaring};
        letter-spacing: 0.2em;
        font-size: 130%;
        color: ${(props) => props.theme.textColors.swanWhite};
        user-select: none;
        cursor: pointer;
        border-radius: ${(props) => props.theme.borders.small};
    `

    export const IChingMask = styled(VerCenterDiv)`
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: inherit;
        z-index: 2;
        border-radius: inherit;
        justify-content: space-evenly;
        & > div{
            width: 80%;
            height: 80%;
            padding-top: 10%;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
        }
        & span{
            color: ${(props) => props.theme.spreadDefaultTextColor};
            font-size: 120%;
        }

    `

    export const PrevBtn = styled(HorCenterDiv)`
        width: 12%;
        height: 8%;
        background-color: ${(props) => props.theme.boxColors.soaring};
        border-radius: ${(props) => props.theme.borders.small};
        color: ${(props) => props.theme.textColors.swanWhite};
        position: absolute;
        bottom: 1%;
        left: 1%;
        cursor: pointer;
    `
    export const NextBtn = styled(HorCenterDiv)`
        width: 12%;
        height: 8%;
        background-color: ${(props) => props.theme.boxColors.soaring};
        border-radius: ${(props) => props.theme.borders.small};
        color: ${(props) => props.theme.textColors.swanWhite};
        position: absolute;
        bottom: 1%;
        right: 1%;
    `
    export const maskVar = {
        initial:{
            scaleY : 1
        },
        start:{
            scaleY : 0,
            originY : 0
        }
    }
    export const makeBtnVar ={
        initial:{
            color: 'rgba(240, 147, 43, 0.2)',
            opacity: 0.5,
            cursor: 'auto'
        },
        active:{
            color: ['rgba(240, 147, 43,1.0)', 'rgba(240, 147, 43, 0.2)','rgba(240, 147, 43,1.0)',],
            cursor: 'pointer',
            opacity: 1,
            transition: {
                color:{
                    repeat: Infinity,
                    duration: 1.5
                }
            }
        },
        hover:{
            color: 'rgba(240, 147, 43,1.0)',
            boxShadow: ' 0 0 3px 1px rgba(255, 121, 63,1.0)'
        }
    }
}