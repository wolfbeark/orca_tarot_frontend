/* eslint-disable */
import React, { useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components';
import { HorCenterDiv, VerCenterDiv } from 'common_resources/CommonStyle';
import { Typing } from 'components/common_res/typing_res/Typing';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { createControlManager, ICreateControlManager } from 'recoil/CreateAtom';
import { motion, AnimatePresence} from 'framer-motion';
import { IImgBox, IPositionInfo } from 'common_resources/CommonInterfaces';
import FadeIn from 'components/common_res/FadeIn';
import * as Loader from 'react-spinners';
import { DeckNameArr, OracleCountLimitArr, OracleMaxLimitArr } from 'common_resources/CommonData';
import { useNavigate } from 'react-router-dom';
import {singleControlManagerAtom, IDragCardInfo, ISingleProject, ISingleControlManagerAtom} from 'recoil/SingleAtom';
import { ITotalManagerAtom, totalManagerAtom } from 'recoil/TotalAtom';


const SingleDrawContainer = styled(VerCenterDiv)`
  width: 70%;
  height: 90%;
  background-color: ${(props) => props.theme.boxColors.opaqueBlack};
  border-radius: ${(props) => props.theme.borders.small};
  padding: 0.5%;
  position: absolute;
  top: 5%;
  //background-color: red;
  user-select: none;
`
const InContainer = styled(VerCenterDiv)`
    width: 100%;
    height: 100%;
    background-color: inherit;
    border-radius : inherit;
    justify-content: flex-start;
    position: relative;
`
const DesStepBox = styled(HorCenterDiv)`
    width: 100%;
    height: 12%;
    padding-left: 5%;
    justify-content: flex-start;
    font-size: 200%;
    color: ${(props) => props.theme.textColors.swanWhite};
    user-select : none;
`
const DrawContainer = styled(HorCenterDiv)`
    width: 100%;
    height: 80%;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.5%;
    position: relative;
`
const DrawZone = styled(HorCenterDiv)`
    width: 80%;
    height: 100%;
    background-color: skyblue;
    background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
    border-radius: ${(props) => props.theme.borders.small};
    padding: 1.5%;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(9%, 1fr));
    grid-template-rows: repeat(auto-fit, minMax(30%, 1fr));
    grid-auto-columns: 9%;
    grid-auto-rows: 30%;
    grid-gap: 3%;
    scroll-behavior: auto;
    overflow: overlay;
    overflow-x: hidden;
    position: relative;
    ::-webkit-scrollbar {
        width: 1vw;
    }
    ::-webkit-scrollbar-thumb {
        background-color: hsla(0, 0%, 42%, 0.49);
        border-radius: 100px;
    }
`
const DrawControlBox = styled(VerCenterDiv)`
    width: 19%;
    height: 100%;
    //background-color: pink;
    justify-content: space-between;
    padding: 0.5%;
    border-radius: ${(props) => props.theme.borders.small};
    background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
`
const TestCard = styled(VerCenterDiv)<IImgBox>`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    
    color: white;
    cursor: pointer;
    border-radius: ${(props) => props.theme.borders.small};
    padding: 5%;
    & > div{
        width: 100%;
        height: 100%;
        background: url(${(props) => props.imgsrc});
        background-size: 100% 100%;
        image-rendering: -webkit-optimize-contrast;
        display: inherit;
        justify-content: space-evenly;
        align-items: inherit;
        flex-direction: column;
        border-radius: inherit;
        will-change: background;
        div{
            width: 50%;
            height: 30%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: inherit;
            :first-child{
                color: rgba(0, 73, 140);
            }
            :last-child{
                color: red;
                //background-color: teal;
            }
        }
    }
    
`
const CountNoticeBox = styled(VerCenterDiv)`
    width: 100%;
    height: 30%;
    background-color: inherit;
    border-radius: inherit;
    justify-content: space-evenly;
    padding: 1%;
`
const CountDesTextBox = styled(HorCenterDiv)`
    width: 100%;
    height: 48%;
    background-color: inherit;
    border-radius: inherit;
    justify-content: space-between;
    padding: 1%;
    font-family: ${(props) => props.theme.korFont};
    color: white;
`
const CountText = styled(HorCenterDiv)`
    width: 70%;
    height: 100%;
    background-color: transparent;
    font-family: inherit;
    justify-content: flex-start;
    padding-left: 5%;
    font-weight: 600;
`
const CountNumber = styled(HorCenterDiv)`
    width: 30%;
    height: 100%;
    background-color: inherit;
    border-radius: inherit;

    font-family: inherit;
    font-weight: 600;
    font-size: 120%;

`
const DrawOptionBox = styled(VerCenterDiv)`
    width: 100%;
    height: 69%;
    background-color: inherit;
    border-radius: inherit;
    justify-content: space-evenly;
    //align-items: flex-end;
    padding: 0 2% 0 2%;
`
const OptionBtn = styled(HorCenterDiv)`
    width: 100%;
    height: 17%;
    background-color: navy;
    cursor: pointer;
    color: ${(props) => props.theme.textColors.swanWhite};
    border-radius: ${(props) => props.theme.borders.small};
`

const PrevBtn = styled(HorCenterDiv)`
    width: 8%;
    height: 6%;
    background-color: ${(props) => props.theme.boxColors.soaring};
    border-radius: ${(props) => props.theme.borders.small};
    color: ${(props) => props.theme.textColors.swanWhite};
    position: absolute;
    bottom: 0;
    left: 0;
    //background-color: skyblue;
    cursor: pointer;
`
const FadeInContainer = styled(HorCenterDiv)`
    width: 100%;
    height: 100%;
    //background-color: skyblue;
    opacity: 0.6;
    position: absolute;
    border-radius: inherit;
`
const ModifyBox = styled(HorCenterDiv)`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
    background-color: rgba(20, 20, 20, 0.5);
    border-radius: ${(props) => props.theme.borders.small};
    position: absolute;   
`
const ModifyPannel = styled(VerCenterDiv)`
    width: 50%;
    height: 70%;
    background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
    border-radius: inherit;
    padding: 1%;
    position: relative;
    justify-content: space-evenly;
`
const ModifyDesBox = styled(HorCenterDiv)`
    width: 100%;
    height: 20%;
    //background-color: yellow;
    background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
    border-radius: inherit;
    justify-content: flex-start;
    padding-left: 3%;
    font-size: 150%;
    color: ${(props) => props.theme.textColors.swanWhite};
`


const ModifyControlBox = styled(VerCenterDiv)`
    width: 100%;
    height: 75%;
    //background-color: orange;
    justify-content: space-evenly;
    border-radius: inherit;
    padding: 1%;
`
const ModifyContent = styled(HorCenterDiv)`
    width: 100%;
    height: 80%;
    //background-color: skyblue;
    justify-content: space-between;
    border-radius: inherit;

    margin-bottom: 1%;
`
const ModifyInputBox = styled(VerCenterDiv)`
    width: 70%;
    height: 100%;
    background-color: aquamarine;
    background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
    justify-content: space-evenly;
    border-radius: inherit;
    padding: 1%;
    & div, input{
        width: 100%;
        height: 30%;
        background-color: red;
        padding-left: 3%;
        border-radius: inherit;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    & div{

    }
`
const ModifyError = styled(HorCenterDiv)`
    width: 100%;
    height: 15%;
    //background-color: aliceblue;
    color: ${(props) => props.theme.textColors.swanWhite};
    padding-left: 3%;
    justify-content: flex-start;
`
const ModifyBtnBox = styled(VerCenterDiv)`
    width: 29%;
    height: 100%;
    background-color: teal;
    background-color: ${(props) => props.theme.defaultBaseOpaqueColor};

    border-radius: inherit;
    justify-content: space-evenly;
    padding: 1%;
    & div{
        width: 100%;
        height: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: olivedrab;
        border-radius: inherit;
        cursor: pointer;
    }
`
const LoadingBox = styled(HorCenterDiv)`
    width: 100%;
    height: 100%;
    background-color: black;
    //opacity: 0.5;
    position : absolute;
`

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
const optionalBtnVar = {
    initial : {
        opacity: 1,
        //width: '50%'
    },
    active : {
        opacity: 1,
        borderRadius: '5px',
        backgroundColor: 'rgba(20, 20, 20, 0.7)',
        color :'rgba(240, 147, 43,1.0)'
    },
    inactive :{
        opacity: 1,
        backgroundColor: 'rgba(20, 20, 20, 0.2)',
        border: '0px solid rgba(24, 220, 255, 0)',
        //color :'rgba(240, 147, 43,1.0)'
        color: 'rgba(255, 255, 255, 1)',
    },
    hover:{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '5px',
        color: ['rgba(240, 147, 43,1.0)', 'rgba(83, 92, 104,1.0)', 'rgba(240, 147, 43,1.0)'],
        transition: {
            color:{
                repeat: Infinity,
                duration: 1
            }
        }
    }
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

function SingleDraw() {
    const navigate = useNavigate();
    const [totalManager, setTotalManager] = useRecoilState(totalManagerAtom);
    const [createManager, setCreateManager] = useRecoilState(createControlManager);
    const resetCreateManager = useResetRecoilState(createControlManager);
    const [singleManager, setSingleManager] = useRecoilState(singleControlManagerAtom);
    const { oracleType } = createManager;
    // 78 36 54
    const [numberArr, setNumberArr] = useState<number[]>([]);
    const [clickArr, setClickArr] = useState<boolean[]>([]);
    const [ranNumArr, setRanNumArr] = useState<number[]>([]);

    const [selectCount, setSelectCount] = useState<number>(0);
    const [selectedNumArr, setSelectedNumArr] = useState<Array<number | null>>([]);
    //const testArr = new Array(78);
    const btnNameArr = ["Auto", "Shuffle", "Modify", "Reset", "Next"];
    const [firstLoading, setFirstLoading] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [modifyOpen, setModifyOpen] = useState<boolean>(false);
    const [modifyValue, setModifyValue] = useState<string>('');
    const [modifyErr, setModifyErr] = useState<string>('');
    const [noticeModifyRange, setNoticeModifyRange] = useState<string>('');

    const [defaultImg, setDefaultImg] = useState<string>('');
    const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);
    
    useLayoutEffect(()=>{
        let img = new Image();
        let path = '/images/BackOfCards/BackOfCard0.png';
        img.src = path;
        setDefaultImg(path);
    }, [])
    useEffect(()=>{
        let time = setTimeout(()=>{setIsFirstLoading(false)}, 1000);
        return () => {clearTimeout(time)}
    }, [])
    useEffect(() => {
        if(oracleType !== null) {
            let _max = OracleMaxLimitArr[oracleType];
            let _noticeRange = `
                Allowable range : 1 - ${_max}
            `
            let _ranNumArr = new Array(_max);
            for(let i = 0; i < _ranNumArr.length; i++){
                let _ranNum = Math.floor((Math.random() * _max));
                _ranNumArr[i] = _ranNum;
                for(let j = 0; j < i; j++){
                    if(_ranNumArr[j] === _ranNumArr[i]){
                        i--;
                        break;
                    }
                }
            }
            setRanNumArr(_ranNumArr);
            setNoticeModifyRange(_noticeRange);
        }


        let _flag = createManager.oracleType;
        let _max;
        let _numArr;
        let _booleanArr;
        let _initSelectArr;
        if(_flag === 0){
            _max = 78;
        } else if(_flag === 1){
            _max = 36;
        } else if(_flag === 3){
            _max = 54;
        }
        _numArr = new Array(_max);
        _booleanArr = new Array(_max);
        _initSelectArr = new Array(_max);
        _booleanArr.fill(false);
        _initSelectArr.fill(null);
        for(let i = 0; i < _numArr.length; i++){
            _numArr[i] = i;
        }
        setNumberArr(_numArr);
        setClickArr(_booleanArr);
        setSelectedNumArr(_initSelectArr);
    }, [])
    const onChnageModifyValue = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let _value = e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1");
        setModifyValue(_value);
    }
    const validModifyCount = (): undefined | boolean => {
        let _value = Number(modifyValue);
        let _flag = false;
        if(oracleType === null) return;
        let _max = OracleMaxLimitArr[oracleType];
        if(_value <= 0 || _value > _max){
            return _flag;
        }
        else{
            _flag = true;
            return _flag;
        }

    }
    const onChangeCount = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        let flag = validModifyCount();
        if(oracleType === null) return;
        if(!flag){
            //Its acceptable range is this.
            let _message = `Acceptable range of ${DeckNameArr[oracleType]} is ${OracleCountLimitArr[oracleType]}`
            setModifyErr(_message);

        }
        else{
            let _temp : ICreateControlManager = JSON.parse(JSON.stringify(createManager));
            _temp.cardCount = Number(modifyValue);
            setIsLoading(true);
            setTimeout(()=>{
                setIsLoading(false);
                setModifyOpen(false);
                setCreateManager(_temp);
            }, 3000)
        }
    }
    const onClickCardHandler = (e : React.MouseEvent<HTMLDivElement>, num : number) => {
        e.preventDefault();
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

    const onClickOptionalBtn = (e : React.MouseEvent<HTMLDivElement>, type : number) => {
        e.preventDefault();
        if(isFirstLoading === true) return;
        let _count;
        let _tempArr;
        let _selectedArr;
        switch(type){
            case 0:
                if(selectCount !== 0) return;
                _count = selectCount;
                _tempArr = [...clickArr];
                _selectedArr = [...selectedNumArr];
                if(!createManager.cardCount) return;
                for(let i = 0; i < createManager.cardCount; i++){
                    _tempArr[i] = true;
                    _selectedArr[i] = i;
                }
                _count = createManager.cardCount;
                setClickArr(_tempArr);
                setSelectCount(_count);
                setSelectedNumArr(_selectedArr);
            break;
            case 1:
                if(selectCount !== 0 || oracleType === null) return;
                let _max = OracleMaxLimitArr[oracleType];

                let _ranNumArr = new Array(_max);
                for(let i = 0; i < _ranNumArr.length; i++){
                    let _ranNum = Math.floor((Math.random() * _max));
                    _ranNumArr[i] = _ranNum;
                    for(let j = 0; j < i; j++){
                        if(_ranNumArr[j] === _ranNumArr[i]){
                            i--;
                            break;
                        }
                    }
                }
                setIsLoading(true);
                setTimeout(()=>{
                    setRanNumArr(_ranNumArr);
                    setIsLoading(false);
                }, 3000)
            break;
            case 2:
                if(selectCount !== 0) return;
                setModifyOpen(true);
            break;
            case 3:
                if(selectCount === 0) return;
                _tempArr = [...clickArr];
                _tempArr.fill(false);
                _selectedArr = [...selectedNumArr];
                _selectedArr.fill(null);
                setClickArr(_tempArr);
                setSelectCount(0);
                setSelectedNumArr(_selectedArr);
            break;
            case 4:
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
            break;
            default:

            break;
        }
    }
    const onPrevClickHandler =(e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
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
                if(selectCount === createManager.cardCount){
                    tempObj = optionalBtnVar.active
                }
                else{
                    tempObj = optionalBtnVar.inactive
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
  return (
    <SingleDrawContainer>
        <InContainer>
            <DesStepBox
                //initial={{opacity: 0}}
                //animate={{opacity: 1}}
            >
                <Typing
                    text={'Choose the cards you want.'}
                    letterSpacing={0.1}
                    cursorThickness={0}
                    typeSpeed={3}
                />
            </DesStepBox>
            <DrawContainer>
                <DrawZone>
                    {numberArr.map((a,i) => {
                        return(
                            <AnimatePresence
                                key={`testCard${i}`}
                            >
                                <TestCard 
                                    //imgsrc={`${process.env.PUBLIC_URL}/images/BackOfCards/BackOfCard0.png`}
                                    imgsrc={`${process.env.PUBLIC_URL}${defaultImg}`}
                                    variants={cardVar}
                                    initial={false}
                                    animate={
                                        clickArr[i] === true
                                        ? cardVar.active
                                        : selectCount === createManager.cardCount
                                            ? cardVar.selectOver
                                            : cardVar.inactive
                                    }
                                    whileHover={
                                        clickArr[i] === false
                                        ? selectCount === createManager.cardCount
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
                                </TestCard>

                            </AnimatePresence>
                        );
                    })}
                    <AnimatePresence>
                        {
                            isFirstLoading &&
                            <LoadingBox
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
                            </LoadingBox>
                        }
                    </AnimatePresence>
                </DrawZone>
                <DrawControlBox>
                    <CountNoticeBox>
                        <CountDesTextBox>
                            <CountText>선택가능한 수량</CountText>
                            <CountNumber>{createManager.cardCount}</CountNumber>
                        </CountDesTextBox>
                        <CountDesTextBox>
                            <CountText>현재 선택한 수량</CountText>
                            <CountNumber>{selectCount}</CountNumber>
                        </CountDesTextBox>
                    </CountNoticeBox>
                    <DrawOptionBox>
                        {
                            btnNameArr.map((a,i) => {
                                return(
                                    <OptionBtn
                                        key={`drawOptionBtn${i}${a}`}
                                        variants={optionalBtnVar}
                                        initial={false}
                                        animate={sortVariants(i)}
                                        onClick={(e) => onClickOptionalBtn(e, i)}
                                        whileHover={hoverSortVariants(i)}                                        
                                    >
                                        {a}
                                    </OptionBtn>
                                );
                            })
                        }
                    </DrawOptionBox>
                </DrawControlBox>
                <AnimatePresence>
                {
                    modifyOpen &&
                        <ModifyBox
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                        >
                            <ModifyPannel>
                                <ModifyDesBox>
                                    <Typing
                                        text={'Change it to the count you want.'}
                                        letterSpacing={0.1}
                                        cursorThickness={0}
                                        typeSpeed={3}
                                    />
                                </ModifyDesBox>
                                <ModifyControlBox>
                                    <ModifyContent>
                                        <ModifyInputBox>
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
                                        </ModifyInputBox>
                                        <ModifyBtnBox>
                                            <motion.div
                                                onClick={onChangeCount}
                                            >
                                                Change
                                            </motion.div>
                                            <motion.div
                                                onClick={() => {
                                                    setModifyOpen(false)
                                                    setModifyErr('');
                                                }}
                                            >Back</motion.div>
                                        </ModifyBtnBox>
                                    </ModifyContent>
                                    <ModifyError>
                                        <Typing
                                            //text={'Change it to the count you want.'}
                                            text={modifyErr}
                                            letterSpacing={0.1}
                                            cursorThickness={0}
                                            typeSpeed={3}
                                        />
                                    </ModifyError>
                                </ModifyControlBox>
                            </ModifyPannel>
                        </ModifyBox>
                }
                </AnimatePresence>
            </DrawContainer>
            <PrevBtn
                onClick={onPrevClickHandler}
                variants={optionalBtnVar}
                initial={optionalBtnVar.initial}
                animate={optionalBtnVar.active}
                whileHover={optionalBtnVar.hover}
            >
                Prev
            </PrevBtn>
            <AnimatePresence>
                {isLoading &&
                <FadeInContainer
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
                </FadeInContainer>
                }
                
            </AnimatePresence>
        </InContainer>
    </SingleDrawContainer>
  )
}

export default React.memo(SingleDraw);