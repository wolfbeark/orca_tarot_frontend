/* eslint-disable */
import React,{Dispatch, SetStateAction, useEffect, useState} from 'react';
import styled from 'styled-components';
import {AnimatePresence, motion} from 'framer-motion';
import {HorCenterDiv, VerCenterDiv} from 'common_resources/CommonStyle';
import { useRecoilState } from 'recoil';
import { ITotalManagerAtom, totalManagerAtom } from 'recoil/TotalAtom';
import { Link, useNavigate } from 'react-router-dom';
import { Typing } from 'components/common_res/typing_res/Typing';

export interface ISpreadTotal {
    setTabNumber : Dispatch<SetStateAction<number>>;
}

const SpreadTotalContainer = styled(HorCenterDiv)`
    width: 100%;
    height: 100%;
    //background-color: skyblue;
    font-family: ${(props) => props.theme.engFont};
    position: relative;
`
const ProjectAllEmptyBox = styled(VerCenterDiv)`
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

const LinkToCreateBtn = styled(HorCenterDiv)`
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

const TypingBox = styled(VerCenterDiv)`
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

const TotalNoticeBoard = styled(VerCenterDiv)`
    width: 80%;
    height: 95%;
    background-color: ${(props) => props.theme.boxColors.opaqueBlack};
    position: absolute;
    right: 5%;
    border-radius: ${(props) => props.theme.borders.small};
    padding: 0.5%;
`
const InTotalNoticeBoard = styled(VerCenterDiv)`
    width: 100%;
    height: 100%;
    background-color: inherit;
    border-radius: inherit;
    justify-content: space-between;
    //padding: 1%;
`
const NoticeTypingBox = styled(HorCenterDiv)`
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
const NoticeContentBox = styled(VerCenterDiv)`
    width: 100%;
    height: 87%;
    padding-left: 2%;
    justify-content: space-between;
    
`
const SpreadModeTabsContainer = styled(HorCenterDiv)`
    width: 100%;
    height: 10%;
    padding: 0.5% 0.5% 0% 0;
    justify-content: flex-start;
`
const SpreadNoticeContentBox = styled(HorCenterDiv)`
    width: 100%;
    height: 89%;
    background-color: olive;
    border: 2px solid rgba(24, 220, 255, 0.7);
    border-radius: ${(props) => props.theme.borders.small};
`
const ModeTabItem = styled(HorCenterDiv)`
    width: 15%;
    height: 100%;
    background-color: ${(props) => props.theme.boxColors.opaqueBlack};
    margin-right: 1%;
    border-radius: ${(props) => props.theme.borders.small};
    cursor: pointer;
    user-select: none;
`
const tabItemVar = {
    // initial:{
    //     backgroundColor: 'rgba(23, 65, 234, 1)'
    // },
    active: {
        backgroundColor: 'rgba(23, 65, 234, 1)'
    },
    inactive: {
        backgroundColor: 'rgba(23, 65, 24, 0.2)'
    }
}


function SpreadTotal({setTabNumber} : ISpreadTotal) {

    const navigate = useNavigate();
    const [totalManager, setTotalManager] = useRecoilState(totalManagerAtom);
    //const [currentTabNum, setCurrentTabNum] = useState<number>(totalManager.currentTabNumber);
    
    const tabNameArr = ["TOTAL", "SINGLE", "MULTI"]
    const linkToCreateHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setTabNumber(3);
        navigate('create')
    }

    // useEffect(()=>{
    //    setCurrentTabNum(totalManager.currentTabNumber);
    // }, [])

    const chnageTabNumberHandler = (e : React.MouseEvent<HTMLDivElement>, num : number) => {
        e.preventDefault();
        if(num === totalManager.currentTabNumber) return;
        //setCurrentTabNum(num);
        let _temp : ITotalManagerAtom = JSON.parse(JSON.stringify(totalManager));
        _temp.currentTabNumber = num;
        setTotalManager(_temp);
    }
  return (
    <SpreadTotalContainer>
        {!totalManager.projectCount && 
        <ProjectAllEmptyBox>
            <div>
                <TypingBox>
                    <Typing
                        text={"No spread was created"}
                        letterSpacing={0.1}
                        cursorThickness={0}
                        typeSpeed={3}
                    />
                    <Typing 
                        text={"Press button to create spread"}
                        letterSpacing={0.1}
                        typeSpeed={3}
                        cursorThickness={0}
                    />
                </TypingBox>
            <LinkToCreateBtn>
                <motion.div
                    initial={{
                    opacity: 0
                    }}
                    animate={{
                        opacity: 1,
                        color: ['rgba(240, 147, 43,1.0)', 'rgba(240, 147, 43, 0.2)','rgba(240, 147, 43,1.0)'],
                        transition: {
                            color:{
                                repeat: Infinity,
                                duration: 1.5
                            }
                        }
                    }} 
                    onClick={(e)=> linkToCreateHandler(e)}
                >
                    Create
                </motion.div>
            </LinkToCreateBtn>
            </div>
        </ProjectAllEmptyBox>
        }
        {totalManager.projectCount > 0 &&
            <TotalNoticeBoard>
                <InTotalNoticeBoard>
                    <NoticeTypingBox>
                        <Typing
                            text={"Controllers for all spreads"}
                            letterSpacing={0.1}
                            cursorThickness={0}
                            typeSpeed={3}
                        />
                    </NoticeTypingBox>
                    <NoticeContentBox>
                        <SpreadModeTabsContainer>
                        {
                            tabNameArr.map((a, i) => {
                            return(
                                <ModeTabItem
                                    key={`totalContentTab${a}${i}`}
                                    variants={tabItemVar}
                                    //initial={tabItemVar.initial}
                                    animate={
                                        i === totalManager.currentTabNumber
                                        ? tabItemVar.active
                                        : tabItemVar.inactive
                                    }
                                    onClick={(e) => chnageTabNumberHandler(e, i)}
                                >{a}</ModeTabItem>
                            );
                            })
                        }
                        </SpreadModeTabsContainer>
                        <SpreadNoticeContentBox>
                            <AnimatePresence>
                            {
                                totalManager.currentTabNumber === 1 &&
                                <div>{totalManager.currentTabNumber}</div>
                            }
                            </AnimatePresence>
                        </SpreadNoticeContentBox>
                    </NoticeContentBox>
                </InTotalNoticeBoard>
            </TotalNoticeBoard>
        }
    </SpreadTotalContainer>
  )
}

export default React.memo(SpreadTotal);