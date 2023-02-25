/* eslint-disable */

import React, { useEffect, useState, useLayoutEffect } from 'react'


import { 
    SS_Common,
    SS_RestartFirst,
    SS_RestartSecond 
} from '../SingleSpreadZone.styled';
import { Typing } from 'components/common_res/typing_res/Typing';
import { useRecoilState } from 'recoil';
import { 
    ISingleControlManagerAtom, 
    singleControlManagerAtom,
    ISingleRestartItem,
    defaultRestartInfo
} from 'recoil/SingleAtom';
import { AnimatePresence } from 'framer-motion';
import {IoIosArrowDown} from 'react-icons/io';
import { DrawCommonInfo, EWhatDrawMode } from 'components/spread_res/create_res/draw_res/DrawPannel.interfaces';
import DrawPannel from 'components/spread_res/create_res/draw_res/DrawPannel';
import DrawIChingPannel from 'components/spread_res/create_res/draw_res/iching_res/DrawIChingPannel';


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

const optionalBtnVar = {
  initial:{
    color: 'rgba(240, 147, 43, 0.2)',
    opacity: 0.5,
    cursor: 'auto'
  },
  active:{
    color: ['rgba(240, 147, 43, 0.2)', 'rgba(240, 147, 43,1.0)', 'rgba(240, 147, 43, 0.2)','rgba(240, 147, 43,1.0)', 'rgba(240, 147, 43, 0.2)'],
    cursor: 'pointer',
    opacity: 1,
    transition: {
      color:{
        repeat: Infinity,
        duration: 2.5
      }
    }
  },
}
 

const dropItemVar = {
  initial: {
    backgroundColor: 'rgba(83, 92, 104, 0.3)',
  },
  hover: {
    backgroundColor: 'rgba(83, 92, 104, 0.7)',
    boxShadow: ' 0 0 3px 1px rgba(255, 121, 63,1.0)'
    
  },
  active:{
    boxShadow: ' 0 0 3px 1px rgba(255, 121, 63,1.0)'
  },
  inactiveHover: {
    backgroundColor: 'rgba(20, 20, 20, 0.2)',
    //boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)'
  }
}
interface IRestartSingleSpreadProps {
    projectId : number;
    cur_projectNumber : number;
}

function RestartSingleSpread(props : IRestartSingleSpreadProps) {

    const {
        projectId,
        cur_projectNumber
    } = props;

    const {
        Data
    } = DrawCommonInfo;
    
    const [singleManager, setSingleManager] = useRecoilState<ISingleControlManagerAtom>(singleControlManagerAtom);
    const {
        cur_ProjectNumber,
        singleProjectArr
    } = singleManager

    const {
        restartInfo
    } = singleProjectArr[cur_ProjectNumber]

    const {optionBtnVar} = SS_Common;

    const [projectNameValue, setProjectNameValue] = useState<string>(singleProjectArr[cur_ProjectNumber].projectName);
    const [openOracleType, setOpenOracleType] = useState<boolean>(false);
    const [oracleTypeNum, setOracleTypeNum] = useState<number>(0);
    const [countValue, setCountValue] = useState<string | number>('');
    const [autoDeckTypeNum, setAutoDeckTypeNum] = useState<number>(0);
    const [openAutoDeck, setOpenAutoDeck] = useState<boolean>(false);
    const [previewCard, setPreviewCard] = useState<boolean | null>(true);
    const [error, setError] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>('');


    useEffect(()=> {

    }, [cur_projectNumber])
    // First Question
    const settingStepAndIsSandbox = (e : React.MouseEvent<HTMLDivElement>, type : boolean) => {
        e.preventDefault();
        let _tempManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
        let {
            restartInfo
        } = _tempManager.singleProjectArr[cur_ProjectNumber];

        restartInfo.creatingStep = 1;
        restartInfo.isSandbox = type;
        setSingleManager(_tempManager);

    }   

    // Second Question
    const onClickLabelHandler = (e : React.MouseEvent<HTMLLabelElement>) => {
        e.preventDefault();
        if(!openOracleType) return;
        setOpenOracleType(false);
    }
    const dropdownHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setOpenOracleType(!openOracleType);
    }
    const dropdownAutoDeckHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setOpenAutoDeck(!openAutoDeck);
    }
    const oracleTypeChanger = (e : React.MouseEvent<HTMLDivElement>, i : number) => {
        e.preventDefault();
        if(oracleTypeNum === i) return;
        setOracleTypeNum(i);

        if(i === 2){
            setCountValue(Data.OracleCountLimitArr[i])
        } else {
            setCountValue('');
        }
    }
    const onProjectNameChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        let _value = e.target.value;
        setProjectNameValue(_value);
    }
    const autoDeckTypeChanger = (e : React.MouseEvent<HTMLDivElement>, i : number) => {
        e.preventDefault();
        if(autoDeckTypeNum === i) return;
        setAutoDeckTypeNum(i);
        setCountValue(Data.TarotAutoDeckCountArr[i])
    }
    const onCountChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        let test = e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1");
        setCountValue(test);
    };

    const onClickPrevBtnHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        let _tempManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
        let {
            restartInfo
        } = _tempManager.singleProjectArr[cur_ProjectNumber];
        restartInfo.creatingStep = 0;
        restartInfo.isSandbox = null;
        setSingleManager(_tempManager);
    }
    const validOracleCount = () : boolean => {
        let flag : boolean = false;
        let _count = Number(countValue);
        switch(oracleTypeNum){
            case 0:
            if(_count > 0 && _count <= 78){
                flag = true;
            }
            break;
            case 1:
            if(_count > 0 && _count <= 36){
                flag = true;
            }
            break;
            case 2:
            if(_count === 2){
                flag = true;
            }
            break;
            case 3:
            if(_count > 0 && _count <= 54){
                flag = true;
            }
            break;
            default: break;
        }
        return flag;
    }
    const onValidFunction = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        let countValid = validOracleCount();
        if(!countValid) {
            setError(true);
            setErrMessage('Card Count Check Again')
            setTimeout(()=>{
                setError(false)
                setErrMessage('');
            }, 3000);
            return;
        }
        let _tempManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
        let {
            restartInfo
        } = _tempManager.singleProjectArr[cur_ProjectNumber];
        
        
        if(projectNameValue.length === 0){
            restartInfo.projectName = singleProjectArr[cur_ProjectNumber].projectName;
        }else{
            restartInfo.projectName = projectNameValue;
        }
        restartInfo.cardCount = Number(countValue);
        restartInfo.oracleType = oracleTypeNum;
        
        if(oracleTypeNum === 0){
            restartInfo.NS_T_PreviewCard = previewCard;
            restartInfo.NS_T_UseAutoDeck = autoDeckTypeNum;
        }
        restartInfo.creatingStep = 2;

        setOracleTypeNum(0);
        setCountValue('');
        setAutoDeckTypeNum(0);
        setPreviewCard(true);

        setSingleManager(_tempManager);
    }

    const onExitHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        let _tempManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
        let {
            singleProjectArr,
            cur_ProjectNumber
        } = _tempManager;
        let _tempInfo : ISingleRestartItem = {...defaultRestartInfo};
        singleProjectArr[cur_ProjectNumber].isRestarting = false;
        singleProjectArr[cur_ProjectNumber].restartInfo = _tempInfo;
        setSingleManager(_tempManager);
    }

  return (
    <SS_RestartFirst.Container
        //initial={{opacity: 0}}
        //animate={{opacity: 1, zIndex: 1}}
        //exit={{opacity: 0, zIndex: 0}}
        // style={
        //     singleProjectArr[cur_ProjectNumber].isRestarting
        //     ? {display: 'visible'} 
        //     : {display : 'hidden'}
        //   }
    >
        <AnimatePresence>
        {
        singleProjectArr[cur_ProjectNumber].restartInfo.creatingStep === 0 &&
        <SS_RestartFirst.QuestionBox>
        
          <SS_RestartFirst.FirstQuestionSpan>
            <Typing 
              text={"Is the Oracle type normal or sandbox?"}
              letterSpacing={0.1}
              cursorThickness={0}
              typeSpeed={3}
            />
          </SS_RestartFirst.FirstQuestionSpan>
          <SS_RestartFirst.FirstQuestionBtnBox>
            <SS_RestartFirst.FirstQuestionBtn
                variants={questionBtnVar}
                initial={questionBtnVar.initial}
                whileHover={questionBtnVar.hover}
                onClick={(e) => settingStepAndIsSandbox(e, false)}
            >
              Normal
            </SS_RestartFirst.FirstQuestionBtn>
            <SS_RestartFirst.FirstQuestionBtn
                variants={questionBtnVar}
                initial={questionBtnVar.initial}
                whileHover={questionBtnVar.hover}
                //onClick={(e) => settingStepAndIsSandbox(e, true)}
            >
              Sandbox
            </SS_RestartFirst.FirstQuestionBtn>
          </SS_RestartFirst.FirstQuestionBtnBox>
          <SS_RestartFirst.QuestionCancelBtn
            variants={optionBtnVar}
            initial={optionBtnVar.initial}
            animate={optionBtnVar.active}
            whileHover={optionBtnVar.hover}
            onClick={onExitHandler}
          >
            EXIT
          </SS_RestartFirst.QuestionCancelBtn>
        </SS_RestartFirst.QuestionBox>
        }    
        </AnimatePresence>
        {
        singleProjectArr[cur_ProjectNumber].restartInfo.creatingStep === 1 &&
        <SS_RestartSecond.Container>
        {(restartInfo.isSandbox === false) &&
        <SS_RestartSecond.SingleNormalSetting>
            <SS_RestartSecond.SingleSettingQustionBox>
                <SS_RestartSecond.DesCurrentSection>
                    <Typing 
                        text={'Select the settings you want'}
                        letterSpacing={0.1}
                        cursorThickness={0}
                        typeSpeed={3}
                    />
                </SS_RestartSecond.DesCurrentSection>
                <SS_RestartSecond.SettingBox>
                    <SS_RestartSecond.SettingWrapperBox>
                    <SS_RestartSecond.SettingAttrName>Default Setting</SS_RestartSecond.SettingAttrName>
                    <SS_RestartSecond.BoxWrapper>
                        <SS_RestartSecond.SettingAttrLabel 
                            htmlFor='inputRestartSingleSpName'
                            onClick={(e) => onClickLabelHandler(e)}
                        >
                            Spread Name
                        </SS_RestartSecond.SettingAttrLabel>
                        <SS_RestartSecond.SettingAttrInput
                            id='inputRestartSingleSpName'
                            variants={dropItemVar}
                            whileHover={dropItemVar.hover}
                            value={projectNameValue}
                            onChange={onProjectNameChangeHandler}
                            placeholder={singleProjectArr[cur_ProjectNumber].projectName}
                            autoComplete="off" 
                        />
                    </SS_RestartSecond.BoxWrapper>
                    <SS_RestartSecond.BoxWrapper>
                        <SS_RestartSecond.SettingAttrBox>Oracle Type</SS_RestartSecond.SettingAttrBox>
                        <SS_RestartSecond.DropDownBox
                            onClick={(e) => dropdownHandler(e)}
                            variants={dropItemVar}
                            whileHover={dropItemVar.hover}
                        >
                            {Data.DeckNameArr[oracleTypeNum]}
                            <IoIosArrowDown
                                style={{
                                    width: "10%",
                                    height: "50%",
                                    position: 'absolute',
                                    right: '2%',
                                    margin: '0',
                                    padding: '0',
                                }}
                            />
                            <AnimatePresence>
                            {openOracleType === true && 
                            <SS_RestartSecond.DropDownContentBox
                                initial={{
                                    opacity: 0
                                }}
                                animate={{
                                    opacity: 1
                                }}
                                exit={{
                                    opacity: 0
                                }}
                            >
                                {Data.DeckNameArr.map((a, i) => {
                                    return(
                                        <SS_RestartSecond.DropDownItem
                                            key={`setOracleResetSingleItem${i}`}
                                            variants={dropItemVar}
                                            initial={dropItemVar.initial}
                                            whileHover={dropItemVar.hover}
                                            animate={
                                                i === oracleTypeNum
                                                ? dropItemVar.active
                                                : ""
                                            }
                                            onClick={(e) => oracleTypeChanger(e, i)}
                                        >
                                            {a}
                                            {i === oracleTypeNum && <SS_RestartSecond.RedCircle />}
                                        </SS_RestartSecond.DropDownItem>
                                    );
                                })}
                            </SS_RestartSecond.DropDownContentBox>
                            }
                            </AnimatePresence>
                        </SS_RestartSecond.DropDownBox>
                    </SS_RestartSecond.BoxWrapper>
                    <SS_RestartSecond.BoxWrapper>
                        <SS_RestartSecond.SettingAttrLabel 
                            htmlFor='inputRestartCardCount'
                            onClick={(e) => onClickLabelHandler(e)}
                        >
                            Card Count
                        </SS_RestartSecond.SettingAttrLabel>
                        <SS_RestartSecond.SettingAttrInput 
                            id='inputResetSingleCardCount'
                            value={countValue}
                            variants={dropItemVar}
                            whileHover={dropItemVar.hover}
                            onChange={(e) => onCountChangeHandler(e)}
                            placeholder={Data.OracleCountLimitArr[oracleTypeNum]}
                            maxLength={2}
                            readOnly={
                                oracleTypeNum === 0
                                ? autoDeckTypeNum === 0
                                    ? false
                                    : true
                                : oracleTypeNum === 2
                                    ? true
                                    : false
                            }
                            autoComplete="off"

                        />
                    </SS_RestartSecond.BoxWrapper>
                    </SS_RestartSecond.SettingWrapperBox>
                    <SS_RestartSecond.SettingWrapperBox>
                        <SS_RestartSecond.SettingAttrName>
                            Optional Setting
                        </SS_RestartSecond.SettingAttrName>
                        <AnimatePresence>
                        {
                            oracleTypeNum === 0
                            ?
                            <>
                            <SS_RestartSecond.BoxWrapper
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                            >
                                <SS_RestartSecond.SettingAttrLabel>
                                    Preview 3 Cards
                                </SS_RestartSecond.SettingAttrLabel>
                                {/* <SettingAttrInput
                                    placeholder={`Default - ${totalManager.projectCount}`} 
                                /> */}
                                <SS_RestartSecond.PreviewQuestionBox
                                    variants={dropItemVar}
                                    whileHover={dropItemVar.hover}
                                    onClick={(e : React.MouseEvent<HTMLDivElement>) => {
                                        e.preventDefault();
                                        setPreviewCard(!previewCard)
                                    }}
                                >
                                    {previewCard === true ? "ON" : "OFF"}
                                </SS_RestartSecond.PreviewQuestionBox>
                            </SS_RestartSecond.BoxWrapper>
                            <SS_RestartSecond.BoxWrapper
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                            >
                                <SS_RestartSecond.SettingAttrLabel>
                                    Auto Spread
                                </SS_RestartSecond.SettingAttrLabel>
                                <SS_RestartSecond.DropDownBox
                                    onClick={(e) => dropdownAutoDeckHandler(e)}
                                    variants={dropItemVar}
                                    whileHover={dropItemVar.hover}
                                >
                            {Data.TarotDeckTypeNameArr[autoDeckTypeNum]}
                            <IoIosArrowDown
                                style={{
                                    width: "10%",
                                    height: "50%",
                                    position: 'absolute',
                                    right: '2%',
                                    margin: '0',
                                    padding: '0',
                                }}
                            />
                            <AnimatePresence>
                            {openAutoDeck === true && 
                            <SS_RestartSecond.DropDownContentBox
                                initial={{
                                    opacity: 0
                                }}
                                animate={{
                                    opacity: 1
                                }}
                                exit={{
                                    opacity: 0
                                }}
                            >
                                {Data.TarotDeckTypeNameArr.map((a, i) => {
                                    return(
                                        <SS_RestartSecond.DropDownItem
                                            key={`autoDeckResetSingleItem${i}`}
                                            variants={dropItemVar}
                                            initial={dropItemVar.initial}
                                            whileHover={dropItemVar.hover}
                                            animate={
                                                i === autoDeckTypeNum
                                                ? dropItemVar.active
                                                : ""
                                            }
                                            onClick={(e) => autoDeckTypeChanger(e, i)}
                                        >
                                            {a}
                                            {i === autoDeckTypeNum && <SS_RestartSecond.RedCircle />}
                                        </SS_RestartSecond.DropDownItem>
                                    );
                                })}
                            </SS_RestartSecond.DropDownContentBox>
                            }
                            </AnimatePresence>
                        </SS_RestartSecond.DropDownBox>
                            </SS_RestartSecond.BoxWrapper>
                            </>
                            :
                            <SS_RestartSecond.NoOption
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                            >
                                <div>
                                    There are no options for this type
                                </div>
                            </SS_RestartSecond.NoOption>
                        }
                        </AnimatePresence>
                    </SS_RestartSecond.SettingWrapperBox>
                    <SS_RestartSecond.PrevBtn
                        variants={optionalBtnVar}
                        initial={optionalBtnVar.initial}
                        whileHover={optionalBtnVar.active}
                        onClick={onClickPrevBtnHandler}
                    >
                        PREV
                    </SS_RestartSecond.PrevBtn>
                    <SS_RestartSecond.NextBtn
                        variants={optionalBtnVar}
                        initial={optionalBtnVar.initial}
                        whileHover={optionalBtnVar.active}
                        onClick={onValidFunction}
                    >
                        NEXT
                    </SS_RestartSecond.NextBtn>
                    <AnimatePresence>
                    {error === true &&
                    <SS_RestartSecond.ErrorBox>
                        <Typing 
                            text={errMessage}
                            letterSpacing={0.1}
                            cursorThickness={0}
                            typeSpeed={3}
                        />
                    </SS_RestartSecond.ErrorBox>
                    }
                    </AnimatePresence>
                </SS_RestartSecond.SettingBox>
            </SS_RestartSecond.SingleSettingQustionBox>
        </SS_RestartSecond.SingleNormalSetting>
        }
        </SS_RestartSecond.Container>
        }
        {
        (singleProjectArr[cur_ProjectNumber].restartInfo.creatingStep === 2
            && singleProjectArr[cur_ProjectNumber].restartInfo.oracleType !== 2
        ) &&
        <DrawPannel 
            whatDrawMode={EWhatDrawMode.SINGLE_RESTART}
            oracleType={singleProjectArr[cur_ProjectNumber].restartInfo.oracleType}
        />
        }
        {
        (singleProjectArr[cur_ProjectNumber].restartInfo.creatingStep === 2
            && singleProjectArr[cur_ProjectNumber].restartInfo.oracleType === 2
        ) &&
        <DrawIChingPannel 
            whatDrawMode={EWhatDrawMode.SINGLE_RESTART}
            oracleType={singleProjectArr[cur_ProjectNumber].restartInfo.oracleType}
        />
        }
    </SS_RestartFirst.Container>
  )
}

export default React.memo(RestartSingleSpread);