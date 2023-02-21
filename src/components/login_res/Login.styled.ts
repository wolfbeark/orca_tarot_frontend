/* eslint-disable */
import styled from 'styled-components';
import {motion} from 'framer-motion';

import {HorCenterDiv, VerCenterDiv} from 'common_resources/CommonStyle';

import { 
    IWindowScreenProps,
    IHaveImageProps 
} from 'definition/CommonDefinition';

export const Container = styled(HorCenterDiv)<IWindowScreenProps>`
    width: 100%;
    height: ${(props) => `${props.wheight}px`};
    justify-content: space-between;
    position: relative;
`

export const LeftImgContainer = styled(HorCenterDiv)<IHaveImageProps>`
    width: 80%;
    height: 100%;
    background: linear-gradient(
        to right,
        rgba(20, 20, 20, 0) 10%,
        rgba(20, 20, 20, 0.25) 25%,
        rgba(20, 20, 20, 0.5) 50%,
        rgba(20, 20, 20, 0.75) 75%,
        rgba(20, 20, 20, 1) 100%
    ), url(${(props) => props.imgsrc});
    image-rendering: -webkit-optimize-contrast;
    background-size: 100% 100%;
    transform:translateZ(0);
`
export const RightAccessContainer = styled(VerCenterDiv)`
    width: 20%;
    height: 100%;
    background-color: rgba(20, 20, 20, 1);
    padding: 1%;
    justify-content: space-evenly;
    padding-top: 20%;
`
export const WelcomeMat = styled(HorCenterDiv)`
    width: 100%;
    height: 10%;
    //background-color: skyblue;
    font-family: ${(props) => props.theme.engFont};
    font-size: 300%;
    font-weight: 500;
    color: white;
    letter-spacing: .1em;
    transform: rotate(0.04deg);
    text-align: center;
`
export const AccessBox = styled(motion.form)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 2% 0 2%;
    width: 100%;
    height: 60%;
    background-color: ${(props) => props.theme.boxColors.soaring};
    border-radius: ${(props) => props.theme.borders.small};
    position: relative;
`
export const AccessInputBox = styled(VerCenterDiv)`
    width : 100%;
    height: 30%;
    //background-color: pink;
    font-family: ${(props) => props.theme.engFont};
    margin-bottom: 5%;
`
export const AccessLabel = styled(HorCenterDiv)`
    width: 100%;
    height: 50%;
    padding-left: 1%;
    //justify-content: left;
    text-decoration: underline;
    color: white;
    cursor: pointer;
`
export const AccessInput = styled(motion.input)`
    width: 100%;
    height: 50%;
    padding-left: 1%;
    border-color: unset;
    border-radius: ${(props) => props.theme.borders.small};
    background-color: ${(props) => props.theme.boxColors.soaring};
    color: white;
    text-align : center;
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: none;
    &:focus {
        box-shadow: inset 0 0 5px 2px rgba(255, 255, 255, 0.4);
    }
`
export const AcessBtn = styled(motion.button)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 15%;
    background-color: ${(props) => props.theme.boxColors.soaring};
    color: rgba(83, 92, 104,1.0);
    border-radius: ${(props) => props.theme.borders.small};
    font-family: ${(props) => props.theme.engFont};
    position: relative;
    backdrop-filter: blur(10px);
`
export const ErrorBox = styled(HorCenterDiv)`
    position: absolute;
    width: 100%;
    height: 10%;
    font-family: ${(props) => props.theme.engFont};
    bottom: 5%;
    color: white;
`