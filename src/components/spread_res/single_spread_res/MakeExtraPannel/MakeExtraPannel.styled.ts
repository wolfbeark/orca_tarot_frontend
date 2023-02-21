/* eslint-disable */
import styled from 'styled-components'
import {motion, Variants} from 'framer-motion'
import { HorCenterDiv, VerCenterDiv } from 'common_resources/CommonStyle'
import { IHaveImageBoxProps } from 'common_resources/CommonInterfaces'

interface ExtraTarotDeckItem {
    name : string;
    imgNum : number;
    startNum : number;
    endNum : number;
    deckCount : number;
    itemPriority: number;
}

export const ExtraTarotDeckInfoArr : ExtraTarotDeckItem[] = [
    {
        name : "Major",
        imgNum : 0,
        startNum: 0,
        endNum: 21,
        deckCount : 22,
        itemPriority: 1,
    },
    {
        name: "Wand",
        imgNum : 22,
        startNum : 22,
        endNum : 31,
        deckCount : 10,
        itemPriority: 3,
    },
    {
        name: "Sword",
        imgNum : 36,
        startNum : 36,
        endNum : 45,
        deckCount : 10,
        itemPriority: 4,
    },
    {
        name: "Cup",
        imgNum : 50,
        startNum : 50,
        endNum : 59,
        deckCount : 10,
        itemPriority: 5,
    },
    {
        name: "Pentacle",
        imgNum : 64,
        startNum : 64,
        endNum : 73,
        deckCount : 10,
        itemPriority: 6,
    },
    {
        name: "Minor",
        imgNum : 73,
        startNum : 22,
        endNum : 77,
        deckCount : 56,
        itemPriority: 2,
    },
    {
        name: "Wand Palace",
        imgNum : 35,
        startNum : 32,
        endNum : 35,
        deckCount : 4,
        itemPriority: 7,
    },
    {
        name: "Sword Palace",
        imgNum : 49,
        startNum : 46,
        endNum : 49,
        deckCount : 4,
        itemPriority: 8,
    },
    {
        name: "Cup Palace",
        imgNum : 63,
        startNum : 60,
        endNum : 63,
        deckCount : 4,
        itemPriority: 9,
    },
    {
        name: "Pentacle Palace",
        imgNum : 77,
        startNum : 74,
        endNum : 77,
        deckCount : 4,
        itemPriority: 10,
    },
]

interface ISelectTypeVar extends Variants {
    active? : {
        backgroundColor? : string,
        border? : string,
        boxShadow?: string
    },
    hover? : {
        backgroundColor? : string,
        boxShadow? : string,
        scale? : number,
    }
}
export namespace MEPCommon {
    export const Container = styled(HorCenterDiv)`
        width: 100%;
        height: 100%;
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
        position: absolute;
        border-radius: ${(props) => props.theme.borders.small};
    `
    export const ExitBtnBox = styled(HorCenterDiv)`
        width: 90px;
        height: 40px;
        position: absolute;
        right: 0;
        bottom: -40px;
        border-radius: inherit;
        cursor: pointer;
    `

    export const darkSelectVar : ISelectTypeVar = {
        active: {
            backgroundColor: `rgba(240, 147, 43, 0.7)`,
            boxShadow: `0 0 10px 3px rgba(240, 147, 43, 0.7)`
        },
        hover : {
            //backgroundColor: `rgba(24, 220, 255, 0.7)`
            backgroundColor: `rgba(240, 147, 43, 0.7)`,
            boxShadow: `0 0 10px 3px rgba(240, 147, 43, 0.7)`
        }
    }
    export const optionalBtnVar = {
        initial : {
            opacity: 1,
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

    export const darkSelectNameVar = {
        initial : {
            color: 'rgba(240, 147, 43,1.0)'
        },
        active : {
            border: '2px solid rgba(24, 220, 255, 0.3)',
            //color: 'rgba(72, 84, 96,1.0)',
            color: 'rgba(240, 147, 43,1.0)'
        },
        hover : {
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
export namespace MEP_FirstFlag {
    export const Container = styled(HorCenterDiv)`
        width: 45%;
        height: 60%;
        background-color: blue;
        padding: 0.5%;
        border-radius: inherit;
        background-color: inherit;
        position: absolute;
    `
    export const InContainer = styled(VerCenterDiv)`
        width: 100%;
        height: 100%;
        background-color: inherit;
        border-radius: inherit;
        position: relative;
        justify-content: space-between;
        & > div{
            border-radius: inherit;
        }
    `
    export const DesBox = styled(HorCenterDiv)`
        width: 100%;
        height: 20%;
        background-color: transparent;
        justify-content: flex-start;
        padding-left: 5%;
        font-size: 200%;
        user-select: none;
        color: ${(props) => props.theme.textColors.swanWhite};
    `
    export const SelectBox = styled(HorCenterDiv)`
        width: 100%;
        height: 78%;
        justify-content: space-evenly;
    `
    export const SelectBoxItem = styled(HorCenterDiv)<IHaveImageBoxProps>`
        width: 20%;
        height: 70%;
        min-width: 20%;
        min-height: 70%;
        background-color: inherit;
        border-radius: inherit;
        padding: 0.5%;
        cursor: pointer;
        & > div {
            width: 100%;
            height: 100%;
            display: flex;
            border-radius: inherit;
            background: url(${(props) => props.imgsrc});
            background-size: 100% 100%;    
        }
    `

    
    export const btnVar = {
        
        hover:{
            scale: 1.1,
            backgroundColor: `rgba(20, 20, 20, 1)`
        }
    }
}


export namespace MEP_SecondFlag{
    export const Container = styled(HorCenterDiv)`
        width: 65%;
        height: 80%;
        padding: 0.5%;
        border-radius: inherit;
        background-color: inherit;
        position: absolute;

    `
    export const InContainer = styled(HorCenterDiv)`
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background-color: inherit;
        position: relative;
        justify-content: space-between;
        & > div {
            border-radius: inherit;
        }
    `
    export const LenorOrPokerQuestion = styled(HorCenterDiv)`
        width: 40%;
        height: 60%;
        padding: 0.5%;
        justify-content: space-evenly;
        background-color: beige;
        position: absolute;
        border-radius: inherit;
        background-color: inherit;
    `
    export const T_DeckSelectPannel = styled(HorCenterDiv)`
        width: 79%;
        height: 100%;
        background-color: inherit;
        display: grid;
        grid-template-columns: repeat(5, minmax(18%, auto));
        grid-template-rows: repeat(2, minmax(100px, auto));
        column-gap: 2%;
        row-gap: 2%;
        align-items: center;
        padding: 1%;
    `
    export const T_DeckSelectItem = styled(VerCenterDiv)<IHaveImageBoxProps>`
        width: 100%;
        height: 100%;
        justify-content: space-evenly;
        border-radius: inherit;
        padding: 1%;
        cursor: pointer;
        & > div {
            width: 80%;
            border-radius: inherit;
        }
        & > div:first-child{
            height: 70%;
            background: url(${(props) => props.imgsrc});
            background-size: 100% 100%;
        }
        & > div:last-child{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 19%;
            padding: 0.5%;
            //background-color: pink;
            //border: 2px solid rgba(24, 220, 255, 0.3);
            
        }
    `
    export const T_OptionControlPannel = styled(VerCenterDiv)`
        width: 20%;
        height: 100%;
        //background-color: orangered;
        justify-content: space-between;
        & > div {
            border-radius: inherit;
        }
    `
    export const T_SelectListBox = styled(motion.div)`
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
        width: 100%;
        height: 40%;
        padding: 2%;
        box-sizing: border-box;
    `
    export const T_InSelectListBox = styled(VerCenterDiv)`
        width: 100%;
        height: 100%;
        align-items: start;
        background-color: inherit;
        border-radius: inherit;
        padding: 1%;
    `
    export const SelectedList = styled(motion.ul)`
        color: beige;
        width: 100%;
        height: 100%;
        list-style: none;
        border-radius: inherit;
        background-color: inherit;
        padding-left: 3%;
        padding-top: 3%;
        & li {
            color: ${(props) => props.theme.spreadBtnTextColor};
            font-size: 105%;
            width: 100%;
            height: auto;
            margin-top: 2%;
        }
    `;
    export const T_OptionBtnBox = styled(motion.div)`
        background-color: inherit;
        width: 100%;
        height: 38%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 2%;
    `;

    export const T_LimitCountControlBox = styled(VerCenterDiv)`
        width: 100%;
        height: 20%;
        justify-content: space-evenly;
        background-color: inherit;
        border-radius: inherit;
        padding: 2%;
    `
    export const LimitNoticeBox = styled(HorCenterDiv)`
        width: 100%;
        height: 48%;
        border-radius: inherit;
        background-color: inherit;
        padding: 1%;
        justify-content: space-between;
        border : ${(props) => props.theme.spreadBtnDefaultborder};
        color: ${(props) => props.theme.spreadBtnTextColor};
        & > div{
            border-radius: inherit;
            background-color: transparent;
            display: flex;
            justify-content: center;
            align-items: center;

            &:first-child{
                width: 55%;
                height: 100%;
                justify-content: flex-start;
                align-items: center;
                padding-left: 5%;
            }
            &:last-child{
                width: 40%;
                height: 100%;
            }
            
        }
        & > input{
            text-align: center;
            border-radius: inherit;
            width: 40%;
            height: 100%;
            color: inherit;
            background-color: rgba(72, 84, 96, 0.2);
            caret-color: white;
            ::placeholder{
                color: inherit;
                fill-opacity: 0.2;
            }
            will-change: border;
        }
        
        
    `
    export const OptionBtn = styled(HorCenterDiv)`
        width: 100%;
        height: 22%;
        border-radius: inherit;
        cursor: pointer;
    `

    export const MaskBox = styled(HorCenterDiv)`
        width: 100%;
        height: 100%;
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
        border-radius: inherit;
        position: absolute;
    `
    export const Question_NoSelectDeck = styled(VerCenterDiv)`
        width: 60%;
        height: 50%;
        background-color: inherit;
        border-radius: inherit;
        justify-content: space-evenly;
        padding: 1%;
        //background-color: skyblue;
    `
    export const NoSelectTextBox = styled(HorCenterDiv)`
        width: 100%;
        height: 40%;
        justify-content: center;
        color: ${(props) => props.theme.spreadBtnTextColor};
        font-size: 150%;
        position: relative;
        & > div{
            width: auto;
            height: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            text-align: center;
            position: absolute;
        }
    `
    export const QuestionHowManyCards = styled(VerCenterDiv)`
        width: 100%;
        height: 100%;
        background-color: inherit;
        padding: 1%;
        justify-content: space-evenly;
        padding-top: 5%;
        border-radius: inherit;

        & input{
            width: 100%;
            height: 25%;
            background-color: tomato;
            font-size: 120%;
            text-align: left;
            border-radius: inherit;
            color: ${(props) => props.theme.spreadDefaultTextColor};

            background-color: rgba(72, 84, 96, 0.2);
            caret-color: white;
            ::placeholder{
                color: ${(props) => props.theme.spreadDefaultTextColor};
                fill-opacity: 1;
            }
            will-change: border;
            padding-left: 5%;
        }
        & div{
            border-radius: inherit;
        }
    `
    export const DesLimitCount = styled(HorCenterDiv)`
        width: 100%;
        height: 20%;
        border-radius: inherit;
        justify-content: flex-start;
        color: ${(props) => props.theme.spreadDefaultTextColor};
        font-size: 170%;
        padding-left: 5%;
        & span{
            width: 100%;
            height: 100%;
        }
    `
    export const HowManyOptionBtnBox = styled(HorCenterDiv)`
        width: 100%;
        height: 20%;
        border-radius: inherit;
        justify-content: space-evenly;
        padding: 1%;
    `
    export const HowManyOptionBtn = styled(HorCenterDiv)`
        width: 30%;
        height: 100%;
        border-radius: inherit;
        background-color: teal;
        cursor: pointer;
        font-size: 120%;
    `
    export const HowManyError = styled(HorCenterDiv)`
        width: 100%;
        height: 10%;
        color: ${(props) => props.theme.spreadDefaultTextColor};
        justify-content: flex-start;
        padding-left: 5%;
    `
}