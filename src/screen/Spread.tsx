/* eslint-disable */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { HorCenterDiv, VerCenterDiv } from 'common_resources/CommonStyle'
import { IContainer } from 'common_resources/CommonInterfaces'
import { useRecoilValue } from 'recoil'
import { totalManagerAtom } from 'recoil/TotalAtom'

import { IImgBoxContainer } from 'common_resources/ComponentInterface'
import { Outlet, Link, useMatch } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import SpreadTotal from 'components/spread_res/SpreadTotal'

const SpreadContainer = styled(VerCenterDiv)<IContainer>`
  width: 100%;
  height: ${(props) => `${props.wheight}px`};
  position: relative;
  *{
    font-family: "Anton";
    font-display: block;
  }
`
const ContentBox = styled(HorCenterDiv)`
  width: 100%;
  height: 100%;
  background-color: rgba(20, 20, 20, 1);
  //background-color: skyblue;
  position: relative;
  justify-content: space-between;
  position: relative;
`
const LeftBgBox = styled(VerCenterDiv)<IImgBoxContainer>`
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
  justify-content: flex-end;
  z-index: 1;
`

const RightPannelBox = styled(VerCenterDiv)`
  width: 20%;
  height: 100%;
  background-color: transparent;
  justify-content: flex-end;
  padding: 1%;
  z-index: 1;
  //padding-top: 10%;
`
const InContentBox = styled(VerCenterDiv)`
    width: 100%;
    height: 91%;
    background-color: transparent;
    z-index: 2;
    position: absolute;
    bottom: 0;
    justify-content: space-between;
    background-color: transparent;
    //padding: 0 0.5% 0.5% 0.5%;

    //border: 2px solid gray;
    //padding: 0.5%;
`
const TrickBox = styled(HorCenterDiv)`
    width: 100%;
    height: 100%;
    position: relative;
    align-items: flex-end;
    justify-content: space-between;
    //background-color: blue;
`
const ModeTab = styled(VerCenterDiv)`
    width: 12%;
    //padding-left: 2%;
    height: 100%;
    position: absolute;
    z-index: 2;
    left: 0%;
    //background-color: rgba(24, 220, 255, 1);
    background-color: rgba(20, 20, 20, 0.2);
`
const SecondTab = styled(VerCenterDiv)`
    width: 12%;
    //padding-left: 2%;
    height: 100%;
    position: absolute;
    z-index: 2;
    left: 12%;
    //background-color: rgba(24, 220, 255, 1);
    background-color: rgba(20, 20, 20, 0.2);
`
const SingleTab = styled(VerCenterDiv)`
    width: 12%;
    //padding-left: 2%;
    height: 100%;
    position: absolute;
    z-index: 2;
    left: 12%;
    //background-color: rgba(24, 220, 255, 1);
    background-color: rgba(20, 20, 20, 0.2);
`


const TabBox = styled(VerCenterDiv)`
    width: 100%;
    height: 100%;
    //background-color: rgba(250, 130, 49,1.0);
    //background-color: rgba(24, 220, 255, 1);
    background-color: transparent;
    justify-content: flex-start;
    align-items: flex-end;
`

const TabItem = styled(HorCenterDiv)`
    width: 85%;
    height: 8%;
    //background-color: saddlebrown;
    margin-bottom: 5%;
    
    a{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
`
const TabFoldBtn = styled(HorCenterDiv)`
    width: 1%;
    height: 8%;
    background-color: red;
    position: absolute;
    left: 0;
    top: 0;
    //transform: translateY(-50%); 
    cursor: pointer;
    z-index: 3;
`
const SpreadZone = styled(HorCenterDiv)`
    width: 100%;
    height: 100%;
    background-color: transparent;
    /* padding-top: 0.5%;
    padding-bottom: 0.5%; */
    /* border: 2px solid gray;
    border-top: none; */
`
const RedCircle = styled(HorCenterDiv)`
    width: 5px;
    height: 5px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    right: 5%;
`

const tabVar = {
    initial:{
        opacity: 0
    }
    ,
    active : {
        opacity: 1,
        borderRadius: '5px',
        backgroundColor: 'rgba(20, 20, 20, 0.2)',
        color: 'rgba(255, 255, 255, 1)',
        border: '2px solid rgba(24, 220, 255, 0.7)',
    },
    inactive : {
        opacity: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        border: '0px solid rgba(24, 220, 255, 0)',
        color: 'rgba(83, 92, 104,1.0)'
    },
    hover:{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '5px',
        //color: ['rgba(240, 147, 43,1.0)', 'rgba(240, 147, 43, 0.2)','rgba(240, 147, 43,1.0)'],
        //backgroundColor: ['rgba(75, 75, 75,1.0)', 'rgba(75, 75, 75,1.0)'],
        color: ['rgba(83, 92, 104,1.0)', 'rgba(240, 147, 43,1.0)' , 'rgba(83, 92, 104,1.0)'],
        transition: {
            color:{
                repeat: Infinity,
                duration: 1
            }
        }
    }
}

const modeTabVar = {
    initial: {
        opacity: 1
    },
    fold:{
        opacity: 0,
    },
    open:{
        opacity : 1,
    }
}

function Spread() {
    const { wheight } = useRecoilValue(totalManagerAtom);
    const [tabNumber, setTabNumber] = useState<number>(0);
    const spreadMatch = useMatch('/spread');
    const singleMatch = useMatch('/spread/single');
    const multiMatch = useMatch('/spread/multi');
    const createdMatch = useMatch('/spread/create');

    const matchArr = [spreadMatch, singleMatch, multiMatch, createdMatch];

    const tabNameArr : string[] = ["Total", "Single", "Multi", "Create"]

    const linkArr : string[] = ["/spread", "single", "multi", "create"]

    const [isFoldTab, setIsFoldTab] = useState<boolean>(false);
    const [isSecondFoldTab, setIsSecondFoldTab] = useState<boolean>(true);
    const [isThirdFoldTab, setIsThirdFoldTab] = useState<boolean>(true);

    useEffect(()=>{
        if(spreadMatch){
            setTabNumber(0);
        }
        else if(singleMatch){
            setTabNumber(1);
        }
        else if(multiMatch){
            setTabNumber(2);
        }
        else if(createdMatch){
            setTabNumber(3);
        }
    }, [])

  return (
    <SpreadContainer
        wheight={wheight}
    >
        <ContentBox>
            <LeftBgBox
                imgsrc={`${process.env.PUBLIC_URL}/images/LDefaultBackGround.png`}
            >
            </LeftBgBox>
            <RightPannelBox></RightPannelBox>
            <InContentBox>
                <TrickBox>
                    <ModeTab
                        variants={modeTabVar}
                        animate={
                            isFoldTab === true
                            ? modeTabVar.fold
                            : {}
                        }
                    >
                    <AnimatePresence>
                        {
                            isFoldTab === false &&
                            <TabBox
                                exit={{
                                    opacity: 0
                                }}
                            >
                            {
                                tabNameArr.map((a,i) => {
                                    return(
                                        <TabItem
                                            key={`spreadTab${i}`}
                                            variants={tabVar}
                                            initial={tabVar.initial}
                                            animate={
                                                i === tabNumber 
                                                ? tabVar.active 
                                                : tabVar.inactive
                                            }
                                            whileHover={
                                                i === tabNumber
                                                ? {}
                                                : tabVar.hover
                                            }
                                            onClick={(e) => {
                                                //e.preventDefault();
                                                setTabNumber(i);
                                                if(i === 1){
                                                    // if(isThirdFoldTab){
                                                    //     setIsThirdFoldTab(false)
                                                    // }
                                                    if(singleMatch){
                                                        setIsSecondFoldTab(!isSecondFoldTab)
                                                    }
                                                }
                                                else if(i === 2){
                                                    // if(isSecondFoldTab){
                                                    //     setIsSecondFoldTab(false)
                                                    // }
                                                    if(multiMatch){
                                                        setIsThirdFoldTab(!isThirdFoldTab)
                                                    }
                                                }
                                            }}
                                            
                                        >
                                            <Link to={linkArr[i]}>
                                                {a}
                                                <AnimatePresence>
                                                {
                                                    i === tabNumber &&
                                                    <RedCircle 
                                                        initial={{opacity:0}}
                                                        animate={{opacity:1}}
                                                        exit={{opacity:0}}
                                                    />
                                                }
                                                </AnimatePresence>
                                            </Link>
                                        </TabItem>
                                    );
                                })
                            }
                        </TabBox>
                        }
                    </AnimatePresence>
                    </ModeTab>
                    {
                        (isSecondFoldTab && singleMatch) &&
                        <SecondTab
                            variants={modeTabVar}
                            animate={
                                isFoldTab === true
                                ? modeTabVar.fold
                                : {}
                            }
                        >
                            second
                        </SecondTab>
                    }
                    {
                        (isThirdFoldTab && multiMatch) &&
                        <SecondTab
                            variants={modeTabVar}
                            animate={
                                isFoldTab === true
                                ? modeTabVar.fold
                                : {}
                            }
                        >
                            third
                        </SecondTab>
                    }
                    <SpreadZone>
                        <TabFoldBtn 
                            onClick={(e)=>{
                                e.preventDefault();
                                setIsFoldTab(!isFoldTab)
                            }}
                        >
                            
                        </TabFoldBtn>
                        {
                            spreadMatch &&
                            <SpreadTotal setTabNumber={setTabNumber}/>
                        }
                        <Outlet />
                    </SpreadZone>
                </TrickBox>
            </InContentBox>
        </ContentBox>
    </SpreadContainer>
  )
}

export default React.memo(Spread)