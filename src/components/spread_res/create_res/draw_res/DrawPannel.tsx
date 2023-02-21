/* eslint-disable */
import React, {useState, useEffect, useLayoutEffect} from 'react'
import { 
    IDrawPannelProps,
    EWhatDrawMode, 
    DrawCommonInfo 
} from './DrawPannel.interfaces'
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DrawCommon 
} from './DrawPannel.styled'

import { Typing } from 'components/common_res/typing_res/Typing';
import * as Loader from 'react-spinners';
import { 
    useRecoilState, 
    useResetRecoilState 
} from 'recoil';

import { ITotalManagerAtom, totalManagerAtom } from 'recoil/TotalAtom';
import { createControlManager, ICreateControlManager } from 'recoil/CreateAtom';
import { IDragCardInfo, ISingleControlManagerAtom, ISingleProject, singleControlManagerAtom } from 'recoil/SingleAtom';
import { useNavigate } from 'react-router-dom';
import { ExtraTarotDeckInfoArr } from 'components/spread_res/single_spread_res/MakeExtraPannel/MakeExtraPannel.styled';

const optionalBtnVar = {
        initial : {
            opacity: 0,
            backgroundColor: 'rgba(20, 20, 20, 0.7)',
            //width: '50%'
        },
        active : {
            opacity: 1,
            borderRadius: '5px',
            backgroundColor: 'rgba(20, 20, 20, 0.7)',
            color :'rgba(240, 147, 43,1.0)',
            border: '2px solid rgba(24, 220, 255, 0.3)',

        },
        inactive :{
            opacity: 1,
            backgroundColor: 'rgba(20, 20, 20, 0.2)',
            border: '2px solid rgba(24, 220, 255, 0.3)',
            color: 'rgba(72, 84, 96,1.0)',
        },
        hover:{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '5px',
            color: ['rgba(240, 147, 43,1.0)', 'rgba(83, 92, 104,1.0)', 'rgba(240, 147, 43,1.0)'],
            border: '2px solid rgba(24, 220, 255, 0.7)',
            transition: {
                color:{
                    repeat: Infinity,
                    duration: 1
                }
            }
        }
    }

const cardVar = {
    initial: {
        boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
    },
    active : {
        backgroundColor: 'rgba(67, 23, 123, 1)',
        boxShadow: '0 0 10px 5px rgba(240, 147, 43,1.0)'
    },
    inactive : {
        backgroundColor : 'rgba(20, 20, 20, 1)',
        //boxShadow: '0 0 0 0 rgb(0, 0, 0 , 0)',
    },
    hover:{
        boxShadow: '0 0 10px 5px rgba(240, 147, 43,1.0)',
    },
    selectOver: {
        opacity: 0.7,
    }
}
function DrawPannel(props : IDrawPannelProps) {

    const {
        whatDrawMode,
        oracleType,
        extraCardCount,
        extraTarotDeck,
        setExtraTarotDeck,
        setExtraCardCount,
        setIsOpenExtraMake,
        setSelectOracleType,
        setIsFirstOver,
        setIsSecondOver,
        setLenorOrPokerCountValue
    } = props;
    const {
        Data,
        RandomArrGenerator
    } = DrawCommonInfo;
    
    const navigate = useNavigate();
    const [totalManager, setTotalManager] = useRecoilState(totalManagerAtom);
    const [createManager, setCreateManager] = useRecoilState(createControlManager);
    const [singleManager, setSingleManager] = useRecoilState(singleControlManagerAtom);
    const resetCreateManager = useResetRecoilState(createControlManager);
    
    
    const [defaultImg, setDefaultImg] = useState<string>('');
    
    // 단순카드순서배열
    const [numberArr, setNumberArr] = useState<number[]>([]);
    // 랜덤숫자배열
    const [ranNumArr, setRanNumArr] = useState<number[]>([]);
    const [clickArr, setClickArr] = useState<boolean[]>([]);
    
    const [selectCount, setSelectCount] = useState<number>(0);
    const [selectedNumArr, setSelectedNumArr] = useState<Array<number | null>>([]);

    // count Change
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // initial loading
    const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);

    // modify
    const [modifyOpen, setModifyOpen] = useState<boolean>(false);
    const [modifyValue, setModifyValue] = useState<string>('');
    const [modifyErr, setModifyErr] = useState<string>('');
    const [noticeModifyRange, setNoticeModifyRange] = useState<string>('');

    const [selectableLimitCount, setSelectableLimitCount] = useState<number>(0);

    const btnNameArr = ["Auto", "Shuffle", "Modify", "Reset", "Next"];


    
    useLayoutEffect(()=>{
        let img = new Image();
        let path = '/images/BackOfCards/BackOfCard0.png';
        img.src = path;
        setDefaultImg(path);
    }, []);

    useEffect(()=>{
        let time = setTimeout(()=>{setIsFirstLoading(false)}, 1000);
        return () => {clearTimeout(time)}
    }, []);
    useEffect(()=>{
        if(whatDrawMode === EWhatDrawMode.SINGLE){
            //if(oracleType !== null){
            let _max = Data.OracleMaxLimitArr[oracleType];
            let _noticeRange = `
                Allowable range : 1 - ${_max}
            `
            let _ranNumArr = RandomArrGenerator(_max);
            let _numberArr = new Array(_max)
                .fill(0).map((a, i) => a += i);
            //console.log(_ranNumArr);
            //console.log(_numberArr);


            setRanNumArr(_ranNumArr);
            setNumberArr(_numberArr);
            setNoticeModifyRange(_noticeRange);

            setClickArr(new Array(_max).fill(false));
            setSelectedNumArr(new Array(_max).fill(null));
            setSelectableLimitCount(createManager.cardCount);
            
            //}
        }
        else if(whatDrawMode === EWhatDrawMode.SINGLE_EXTRA){
            let _max;
            if(oracleType === 0){
                _max = extraTarotDeck.length;
            }
            else{
                _max = Data.OracleMaxLimitArr[oracleType];
            }
            let _noticeRange = `
                Allowable range : 1 - ${_max}
            `
            //let _ranNumArr = RandomArrGenerator(_max);
            let _numberArr = new Array(_max)
                .fill(0).map((a, i) => a += i);
            //console.log(_ranNumArr);
            //console.log(_numberArr);

            if(oracleType === 0){
                setRanNumArr(extraTarotDeck);
            }
            else{
                let _tempRanArr = RandomArrGenerator(_max);
                setRanNumArr(_tempRanArr);
            }
            setNumberArr(_numberArr);
            setNoticeModifyRange(_noticeRange);
            
            setClickArr(new Array(_max).fill(false));
            setSelectedNumArr(new Array(_max).fill(null));
            setSelectableLimitCount(extraCardCount);
            
        }
    }, [whatDrawMode])
  
    const modifyBtnVar = {
        active : {
          opacity: 1,
          borderRadius: '5px',
          backgroundColor: 'rgba(20, 20, 20, 0.2)',
          color: 'rgba(255, 255, 255, 1)',
          border: '2px solid rgba(24, 220, 255, 0.3)',
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
          color: ['rgba(83, 92, 104,1.0)', 'rgba(240, 147, 43,1.0)' , 'rgba(83, 92, 104,1.0)'],
          border: '2px solid rgba(24, 220, 255, 0.7)',
          
          transition: {
              color:{
                  repeat: Infinity,
                  duration: 1
              }
          }
      },
    }
    
    const FadeInVar = {
        initial :{
            //opacity: 1,
            backgroundColor: "rgba(20, 20, 20, 0)",
        },
        start: {
            //opacity: 0,
            backgroundColor: "rgba(20, 20, 20, 0.8)",
            transition: {
                duration: 1
            }
        },
        end: {
            backgroundColor: "rgba(20, 20, 20, 0)"
        }
    }
    const sortVariants = (type : number) : object => {
        let tempObj : object = {};
        switch(type){
            case 0:
                if(selectCount !== 0){
                    tempObj = optionalBtnVar.inactive
                }
                else{
                    tempObj = optionalBtnVar.active
                }
            break;
            case 1:
                if(selectCount !== 0){
                    tempObj = optionalBtnVar.inactive
                }
                else{
                    tempObj = optionalBtnVar.active
                }
            break;
            case 2:
                if(selectCount !== 0){
                    tempObj = optionalBtnVar.inactive
                }
                else{
                    tempObj = optionalBtnVar.active
                }
            break;
            case 3:
                if(selectCount === 0){
                    tempObj = optionalBtnVar.inactive
                }
                else{
                    tempObj = optionalBtnVar.active
                }
            break;
            case 4:
                if(whatDrawMode === EWhatDrawMode.SINGLE){
                    if(selectCount === createManager.cardCount){
                        tempObj = optionalBtnVar.active
                    }
                    else{
                        tempObj = optionalBtnVar.inactive
                    }
                }
                else if(whatDrawMode === EWhatDrawMode.SINGLE_EXTRA){
                    if(selectCount === extraCardCount){
                        tempObj = optionalBtnVar.active
                    }
                    else{
                        tempObj = optionalBtnVar.inactive
                    }
                }
            break;
            default: 

            break;
        }

        return tempObj;
    }
    const hoverSortVariants = (type : number) : object => {
        let tempObj : object = {}
        if(type === 0 || type === 1 || type === 2){
            if(selectCount === 0){
                tempObj = optionalBtnVar.hover
            }
        }
        else if(type === 3){
            if(selectCount > 0){
                tempObj = optionalBtnVar.hover
            }
        }
        else if(type === 4){
            if(selectCount === createManager.cardCount){
                tempObj = optionalBtnVar.hover
            }
        }

        return tempObj;
    }
    // Common Function
    const onClickCardHandler = (e : React.MouseEvent<HTMLDivElement>, num : number) => {
        e.preventDefault();
        if(whatDrawMode === EWhatDrawMode.SINGLE){
            singleNormalClickHandler(num);
        }
        else if(whatDrawMode === EWhatDrawMode.SINGLE_EXTRA){
            extra_singleNormalClickHandler(num);
        }
        
    }

    const onPrevClickHandler =(e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if(whatDrawMode === EWhatDrawMode.SINGLE){
            singleNormalPrevHandler();
        }
        else if(whatDrawMode === EWhatDrawMode.SINGLE_EXTRA){
            extra_singleNormalPrevHandler();
        }

    }
    const onChnageModifyValue = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let _value = e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1");
        setModifyValue(_value);
    }
    

    // Single Normal
    const validModifyCount = (): undefined | boolean => {
        let _value = Number(modifyValue);
        let _flag = false;
        if(oracleType === null) return;
        let _max = Data.OracleMaxLimitArr[oracleType];
        if(_value <= 0 || _value > _max){
            return _flag;
        }
        else{
            _flag = true;
            return _flag;
        }

    }
    const singleNormalAuto = () => {
        let _max = createManager.cardCount;
        let _clickArr = [...clickArr];
        let _selectedArr = [...selectedNumArr];
        for(let i = 0; i < _max; i++){
            _clickArr[i] = true;
            _selectedArr[i] = i;
        }
        setClickArr(_clickArr);
        setSelectedNumArr(_selectedArr);
        setSelectCount(_max);
    }
    const singleNormalShuffle = () => {
        let _max = Data.OracleMaxLimitArr[oracleType];
        let _ranNumArr = RandomArrGenerator(_max);
        setIsLoading(true);
        setTimeout(()=>{
            setRanNumArr(_ranNumArr);
            setIsLoading(false);
        }, 3000)
    }
    const singleNormalModifyCount = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        let flag = validModifyCount();
        if(oracleType === null) return;
        if(!flag){
            //Its acceptable range is this.
            let _message = `Acceptable range of ${Data.DeckNameArr[oracleType]} is ${Data.OracleCountLimitArr[oracleType]}`
            setModifyErr(_message);

        }
        else{
            let _temp : ICreateControlManager = JSON.parse(JSON.stringify(createManager));
            _temp.cardCount = Number(modifyValue);
            if(oracleType === 0 && _temp.NS_T_UseAutoDeck !== 0){
                _temp.NS_T_UseAutoDeck = 0;
            }
            setIsLoading(true);
            setSelectableLimitCount(_temp.cardCount);
            setTimeout(()=>{
                setIsLoading(false);
                setModifyOpen(false);
                setModifyErr('');
                setCreateManager(_temp);
            }, 3000)
        }
    }
    const singleNormalNext = () => {
        if(createManager.cardCount === null) return;
        else if(createManager.cardCount !== null){
            if(createManager.cardCount !== selectCount) return;
            let _numArr = new Array(createManager.cardCount);
            let _total : ITotalManagerAtom = JSON.parse(JSON.stringify(totalManager));
            let _createManager : ICreateControlManager = JSON.parse(JSON.stringify(createManager));
            let _singleManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
            let tempObj : IDragCardInfo = {
                oracleType: 0,
                imgNumber: 0,
                zIdx: 0,
                isInSpread: false,
                isDraged: false,
                isFlip: false,
                isRotate: false,
                newX: 0,
                newY: 0
            }
            let tempObjArr : IDragCardInfo[] = [];
            let tempProject : ISingleProject = {
                projectId: 0,
                projectName: ``,
                projectType: false,
                oracleType : null,
                totalCardCount: 0,
                initialCardCount : 0,
                rem_CardCount: 0,
                NS_T_PreviewCard : null, // if normal, tarot, preview three cards
                NS_T_UseAutoDeck : 0,
                NS_T_PreviewCardNumArr : null,
                cardInfoArr: []
            }
            
            for(let i = 0; i < _numArr.length; i++){
                let _tempNum = selectedNumArr[i];
                if(_tempNum !== null){
                    _numArr[i] = ranNumArr[_tempNum];
                }
            }
            tempProject.projectId = _singleManager.singleProjectArr.length;
            tempProject.projectName = _createManager.projectName;
            tempProject.projectType = _createManager.projectType;
            tempProject.oracleType = _createManager.oracleType;
            if(_createManager.oracleType === 0){
                tempProject.NS_T_PreviewCard = _createManager.NS_T_PreviewCard;
                tempProject.NS_T_UseAutoDeck = _createManager.NS_T_UseAutoDeck;
                let _previewNumArr = new Array<number>(3);
                for(let i = 0; i < 3; i++){
                    let _previewNum = Math.floor((Math.random() * 78));
                    _previewNumArr[i] = _previewNum;
                    for(let j = 0; j < i; j++){
                        if(_previewNumArr[j] === _previewNumArr[i]){
                            i--;
                            break;
                        }
                    }
                }
                tempProject.NS_T_PreviewCardNumArr = _previewNumArr;
            }
            tempProject.totalCardCount = _createManager.cardCount;
            tempProject.initialCardCount = _createManager.cardCount;
        if(
            _createManager.oracleType === 0 
            && _createManager.NS_T_UseAutoDeck !== 0
        ){
            tempProject.rem_CardCount = 0;
        } else {
            tempProject.rem_CardCount = _createManager.cardCount;
        }
        
        if(!_singleManager.isExistProject) {
            _singleManager.isExistProject = true;
            _singleManager.cur_ProjectNumber = 0;
        }
        else{
            _singleManager.cur_ProjectNumber = _singleManager.singleProjectArr.length;
        }

        for(let i = 0; i < _createManager.cardCount; i++){
            let _tempObj = {...tempObj};
            _tempObj.oracleType = _createManager.oracleType;
            _tempObj.zIdx = _createManager.cardCount - i;
            _tempObj.imgNumber = _numArr[i];
            if(_createManager.NS_T_UseAutoDeck !== 0
            && _createManager.oracleType === 0    
            ){
                _tempObj.isInSpread = true;
                _tempObj.zIdx = 0;
                if(_createManager.NS_T_UseAutoDeck === 3
                    && i === 1
                ){
                    _tempObj.isRotate = true;
                }
            }
            tempObjArr[i] = _tempObj;
        }
            tempProject.cardInfoArr = tempObjArr;

            _singleManager.singleProjectArr.push(tempProject);
            _total.projectCount++;
            _total.singleNormalCount++;
            setSingleManager(_singleManager);
            resetCreateManager();
            setTotalManager(_total);
            navigate('/spread/single');
        }
    }
    const singleNormalClickHandler = (num : number) => {
        if(isFirstLoading === true) return;
        let _clickFlag = clickArr[num];
        let _count = selectCount;
        let _tempArr = [...clickArr];
        let _selectedArr = [...selectedNumArr];
        if(_clickFlag === false){
            if(selectCount === createManager.cardCount) return;
            _count++;
            _tempArr[num] = !_clickFlag;
            for(let i = 0; i < _selectedArr.length; i++){
                if(_selectedArr[i] === null){
                    _selectedArr[i] = num;
                    break;
                }
            }
            setClickArr(_tempArr);
            setSelectCount(_count);
            setSelectedNumArr(_selectedArr);

        } else if(_clickFlag === true){
            _count--;
            _tempArr[num] = !_clickFlag;
            for(let i = 0; i < _selectedArr.length; i++){
                if(_selectedArr[i] === num){
                    _selectedArr[i] = null;
                    break;
                }
            }
            setClickArr(_tempArr);
            setSelectCount(_count);
            setSelectedNumArr(_selectedArr);
        } 
    }
    const singleNormalPrevHandler = () => {
        let _temp : ICreateControlManager = JSON.parse(JSON.stringify(createManager));
        _temp.projectName = ``;
        _temp.cardCount = null;
        if(_temp.oracleType === 0){
            _temp.NS_T_PreviewCard = null;
            _temp.NS_T_UseAutoDeck = 0;
        }
        _temp.oracleType = null;
        _temp.creatingStep = 1;
        setCreateManager(_temp);
    }

    // Single Extra
    const extra_validModifyCount = (): undefined | boolean => {
        let _value = Number(modifyValue);
        let _flag = false;
        let _max;
        if(oracleType === null) return;
        // extraCardCount
        if(oracleType === 0){
            _max = extraTarotDeck.length;
        }
        else{
            _max = Data.OracleMaxLimitArr[oracleType];
        }
        if(_value <= 0 || _value > _max){
            return _flag;
        }
        else{
            _flag = true;
            return _flag;
        }
    }
    const extra_singleNormalAuto = () => {
        let _max = extraCardCount;
        let _clickArr = [...clickArr];
        let _selectedArr = [...selectedNumArr];
        for(let i = 0; i < _max; i++){
            _clickArr[i] = true;
            _selectedArr[i] = i;
        }
        setClickArr(_clickArr);
        setSelectedNumArr(_selectedArr);
        setSelectCount(_max);

    }
    const extra_singleNormalShuffle = () => {
        if(oracleType === 0){
            let _max = extraTarotDeck.length;
            let _ranIdxArr = RandomArrGenerator(_max);
            let _shuffledArr = new Array(_max);
            for(let i = 0; i < extraTarotDeck.length; i++){
                let _ranIdx = _ranIdxArr[i];
                _shuffledArr[i] = extraTarotDeck[_ranIdx];
            }
            setIsLoading(true);
            setTimeout(()=>{
                setRanNumArr(_shuffledArr);
                setExtraTarotDeck(_shuffledArr);
                setIsLoading(false);
            }, 3000)
        }
        else{
            let _max = DrawCommonInfo.Data.OracleMaxLimitArr[oracleType];
            let _ranIdxArr = RandomArrGenerator(_max);
            setIsLoading(true);
            setTimeout(()=>{
                setRanNumArr(_ranIdxArr);
                setIsLoading(false);
            }, 3000)
        }
    }

    const extra_singleNormalModifyCount = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        let flag = extra_validModifyCount();
        let _max;
        let _message;
        if(oracleType === null) return;
        if(!flag){
            //Its acceptable range is this.
            if(oracleType === 0){
                _max = extraTarotDeck.length;
                _message = `Acceptable range of This Deck is ${_max}`

            }
            else{
                _max = Data.OracleCountLimitArr[oracleType];
                _message = `Acceptable range of ${Data.DeckNameArr[oracleType]} is ${_max}`
            }
            setModifyErr(_message);
        }
        else{
            
            let _tempValue = Number(modifyValue);
            setIsLoading(true);
            setTimeout(()=>{
                setExtraCardCount(_tempValue);
                setSelectableLimitCount(_tempValue);
                setIsLoading(false);
                setModifyOpen(false);
                setModifyErr('');
            }, 3000)
        }

    }
    const extra_singleNormalNext = () => {
        if(extraCardCount !== null){
            if(extraCardCount !== selectCount) return;
            let _numArr = new Array(extraCardCount);
            let _total : ITotalManagerAtom = JSON.parse(JSON.stringify(totalManager));
            let _createManager : ICreateControlManager = JSON.parse(JSON.stringify(createManager));
            let _singleManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
            let {cur_ProjectNumber, singleProjectArr} = _singleManager;
            let tempObj : IDragCardInfo = {
                oracleType: 0,
                imgNumber: 0,
                zIdx: 0,
                isInSpread: false,
                isDraged: false,
                isFlip: false,
                isRotate: false,
                newX: 0,
                newY: 0
            }
            // _numArr에 이미지 번호 담기
            // 프로젝트 새로 생성 필요없음, 기존에 있는것에 넣을 것이라서.
            for(let i = 0; i < _numArr.length; i++){
                let _tempNum = selectedNumArr[i];
                if(_tempNum !== null){
                    _numArr[i] = ranNumArr[_tempNum];
                }
            }
            
            singleProjectArr[cur_ProjectNumber].totalCardCount += extraCardCount;
            singleProjectArr[cur_ProjectNumber].rem_CardCount = extraCardCount;
            
            for(let i = 0; i < extraCardCount; i++){
                let _tempObj = {...tempObj};
                _tempObj.oracleType = oracleType;
                _tempObj.imgNumber = _numArr[i];
                _tempObj.zIdx = extraCardCount - i;
                singleProjectArr[cur_ProjectNumber].cardInfoArr.push(_tempObj);
            }

            setSingleManager(_singleManager);
            setIsOpenExtraMake(false);
        }
    }
    const extra_singleNormalClickHandler = (num : number) => {
        if(isFirstLoading === true) return;
        let _clickFlag = clickArr[num];
        let _count = selectCount;
        let _tempArr = [...clickArr];
        let _selectedArr = [...selectedNumArr];
        if(_clickFlag === false){
            if(selectCount === extraCardCount) return;
            _count++;
            _tempArr[num] = !_clickFlag;
            for(let i = 0; i < _selectedArr.length; i++){
                if(_selectedArr[i] === null){
                    _selectedArr[i] = num;
                    break;
                }
            }
            setClickArr(_tempArr);
            setSelectCount(_count);
            setSelectedNumArr(_selectedArr);

        } else if(_clickFlag === true){
            _count--;
            _tempArr[num] = !_clickFlag;
            for(let i = 0; i < _selectedArr.length; i++){
                if(_selectedArr[i] === num){
                    _selectedArr[i] = null;
                    break;
                }
            }
            setClickArr(_tempArr);
            setSelectCount(_count);
            setSelectedNumArr(_selectedArr);
        }
    }
    const extra_singleNormalPrevHandler = () => {
        if(oracleType === 0){
            setIsSecondOver(false);
        }
        else{
            setLenorOrPokerCountValue('');
            setExtraCardCount(0);
            setSelectOracleType(null);
            setIsFirstOver(false);
            setIsSecondOver(false);
        }
    }

    
    const onAutoClickHandler = () => {
        if(whatDrawMode === EWhatDrawMode.SINGLE){
            singleNormalAuto();
        }
        else if(whatDrawMode === EWhatDrawMode.SINGLE_EXTRA){
            extra_singleNormalAuto();
        }
    }
    const onShuffleClickHandler = () => {
        if(whatDrawMode === EWhatDrawMode.SINGLE){
            singleNormalShuffle();
        }
        else if(whatDrawMode === EWhatDrawMode.SINGLE_EXTRA){
            extra_singleNormalShuffle();
        }

    }
    const onChangeCount = (e : React.MouseEvent<HTMLDivElement>) => {
        if(whatDrawMode === EWhatDrawMode.SINGLE){
            singleNormalModifyCount(e)
        }
        else if(whatDrawMode === EWhatDrawMode.SINGLE_EXTRA){
            extra_singleNormalModifyCount(e)
        }

    }
    const onNextClickHandler = () => {
        if(whatDrawMode === EWhatDrawMode.SINGLE){
            singleNormalNext();
        }
        else if(whatDrawMode === EWhatDrawMode.SINGLE_EXTRA){
            extra_singleNormalNext();
        }

    }

    const onClickOptionalBtn = (e : React.MouseEvent<HTMLDivElement>, type : number) => {
        e.preventDefault();
        if(type === 0){
            if(selectCount !== 0) return;
            onAutoClickHandler();
        }
        else if(type === 1){
            if(selectCount !== 0) return;
            onShuffleClickHandler();
        }
        else if(type === 2){
            if(selectCount !== 0) return;
            setModifyOpen(true);
        }
        else if(type === 3){
            if(selectCount === 0) return;
            let _tempArr = [...clickArr];
            _tempArr.fill(false);
            let _selectedArr = [...selectedNumArr];
            _selectedArr.fill(null);
            setClickArr(_tempArr);
            setSelectCount(0);
            setSelectedNumArr(_selectedArr);
        }
        else if(type === 4){
            onNextClickHandler();
        }
    }


    return(
      <DrawCommon.Container>
        <DrawCommon.InContainer>
          <DrawCommon.DesStepBox>
            <Typing
                text={'Choose the cards you want.'}
                letterSpacing={0.1}
                cursorThickness={0}
                typeSpeed={3}
            />
          </DrawCommon.DesStepBox>
          <DrawCommon.DrawContainer>
                <DrawCommon.DrawZone>
                    {numberArr.map((a,i) => {
                        return(
                            <AnimatePresence
                                key={`testCard${i}`}
                            >
                                <DrawCommon.TestCard 
                                    //imgsrc={`${process.env.PUBLIC_URL}/images/BackOfCards/BackOfCard0.png`}
                                    imgsrc={`${process.env.PUBLIC_URL}${defaultImg}`}
                                    variants={cardVar}
                                    initial={false}
                                    animate={
                                        clickArr[i] === true
                                        ? cardVar.active
                                        : selectCount === selectableLimitCount
                                            ? cardVar.selectOver
                                            : cardVar.inactive
                                    }
                                    whileHover={
                                        clickArr[i] === false
                                        ? selectCount === selectableLimitCount
                                            ? {}
                                            : cardVar.hover
                                        : cardVar.hover
                                    }
                                    onClick={(e)=>{
                                        onClickCardHandler(e, i);
                                    }}
                            >
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity:0}}
                                >
                                    <motion.div>
                                        {a+1}
                                    </motion.div>
                                    <motion.div
                                        initial={{
                                            opacity: 0
                                        }}
                                        animate={
                                            clickArr[i] === true
                                            ? selectedNumArr.includes(i)
                                                ? {opacity: 1}
                                                : {opacity: 0}
                                            : {opacity: 0}
                                        }
                                    >
                                        {
                                            clickArr[i] === true
                                            ? selectedNumArr.includes(i)
                                                ? (selectedNumArr.indexOf(i) + 1)
                                                : ""
                                            : ""
                                        }
                                    </motion.div>
                                </motion.div>
                                </DrawCommon.TestCard>

                            </AnimatePresence>
                        );
                    })}
                    <AnimatePresence>
                        {
                            isFirstLoading &&
                            <DrawCommon.LoadingBox
                                initial={{
                                    opacity: 0.7
                                }}
                                animate={{
                                    opacity: 1
                                }}
                                exit={{
                                    opacity: 0
                                }}
                            >
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems : 'center',
                                    position: "absolute", 
                                    top: "51%", 
                                    left: "51%", 
                                    transform: "translate(-50%, -50%)" 
                                }}>
                                    <Loader.FadeLoader
                                        width={5}
                                        height={15}
                                        margin={2}
                                        color={'rgba(240, 147, 43, 1.0)'}
                                    />
                                </div>
                            </DrawCommon.LoadingBox>
                        }
                    </AnimatePresence>
                </DrawCommon.DrawZone>
                <DrawCommon.DrawControlBox>
                    <DrawCommon.CountNoticeBox>
                        <DrawCommon.CountDesTextBox>
                            <DrawCommon.CountText>Limit Count</DrawCommon.CountText>
                            <DrawCommon.CountNumber>{selectableLimitCount}</DrawCommon.CountNumber>
                        </DrawCommon.CountDesTextBox>
                        <DrawCommon.CountDesTextBox>
                            <DrawCommon.CountText>Current Count</DrawCommon.CountText>
                            <DrawCommon.CountNumber>{selectCount}</DrawCommon.CountNumber>
                        </DrawCommon.CountDesTextBox>
                    </DrawCommon.CountNoticeBox>
                    <DrawCommon.DrawOptionBox>
                        {
                            btnNameArr.map((a,i) => {
                                return(
                                    <DrawCommon.OptionBtn
                                        key={`drawOptionBtn${i}${a}`}
                                        variants={optionalBtnVar}
                                        initial={false}
                                        animate={sortVariants(i)}
                                        whileHover={hoverSortVariants(i)}                                        
                                        onClick={(e) => onClickOptionalBtn(e, i)}
                                    >
                                        {a}
                                    </DrawCommon.OptionBtn>
                                );
                            })
                        }
                    </DrawCommon.DrawOptionBox>
                </DrawCommon.DrawControlBox>
                <AnimatePresence>
                {
                    modifyOpen &&
                        <DrawCommon.ModifyBox
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                        >
                            <DrawCommon.ModifyPannel>
                                <DrawCommon.ModifyDesBox>
                                    <Typing
                                        text={'Change it to the count you want.'}
                                        letterSpacing={0.1}
                                        cursorThickness={0}
                                        typeSpeed={3}
                                    />
                                </DrawCommon.ModifyDesBox>
                                <DrawCommon.ModifyControlBox>
                                    <DrawCommon.ModifyContent>
                                        <DrawCommon.ModifyInputBox>
                                            <motion.div>
                                                <Typing
                                                    text={noticeModifyRange}
                                                    letterSpacing={0.1}
                                                    cursorThickness={0}
                                                    typeSpeed={3}
                                                />
                                            </motion.div>
                                            <motion.input
                                                value={modifyValue}
                                                onChange={onChnageModifyValue}
                                                maxLength={2}
                                                placeholder={`Enter the desired number.`}
                                            />
                                        </DrawCommon.ModifyInputBox>
                                        <DrawCommon.ModifyBtnBox>
                                            <motion.div
                                                onClick={(e)=>{
                                                    onChangeCount(e)
                                                }}
                                                variants={modifyBtnVar}
                                                animate={modifyBtnVar.active}
                                                whileHover={modifyBtnVar.hover}
                                            >
                                                Change
                                            </motion.div>
                                            <motion.div
                                                variants={modifyBtnVar}
                                                animate={modifyBtnVar.active}
                                                whileHover={modifyBtnVar.hover}
                                                onClick={() => {
                                                    setModifyOpen(false)
                                                    setModifyErr('');
                                                }}
                                            >
                                                Back
                                            </motion.div>
                                        </DrawCommon.ModifyBtnBox>
                                    </DrawCommon.ModifyContent>
                                    <DrawCommon.ModifyError>
                                        <Typing
                                            text={modifyErr}
                                            letterSpacing={0.1}
                                            cursorThickness={0}
                                            typeSpeed={3}
                                        />
                                    </DrawCommon.ModifyError>
                                </DrawCommon.ModifyControlBox>
                            </DrawCommon.ModifyPannel>
                        </DrawCommon.ModifyBox>
                }
                </AnimatePresence>
            </DrawCommon.DrawContainer>
            <AnimatePresence>
            <DrawCommon.PrevBtn
                onClick={onPrevClickHandler}
                variants={optionalBtnVar}
                initial={optionalBtnVar.initial}
                animate={optionalBtnVar.active}
                whileHover={optionalBtnVar.hover}
            >
                Prev
            </DrawCommon.PrevBtn>
            </AnimatePresence>
            <AnimatePresence>
            {isLoading &&
            <DrawCommon.FadeInContainer
                variants={FadeInVar}
                initial={FadeInVar.initial}
                animate={FadeInVar.start}
                exit={FadeInVar.end}
            >
                <div style={{
                    position: "fixed", 
                    top: "50%", 
                    left: "50%", 
                    transform: "translate(-50%, -50%)" 
                }}>
                    <Loader.FadeLoader
                        width={5}
                        height={15}
                        margin={2}
                        color={'rgba(240, 147, 43, 1.0)'}
                    />
                </div>
            </DrawCommon.FadeInContainer>
            } 
            </AnimatePresence>
        </DrawCommon.InContainer>
      </DrawCommon.Container>
    );
}


export default DrawPannel