/* eslint-disable */
import React, { useRef, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { AnimatePresence } from 'framer-motion';
import { totalManagerAtom } from 'recoil/TotalAtom';
import styled from 'styled-components';
import {motion} from 'framer-motion';

import {
  ExtraTarotDeckInfoArr,
  MEPCommon, 
  MEP_FirstFlag, 
  MEP_SecondFlag
} from './MakeExtraPannel.styled'
import { DeckInfoArr } from 'common_resources/CommonData';

import {
  IHaveImageBoxProps
} from 'common_resources/CommonInterfaces'
import { Typing } from 'components/common_res/typing_res/Typing';
import MakeExtraTarot from './MakeExtraTarot';
import DrawPannel from 'components/spread_res/create_res/draw_res/DrawPannel';
import { DrawCommonInfo, EWhatDrawMode } from 'components/spread_res/create_res/draw_res/DrawPannel.interfaces';
import DrawIChingPannel from 'components/spread_res/create_res/draw_res/iching_res/DrawIChingPannel';

interface IMakeExtraProps{
  setIsOpenExtraMake : React.Dispatch<React.SetStateAction<boolean>>
}
interface ILenorOrPokerInfo {
  DesCountString : string,
  LimitCount : number,

}
export interface IMakeExtraChildProps{
    setIsFirstOver? : React.Dispatch<React.SetStateAction<boolean>>,
    setSelectOracleType? : React.Dispatch<React.SetStateAction<number | null>>,
    setIsSecondOver? : React.Dispatch<React.SetStateAction<boolean>>,
    setExtraCardCount : React.Dispatch<React.SetStateAction<number>>,
    setExtraTarotDeck : React.Dispatch<React.SetStateAction<number[]>>,
}

const CustomSelectItem = styled(MEP_FirstFlag.SelectBoxItem)`
  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: inherit;
    background: url(${(props) => props.imgsrc});
    background-size: 100% 100%;    
    background-color: red;
  }
`
interface ILenorOrPokerErr {
  isError: boolean;
  errMessage: string;
}

function MakeExtraPannel({setIsOpenExtraMake} : IMakeExtraProps) {

  const totalManager = useRecoilValue(totalManagerAtom)
  const [isFirstOver, setIsFirstOver] = useState<boolean>(false);
  const [isSecondOver, setIsSecondOver] = useState<boolean>(false);

  const [selectOracleType, setSelectOracleType] = useState<number | null>(null)

  const [extraCardCount, setExtraCardCount] = useState<number>(0);
  const [extraTarotDeck, setExtraTarotDeck] = useState<number[]>();

  const [lenorOrPokerInfo, setLenorOrPokerInfo] = useState<ILenorOrPokerInfo>({
      DesCountString : '',
      LimitCount : 0,
    });
  const [lenorOrPokerCountValue, setLenorOrPokerCountValue] = useState<string>('');
  const [lenorOrPokerErr, setLenorOrPokerErr] = useState<ILenorOrPokerErr>({
    isError : false,
    errMessage : ''
  });
  const lenorOrPokerCountInput = useRef() as React.MutableRefObject<HTMLInputElement>;

  const selectTypeVar = MEPCommon.darkSelectVar;
  const optionTypeVar = MEPCommon.optionalBtnVar;

  const nameVar = MEPCommon.darkSelectNameVar;
  const alphabetArr = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
  ]
  let customVar = {...selectTypeVar};
  let customNameVar = {...selectTypeVar};
  customVar = {
    hover : {
      boxShadow : selectTypeVar.hover.boxShadow,
      scale: 1.05      
    },
  }

  const testVar = {
    cardHover : {
      boxShadow : selectTypeVar.hover.boxShadow,
      scale: 1.05
    },
    active : nameVar.active,
    nameHover : nameVar.hover
  }
  const defaultRoute = `/images/TarotDefault/Default`;

  const setOptionFor_LenorOrPoker = (type : number) => {
    let _tempObj : ILenorOrPokerInfo = {...lenorOrPokerInfo}
    let _max = DrawCommonInfo.Data.OracleMaxLimitArr[type];
    _tempObj.DesCountString = `Allowable range : 1 - ${_max}`;
    _tempObj.LimitCount = _max;
    setLenorOrPokerInfo(_tempObj);
  }
  const onChangeValueForLenorOrPoker = (e : React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      let _value = e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1");
      setLenorOrPokerCountValue(_value);
  }
  const onCheckLenorOrPokerValue = () : boolean => {
    let _flag : boolean = false;
    let _value = Number(lenorOrPokerCountValue);
    if(_value > 0 && _value <= lenorOrPokerInfo.LimitCount){
      return _flag = true;
    }
    else return _flag
  }
  const onClickLenorOrPokerSetCount = (e : React.MouseEvent<HTMLDivElement>, type : number) => {
    e.preventDefault();
    if(type === 0){
      let _flag = onCheckLenorOrPokerValue();
      if(!_flag){
        setLenorOrPokerErr({
          isError: true,
          errMessage: `Please enter a number from 1 to ${lenorOrPokerInfo.LimitCount}`,
        })
        setLenorOrPokerCountValue('');
        lenorOrPokerCountInput.current.focus();
        setTimeout(()=>{
          setLenorOrPokerErr({
            isError: false,
            errMessage: ``,
          })
        }, 3000);
      }
      else{
        setExtraCardCount(Number(lenorOrPokerCountValue));
        setIsSecondOver(true);
      }
    }
    else {
      setSelectOracleType(null);
      setIsFirstOver(false);
      setIsSecondOver(false);
      setExtraCardCount(0);
      setLenorOrPokerCountValue('');
      setLenorOrPokerInfo({
        DesCountString : '',
        LimitCount : 0,
      })
    }
  }

  const {optionalBtnVar} = MEPCommon
    return (
      <AnimatePresence>
      <MEPCommon.Container
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
      >
        <AnimatePresence>
        {!isFirstOver &&
        <MEP_FirstFlag.Container
          initial={{opacity: 0}}
          animate={{opacity: 1}}
        >
          <MEP_FirstFlag.InContainer>
            <MEP_FirstFlag.DesBox>
              <Typing 
                text={'Choose the oracle you want.'}
                letterSpacing={0.1}
                cursorThickness={0}
                typeSpeed={3}
              />
            </MEP_FirstFlag.DesBox>
            <MEP_FirstFlag.SelectBox>
            {DeckInfoArr.map((a,i) => {
              return(
                <MEP_FirstFlag.SelectBoxItem
                  key={`extraSelect${a.name}${i}`}
                  imgsrc={`${process.env.PUBLIC_URL}${a.defaultImage}`}
                  variants={selectTypeVar}
                  animate={
                    selectOracleType === i
                    ? selectTypeVar.active
                    : {}
                  }
                  whileHover={selectTypeVar.hover}
                  onClick={(e) => {
                    e.preventDefault();
                    if(i === selectOracleType) return;
                    setSelectOracleType(i);
                    if(i !== 0 && i !== 2){
                      setOptionFor_LenorOrPoker(i)
                    }
                    setIsFirstOver(true);
                  }}
                >
                  <div></div>
                </MEP_FirstFlag.SelectBoxItem>
              );
            })}
            </MEP_FirstFlag.SelectBox>
          </MEP_FirstFlag.InContainer>
          <MEPCommon.ExitBtnBox
            variants={optionTypeVar}
            animate={optionTypeVar.active}
            whileHover={optionTypeVar.hover}
            onClick={(e) => {
              e.preventDefault();
              setIsOpenExtraMake(false);
            }}
          >
              EXIT
          </MEPCommon.ExitBtnBox>
        </MEP_FirstFlag.Container>
        }
        </AnimatePresence>
        <AnimatePresence>
        {(isFirstOver && !isSecondOver && selectOracleType === 0) && // Extra Tarot
        <MEP_SecondFlag.Container
          initial={{opacity: 0}}
          animate={{opacity: 1, zIndex: 1}}
          //exit={{opacity: 0}}
        >
          <MakeExtraTarot 
            setIsFirstOver={setIsFirstOver}
            setSelectOracleType={setSelectOracleType}
            setIsSecondOver={setIsSecondOver}
            setExtraCardCount={setExtraCardCount}
            setExtraTarotDeck={setExtraTarotDeck}
          />
          <MEPCommon.ExitBtnBox
            variants={optionTypeVar}
            animate={optionTypeVar.active}
            whileHover={optionTypeVar.hover}
            onClick={(e) => {
              e.preventDefault();
              setIsOpenExtraMake(false);
            }}
          >
            EXIT
          </MEPCommon.ExitBtnBox>
        </MEP_SecondFlag.Container>
        }
        {/* {(isSecondOver && selectOracleType === 0) &&
        <DrawPannel 
          whatDrawMode={EWhatDrawMode.SINGLE_EXTRA}
          oracleType={selectOracleType}
          extraCardCount={extraCardCount}
          extraTarotDeck={extraTarotDeck}
          setExtraTarotDeck={setExtraTarotDeck}
          setExtraCardCount={setExtraCardCount}
          setIsOpenExtraMake={setIsOpenExtraMake}
          setIsSecondOver={setIsSecondOver}
        />
        } */}
        <AnimatePresence>
        {
        //(isSecondOver && (selectOracleType !== 0 && selectOracleType !== 2)) 
        (isSecondOver && selectOracleType !== 2)
        &&
        <DrawPannel 
          whatDrawMode={EWhatDrawMode.SINGLE_EXTRA}
          oracleType={selectOracleType}
          extraCardCount={extraCardCount}
          extraTarotDeck={extraTarotDeck}
          setExtraTarotDeck={setExtraTarotDeck}
          setExtraCardCount={setExtraCardCount}
          setIsOpenExtraMake={setIsOpenExtraMake}
          setSelectOracleType={setSelectOracleType}
          setIsFirstOver={setIsFirstOver}
          setIsSecondOver={setIsSecondOver}
          setLenorOrPokerCountValue={setLenorOrPokerCountValue}
        />
        }
        </AnimatePresence>
        </AnimatePresence>
        <AnimatePresence>
          {(isFirstOver && !isSecondOver && (selectOracleType !== 0 && selectOracleType !== 2)) &&
          <MEP_SecondFlag.LenorOrPokerQuestion 
            initial={{opacity: 0}}
            animate={{opacity: 1, zIndex: 1}}
          >
              <MEP_SecondFlag.QuestionHowManyCards>
                <MEP_SecondFlag.DesLimitCount>
                  <Typing 
                    text={`${lenorOrPokerInfo.DesCountString}`}
                    letterSpacing={0.1}
                    cursorThickness={0}
                    typeSpeed={3}
                  />
                </MEP_SecondFlag.DesLimitCount>
                <motion.input
                  ref={lenorOrPokerCountInput} 
                  value={lenorOrPokerCountValue}
                  autoComplete="off"
                  maxLength={2}
                  onChange={onChangeValueForLenorOrPoker}
                  placeholder={`Enter the desired number.`}
                  whileFocus={{
                    boxShadow : `inset 0 0 3px 1px rgba(30, 150, 232, 1)`
                  }}
                />
                
                <MEP_SecondFlag.HowManyOptionBtnBox>
                  <MEP_SecondFlag.HowManyOptionBtn
                    onClick={(e) => {
                      if(lenorOrPokerCountValue.length <= 0) return;
                      onClickLenorOrPokerSetCount(e, 0)
                    }}
                    variants={optionalBtnVar}
                    animate={
                      lenorOrPokerCountValue.length > 0
                      ? optionalBtnVar.active
                      : optionalBtnVar.inactive
                    }
                    whileHover={
                      lenorOrPokerCountValue.length > 0
                      ? optionalBtnVar.hover
                      : {}
                    }
                  >
                    Set
                  </MEP_SecondFlag.HowManyOptionBtn>
                  <MEP_SecondFlag.HowManyOptionBtn
                    onClick={(e) => {
                      onClickLenorOrPokerSetCount(e, 1)
                    }}
                    variants={optionalBtnVar}
                    animate={optionalBtnVar.inactive}
                    whileHover={optionalBtnVar.hover}
                  >
                    Back
                  </MEP_SecondFlag.HowManyOptionBtn>
                </MEP_SecondFlag.HowManyOptionBtnBox>
                <MEP_SecondFlag.HowManyError>
                  <AnimatePresence>
                  {
                    lenorOrPokerErr.isError &&
                    <Typing 
                      text={`${lenorOrPokerErr.errMessage}`}
                      letterSpacing={0.1}
                      cursorThickness={0}
                      typeSpeed={3}
                    />
                  }
                  </AnimatePresence>
                </MEP_SecondFlag.HowManyError>
              </MEP_SecondFlag.QuestionHowManyCards>
      
          </MEP_SecondFlag.LenorOrPokerQuestion>
          }
        </AnimatePresence>
        <AnimatePresence>
        {(isFirstOver  && selectOracleType === 2) &&
          <DrawIChingPannel 
            whatDrawMode={EWhatDrawMode.SINGLE_EXTRA}
            oracleType={selectOracleType}
            setIsOpenExtraMake={setIsOpenExtraMake}
            setIsFirstOver={setIsFirstOver}
            setSelectOracleType={setSelectOracleType}
          />
        
        }
        </AnimatePresence>
      </MEPCommon.Container>
      </AnimatePresence>
    )
}

export default React.memo(MakeExtraPannel)