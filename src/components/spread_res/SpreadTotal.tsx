/* eslint-disable */
import React,{Dispatch, SetStateAction, useEffect, useState} from 'react';
import styled from 'styled-components';
import {AnimatePresence, motion} from 'framer-motion';
import {HorCenterDiv, VerCenterDiv} from 'common_resources/CommonStyle';
import { useRecoilState } from 'recoil';
import { ITotalManagerAtom, totalManagerAtom } from 'recoil/TotalAtom';
import { Link, useNavigate } from 'react-router-dom';
import { Typing } from 'components/common_res/typing_res/Typing';

import { 
    SpreadTotal_Common 
} from './SpreadTotal.styled';
import TotalSingleList from './single_spread_res/TotalSingleList';
import { createControlManager, ICreateControlManager } from 'recoil/CreateAtom';

export interface ISpreadTotal {
    setTabNumber : Dispatch<SetStateAction<number>>;
}

const {tabItemVar} = SpreadTotal_Common;


function SpreadTotal({setTabNumber} : ISpreadTotal) {

    const navigate = useNavigate();
    const [totalManager, setTotalManager] = useRecoilState(totalManagerAtom);
    const [createManager, setCreateManager] = useRecoilState<ICreateControlManager>(createControlManager);
    //const [currentTabNum, setCurrentTabNum] = useState<number>(totalManager.currentTabNumber);
    
    const tabNameArr = ["TOTAL", "SINGLE", "MULTI"]
    const linkToCreateHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        let _temp = JSON.parse(JSON.stringify(createManager));
        _temp.isCreating = true;
        setCreateManager(_temp);
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
    const moveToCrate = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        navigate('create')
    }

    const {optionalBtnVar} = SpreadTotal_Common
  return (
    <SpreadTotal_Common.Container>
        {(!totalManager.projectCount && !createManager.isCreating) &&
        <SpreadTotal_Common.ProjectAllEmptyBox>
            <div>
                <SpreadTotal_Common.TypingBox>
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
                </SpreadTotal_Common.TypingBox>
            <SpreadTotal_Common.LinkToCreateBtn>
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
            </SpreadTotal_Common.LinkToCreateBtn>
            </div>
        </SpreadTotal_Common.ProjectAllEmptyBox>
        } 
        {(!totalManager.projectCount && createManager.isCreating) &&
        <SpreadTotal_Common.ProjectAllEmptyBox>
            <div>
                <SpreadTotal_Common.TypingBox>
                    <Typing
                        text={"A project is under construction"}
                        letterSpacing={0.1}
                        cursorThickness={0}
                        typeSpeed={3}
                    />
                    <Typing 
                        text={"Move to create"}
                        letterSpacing={0.1}
                        typeSpeed={3}
                        cursorThickness={0}
                    />
                </SpreadTotal_Common.TypingBox>
            <SpreadTotal_Common.LinkToCreateBtn>
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
                    onClick={moveToCrate}
                >
                    Move
                </motion.div>
            </SpreadTotal_Common.LinkToCreateBtn>
            </div>
        </SpreadTotal_Common.ProjectAllEmptyBox>
        }
        {totalManager.projectCount > 0 &&
            <SpreadTotal_Common.TotalNoticeBoard>
                <SpreadTotal_Common.InTotalNoticeBoard>
                    <SpreadTotal_Common.NoticeTypingBox>
                        <Typing
                            text={"Controllers for all spreads"}
                            letterSpacing={0.1}
                            cursorThickness={0}
                            typeSpeed={3}
                        />
                    </SpreadTotal_Common.NoticeTypingBox>
                    <SpreadTotal_Common.NoticeContentBox>
                        <SpreadTotal_Common.SpreadModeTabsContainer>
                        {
                            tabNameArr.map((a, i) => {
                            return(
                                <SpreadTotal_Common.ModeTabItem
                                    key={`totalContentTab${a}${i}`}
                                    variants={optionalBtnVar}
                                    //initial={tabItemVar.initial}
                                    animate={
                                        i === totalManager.currentTabNumber
                                        ? optionalBtnVar.active
                                        : optionalBtnVar.inactive
                                    }
                                    onClick={(e) => chnageTabNumberHandler(e, i)}
                                >{a}
                                {
                                    i === totalManager.currentTabNumber &&
                                    <AnimatePresence>
                                        <SpreadTotal_Common.RedCircle
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            exit={{opacity: 0}}
                                            layoutId='spreadTotalTabCircle'
                                        />
                                    </AnimatePresence>

                                }
                                </SpreadTotal_Common.ModeTabItem>
                            );
                            })
                        }
                        </SpreadTotal_Common.SpreadModeTabsContainer> 
                        <SpreadTotal_Common.SpreadNoticeContentBox>
                            <AnimatePresence>
                            {
                                totalManager.currentTabNumber === 1 &&
                                <TotalSingleList />
                            }
                            </AnimatePresence>
                        </SpreadTotal_Common.SpreadNoticeContentBox>
                    </SpreadTotal_Common.NoticeContentBox>
                </SpreadTotal_Common.InTotalNoticeBoard>
            </SpreadTotal_Common.TotalNoticeBoard>
        }
    </SpreadTotal_Common.Container>
  )
}

export default React.memo(SpreadTotal);