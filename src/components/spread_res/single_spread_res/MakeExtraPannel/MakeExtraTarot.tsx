/* eslint-disable */
import React, { useRef, useState } from 'react'
import {AnimatePresence, motion} from 'framer-motion';

import { 
    ExtraTarotDeckInfoArr,
    MEPCommon, 
    MEP_SecondFlag 
} from './MakeExtraPannel.styled'
import { Typing } from 'components/common_res/typing_res/Typing';

import {IMakeExtraChildProps} from './MakeExtraPannel';
import { DrawCommonInfo } from 'components/spread_res/create_res/draw_res/DrawPannel.interfaces';

type ListType = "MJ" | "MN" | "MNC" | "TOTAL" | "EMPTY";
type PriorityType = 0 | 1 | 2 | 3 | 4;

interface IListItem {
    listName : string;
    listType : ListType;
    itemPriority : number;
}

interface ISituationInfo {
    newStateArr : boolean[];
    newListArr : IListItem[];
    newLimitCount : number;
}

function MakeExtraTarot({
    setIsFirstOver,
    setSelectOracleType,
    setIsSecondOver,
    setExtraCardCount,
    setExtraTarotDeck
} : IMakeExtraChildProps) {
    

    const defaultRoute = `/images/TarotDefault/Default`;
    const selectTypeVar = MEPCommon.darkSelectVar;
    const optionTypeVar = MEPCommon.optionalBtnVar;
    const nameVar = MEPCommon.darkSelectNameVar;
    const listEmptyString = "Select Deck";

    const [selectInfoArr, setSelectInfoArr] = useState<boolean[]>(new Array(10).fill(false));
    const [isClickedTotal, setIsClickedTotal] = useState<boolean>(false);
    const [listArr, setListArr] = useState<IListItem[]>([{
        listName : listEmptyString, 
        listType : "EMPTY",
        itemPriority : 0 
    }])
    
    const [limitCount, setLimitCount] = useState<number>(0);
    const [cardCount, setCardCount] = useState<string>('');

    const [isFlagNext, setIsFlagNext] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errMessage, setErrorMessage] = useState<string>('');

    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const testVar = {
        cardHover : {
            boxShadow : selectTypeVar.hover.boxShadow,
            scale: 1.05
        },
        active : nameVar.active,
        nameHover : nameVar.hover
    }

    const test2Var = {
        hover : {
            
        },
        inHover: {

        },
        inactive : {
            opacity: 0.2
        },
        active : {
            opacity: 1
        },
    }
    const cardVar = {
        hover : {
            boxShadow : selectTypeVar.hover.boxShadow,
            scale: 1.05
        },
        inactive : {
            opacity: 0.2
        },
        active : {
            opacity: 1
        },
    }
    const testNameVar = {
        initial: nameVar.initial,
        hover : nameVar.hover,
        // inactive : {
        //     opacity: 0.2
        // },
        // active : {
        //     opacity: 1
        // },
        
    }

    const onChangeCardCount = (e: React.ChangeEvent<HTMLInputElement>) => {
        let _value = e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1");
        setCardCount(_value);
    }
    const onClickTotalHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        
        let _listArr : IListItem[] = [];
        let _item : IListItem = !isClickedTotal 
            ? {listName: "Total", listType : "TOTAL", itemPriority : 0} 
            : {listName: listEmptyString, listType: "EMPTY", itemPriority : 0};
        _listArr.push(_item);

        setSelectInfoArr(new Array(10).fill(!isClickedTotal ? true : false));
        setListArr(_listArr);
        setIsClickedTotal((prev) => !prev);
        setLimitCount(!isClickedTotal ? 78 : 0);
    }
    const onClickClearHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        // let _listArr : IListItem[] = [];
        // let _item : IListItem = isClickedTotal 
        //     ? {listName: "Total", listType : "TOTAL", itemPriority : 0} 
        //     : {listName: listEmptyString, listType: "EMPTY", itemPriority : 0};
        // _listArr.push(_item);
        // setSelectInfoArr(new Array(10).fill(false))
        // setListArr(_listArr);
        // setLimitCount(0);
        // setCardCount('');

        let _listArr : IListItem[] = [];
        let _item : IListItem = {listName: listEmptyString, listType: "EMPTY", itemPriority : 0}; 
        _listArr.push(_item);
        setSelectInfoArr(new Array(10).fill(false))
        setListArr(_listArr);
        setLimitCount(0);
        setCardCount('');
        if(isClickedTotal) setIsClickedTotal(false);
    }
    const onBackHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsFirstOver(false);
        setSelectOracleType(null);
    }
    const onNextHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        
        let _cardCount = Number(cardCount);
        let checkCount = false;
        let isAllFalse = selectInfoArr.every(a => a === false);
        
        if(_cardCount > 0 && _cardCount <= limitCount) checkCount = true;

        setIsFlagNext(true);

        if(isAllFalse){
            setErrorMessage("No decks have been selected");
            setIsError(true);
            setTimeout(()=>{
                setIsError(false);
                setErrorMessage('');
                setIsFlagNext(false);
            }, 2000);
        }
        else if(!checkCount){
            setErrorMessage(`Please enter a number from 1 to ${limitCount}`);
            setIsError(true);
            setTimeout(()=>{
                setIsError(false);
                setErrorMessage('');
                setIsFlagNext(false);
                inputRef.current.focus();
            }, 2000);   
        }

        else if(!isAllFalse && checkCount){ // 임시로
            setErrorMessage(`Success`);
            extractTarotDeck();
            setIsError(true);
            setExtraCardCount(_cardCount);
            setTimeout(()=>{
                setIsError(false);
                setErrorMessage('');
                setIsFlagNext(false);
                setIsSecondOver(true);
            }, 2000); 

        }
    }

    const extractTarotDeck = () => {
        if(isClickedTotal) {
            let _tempArr = DrawCommonInfo.RandomArrGenerator(78);
            setExtraTarotDeck(_tempArr);
            return;
        }
        else{
            let _tempArr : number[] = [];
            let _ranIdxArr : number[];
            let _shuffledArr : number[];
            let isAnyChildTrue = selectInfoArr
                .filter((a, i) => i !== 0 && i !== 5)
                .some((a) => a === true);
            for(let i = 0; i < selectInfoArr.length; i++){
                if(!selectInfoArr[i]) continue;
                let {
                    startNum,
                    endNum
                } = ExtraTarotDeckInfoArr[i];

                if(i !== 0 && i !== 5){
                    if(selectInfoArr[5]) continue;
                }

                if(i === 5){
                    if(isAnyChildTrue) continue;
                }
                for(let j = startNum; j <= endNum; j++){
                    _tempArr.push(j);
                }
            }
            _ranIdxArr = DrawCommonInfo.RandomArrGenerator(_tempArr.length);
            _shuffledArr = new Array(_tempArr.length);

            for(let i = 0; i < _ranIdxArr.length; i++){
                let _ranIdx = _ranIdxArr[i];
                _shuffledArr[i] = _tempArr[_ranIdx];
            }
            setExtraTarotDeck(_tempArr);
        }
    }



    const onClickSelectDeck = (e : React.MouseEvent<HTMLDivElement>, index : number) => {
        e.preventDefault();
        let tempArr = [...selectInfoArr];
        //startValidClickHandler(isClickedTotal, index, tempObj)
        deckClickControlHandler(index, tempArr) 
    }

    // 2023.02.16 리팩토링
    const deckClickControlHandler = (idx : number, clickInfoArr : boolean[]) => {
        let _clickInfoArr : boolean[];
        let _listArr : IListItem[];
        // setSelectInfoArr(modifyDeckInfoArr(idx, clickInfoArr));
        // setListArr(modifyListArr(idx));
        _clickInfoArr = modifyDeckInfoArr(idx, clickInfoArr);
        _listArr = modifyNameListArr(idx, _clickInfoArr);

        setSelectInfoArr(_clickInfoArr);
        setListArr(_listArr);
        setLimitCount(modifyLimitCount(idx, clickInfoArr));        
    }
    const modifyDeckInfoArr = (idx : number, clickInfoArr : boolean[]) : boolean[] => {
        let _tempArr = [...clickInfoArr];
        let isThisClicked = _tempArr[idx];
        let isAllMinorClick = _tempArr
            .filter((a, i) => i !== 0 && i !== 5)
            .every((a) => a === true);

        if(!isClickedTotal){
            if(idx === 0){
                _tempArr[0] = !isThisClicked;
            }
            else if(idx === 5){
                _tempArr[5] = !isThisClicked;
                _tempArr.forEach((a, i) => {
                    if(i === 0) {
                        return;
                    }
                    else{
                        _tempArr[i] = !isThisClicked;
                    }
                })
            }
            else if(idx !== 0 && idx !== 5){
                _tempArr[idx] = !isThisClicked;
                if(isThisClicked === false){
                    let isAllTrue = _tempArr
                        .filter((a,i) => (i !== 0 && i !== 5))
                        .every((a) => a === true);
                    if(isAllTrue){
                        _tempArr[5] = true;
                    }
                }
                else {
                    if(_tempArr[5] === true) _tempArr[5] = false
                }
            }
        }
        else{ // 이미 토탈인 상태
            if(idx === 0){
                _tempArr[0] = !isThisClicked; 
            }
            else if(idx === 5){
                for(let i = 0; i < _tempArr.length; i ++){
                    if(i === 0) continue;
                    _tempArr[i] = false;
                }
            }
            else{
                _tempArr[idx] = !isThisClicked;
                if(_tempArr[5]) _tempArr[5] = false;
            }

            setIsClickedTotal(false);
        }

        if(_tempArr.every(a => a === true)) setIsClickedTotal(true);

        return _tempArr;
    }
    const modifyNameListArr = (idx: number, _clickInfoArr : boolean[]) : IListItem[] => {
        let _tempArr = [..._clickInfoArr];
        let _listArr : IListItem[] = [];
        let item : IListItem = {
            listName: "",
            listType: "EMPTY",
            itemPriority: 0
        };
        if(_tempArr[0] && _tempArr[5]){
            item.listName = "Total";
            item.listType = "TOTAL";
            item.itemPriority = 0;
            _listArr.push(item);
            return _listArr;
        }

        if(_tempArr.every(a => a === false)){
            item.listName = listEmptyString;
            item.listType = "EMPTY";
            item.itemPriority = 0;
            _listArr.push(item);
            return _listArr;
        }

        for(let i = 0; i < _tempArr.length; i++){
            if(!_tempArr[i]) continue;
            let _item = {...item};
            if(i === 0){
                _item.listName = ExtraTarotDeckInfoArr[0].name;
                _item.listType = "MJ";
                _item.itemPriority = ExtraTarotDeckInfoArr[0].itemPriority;
                _listArr.push(_item);
            }
            else if(i !== 0 && i !== 5){
                if(_tempArr[5]) continue;
                _item.listName = ExtraTarotDeckInfoArr[i].name;
                _item.listType = "MNC";
                _item.itemPriority = ExtraTarotDeckInfoArr[i].itemPriority;
                _listArr.push(_item);
            }
            else if(i === 5){
                _item.listName = ExtraTarotDeckInfoArr[i].name;
                _item.listType = "MN";
                _item.itemPriority = ExtraTarotDeckInfoArr[i].itemPriority;
                _listArr.push(_item);
                break;
            }
        }
        return _listArr;
    }
    const modifyLimitCount = (idx : number, _selectInfoArr : boolean[]) : number => {
        let _limitCount = limitCount;
        let _tempArr = [..._selectInfoArr];
        let isThisClicked = _tempArr[idx];
        if(idx === 0){
            if(!isThisClicked) _limitCount += ExtraTarotDeckInfoArr[0].deckCount;
            else _limitCount -= ExtraTarotDeckInfoArr[0].deckCount;
        }
        else if(idx === 5){
            if(!isThisClicked){
                let _childArr1 = _tempArr.filter((a, i) => i > 0 && i < 5)
                    .filter(a => a === true);
                let _childArr2 = _tempArr.filter((a, i) => i > 5)
                    .filter(a => a === true);
                if(_childArr1.length > 0 || _childArr2.length > 0){
                    let childCount1 = _childArr1.length * ExtraTarotDeckInfoArr[4].deckCount;
                    let childCount2 = _childArr2.length * ExtraTarotDeckInfoArr[6].deckCount;
                    _limitCount -= (childCount1 + childCount2);
                    _limitCount += ExtraTarotDeckInfoArr[idx].deckCount;
                }
                else{
                    _limitCount += ExtraTarotDeckInfoArr[idx].deckCount;
                }
            }
            else{
                _limitCount -= ExtraTarotDeckInfoArr[idx].deckCount;
            }
        }
        else if(idx !== 0 && idx !== 5){
            if(!isThisClicked){
                _limitCount += ExtraTarotDeckInfoArr[idx].deckCount;
            }
            else{
                _limitCount -= ExtraTarotDeckInfoArr[idx].deckCount;
            }
        }
        return _limitCount;
    }


    
    
  return (
    <MEP_SecondFlag.InContainer>
        <MEP_SecondFlag.T_DeckSelectPannel>
        {ExtraTarotDeckInfoArr.map((a,i) => {
            return(
                <MEP_SecondFlag.T_DeckSelectItem
                    key={`extraTDeckItem${i}${a.name}`}
                    imgsrc={`${process.env.PUBLIC_URL}${defaultRoute}${a.imgNum}.png`}
                    variants={test2Var}
                    whileHover={
                        selectInfoArr[i] === false
                        ? "hover"
                        : "inHover"
                    }
                    animate={
                        selectInfoArr[i] === false
                        ? test2Var.active
                        : test2Var.inactive
                    }
                    onClick={(e : React.MouseEvent<HTMLDivElement>) => {
                        onClickSelectDeck(e, i)
                    }}
                >
                    <motion.div
                        variants={cardVar}
                        initial={false}
                    >
                    </motion.div>
                    <motion.div
                        variants={testNameVar}
                        initial={testNameVar.initial}
                    >
                        {/* {a.name + selectInfoArr[i]} */}
                        {a.name}
                    </motion.div>
                </MEP_SecondFlag.T_DeckSelectItem>
            );
        })}
        </MEP_SecondFlag.T_DeckSelectPannel>
        <MEP_SecondFlag.T_OptionControlPannel>
        <MEP_SecondFlag.T_SelectListBox>
            <MEP_SecondFlag.T_InSelectListBox>
                <MEP_SecondFlag.SelectedList>
                {listArr.map((a, i) => {
                    return(
                        <motion.li key={`extraTListItem${a.listType}${i}${a.listName}`}>
                            <Typing 
                                text={a.listName}
                                cursorThickness={0}
                                typeSpeed={3}
                            />
                        </motion.li>
                    );
                })}
                </MEP_SecondFlag.SelectedList>
            </MEP_SecondFlag.T_InSelectListBox>
        </MEP_SecondFlag.T_SelectListBox>
        <MEP_SecondFlag.T_LimitCountControlBox>
            <MEP_SecondFlag.LimitNoticeBox>
                <motion.div>Card Limit</motion.div>
                <motion.div>
                    {limitCount}
                </motion.div>
            </MEP_SecondFlag.LimitNoticeBox>
            <MEP_SecondFlag.LimitNoticeBox>
                <motion.div>Card Count</motion.div>
                <motion.input
                    ref={inputRef}
                    autoComplete='off'
                    maxLength={2}
                    placeholder={`Max ${limitCount}`}
                    value={cardCount}
                    onChange={onChangeCardCount}
                    whileFocus={{
                        boxShadow : `inset 0 0 3px 1px rgba(30, 150, 232, 1)`
                    }}
                    
                />
            </MEP_SecondFlag.LimitNoticeBox>
        </MEP_SecondFlag.T_LimitCountControlBox>
        <MEP_SecondFlag.T_OptionBtnBox>
            <MEP_SecondFlag.OptionBtn
                variants={optionTypeVar}
                animate={optionTypeVar.active}
                whileHover={optionTypeVar.hover}
                onClick={onClickTotalHandler}
            >
                Total
            </MEP_SecondFlag.OptionBtn>
            <MEP_SecondFlag.OptionBtn
                variants={optionTypeVar}
                animate={optionTypeVar.active}
                whileHover={optionTypeVar.hover}
                onClick={onClickClearHandler}
            >
                Clear
            </MEP_SecondFlag.OptionBtn>
            <MEP_SecondFlag.OptionBtn
                variants={optionTypeVar}
                animate={optionTypeVar.active}
                whileHover={optionTypeVar.hover}
                onClick={onBackHandler}
            >
                Back
            </MEP_SecondFlag.OptionBtn>
            <MEP_SecondFlag.OptionBtn
                variants={optionTypeVar}
                animate={optionTypeVar.active}
                whileHover={optionTypeVar.hover}
                onClick={onNextHandler}
            >
                Next
            </MEP_SecondFlag.OptionBtn>
        </MEP_SecondFlag.T_OptionBtnBox>
        </MEP_SecondFlag.T_OptionControlPannel>
        <AnimatePresence>
        {
        isFlagNext &&
        <MEP_SecondFlag.MaskBox>
        {
        isError &&
        <MEP_SecondFlag.Question_NoSelectDeck>
            <MEP_SecondFlag.NoSelectTextBox>
                <motion.div>
                <Typing
                    text={errMessage}
                    letterSpacing={0.1}
                    cursorThickness={0}
                    typeSpeed={3}
                />
                </motion.div>
            </MEP_SecondFlag.NoSelectTextBox>
        </MEP_SecondFlag.Question_NoSelectDeck>
        }
        </MEP_SecondFlag.MaskBox>
        }
        </AnimatePresence>
    </MEP_SecondFlag.InContainer>
  )
}

export default React.memo(MakeExtraTarot)