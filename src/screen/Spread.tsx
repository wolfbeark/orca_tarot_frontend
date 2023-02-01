/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { HorCenterDiv, VerCenterDiv } from 'common_resources/CommonStyle'
import { IContainer } from 'common_resources/CommonInterfaces'
import { useRecoilState, useRecoilValue } from 'recoil'
import { totalManagerAtom } from 'recoil/TotalAtom'

import { IImgBoxContainer } from 'common_resources/ComponentInterface'
import { Outlet, Link, useMatch, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import SpreadTotal from 'components/spread_res/SpreadTotal'
import { ISingleControlManagerAtom, singleControlManagerAtom } from 'recoil/SingleAtom'

import {FaAngleDoubleRight} from 'react-icons/fa';

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
    background-color: rgba(20, 20, 20, 0.2);
    //background-color: rgba(24, 220, 255, 1);
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
    justify-content: flex-start;
    //padding: 0.5%;

    justify-content: flex-start;
    align-items: flex-end;
    user-select: none;
    
    scroll-behavior: auto;
    overflow: overlay;
    overflow-x: hidden;

    /* grid-template-columns: repeat(auto-fit, minmax(13%, 1fr));
    grid-template-rows: repeat(auto-fit, minMax(40%, 1fr));
    grid-auto-columns: 13%;
    grid-auto-rows: 40%;
    grid-gap: 3%; */
    display: grid;

    ::-webkit-scrollbar {
        width: 1vw;
    }
    ::-webkit-scrollbar-thumb {
        background-color: hsla(0, 0%, 42%, 0.49);
        border-radius: 100px;
    }
`
const SecondTabWrapper = styled(HorCenterDiv)`
    width: 12%;
    height: 100%;
    position: absolute;
    z-index: 2;
    left: 12%;
    background-color: rgba(20, 20, 20, 0.2);
    justify-content: flex-start;    
`
const SecondTabFoldBtn = styled(HorCenterDiv)<IFoldBtn>`
    width: ${(props) => `${props.foldwidth}px`};
    height: 100%;
    background-color: ${(props) => props.theme.boxColors.opaqueBlack};
    color: white;
    cursor: pointer;
    z-index: 3;
    //background-color: red;
`
const SecondTabContentBox = styled(VerCenterDiv)`
    width: 100%;
    height: 100%;
    //background-color: blue;
    position: absolute;
    padding-left: 1%;
    
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    overflow: auto;

`
const SecondTabItem = styled(HorCenterDiv)`
    min-width: 85%;
    min-height: 8%;
    background-color: transparent;
    border-radius: ${(props) => props.theme.borders.small};
    color: white;
    position: relative;
    cursor: pointer;
    margin-bottom: 5%;
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
    background-color: transparent;
    justify-content: flex-start;
    align-items: flex-end;
`

const TabItem = styled(HorCenterDiv)`
    width: 85%;
    height: 8%;
    //background-color: saddlebrown;
    user-select : none;
    margin-bottom: 5%;
    border-radius: ${(props) => props.theme.borders.small};
    
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
    width: 1.5%;
    height: 100%;
    background-color: ${(props) => props.theme.boxColors.opaqueBlack};
    color: white;
    position: absolute;
    left: 0;
    top: 0;
    //transform: translateY(-50%); 
    cursor: pointer;
    z-index: 3;
    //background-color: red;

`
const SpreadZone = styled(HorCenterDiv)`
    width: 100%;
    height: 100%;
    background-color: transparent;
    position: relative;
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
    },
    exit:{
        opacity: 0,
        transition: {
            duration: 0.3
        }
    }
}

const modeTabVar = {
    initial: {
        opacity: 0
    },
    fold:{
        opacity: 0,
    },
    open:{
        opacity : 1,
    }
}
interface IFoldBtn{
    foldwidth: number
}


function Spread() {
    const { wheight } = useRecoilValue(totalManagerAtom);
    const [singleManager, setSingleManager] = useRecoilState(singleControlManagerAtom);
    const location = useLocation();
    const foldRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const [tabNumber, setTabNumber] = useState<number>(0);
    const [foldWidth, setFoldWidth] = useState<number>(0);
    const spreadMatch = useMatch('/spread');
    const singleMatch = useMatch('/spread/single');
    const multiMatch = useMatch('/spread/multi');
    const createdMatch = useMatch('/spread/create');

    const matchArr = [spreadMatch, singleMatch, multiMatch, createdMatch];

    const tabNameArr : string[] = ["Total", "Single", "Multi", "Create"]

    const linkArr : string[] = ["/spread", "single", "multi", "create"]

    const [isFoldTab, setIsFoldTab] = useState<boolean>(false);
    const [isOpenSecondFoldTab, setIsOpenSecondFoldTab] = useState<boolean>(false);
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
    }, [location])
    useEffect(()=>{
        let _tempRef = foldRef?.current.getBoundingClientRect();
        setFoldWidth(_tempRef.width);
    })

    const secondTabVar = {
        initial:{
            width: `${foldWidth}px`,
        },
        inactive : {
            width: `${foldWidth}px`,
            backgroundColor: `rgba(20, 20, 20, 0)`,
            transition: {
                delay: 0.3
            }
        },
        active: {
            width: `12%`,
            backgroundColor: `rgba(20, 20, 20, 0.2)`,
        }
    }

    const allTabFoldHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsFoldTab(!isFoldTab)
    }
    const onChangeSingleCurrentNumber = (e : React.MouseEvent<HTMLDivElement>, num : number) => {
        e.preventDefault();
        if(num === singleManager.cur_ProjectNumber) return;
        let _tempManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
        _tempManager.cur_ProjectNumber = num;
        setSingleManager(_tempManager);
    }
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
                        style={
                            isFoldTab === true
                            ? {zIndex: 0}
                            : {zIndex: 3}
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
                                                e.preventDefault();
                                                setTabNumber(i);
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
                    <AnimatePresence>
                        {
                            (
                                singleManager.isExistProject &&
                                singleMatch &&
                                isFoldTab === false
                            ) &&
                            <SecondTabWrapper
                                variants={secondTabVar}
                                initial={false}
                                animate={
                                    isOpenSecondFoldTab
                                    ? secondTabVar.active
                                    : secondTabVar.inactive
                                }
                            >
                                <AnimatePresence>
                                <SecondTabFoldBtn
                                    foldwidth={foldWidth}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    onClick={()=> setIsOpenSecondFoldTab((prev) => !prev)}
                                >
                                    <FaAngleDoubleRight />
                                </SecondTabFoldBtn>
                                </AnimatePresence>
                                <AnimatePresence>
                                {
                                    isOpenSecondFoldTab &&
                                    <SecondTabContentBox
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                    >
                                        {singleManager.singleProjectArr.map((a, i) => {
                                        return(
                                            <AnimatePresence
                                                key={`singleTab${i}`}
                                            >
                                            <SecondTabItem
                                                variants={tabVar}
                                                initial={tabVar.initial}
                                                animate={ 
                                                    i === singleManager.cur_ProjectNumber
                                                    ? tabVar.active
                                                    : tabVar.inactive
                                                }
                                                whileHover={
                                                    i === singleManager.cur_ProjectNumber
                                                    ? {}
                                                    : tabVar.hover
                                                }
                                                onClick={(e)=>{
                                                    onChangeSingleCurrentNumber(e, i)
                                                }}
                                                exit={tabVar.exit}
                                            >
                                                {a.projectName}
                                                {
                                                    i === singleManager.cur_ProjectNumber &&
                                                    <AnimatePresence>
                                                        <RedCircle 
                                                            initial={{opacity:0}}
                                                            animate={{opacity:1}}
                                                            exit={{opacity:0}}
                                                        />
                                                    </AnimatePresence>
                                                }
                                            </SecondTabItem>
                                            </AnimatePresence>
                                        );
                                    })}
                                    </SecondTabContentBox>
                                }
                                </AnimatePresence>
                            </SecondTabWrapper>
                        }
    
                    </AnimatePresence>
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
                            ref={foldRef} 
                            onClick={allTabFoldHandler}
                        >
                            <FaAngleDoubleRight />
                        </TabFoldBtn>
                        {
                            spreadMatch &&
                            <SpreadTotal setTabNumber={setTabNumber}/>
                        }
                        <Outlet context={{
                            setTabNumber
                        }}/>
                    </SpreadZone>
                </TrickBox>
            </InContentBox>
        </ContentBox>
    </SpreadContainer>
  )
}

export default React.memo(Spread)