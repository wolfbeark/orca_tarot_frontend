/* eslint-disable */
import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import {AnimatePresence, motion} from 'framer-motion';
import { HorCenterDiv, VerCenterDiv } from 'common_resources/CommonStyle'
import { useRecoilState, useRecoilValue } from 'recoil'
import { createControlManager, EOracleType, ICreateControlManager } from 'recoil/CreateAtom'
import { Typing } from 'components/common_res/typing_res/Typing'
import { totalManagerAtom } from 'recoil/TotalAtom';
import { 
    DeckNameArr, 
    TarotAutoDeckCountArr, 
    TarotDeckTypeNameArr, 
    OracleCountLimitArr 
} from 'common_resources/CommonData';
import {IoIosArrowDown} from 'react-icons/io';
import { singleControlManagerAtom } from 'recoil/SingleAtom';


const SecondContainer = styled(VerCenterDiv)`
  width: 45%;
  height: 80%;
  background-color: ${(props) => props.theme.boxColors.opaqueBlack};
  border-radius: ${(props) => props.theme.borders.small};
  padding: 0.5%;
  position: absolute;
  top: 8%;
  
`
const SingleNormalSetting = styled(VerCenterDiv)`
    width: 100%;
    height: 100%;
    background-color: inherit;
    border-radius: inherit;
`
const SingleSettingQustionBox = styled(VerCenterDiv)`
    width: 100%;
    height: 100%;
    //background-color: skyblue;
    justify-content: flex-start;
`
const DesCurrentSection = styled(HorCenterDiv)`
    width: 100%;
    height: 15%;
    //background-color: pink;
    justify-content: flex-start;
    padding-left: 5%;
    font-size: 200%;
    color: ${(props) => props.theme.textColors.swanWhite};
    user-select : none;
`
const SettingBox = styled(VerCenterDiv)`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 85%;
    padding: 1%;
    position: relative;
    
`
const BoxWrapper = styled(HorCenterDiv)`
    width: 100%;
    height: 20%;
    justify-content: center;
    padding-left: 3%;
    margin-bottom: 1%;
    
`
const SettingWrapperBox = styled(VerCenterDiv)`
    width: 100%;
    height: 50%;
    //background-color: olive;
    justify-content: flex-start;
    align-items: center;
    
`
const SettingAttrLabel = styled(motion.label)`
    width: 22%;
    height: 100%;
    background-color: ${(props) => props.theme.boxColors.opaqueBlack};
    display: flex;
    justify-content: flex-start;
    padding-left: 1.5%;
    align-items: center;
    border-radius: ${(props) => props.theme.borders.small};
    cursor: pointer;
    user-select: none;
    //color: rgba(83, 92, 104,1.0);
    color: ${(props) => props.theme.textColors.swanWhite};
    letter-spacing: 0.05em;
`
const SettingAttrInput = styled(motion.input)`
    width: 70%;
    height: 100%;
    background-color: ${(props) => props.theme.boxColors.opaqueBlack};
    color: ${(props) => props.theme.textColors.swanWhite};
    display: flex;
    justify-content: center;
    //font-family: ${(props) => props.theme.korFont};
    font-weight: 600;
    align-items: center;
    margin-left: 1%;
    padding-left: 2%;
    box-shadow: none;
    letter-spacing: 0.2em;
    border-radius: ${(props) => props.theme.borders.small};
    &:focus{
        box-shadow:  0 0 2px 1px rgba(255, 121, 63,1.0);
        transition: box-shadow 0.2s ease;
    }
    will-change: box-shadow;
    user-select: none;
`
const PreviewQuestionBox = styled(motion.div)`
    width: 70%;
    height: 100%;
    background-color: ${(props) => props.theme.boxColors.opaqueBlack};
    color: ${(props) => props.theme.textColors.swanWhite};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 1%;
    padding-left: 2%;
    box-shadow: none;
    letter-spacing: 0.2em;
    border-radius: ${(props) => props.theme.borders.small};
    cursor: pointer;
    user-select: none;
`
const SettingAttrBox = styled(HorCenterDiv)`
    width: 22%;
    height: 100%;
    background-color: ${(props) => props.theme.boxColors.opaqueBlack};
    border-radius: ${(props) => props.theme.borders.small};
    color: ${(props) => props.theme.textColors.swanWhite};
    letter-spacing: 0.05em;
    justify-content: flex-start;
    padding-left: 1.5%;
`

const DropDownBox = styled(HorCenterDiv)`
    width: 70%;
    height: 100%;
    background-color: ${(props) => props.theme.boxColors.opaqueBlack};
    color: ${(props) => props.theme.textColors.swanWhite};
    position: relative;
    margin-left: 1%;
    cursor: pointer;
    user-select: none;
    letter-spacing: 0.2em;
    padding-left: 2%;
    justify-content: flex-start;
    border-radius: ${(props) => props.theme.borders.small};
`
const DropDownContentBox = styled(VerCenterDiv)`
    width: 100%;
    height: 400%;
    background-color: ${(props) => props.theme.boxColors.opaqueBlack};
    //background-color: green;
    color: ${(props) => props.theme.textColors.swanWhite};
    border-radius: ${(props) => props.theme.borders.small};
    position: absolute;
    left: 0;
    bottom: -405%;
    z-index: 3;
    justify-content: space-evenly;
`
const DropDownItem = styled(HorCenterDiv)`
    width: 50%;
    height: auto;
    min-height: 15%;
    background-color: ${(props) => props.theme.boxColors.soaring};
    border-radius : ${(props) => props.theme.borders.small};
    position: relative;
    cursor: pointer;
    user-select: none;
    letter-spacing: 0.1em;
`
const RedCircle = styled(HorCenterDiv)`
    width: 5px;
    height: 5px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    right: 2%;
`
const SettingAttrName = styled(HorCenterDiv)`
    justify-content: flex-start;
    padding-left: 2%;
    font-size: 150%;
    width: 100%;
    height: 20%;
    letter-spacing: 0.05em;
    color: ${(props) => props.theme.textColors.swanWhite};
`
const OptionalBox = styled(VerCenterDiv)`
    width: 100%;
    height: 80%;
    //background-color: blue;
    justify-content: flex-start;
`
const NoOption = styled(HorCenterDiv)`
    width: 100%;
    height: 80%;
    padding-left: 6%;
    justify-content: flex-start;
    & div{
        width: 95%;
        height: 100%;
        background-color: ${(props) => props.theme.boxColors.opaqueBlack};
        border-radius: ${(props) => props.theme.borders.small};
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${(props) => props.theme.textColors.swanWhite};
        font-size: 150%;
        letter-spacing: 0.05em;
    }
`
const PrevBtn = styled(HorCenterDiv)`
    width: 18%;
    height: 10%;
    background-color: ${(props) => props.theme.boxColors.soaring};
    border-radius: ${(props) => props.theme.borders.small};
    color: ${(props) => props.theme.textColors.swanWhite};
    position: absolute;
    bottom: 1%;
    left: 1%;
`
const NextBtn = styled(HorCenterDiv)`
    width: 18%;
    height: 10%;
    background-color: ${(props) => props.theme.boxColors.soaring};
    border-radius: ${(props) => props.theme.borders.small};
    color: ${(props) => props.theme.textColors.swanWhite};
    position: absolute;
    bottom: 1%;
    right: 1%;
`
const ErrorBox = styled(HorCenterDiv)`
    width: 40%;
    height: 10%;
    position: absolute;
    bottom: 1%;
    color: ${(props) => props.theme.textColors.swanWhite};
    letter-spacing: 0.05em;
    font-size: 120%;
`
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

function SecondQuestion() {
    const [createManager, setCreateManager] = useRecoilState(createControlManager);
    const [totalManager, setTotalManager] = useRecoilState(totalManagerAtom);
    const singleManager = useRecoilValue(singleControlManagerAtom);
    const {
        projectType,
        isSandbox
    } = createManager

    const [openOracleType, setOpenOracleType] = useState<boolean>(false);
    const [oracleTypeNum, setOracleTypeNum] = useState<number>(0);
    const [openAutoDeck, setOpenAutoDeck] = useState<boolean>(false);
    const [autoDeckTypeNum, setAutoDeckTypeNum] = useState<number>(0);

    const [projectNameValue, setProjectNameValue] = useState<string>('');
    const [countValue, setCountValue] = useState<string | number>('');
    const [previewCard, setPreviewCard] = useState<boolean | null>(true);
    const [error, setError] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>('');

    useEffect(()=> {
        let _temp : ICreateControlManager = JSON.parse(JSON.stringify(createManager));
        if(_temp.oracleType !== null){
            setProjectNameValue(_temp.projectName);
            setOracleTypeNum(_temp.oracleType);
            setCountValue(String(_temp.cardCount));
            if(_temp.oracleType === 0){
                setPreviewCard(_temp.NS_T_PreviewCard);
                setAutoDeckTypeNum(_temp.NS_T_UseAutoDeck);
            }
        }
    }, [])
    const onProjectNameChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        let _value = e.target.value;
        setProjectNameValue(_value);
    }
    const onCountChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        let test = e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1");
        setCountValue(test);
    };
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
            setCountValue(OracleCountLimitArr[i])
        } else {
            setCountValue('');
        }
    }
    const autoDeckTypeChanger = (e : React.MouseEvent<HTMLDivElement>, i : number) => {
        e.preventDefault();
        if(autoDeckTypeNum === i) return;
        setAutoDeckTypeNum(i);
        setCountValue(TarotAutoDeckCountArr[i])
    }
    const onClickLabelHandler = (e : React.MouseEvent<HTMLLabelElement>) => {
        e.preventDefault();
        if(!openOracleType) return;
        setOpenOracleType(false);
    }
    const onClickPrevBtnHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        let _temp = JSON.parse(JSON.stringify(createManager));
        _temp.creatingStep = 0;
        _temp.projectName = null;
        _temp.cardCount = null;
        _temp.oracleType = null;
        _temp.NS_T_PreviewCard = null;
        _temp.NS_T_UseAutoDeck = null;
        setCreateManager(_temp);
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
        let _temp : ICreateControlManager = JSON.parse(JSON.stringify(createManager));
        if(projectNameValue.length === 0){
            _temp.projectName = `Default - ${singleManager.singleProjectArr.length}`
        }else{
            _temp.projectName = projectNameValue;
        }
        _temp.cardCount = Number(countValue);
        _temp.oracleType = oracleTypeNum;
        
        if(oracleTypeNum === 0){
            _temp.NS_T_PreviewCard = previewCard;
            _temp.NS_T_UseAutoDeck = autoDeckTypeNum;
        }
        _temp.creatingStep = 2;
        setCreateManager(_temp);
    }
    
  return (
    <SecondContainer>
        {(projectType === false && isSandbox === false) &&
        <SingleNormalSetting>
            <SingleSettingQustionBox>
                <DesCurrentSection>
                    <Typing 
                        text={'Select the settings you want'}
                        letterSpacing={0.1}
                        cursorThickness={0}
                        typeSpeed={3}
                    />
                </DesCurrentSection>
                <SettingBox>
                    <SettingWrapperBox>
                    <SettingAttrName>Default Setting</SettingAttrName>
                    <BoxWrapper>
                        <SettingAttrLabel 
                            htmlFor='inputSpName'
                            onClick={(e) => onClickLabelHandler(e)}
                        >
                            Spread Name
                        </SettingAttrLabel>
                        <SettingAttrInput
                            id='inputSpName'
                            variants={dropItemVar}
                            whileHover={dropItemVar.hover}
                            value={projectNameValue}
                            onChange={onProjectNameChangeHandler}
                            placeholder={`Default - ${singleManager.singleProjectArr.length}`}
                            autoComplete="off" 
                        />
                    </BoxWrapper>
                    <BoxWrapper>
                        <SettingAttrBox>Oracle Type</SettingAttrBox>
                        <DropDownBox
                            onClick={(e) => dropdownHandler(e)}
                            variants={dropItemVar}
                            whileHover={dropItemVar.hover}
                        >
                            {DeckNameArr[oracleTypeNum]}
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
                            <DropDownContentBox
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
                                {DeckNameArr.map((a, i) => {
                                    return(
                                        <DropDownItem
                                            key={`setOracleItem${i}`}
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
                                            {i === oracleTypeNum && <RedCircle />}
                                        </DropDownItem>
                                    );
                                })}
                            </DropDownContentBox>
                            }
                            </AnimatePresence>
                        </DropDownBox>
                    </BoxWrapper>
                    <BoxWrapper>
                        <SettingAttrLabel 
                            htmlFor='inputCardCount'
                            onClick={(e) => onClickLabelHandler(e)}
                        >
                            Card Count
                        </SettingAttrLabel>
                        <SettingAttrInput 
                            id='inputCardCount'
                            value={countValue}
                            variants={dropItemVar}
                            whileHover={dropItemVar.hover}
                            onChange={(e) => onCountChangeHandler(e)}
                            placeholder={OracleCountLimitArr[oracleTypeNum]}
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
                    </BoxWrapper>
                    </SettingWrapperBox>
                    <SettingWrapperBox>
                        <SettingAttrName>
                            Optional Setting
                        </SettingAttrName>
                        <AnimatePresence>
                        {
                            oracleTypeNum === 0
                            ?
                            <>
                            <BoxWrapper
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                            >
                                <SettingAttrLabel>
                                    Preview 3 Cards
                                </SettingAttrLabel>
                                {/* <SettingAttrInput
                                    placeholder={`Default - ${totalManager.projectCount}`} 
                                /> */}
                                <PreviewQuestionBox
                                    variants={dropItemVar}
                                    whileHover={dropItemVar.hover}
                                    onClick={(e : React.MouseEvent<HTMLDivElement>) => {
                                        e.preventDefault();
                                        setPreviewCard(!previewCard)
                                    }}
                                >
                                    {previewCard === true ? "ON" : "OFF"}
                                </PreviewQuestionBox>
                            </BoxWrapper>
                            <BoxWrapper
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                            >
                                <SettingAttrLabel>
                                    Auto Spread
                                </SettingAttrLabel>
                                <DropDownBox
                                    onClick={(e) => dropdownAutoDeckHandler(e)}
                                    variants={dropItemVar}
                                    whileHover={dropItemVar.hover}
                                >
                            {TarotDeckTypeNameArr[autoDeckTypeNum]}
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
                            <DropDownContentBox
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
                                {TarotDeckTypeNameArr.map((a, i) => {
                                    return(
                                        <DropDownItem
                                            key={`autoDeckItem${i}`}
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
                                            {i === autoDeckTypeNum && <RedCircle />}
                                        </DropDownItem>
                                    );
                                })}
                            </DropDownContentBox>
                            }
                            </AnimatePresence>
                        </DropDownBox>
                            </BoxWrapper>
                            </>
                            :
                            <NoOption
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                            >
                                <div>
                                    There are no options for this type
                                </div>
                            </NoOption>
                        }
                        </AnimatePresence>
                    </SettingWrapperBox>
                    <PrevBtn
                        variants={optionalBtnVar}
                        initial={optionalBtnVar.initial}
                        whileHover={optionalBtnVar.active}
                        onClick={onClickPrevBtnHandler}
                    >
                        PREV
                    </PrevBtn>
                    <NextBtn
                        variants={optionalBtnVar}
                        initial={optionalBtnVar.initial}
                        whileHover={optionalBtnVar.active}
                        onClick={onValidFunction}
                    >
                        NEXT
                    </NextBtn>
                    <AnimatePresence>
                    {error === true &&
                    <ErrorBox>
                        <Typing 
                            text={errMessage}
                            letterSpacing={0.1}
                            cursorThickness={0}
                            typeSpeed={3}
                        />
                    </ErrorBox>
                    }
                    </AnimatePresence>
                </SettingBox>
            </SingleSettingQustionBox>
        </SingleNormalSetting>
        }
    </SecondContainer>
  )
}

export default React.memo(SecondQuestion)