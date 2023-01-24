/* eslint-disable */
import React, {useState} from 'react'
import styled from 'styled-components';
import {motion} from 'framer-motion';
import { HorCenterDiv, VerCenterDiv } from 'common_resources/CommonStyle';
import {Typing} from 'components/common_res/typing_res/Typing';
import { useRecoilState } from 'recoil';
import { createControlManager, ICreateControlManager } from 'recoil/CreateAtom'

const InQuestionBox = styled(VerCenterDiv)`
  width: 100%;
  height: 100%;
  background-color: inherit;
  border-radius: inherit;
  padding: 1%;
  justify-content: space-between;
  padding-top: 3%;
`
const FirstQuestionSpan = styled(HorCenterDiv)`
  width: 100%;
  height: 15%;
  //background-color: yellow;
  padding-left: 5%;
  justify-content: flex-start;
  //font-size: 140%;
  font-size: 130%;
  color: ${(props) => props.theme.textColors.swanWhite};
`
const FirstQuestionBtnBox = styled(HorCenterDiv)`
  width: 100%;
  height: 20%;
  //background-color: gray;
  padding: 1%;
  justify-content: space-evenly;
`
const FirstQuestionBtn = styled(HorCenterDiv)`
  width: 25%;
  height: 100%;
  background-color: indianred;
  color: ${(props) => props.theme.textColors.swanWhite};
  cursor: pointer;
  border-radius: ${(props) => props.theme.borders.small};
  box-shadow: unset;
`
const OptionalBox = styled(HorCenterDiv)`
  width: 100%;
  height: 20%;
  padding: 1%;
  justify-content: space-between;
`
const OptionalBtn = styled(HorCenterDiv)`
  width: 18%;
  height: 90%;
  background-color: ${(props) => props.theme.boxColors.soaring};
  border-radius: ${(props) => props.theme.borders.small};
  color: ${(props) => props.theme.textColors.swanWhite};
`
const questionBtnVar = {
  initial: {
    backgroundColor: 'rgba(83, 92, 104, 0.3)',
  },
  hover: {
    backgroundColor: 'rgba(83, 92, 104, 0.7)',
    boxShadow: ' 0 0 3px 1px rgba(255, 121, 63,1.0)'
    
  },
  active:{
    boxShadow: ' 0 0 3px 1px rgba(255, 121, 63,1.0)'
  }
}
const nextBtnVar = {
  initial:{
    color: 'rgba(240, 147, 43, 0.2)',
    opacity: 0.5,
    cursor: 'auto'
  },
  active:{
    color: ['rgba(240, 147, 43,1.0)', 'rgba(240, 147, 43, 0.2)','rgba(240, 147, 43,1.0)'],
    cursor: 'pointer',
    opacity: 1,
    transition: {
      color:{
        repeat: Infinity,
        duration: 1.5
      }
    }
  },
}

function FirstQuestion() {
    const [createManager, setCreateManager] = useRecoilState(createControlManager)
    const [isMulti, setIsMulti] = useState<boolean | null>(null);
    const [isSandbox, setIsSandbox] = useState<boolean | null>(null);

    const settingHandler = (e: React.MouseEvent<HTMLDivElement>, mode : boolean, flag : boolean) => {
        e.preventDefault();
        switch(mode){
        case true :
            if(isMulti === flag) return;
            setIsMulti(flag);
        break;
        case false : 
            if(isSandbox === flag) return;
            setIsSandbox(flag);
        break;
        default: break;
        }
    }
    const changeManager = (e : React.MouseEvent<HTMLDivElement>) => {
        let _tempObj : ICreateControlManager = JSON.parse(JSON.stringify(createManager));
        // _tempObj.creatingStep = 1;
        // _tempObj.projectType = isMulti;
        // console.log("isMulti : ", isMulti);
        // console.log("isSandbox : ", isSandbox);
        _tempObj.creatingStep = 1;
        setCreateManager(_tempObj); 
    }
  return (
    <InQuestionBox
        exit={{opacity: 0}}
    >
          <FirstQuestionSpan>
            <Typing 
              text={"Is this spread normal or multiple?"}
              letterSpacing={0.1}
              cursorThickness={0}
              typeSpeed={3}
            />
          </FirstQuestionSpan>
          <FirstQuestionBtnBox>
            <FirstQuestionBtn
              variants={questionBtnVar}
              initial={questionBtnVar.initial}
              animate={isMulti === false ? questionBtnVar.active : ""}
              whileHover={questionBtnVar.hover}
              onClick={(e)=>{
                settingHandler(e, true, false);
              }}
            >
              Single
            </FirstQuestionBtn>
            <FirstQuestionBtn
              variants={questionBtnVar}
              initial={questionBtnVar.initial}
              animate={isMulti === true ? questionBtnVar.active : ""}
              whileHover={questionBtnVar.hover}
              onClick={(e)=>{
                settingHandler(e, true, true);
              }}
            >
              Multi
            </FirstQuestionBtn>
          </FirstQuestionBtnBox>
          <FirstQuestionSpan>
            <Typing 
              text={"Is the Oracle type normal or sandbox?"}
              letterSpacing={0.1}
              cursorThickness={0}
              typeSpeed={3}
            />
          </FirstQuestionSpan>
          <FirstQuestionBtnBox>
            <FirstQuestionBtn
              variants={questionBtnVar}
              initial={questionBtnVar.initial}
              whileHover={questionBtnVar.hover}
              animate={isSandbox === false ? questionBtnVar.active : ""}
              onClick={(e)=>{
                settingHandler(e, false, false);
              }}
            >
              Normal
            </FirstQuestionBtn>
            <FirstQuestionBtn
              variants={questionBtnVar}
              initial={questionBtnVar.initial}
              whileHover={questionBtnVar.hover}
              animate={isSandbox === true ? questionBtnVar.active : ""}
              onClick={(e)=>{
                settingHandler(e, false, true);
              }}
            >
              Sandbox
            </FirstQuestionBtn>
          </FirstQuestionBtnBox>
          <OptionalBox>
            <OptionalBtn
              style={{
                visibility: 'hidden'
              }}
              onClick={()=> console.log('test')}
            >haha</OptionalBtn>
            <OptionalBtn
              variants={nextBtnVar}
              initial={nextBtnVar.initial}
              animate={isMulti !== null && isSandbox !== null
                ? nextBtnVar.active
                : ""
              }
              onClick={(e) => {
                if(isMulti === null || isSandbox === null) return;
                changeManager(e)
              }}
            >
              NEXT
            </OptionalBtn>
          </OptionalBox>
        </InQuestionBox>
  )
}

export default FirstQuestion