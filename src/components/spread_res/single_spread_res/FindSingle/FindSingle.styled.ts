
/* eslint-disable */
import styled from 'styled-components'
import { HorCenterDiv, VerCenterDiv } from 'common_resources/CommonStyle'
import {IHaveImageProps} from 'definition/CommonDefinition';

const defaultRoute = `/Images/BackOfCards/BackOfCard0.png`

export namespace SS_FindCommon {
    export const Container = styled(VerCenterDiv)`
        width: 15%;
        height: 70%;
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
        position: absolute;
        border-radius: ${(props) => props.theme.borders.small};
        padding: 0.5%;
    `
    export const InContainer = styled(VerCenterDiv)`
        width: 100%;
        height: 100%;
        background-color: inherit;
        border-radius: inherit;
        justify-content: space-between;
        & > div {
            border-radius: inherit;
        }
    `
    export const ImgContainer = styled(HorCenterDiv)<IHaveImageProps>`
        width: 100%;
        height: 60%;
        //background-color: brown;
        padding: 3%;
        & > div{
            border-radius: inherit;
            width: 100%;
            height: 100%;
            background : url(${(props) => props.imgsrc});
            image-rendering: -webkit-optimize-contrast;
            background-size: 100% 100%;
            will-change : background;
        }
    `
    export const BoxForCard = styled(HorCenterDiv)`
        width: 100%;
        height: 10%;
        background-color: inherit;
        color: rgba(240, 147, 43,1.0);
        border: 2px solid rgba(24, 220, 255, 0.3);
    `
    export const OpenFindBox = styled(HorCenterDiv)`
        width: 100%;
        height: 10%;
        //background-color: inherit;
        letter-spacing: 0.1em;
        cursor: pointer;
    `
}

export namespace SS_FindSecond {
    export const Container = styled(HorCenterDiv)`
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
    `
    export const InContainer = styled(HorCenterDiv)`
        width: 60%;
        height: 80%;
        background-color: inherit;
        border-radius: ${(props) => props.theme.borders.small};
        padding: 0.5%;
        position: relative;
    `
    export const ControlBox = styled(VerCenterDiv)`
        width: 100%;
        height: 100%;
        background-color: inherit;
        border-radius: inherit;
        justify-content: space-between;
        & > div {
            border-radius: inherit;
        }
    `
    export const OracleSelectBox = styled(HorCenterDiv)`
        width: 100%;
        height: 15%;
        //background-color: blue;
        justify-content: flex-start;
        padding: 1%;
    `
    export const OracleSelectItem = styled(HorCenterDiv)`
        width: 20%;
        height : 100%;
        //background-color: olive;
        margin-right: 2%;
        border-radius: ${(props) => props.theme.borders.small};
        cursor: pointer;
        letter-spacing: 0.1em;
        position: relative;
        &:last-child{
            margin-right: 0;
        }
    `
    export const RedCircle = styled(HorCenterDiv)`
        width: 5px;
        height: 5px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        right: 5%;
    `

    export const DetailSelectBox = styled(HorCenterDiv)`
        width: 100%;
        height: 84%;
        //background-color: gainsboro;
        padding: 1%;
        justify-content: space-between;
        border-radius: inherit;
    `
    export const TypeSelectBox = styled(VerCenterDiv)`
        width: 23%;
        height: 100%;
        background-color: transparent;
        border: 2px solid rgba(24, 220, 255, 0.7);

        border-radius: inherit;

        padding: 1%;
        justify-content: flex-start;
        & > div {
            border-radius: inherit;
        }
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
    export const TypeSelectItem = styled(HorCenterDiv)`
        width: 100%;
        height: auto;
        min-height: 15%;
        margin-bottom: 2%;
        cursor: pointer;
        position: relative;
        font-size: 120%;
        font-weight: 600;
        letter-spacing: 0.02em;
        &:last-child{
            margin-bottom: 0;
        }
    `
    export const CardSelectBox = styled(VerCenterDiv)`
        width: 40%;
        height: 100%;
        background-color: transparent;
        border-radius: inherit;
        border: 2px solid rgba(24, 220, 255, 0.7);
        padding: 1%;
        justify-content: flex-start;
        & > div {
            border-radius: inherit;
        }
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
    export const CardSelectItem = styled(HorCenterDiv)`
        width: 100%;
        height: auto;
        min-height: 10%;
        margin-bottom: 2%;
        font-weight: 600;
        letter-spacing: 0.02em;
        position: relative;
        cursor: pointer;
        &:last-child{
            margin-bottom: 0;
        }
    `
    export const OptionControlBox = styled(VerCenterDiv)`
        width: 35%;
        height: 100%;
        background-color: transparent;
        border: 2px solid rgba(24, 220, 255, 0.7);
        justify-content: space-between;
        border-radius: ${(props) => props.theme.borders.small};
        padding: 0.5%;
        color: ${(props) => props.theme.spreadDefaultTextColor};
    `
    export const CardPreviewBox = styled(HorCenterDiv)`
        width: 100%;
        height: 60%;
        border-radius: inherit;

        //background-color: beige;
        justify-content: space-between;
    `
    export const CardImgBox = styled(VerCenterDiv)`
        width: 48.5%;
        height: 100%;
        //background-color: aquamarine;
        border-radius: inherit;
        justify-content: space-between;
    `
    export const CardNameDes = styled(HorCenterDiv)`
        width: 100%;
        height: 15%;
        border-radius: inherit;

        //background-color: blanchedalmond;
    `
    export const CardImg = styled(HorCenterDiv)<IHaveImageProps>`
        width: 100%;
        height: 84%;
        //background-color: burlywood;
        padding: 5%;
        border-radius: inherit;

        & > div {
            width: 100%;
            height: 100%;
            border-radius: inherit;

            //background-color: darkkhaki;
            background: url(${(props) => props.imgsrc});
            background-size: 100% 100%;
        }
    `
    export const OptionalBox = styled(VerCenterDiv)`
        width: 100%;
        height: 39%;
        //background-color: navy;
        justify-content : flex-start;
    `
    export const CardNamePreview = styled(HorCenterDiv)`
        width: 100%;
        height: 30%;
        //background-color: lemonchiffon;
        letter-spacing: 0.05em;
        font-size: 110%;
        justify-content: space-between;
        font-weight: 600;
        & > span{
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 95%;
            &:first-child{
                width: 42%;
                justify-content: flex-start;
                padding-left: 2%;
                //background-color: blue;
                position: relative;
                & > span {
                    position: absolute;
                    width: auto;
                    height: auto;
                    right: 2%;
                }
            }
            &:last-child{
                width: 58%;
                font-weight: 600;
            }
        }
        
    `
    export const OptionalBtn = styled(HorCenterDiv)`
        width: 70%;
        height: 25%;
        //background-color: blanchedalmond;
        margin-top: 4%;
        border-radius: ${(props) => props.theme.borders.small};
        font-size: 110%;
        letter-spacing: 0.02em;
        font-weight: 600;
        cursor: pointer;
    `
    export const BackBtn = styled(HorCenterDiv)`
        width: 10%;
        height: 8%;
        bottom: -10%;
        right: 0%;
        border-radius: inherit;
        position: absolute;
        cursor: pointer;
    `

}