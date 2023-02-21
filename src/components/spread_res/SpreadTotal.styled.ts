/* eslint-disable */
import styled from "styled-components";
import {motion} from 'framer-motion';
import { HorCenterDiv, VerCenterDiv } from "common_resources/CommonStyle";

export namespace SpreadTotal_Common{
    export const Container = styled(HorCenterDiv)`
        width: 100%;
        height: 100%;
        //background-color: skyblue;
        font-family: ${(props) => props.theme.engFont};
        position: relative;
    `
    export const ProjectAllEmptyBox = styled(VerCenterDiv)`
        width: 40%;
        height: 50%;
        background-color: ${(props) => props.theme.boxColors.opaqueBlack};
        border-radius: ${(props) => props.theme.borders.small};
        padding: 0.5%;
        & > div{
            width: 100%;
            height: 100%;
            border-radius: inherit;
            background-color: inherit;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        /* & span{
            width: 100%;
            height: 20%;
            background-color: blue;
        } */
    `

    export const LinkToCreateBtn = styled(HorCenterDiv)`
        width: 30%;
        height: 20%;
        background-color: ${(props) => props.theme.boxColors.soaring};
        border-radius: ${(props)=> props.theme.borders.small};
        padding: 1%;
        div {
            width: 100%;
            height: 100%;
            background-color: inherit;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: inherit;
            cursor: pointer;
            font-size: 100%;
            color: white;
        }
    `

    export const TypingBox = styled(VerCenterDiv)`
        width: 70%;
        height: 40%;
        background-color: transparent;
        align-items: flex-start;
        justify-content: space-evenly;
        padding-left: 5%;
        & span:first-child {
            font-size: 170%;
            width: 100%;
            height: 40%;
            color: ${(props) => props.theme.textColors.swanWhite};
        }
        & span:last-child {
            font-size: 130%;
        }
    `

    export const TotalNoticeBoard = styled(VerCenterDiv)`
        width: 80%;
        height: 95%;
        background-color: ${(props) => props.theme.boxColors.opaqueBlack};
        position: absolute;
        right: 5%;
        border-radius: ${(props) => props.theme.borders.small};
        padding: 0.5%;
    `
    export const InTotalNoticeBoard = styled(VerCenterDiv)`
        width: 100%;
        height: 100%;
        background-color: inherit;
        border-radius: inherit;
        justify-content: space-between;
        //padding: 1%;
    `
    export const NoticeTypingBox = styled(HorCenterDiv)`
        width: 100%;
        height: 12%;
        //background-color: gray;
        padding-left: 2%;
        justify-content: flex-start;
        user-select: none;
        & span:first-child {
            font-size: 180%;
            width: 100%;
            height: 40%;
            color: ${(props) => props.theme.textColors.swanWhite};
        }
    `
    export const NoticeContentBox = styled(VerCenterDiv)`
        width: 100%;
        height: 87%;
        padding-left: 2%;
        justify-content: space-between;
        
    `
    export const SpreadModeTabsContainer = styled(HorCenterDiv)`
        width: 100%;
        height: 10%;
        padding: 0.5% 0.5% 0% 0;
        justify-content: flex-start;
    `
    export const SpreadNoticeContentBox = styled(HorCenterDiv)`
        width: 100%;
        height: 89%;
        border: 2px solid rgba(24, 220, 255, 0.7);
        border-radius: ${(props) => props.theme.borders.small};
    `
    export const ModeTabItem = styled(HorCenterDiv)`
        width: 15%;
        height: 100%;
        background-color: ${(props) => props.theme.boxColors.opaqueBlack};
        margin-right: 1%;
        border-radius: ${(props) => props.theme.borders.small};
        cursor: pointer;
        user-select: none;
        position: relative;
    `
    export const RedCircle = styled(HorCenterDiv)`
        width: 5px;
        height: 5px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        right: 5%;
    `
    export const tabItemVar = {
        active: {
            backgroundColor: 'rgba(23, 65, 234, 1)'
        },
        inactive: {
            backgroundColor: 'rgba(23, 65, 24, 0.2)'
        }
    }
    export const optionalBtnVar = {
        initial : {
            opacity: 0  ,
            borderRadius: '5px',
            backgroundColor: 'rgba(20, 20, 20, 0.7)',
            color :'rgba(240, 147, 43,1.0)',
            border: '2px solid rgba(24, 220, 255, 0.3)',
            //width: '50%'
        },
        active : {
            opacity: 1,
            borderRadius: '5px',
            backgroundColor: 'rgba(20, 20, 20, 0.7)',
            color :'rgba(240, 147, 43,1.0)',
            border: '2px solid rgba(24, 220, 255, 0.3)',

        },
        inactive :{
            opacity: 1,
            backgroundColor: 'rgba(20, 20, 20, 0.2)',
            //border: '0px solid rgba(24, 220, 255, 0)',
            //color :'rgba(240, 147, 43,1.0)',
            border: '2px solid rgba(24, 220, 255, 0.3)',
            color: 'rgba(72, 84, 96,1.0)',
        },
        hover:{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '5px',
            color: ['rgba(240, 147, 43,1.0)', 'rgba(83, 92, 104,1.0)', 'rgba(240, 147, 43,1.0)'],
            border: '2px solid rgba(24, 220, 255, 0.7)',
            transition: {
                color:{
                    repeat: Infinity,
                    duration: 1
                }
            }
        }
    }
    export const listItemVar = {
        active: {
            opacity: 1,
            color: `rgba(240, 147, 43,1.0)`
        },
        inactive: {
            opacity: 0.7
        }
    }
}

export namespace ST_AllList{
    export const Container = styled(HorCenterDiv)`
        width: 100%;
        height: 100%;
        background-color:gray;
    `
}

export namespace ST_SingleList{
    export const Container = styled(HorCenterDiv)`
        width: 100%;
        height: 100%;
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
        border-radius: inherit;
        justify-content: space-between;
        padding: 0.5%;
        & > div{
            border-radius: inherit;
        }
    `
    export const ProjectListBox = styled(VerCenterDiv)`
        width: 70%;
        height: 100%;
        //background-color: aliceblue;
        justify-content: space-between;
        padding: 0.5%;
    `
    export const ListItemTypeTable = styled(HorCenterDiv)`
        width: 100%;
        height: 10%;
        //background-color: pink;
        justify-content: space-between;
        color: ${(props) => props.theme.spreadDefaultTextColor};
        letter-spacing: 0.1em;
        font-size: 110%;
        & div {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;

            &:first-child{
                width: 10%;
                //background-color: aquamarine;
            }
            &:nth-child(2){
                width: 70%;
                //background-color: cadetblue;
            }
            &:last-child{
                width: 20%;
                //background-color: brown;
            }
        }
    `
    export const ListItemContentTable = styled(VerCenterDiv)`
        width: 100%;
        height: 89%;
        justify-content: flex-start;
        align-items: flex-end;
        user-select: none;
        
        scroll-behavior: auto;
        overflow: overlay;
        overflow-x: hidden;


        ::-webkit-scrollbar {
        width: 1vw;
        }
        ::-webkit-scrollbar-thumb {
            background-color: hsla(0, 0%, 42%, 0.49);
            border-radius: 100px;
        }
        //background-color: skyblue;
        color: ${(props) => props.theme.spreadDefaultTextColor};

        padding: 1% 0 1% 0;
    `
    export const ListItem = styled(HorCenterDiv)`
        min-width: 100%;
        min-height: 15%;
        //background-color: coral;
        margin-bottom: 1%;
        //font-family: ${(props) => props.theme.korFont};
        border : ${(props) => props.theme.spreadBtnDefaultborder};
        font-weight: 600;
        letter-spacing: 0.05em;
        cursor: pointer;
        & > div {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            //font-family: ${(props) => props.theme.korFont};
            &:first-child{
                width: 10%;
                position: relative;
                //background-color: aquamarine;
            }
            &:nth-child(2){
                width: 70%;
                //background-color: cadetblue;
            }
            &:last-child{
                width: 20%;
                //background-color: brown;
            }
        }
        &:last-child{
            margin-bottom: 0;
        }
    `

    export const ProjectInfoBox = styled(VerCenterDiv)`
        width: 29%;
        height: 100%;
        //background-color: tomato;
        justify-content: space-between;
        padding: 0.5%;
        color: ${(props) => props.theme.spreadDefaultTextColor};
        border : ${(props) => props.theme.spreadBtnDefaultborder};
    `
    export const Info_NotSelected = styled(HorCenterDiv)`
        width: 100%;
        height: 100%;
        font-size: 130%;
        //background-color: gray;

    `
    export const InfoName = styled(HorCenterDiv)`
        width: 100%;
        height: 10%;
        justify-content: flex-start;
        border-bottom: 2px solid ${(props) => props.theme.spreadDefaultTextColor};
        //font-family: ${(props) => props.theme.korFont};
        font-weight: 600;
        letter-spacing: 0.1em;
    `
    export const InfoDetailTable = styled(VerCenterDiv)`
        width: 100%;
        height: 59%;
        //background-color: yellowgreen;
        justify-content: flex-start;
        padding: 1% 0 1% 0;
    `
    export const InfoDetailItems = styled(HorCenterDiv)`
        width: 100%;
        height: 14%;
        //background-color: navy;
        margin-bottom: 1%;
        justify-content: space-between;
        font-size: 105%;
        &:last-child{
            margin-bottom: 0;
        }
        & > div{
            height: 100%;
            display: flex;
            align-items: center;
            &:first-child{
                width: 40%;
                padding-left: 0.5%;
                //background-color: red;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 1% 0 1%;
                & > div{
                    height: 100%;
                    display: flex;
                    align-items: center;
                    &:first-child{
                    width: 97%
                    }
                    &:last-child{
                        width: 3%;
                    }
                }
                
            }
            &:last-child{
                width: 59%;
                //background-color: violet;
                justify-content: flex-start;
                padding-left: 2%;
            }
        }
    `
    export const InfoOptionBtnBox = styled(VerCenterDiv)`
        width: 100%;
        height: 30%;
        //background-color: red;
        justify-content: space-evenly;
    `
    export const RedCircle = styled(HorCenterDiv)`
        width: 5px;
        height: 5px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        left: 10%;
    `
    export const InfoOptionBtn = styled(HorCenterDiv)`
        width: 60%;
        height: 25.5%;
        cursor: pointer;
        border-radius: ${(props) => props.theme.borders.small};
    `
}

export namespace ST_MultiList{

}