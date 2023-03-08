/* eslint-disable */
import styled from 'styled-components';
import {motion} from 'framer-motion';
import { HorCenterDiv, VerCenterDiv } from 'common_resources/CommonStyle';


export namespace SS_Common {

    export const optionBtnVar = {
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
            border: '2px solid rgba(24, 220, 255, 0.5)',

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
}


export namespace SSO_RQuestion {
    export const Container = styled(HorCenterDiv)`
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.7;
        position: absolute;
    `
    export const QuestionBox = styled(HorCenterDiv)`
        width: 40%;
        height: 50%;
        background-color: white;
        border-radius: ${(props) => props.theme.borders.small};
        padding: 0.5%;
    `
    export const InQuestionBox = styled(VerCenterDiv)`
        width: 100%;
        height: 100%;
        background-color: gray;
        border-radius: inherit;
        justify-content: space-evenly;
    `
    export const QuestionDesBox = styled(HorCenterDiv)`
        width: 100%;
        height: 30%;
        background-color: red;
    `
    export const QuestionBtnBox = styled(HorCenterDiv)`
        width: 100%;
        height: 20%;
        background-color: skyblue;
        padding: 1%;
        justify-content: space-evenly;
    `
    export const OptionBtn = styled(HorCenterDiv)`
        width: 30%;
        height: 100%;
        background-color: orangered;
        border-radius: ${(props) => props.theme.borders.small};
        cursor: pointer;
        font-size: 120%;
    `
}

export namespace SS_RestartFirst{
    export const Container = styled(HorCenterDiv)`
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
    `
    export const QuestionBox = styled(VerCenterDiv)`
        width: 40%;
        height: 50%;
        background-color: ${(props) => props.theme.boxColors.opaqueBlack};
        border-radius: ${(props) => props.theme.borders.small};
        padding: 0.5%;
        user-select: none;
        justify-content: center;
        position: relative;
    `
    export const FirstQuestionSpan = styled(HorCenterDiv)`
        width: 100%;
        height: 15%;
        //background-color: yellow;
        justify-content: center;
        //font-size: 140%;
        font-size: 130%;
        margin-bottom: 5%;
        color: ${(props) => props.theme.textColors.swanWhite};
    `
    export const FirstQuestionBtnBox = styled(HorCenterDiv)`
        width: 100%;
        height: 20%;
        //background-color: gray;
        padding: 1%;
        justify-content: space-evenly;
    `
    export const FirstQuestionBtn = styled(HorCenterDiv)`
        width: 25%;
        height: 100%;
        background-color: indianred;
        color: ${(props) => props.theme.textColors.swanWhite};
        cursor: pointer;
        border-radius: ${(props) => props.theme.borders.small};
        box-shadow: unset;
    `
    export const QuestionCancelBtn = styled(HorCenterDiv)`
        width: 20%;
        height: 10%;
        background-color: skyblue;
        position: absolute;
        right: 0;
        bottom: -12%;
        border-radius: inherit;
        cursor: pointer;
    `
}

export namespace SS_RestartSecond{
    export const Container = styled(HorCenterDiv)`
        width: 45%;
        height: 80%;
        background-color: ${(props) => props.theme.boxColors.opaqueBlack};
        border-radius: ${(props) => props.theme.borders.small};
        padding: 0.5%;
        position: absolute;
        top: 8%;
    `
    export const SingleNormalSetting = styled(VerCenterDiv)`
        width: 100%;
        height: 100%;
        background-color: inherit;
        border-radius: inherit;
    `
    export const SingleSettingQustionBox = styled(VerCenterDiv)`
        width: 100%;
        height: 100%;
        //background-color: skyblue;
        justify-content: flex-start;
    `
    export const DesCurrentSection = styled(HorCenterDiv)`
        width: 100%;
        height: 15%;
        //background-color: pink;
        justify-content: flex-start;
        padding-left: 5%;
        font-size: 200%;
        color: ${(props) => props.theme.textColors.swanWhite};
        user-select : none;
    `
    export const SettingBox = styled(VerCenterDiv)`
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 85%;
        padding: 1%;
        position: relative;
        
    `
    export const BoxWrapper = styled(HorCenterDiv)`
        width: 100%;
        height: 20%;
        justify-content: center;
        padding-left: 3%;
        margin-bottom: 1%;
        
    `
    export const SettingWrapperBox = styled(VerCenterDiv)`
        width: 100%;
        height: 50%;
        //background-color: olive;
        justify-content: flex-start;
        align-items: center;
        
    `
    export const SettingAttrLabel = styled(motion.label)`
        width: 22%;
        height: 100%;
        background-color: ${(props) => props.theme.boxColors.opaqueBlack};
        display: flex;
        justify-content: flex-start;
        padding-left: 1.5%;
        align-items: center;
        border-radius: ${(props) => props.theme.borders.small};
        cursor: pointer;
        user-select: none;
        //color: rgba(83, 92, 104,1.0);
        color: ${(props) => props.theme.textColors.swanWhite};
        letter-spacing: 0.05em;
    `
    export const SettingAttrInput = styled(motion.input)`
        width: 70%;
        height: 100%;
        background-color: ${(props) => props.theme.boxColors.opaqueBlack};
        color: ${(props) => props.theme.textColors.swanWhite};
        display: flex;
        justify-content: center;
        //font-family: ${(props) => props.theme.korFont};
        font-weight: 600;
        align-items: center;
        margin-left: 1%;
        padding-left: 2%;
        box-shadow: none;
        letter-spacing: 0.2em;
        border-radius: ${(props) => props.theme.borders.small};
        &:focus{
            box-shadow:  0 0 2px 1px rgba(255, 121, 63,1.0);
            transition: box-shadow 0.2s ease;
        }
        will-change: box-shadow;
        user-select: none;
    `
    export const PreviewQuestionBox = styled(motion.div)`
        width: 70%;
        height: 100%;
        background-color: ${(props) => props.theme.boxColors.opaqueBlack};
        color: ${(props) => props.theme.textColors.swanWhite};
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 1%;
        padding-left: 2%;
        box-shadow: none;
        letter-spacing: 0.2em;
        border-radius: ${(props) => props.theme.borders.small};
        cursor: pointer;
        user-select: none;
    `
    export const SettingAttrBox = styled(HorCenterDiv)`
        width: 22%;
        height: 100%;
        background-color: ${(props) => props.theme.boxColors.opaqueBlack};
        border-radius: ${(props) => props.theme.borders.small};
        color: ${(props) => props.theme.textColors.swanWhite};
        letter-spacing: 0.05em;
        justify-content: flex-start;
        padding-left: 1.5%;
    `

    export const DropDownBox = styled(HorCenterDiv)`
        width: 70%;
        height: 100%;
        background-color: ${(props) => props.theme.boxColors.opaqueBlack};
        color: ${(props) => props.theme.textColors.swanWhite};
        position: relative;
        margin-left: 1%;
        cursor: pointer;
        user-select: none;
        letter-spacing: 0.2em;
        padding-left: 2%;
        justify-content: flex-start;
        border-radius: ${(props) => props.theme.borders.small};
    `
    export const DropDownContentBox = styled(VerCenterDiv)`
        width: 100%;
        height: 400%;
        background-color: ${(props) => props.theme.boxColors.opaqueBlack};
        //background-color: green;
        color: ${(props) => props.theme.textColors.swanWhite};
        border-radius: ${(props) => props.theme.borders.small};
        position: absolute;
        left: 0;
        bottom: -405%;
        z-index: 3;
        justify-content: space-evenly;
    `
    export const DropDownItem = styled(HorCenterDiv)`
        width: 50%;
        height: auto;
        min-height: 15%;
        background-color: ${(props) => props.theme.boxColors.soaring};
        border-radius : ${(props) => props.theme.borders.small};
        position: relative;
        cursor: pointer;
        user-select: none;
        letter-spacing: 0.1em;
    `
    export const RedCircle = styled(HorCenterDiv)`
        width: 5px;
        height: 5px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        right: 2%;
    `
    export const SettingAttrName = styled(HorCenterDiv)`
        justify-content: flex-start;
        padding-left: 2%;
        font-size: 150%;
        width: 100%;
        height: 20%;
        letter-spacing: 0.05em;
        color: ${(props) => props.theme.textColors.swanWhite};
    `
    export const OptionalBox = styled(VerCenterDiv)`
        width: 100%;
        height: 80%;
        //background-color: blue;
        justify-content: flex-start;
    `
    export const NoOption = styled(HorCenterDiv)`
        width: 100%;
        height: 80%;
        padding-left: 6%;
        justify-content: flex-start;
        & div{
            width: 95%;
            height: 100%;
            background-color: ${(props) => props.theme.boxColors.opaqueBlack};
            border-radius: ${(props) => props.theme.borders.small};
            display: flex;
            justify-content: center;
            align-items: center;
            color: ${(props) => props.theme.textColors.swanWhite};
            font-size: 150%;
            letter-spacing: 0.05em;
        }
    `
    export const PrevBtn = styled(HorCenterDiv)`
        width: 18%;
        height: 10%;
        background-color: ${(props) => props.theme.boxColors.soaring};
        border-radius: ${(props) => props.theme.borders.small};
        color: ${(props) => props.theme.textColors.swanWhite};
        position: absolute;
        bottom: 1%;
        left: 1%;
    `
    export const NextBtn = styled(HorCenterDiv)`
        width: 18%;
        height: 10%;
        background-color: ${(props) => props.theme.boxColors.soaring};
        border-radius: ${(props) => props.theme.borders.small};
        color: ${(props) => props.theme.textColors.swanWhite};
        position: absolute;
        bottom: 1%;
        right: 1%;
    `
    export const ErrorBox = styled(HorCenterDiv)`
        width: 40%;
        height: 10%;
        position: absolute;
        bottom: 1%;
        color: ${(props) => props.theme.textColors.swanWhite};
        letter-spacing: 0.05em;
        font-size: 120%;
    `
}
export namespace SS_Hide{
    export const Container = styled(HorCenterDiv)`
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
    `
    export const HideBox = styled(HorCenterDiv)`
        width: 50%;
        height: 70%;
        background-color: inherit;
        border-radius: ${(props) => props.theme.borders.small};
        padding: 0.5%;
    `
    export const InHideBox = styled(VerCenterDiv)`
        width: 100%;
        height: 100%;
        //background-color: skyblue;
        justify-content: space-between;
        border-radius: inherit;
        & > div{
            border-radius: inherit;
        }
    `
    export const HideDesBox = styled(HorCenterDiv)`
        width: 100%;
        height: 20%;
        //background-color: yellow;
        justify-content: flex-start;
        font-size: 170%;
        padding-left: 2%;
        color: ${(props) => props.theme.spreadDefaultTextColor};
    `
    export const HideControlBox = styled(HorCenterDiv)`
        width: 100%;
        height: 79%;
        //background-color: olive;
        justify-content: space-between;
    `
    export const ExtraInfoList = styled(VerCenterDiv)`
        width: 65%;
        height: 100%;
        //background-color: gray;        
    `
    export const InSingleExtraInfo = styled(VerCenterDiv)`
        width: 100%;
        height: 100%;
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
        border-radius: ${(props) => props.theme.borders.small};
        //background-color: inherit;
        //position: absolute;
        //padding-left: 1%;
        padding: 1%;
        
        display: flex;
        justify-content: flex-start;
        //align-items: flex-end;
        overflow: auto;


        justify-content: flex-start;
        align-items: center;
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
    `
    export const ControlBox = styled(VerCenterDiv)`
        width: 34%;
        height: 100%;
        //background-color: brown;
        border-radius: ${(props) => props.theme.borders.small};
        justify-content: space-between;
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
    `
    export const ExtraInfoNoticeBox = styled(VerCenterDiv)`
        width: 100%;
        height: 75%;
        //background-color: cadetblue;
        border: 2px solid rgba(24, 220, 255, 0.7);
        border-radius: inherit;
        padding: 0.5%;
        justify-content: flex-start;
        color: ${(props) => props.theme.spreadDefaultTextColor};
        
        & > div:first-child{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-left: 1%;
            font-size: 130%;
            //font-weight: 600;
            letter-spacing: 0.1em;
            width: 100%;
            height: 20%;
            //background-color: seagreen;
            border-bottom: 2px solid rgba(24, 220, 255, 0.3);
            margin-bottom: 2%;
        }
    `
    export const InfoNoticeItem = styled(HorCenterDiv)`
        width: 100%;
        height: 25%;
        //background-color: gold;
        justify-content: space-between;
        margin-bottom: 1%;
        //color: ${(props) => props.theme.spreadDefaultTextColor};
        color: rgba(240, 147, 43,1.0);
        &:last-child{
            margin-bottom: 0;
        }
        & > div{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 120%;
            &:first-child{
                width: 50%;
                height: 100%;
                //background-color: gainsboro;
                justify-content: space-between;
                //padding-left: 1%;
                & > div:first-child{
                    padding-left: 2%;
                }
                & > div:last-child{
                    margin-right: 2%;
                }
            }
            &:last-child{
                width: 49%;
                height: 100%;
                //background-color: pink;
            }
        }
    `

    export const OptionalBtnBox = styled(VerCenterDiv)`
        width: 100%;
        height: 24%;
        //background-color: navy;
    `
    export const ExtraInfoItem = styled(HorCenterDiv)`
        //min-width: 90%;
        width: 100%;
        min-height: 15%;
        height: auto;
        background-color : inherit;
        border-radius: inherit;
        margin-bottom: 2%;
        border: 2px solid rgba(24, 220, 255, 0.7);
        justify-content: space-between;
        position: relative;
        padding: 0 1%;
        &:last-child {
            margin-bottom: 0;
        }
        cursor: pointer;
    `
    export const ExtraNumber = styled(HorCenterDiv)`
        width: 10%;
        height: 100%;
        border-radius: inherit;
        //background-color: gray;
        font-size: 150%;
        //font-weight: 600;
    `
    export const ExtraOracle = styled(HorCenterDiv)`
        width: 43%;
        height: 100%;
        //background-color: orangered;
        font-size: 150%;
        //font-weight: 600;
        letter-spacing: 0.2em;
    `
    export const SelectBtnBox = styled(HorCenterDiv)`
        width: 43%;
        height: 100%;
        //background-color: olive;
        justify-content: space-evenly;
        padding: 1%;
    `
    export const SelectBtn = styled(HorCenterDiv)`
        width: 40%;
        height: 100%;
        border-radius: ${(props) => props.theme.borders.small};
    `
    export const BackBtn = styled(HorCenterDiv)`
        width: 60%;
        height: 50%;
        cursor: pointer;
    `
    export const RedCircle = styled(HorCenterDiv)`
        width: 5px;
        height: 5px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        left: 2%;
    `
}