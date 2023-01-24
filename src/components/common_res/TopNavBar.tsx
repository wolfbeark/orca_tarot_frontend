/* eslint-disable */
import React, {useState} from 'react'
import styled from 'styled-components';
import {HorCenterDiv, VerCenterDiv} from 'common_resources/CommonStyle';
import { PathMatch, useMatch, Link } from 'react-router-dom';
import { RxGear } from 'react-icons/rx'
import HTimer from 'components/home_res/HTimer'
import { AnimatePresence } from 'framer-motion';

const TopNavBarContainer = styled(HorCenterDiv)`
    width: 100%;
    height: 8%;
    position: absolute;
    top: 0;
    z-index: 3;
    user-select: none;
    //padding: 0 1% 0 1%;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: 0 -2px 5px 2px rgba(247, 241, 227, 0.5);
    //background-image: linear-gradient(black, transparent);
    //opacity: 0.2;
`
const LeftContentBox = styled(HorCenterDiv)`
    width: 50%;
    height: 100%;
    //background-color: skyblue;
    justify-content: left;
    padding-left: 1%;
    font-family: ${(props) => props.theme.engFont};
`

const PageNameBox = styled(HorCenterDiv)`
    width: 30%;
    height: 100%;
    //background-color: beige;
    justify-content: left;
    font-size: 130%;
    padding-left: 3%;
    color: white;
    letter-spacing: 0.1em;
`
const MenuBtnBox = styled(HorCenterDiv)`
    width: 50%;
    height: 100%;
    //background-color: palegreen;
    justify-content: space-evenly;
    a {
        width: 20%;
        height: 60%;
        //background-color: blue;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
const MenuBtn = styled(HorCenterDiv)`
    width: 100%;
    height: 100%;
    background-color: rgba(20, 20, 20, 0);
    color: white;
    position: relative;
    font-size: 110%;
    letter-spacing: 0.07em;
    position: relative;
    border-radius: 5px;
`
const HighlightBtn = styled(HorCenterDiv)`
    width: 85%;
    height: 5%;
    background-color: rgba(209, 204, 192, 0.5);
    position: absolute;
    bottom: 0;
`
const RightContentBox = styled(HorCenterDiv)`
    width: 30%;
    height: 100%;
    justify-content: flex-end;
    padding-left: 1%;
    padding-right: 1%;
    position: relative;
    //background-color: orangered;
`
const OptionBtnBox = styled(HorCenterDiv)`
    width: 10%;
    height: 80%;
    background-color: transparent;
    margin-left: 1%;
    cursor: pointer;
    & > svg{
        color: rgba(24, 220, 255, 0.7);
        transition : color 0.3s ease-in-out;
        will-change: color;
        &:hover{
            color: rgba(250, 130, 49,1.0);
            transition : color 0.3s ease-in-out;
        }
    }
`
const OptionPannel = styled(VerCenterDiv)`
    width: 50%;
    height: 500%;
    background-color: lime;
    position: absolute;
    right: 0;
    bottom: -510%;
    border-radius: ${(props) => props.theme.borders.small};
    background-color: rgba(209, 204, 192, 0.15);
`

const MenuBtnVar = {
    hover:{
        backgroundColor: "rgba(209, 204, 192, 0.15)",
        //boxShadow: "0 0 2px 1px rgba(251, 252, 185, 0.745), 0 0 4px 2px rgba(255, 205, 243, 0.667), 0 0 5px 3px rgba(101, 211, 255, 0.667)",
    }
}
//linear-gradient(to right, rgba(251, 252, 185, 0.745), rgba(255, 205, 243, 0.667), rgba(101, 211, 255, 0.667))
function TopNavBar() {

    const homeMatch = useMatch('/');
    const singleMatch = useMatch('/spread/*');
    const multiMatch = useMatch('/translation/multi');
    const manualMatch = useMatch('/manual');
    const [isClickedOpt, setIsClickedOpt] = useState<boolean>(false);
    const BtnNameArr : string[] = [
        "Home",
        "Single",
        "Multi"
    ]
    const matchArr : any[] = [
        homeMatch,
        singleMatch,
        multiMatch
    ]

    const changeOpenOpt = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsClickedOpt((prev) => !prev)
    }
  return (
    <TopNavBarContainer>
        <LeftContentBox>
            <PageNameBox>
                ORCA TAROT : DEV
            </PageNameBox>
            <MenuBtnBox>
                <Link to="/">
                    <MenuBtn
                        variants={MenuBtnVar}
                        initial={false}
                        whileHover={MenuBtnVar.hover}
                    >
                        Home
                        {
                            homeMatch &&
                            <HighlightBtn layoutId="highLightNav"></HighlightBtn>
                        }
                    </MenuBtn>
                </Link>
                <Link to="/spread" state={{ autoStart : false}}>
                    <MenuBtn
                        variants={MenuBtnVar}
                        initial={false}
                        whileHover={MenuBtnVar.hover}
                    >
                        Spread
                        {
                            singleMatch &&
                            <HighlightBtn layoutId="highLightNav"></HighlightBtn>
                        }
                    </MenuBtn>
                </Link>
                <Link to="/multi">
                    <MenuBtn
                        variants={MenuBtnVar}
                        initial={false}
                        whileHover={MenuBtnVar.hover}
                    >
                        Multi
                        {
                            multiMatch &&
                            <HighlightBtn layoutId="highLightNav"></HighlightBtn>
                        }
                    </MenuBtn>
                </Link>
                <Link to="/manual">
                    <MenuBtn
                        variants={MenuBtnVar}
                        initial={false}
                        whileHover={MenuBtnVar.hover}
                    >
                        Manual
                        {
                            manualMatch &&
                            <HighlightBtn layoutId="highLightNav"></HighlightBtn>
                        }
                    </MenuBtn>
                </Link>
            </MenuBtnBox>
        </LeftContentBox>
        <RightContentBox>
            <HTimer />
            <OptionBtnBox
                animate={{
                    rotateZ: [0, 360],
                    transition:{
                        duration: 5,
                        repeat: Infinity,
                        type: 'tween',
                        ease: "linear"
                    }
                }}
                onClick={(e)=>{
                    changeOpenOpt(e)
                }}
                
            >
                <RxGear
                    style={{
                        width: "100%",
                        height: "100%",
                        margin: '0',
                        padding: '0',
                    }}
                />
            </OptionBtnBox>
            <AnimatePresence>
                {
                isClickedOpt && 
                <OptionPannel
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1,
                        transition:{
                            duration: 0.3,
                            ease: "easeIn",
                        }
                    }}
                    exit={{
                        opacity: 0,
                        transition:{
                            duration: 0.3,
                            ease: "easeIn",
                        }
                    }}
                >

                </OptionPannel>
                }
            </AnimatePresence>
        </RightContentBox>
    </TopNavBarContainer>
  )
}

export default TopNavBar