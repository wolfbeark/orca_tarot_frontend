/* eslint-disable */
import React, {useEffect, useState} from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil';
import { ITotalManagerAtom, totalManagerAtom } from 'recoil/TotalAtom';
import { defaultRestartInfo, IDragCardInfo, ISingleControlManagerAtom, ISingleDeckIdxInfo, ISingleProject, singleControlManagerAtom } from 'recoil/SingleAtom';
import { createControlManager, ICreateControlManager } from 'recoil/CreateAtom';

import { 
    DrawIChingCommon 
} from './DrawIChingPannel.styled';

import { 
    DrawCommonInfo, 
    EWhatDrawMode, 
    IDrawPannelProps 
} from '../DrawPannel.interfaces';

import { Typing } from 'components/common_res/typing_res/Typing';
import { useNavigate } from 'react-router-dom';
import * as Loader from 'react-spinners';

interface IImgNumInfo {
    leftNum : number | null,
    rightNum : number | null,
}

function DrawIChingPannel(props : IDrawPannelProps) {

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
    } = props;
    const {
        Data,
        RandomArrGenerator
    } = DrawCommonInfo;

    const [totalManager, setTotalManager] = useRecoilState(totalManagerAtom);
    const [createManager, setCreateManager] = useRecoilState<ICreateControlManager>(createControlManager);
    const resetCreateManager = useResetRecoilState(createControlManager);
    const [singleManager, setSingleManager] = useRecoilState(singleControlManagerAtom);
    
    const navigate = useNavigate();
    const [isClickedMake, setIsClickedMake] = useState<boolean>(false);
    const [activeNextBtn, setActiveNextBtn] = useState<boolean>(false);
    
    const [firstFlag, setFirstFlag] = useState(10); // flag 개수 = true 개수
    // true: 앞, false : 뒤로 간주함
    const [secondFlag, setSecondFlag] = useState(10);
    const [thirdFlag, setThirdFlag] = useState(10);
    const [fourthFlag, setFourthFlag] = useState(10);
    const [fifthFlag, setFifthFlag] = useState(10);
    const [sixthFlag, setSixthFlag] = useState(10);


    // Left Image Route
    const [firstRoute, setFirstRoute] = useState("");
    const [secondRoute, setSecondRoute] = useState("");
    const [thirdRoute, setThirdRoute] = useState("");
    const [fourthRoute, setFourthRoute] = useState("");
    const [fifthRoute, setFifthRoute] = useState("");
    const [sixthRoute, setSixthRoute] = useState("");

    // Right Image Route
    const [rightFirstRoute, setRightFirstRoute] = useState("");
    const [rightSecondRoute, setRightSecondRoute] = useState("");
    const [rightThirdRoute, setRightThirdRoute] = useState("");
    const [rightFourthRoute, setRightFourthRoute] = useState("");
    const [rightFifthRoute, setRightFifthRoute] = useState("");
    const [rightSixthRoute, setRightSixthRoute] = useState("");

    const [imgNumInfo, setImgNumInfo] = useState<IImgNumInfo>({leftNum: null, rightNum : null});

    const flagStandardArr = [false, true]; // 0, 1
    const defaultImageRoute = `${process.env.PUBLIC_URL}/images/IChingDefault/EmptyBaseBar.png`;

    const [stateNotice, setStateNotice] = useState<string>('Your cards are ready to be drawn')
    const [cardText, setCardText] = useState<string>(`Waiting for order`);

    useEffect(() => {
        if(whatDrawMode === EWhatDrawMode.SINGLE){
            if(createManager.tempRanNumArr.length > 1){
                setImgNumInfo({
                    leftNum : createManager.tempRanNumArr[0],
                    rightNum : createManager.tempRanNumArr[1],
                })
                setIsClickedMake(true);
                setActiveNextBtn(true);
                setStateNotice(`Processing completed`)
                setCardText(`Ready`);
            }

        }
        else if(whatDrawMode === EWhatDrawMode.SINGLE_RESTART){
            let _singleManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
            let {
                cur_ProjectNumber,
                singleProjectArr
            } = _singleManager;
            if(singleProjectArr[cur_ProjectNumber]
                .restartInfo.tempRanNumArr.length > 1){
                setImgNumInfo({
                    leftNum : singleProjectArr[cur_ProjectNumber]
                        .restartInfo.tempRanNumArr[0],
                    rightNum : singleProjectArr[cur_ProjectNumber]
                        .restartInfo.tempRanNumArr[1],
                })
                setIsClickedMake(true);
                setActiveNextBtn(true);
                setStateNotice(`Processing completed`)
                setCardText(`Ready`);
            }
        }
    }, [])
    // Common functions
    const flagChecker = () : number => {
        let tempNum : number;
        let checker : number = 0;
        let flagCheckArr : boolean[] = new Array(3);
        for(let i = 0; i < 3; i++){
            tempNum = Math.floor(Math.random() * 2);
            if(tempNum === 0){
                flagCheckArr[i] = flagStandardArr[0];
            }
            else{
                flagCheckArr[i] = flagStandardArr[1];
                checker++;
            }
        }
        return checker;
    }

    const translateIChingCode = (str : string) : number => {
        let imgnum = 0;
        for (let i = 0; i < Data.IChingTranslateCodeArr.length; i++) {
            if (Data.IChingTranslateCodeArr[i] === str) {
                imgnum = i;
                break;
            }
        }
        return imgnum;
    };
    const onStartHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if(whatDrawMode === EWhatDrawMode.SINGLE ||
            whatDrawMode === EWhatDrawMode.SINGLE_EXTRA ||
            whatDrawMode === EWhatDrawMode.SINGLE_RESTART 
            ){
            singleNormalMake();
        }
        // else if(whatDrawMode === EWhatDrawMode.SINGLE_EXTRA){
        //     extra_singleNormalMake();
        // }
    }
    const onPrevBtnHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if(whatDrawMode === EWhatDrawMode.SINGLE){
            singleNormalPrev();
        }
        else if(whatDrawMode === EWhatDrawMode.SINGLE_EXTRA){
            extra_singleNoramlPrev();
        }
        else if(whatDrawMode === EWhatDrawMode.SINGLE_RESTART){
            restart_singleNoramlPrev();
        }
    }
    const nextBtnHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if(!activeNextBtn) return;
        if(whatDrawMode === EWhatDrawMode.SINGLE){
            singleNextHandler();
        }
        else if(whatDrawMode === EWhatDrawMode.SINGLE_EXTRA){
            extra_singleNextHandler();
        }
        else if(whatDrawMode === EWhatDrawMode.SINGLE_RESTART){
            restart_singleNextHandler();
        }
    }

    const setLeftCheckerRoute = (num : number) : any => {
        let _str : string;
        if(num >= 2){
            _str = "1";
        }
        else{
            _str = "0";
        }
        return _str;
    }
    const setRightCheckerRoute = (num : number) : any => {
        let _str : string;
        if(num === 3 || num === 1){
            _str = "0";
        }
        else{
            _str = "1";
        }
        return _str;
    };
    // singleNormal
    const singleNormalMake = () => {
        if(isClickedMake) return;
        setIsClickedMake(true);
        setStateNotice(`Processing...`);
        setCardText(`Wait for seconds`);
        let leftTotalStr = "";
        let rightTotalStr = "";
        let _strArr = new Array<string>(6);
        let _strArrR = new Array<string>(6);

        let first = flagChecker();
        let second = flagChecker();
        let third = flagChecker();
        let fourth = flagChecker();
        let fifth = flagChecker();
        let sixth = flagChecker();

        let leftNum : number;
        let rightNum : number;

        // left
        _strArr[0] = setLeftCheckerRoute(first);
        _strArr[1] = setLeftCheckerRoute(second);
        _strArr[2] = setLeftCheckerRoute(third);
        _strArr[3] = setLeftCheckerRoute(fourth);
        _strArr[4] = setLeftCheckerRoute(fifth);
        _strArr[5] = setLeftCheckerRoute(sixth);

        // right
        _strArrR[0] = setRightCheckerRoute(first);
        _strArrR[1] = setRightCheckerRoute(second);
        _strArrR[2] = setRightCheckerRoute(third);
        _strArrR[3] = setRightCheckerRoute(fourth);
        _strArrR[4] = setRightCheckerRoute(fifth);
        _strArrR[5] = setRightCheckerRoute(sixth);

        for (let i = 0; i < _strArr.length; i++) {
            leftTotalStr += _strArr[i];
            rightTotalStr += _strArrR[i];
        }

        leftNum = translateIChingCode(leftTotalStr);
        rightNum = translateIChingCode(rightTotalStr);
        setImgNumInfo({
            leftNum,
            rightNum
        })
        if(whatDrawMode === EWhatDrawMode.SINGLE){
            if(createManager.tempRanNumArr.length > 1) return;
            let _createManager : ICreateControlManager = JSON.parse(JSON.stringify(createManager));
            _createManager.tempRanNumArr.push(leftNum);
            _createManager.tempRanNumArr.push(rightNum);
            setCreateManager(_createManager);
        }
        else if(whatDrawMode === EWhatDrawMode.SINGLE_RESTART){
            let _singleManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
            let {
                cur_ProjectNumber,
                singleProjectArr
            } = _singleManager;

            if(singleProjectArr[cur_ProjectNumber]
                .restartInfo.tempRanNumArr.length > 1){
                return;
            }
            else{
                singleProjectArr[cur_ProjectNumber]
                    .restartInfo.tempRanNumArr.push(leftNum);
                singleProjectArr[cur_ProjectNumber]
                    .restartInfo.tempRanNumArr.push(rightNum);
                setSingleManager(_singleManager);
            }
        }
        setTimeout(()=>{
            setActiveNextBtn(true);
            setStateNotice(`Processing completed`)
            setCardText(`Ready`);
        }, 2000)
    }
    const singleNormalPrev = () => {
        //if(isClickedMake) return;
        let _temp : ICreateControlManager = JSON.parse(JSON.stringify(createManager));
        
        _temp.projectName = ``;
        _temp.cardCount = null;
        _temp.oracleType = null;
        _temp.creatingStep = 1;
        _temp.tempRanNumArr = [];

        setCreateManager(_temp);
    }
    const singleNextHandler = () => {
        let _total : ITotalManagerAtom = JSON.parse(JSON.stringify(totalManager));
        let _createManager : ICreateControlManager = JSON.parse(JSON.stringify(createManager));
        let _singleManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
        let tempObj : IDragCardInfo = {
            oracleType : 0,
            imgNumber : 0,
            zIdx : 0,
            isInSpread : false,
            isDraged: false,
            isFlip : false,
            isRotate : false,
            isHide: false,
            newX : 0,
            newY : 0,
        }
        let tempObjArr : IDragCardInfo[] = [];
        let _deckIdxArrItem : ISingleDeckIdxInfo = {
            startIdx : 0,
            lastIdx : 0,
            deckOracleType : null,
            isThisExtraHide : false,
        }
        let tempProject : ISingleProject = {
            projectId: 0,
            projectName: ``,
            projectType: false,
            oracleType: 2,
            totalCardCount: 0,
            initialCardCount : 0,
            rem_CardCount: 0,
            NS_T_PreviewCard : null, // if normal, tarot, preview three cards
            NS_T_UseAutoDeck : 0,
            NS_T_PreviewCardNumArr: null,
            cardInfoArr: [],
            isRestarting: false,
            isHideOpen: false,
            isFindOpen: false,
            isOpenFindPannel : false,
            isFindModeZoom : true,
            zoomImgPath : null,
            zoomImgName : null,
            findImgPath : null,
            findImgName : null,
            deckIdxArr: null,
            restartInfo : null,

        }

        tempProject.projectId = _singleManager.singleProjectArr.length;
        tempProject.projectName = _createManager.projectName;
        tempProject.projectType = _createManager.projectType;
        tempProject.oracleType = _createManager.oracleType;
        tempProject.totalCardCount = 2;
        tempProject.initialCardCount = 2;
        tempProject.rem_CardCount = 2;

        if(!_singleManager.isExistProject) {
            _singleManager.isExistProject = true;
            _singleManager.cur_ProjectNumber = 0;
        }
        else{
            _singleManager.cur_ProjectNumber = _singleManager.singleProjectArr.length
        }
        for(let i = 0; i < 2; i++){
            let _tempObj = {...tempObj};
            _tempObj.oracleType = 2;
            _tempObj.zIdx = 2 - i;
            if(i === 0){
                _tempObj.imgNumber = imgNumInfo.leftNum;
            } else {
                _tempObj.imgNumber = imgNumInfo.rightNum;
            }
            tempObjArr[i] = _tempObj;
        }
        tempProject.cardInfoArr = tempObjArr;

        _deckIdxArrItem.startIdx = 0;
        _deckIdxArrItem.lastIdx = (_createManager.cardCount - 1);
        _deckIdxArrItem.deckOracleType = _createManager.oracleType;
        _deckIdxArrItem.isThisExtraHide = false;
        
        tempProject.deckIdxArr = [_deckIdxArrItem];

        _singleManager.singleProjectArr.push(tempProject);
        setSingleManager(_singleManager);
        _total.projectCount++;
        _total.singleNormalCount++;
        setTotalManager(_total);
        resetCreateManager();
        navigate('/spread/single');
    }

    // single extra
    const extra_singleNormalMake = () => {
        
    }
    const extra_singleNoramlPrev = () => {
        //if(isClickedMake) return;
        setIsFirstOver(false);
        setSelectOracleType(null)
    }
    const extra_singleNextHandler = () => {
        let _singleManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
        let tempObj : IDragCardInfo = {
            oracleType : 0,
            imgNumber : 0,
            zIdx : 0,
            isInSpread : false,
            isDraged: false,
            isFlip : false,
            isRotate : false,
            isHide: false,
            newX : 0,
            newY : 0,
        }
        let _deckIdxArrItem : ISingleDeckIdxInfo = {
            startIdx : 0,
            lastIdx : 0,
            deckOracleType : null,
            isThisExtraHide : false,
        }
        let {
            cur_ProjectNumber,
            singleProjectArr
        } = _singleManager

        singleProjectArr[cur_ProjectNumber].totalCardCount += 2;
        singleProjectArr[cur_ProjectNumber].rem_CardCount = 2;

        _deckIdxArrItem.startIdx = 
            singleProjectArr[cur_ProjectNumber].cardInfoArr.length;
        _deckIdxArrItem.lastIdx =
            ((singleProjectArr[cur_ProjectNumber].cardInfoArr.length +
                2    
            ) - 1);
        _deckIdxArrItem.deckOracleType = oracleType;
        singleProjectArr[cur_ProjectNumber].deckIdxArr.push(_deckIdxArrItem);

        for(let i = 0; i < 2; i++){
            let _tempObj = {...tempObj};
            _tempObj.oracleType = 2;
            _tempObj.zIdx = 2 - i;
            if(i === 0){
                _tempObj.imgNumber = imgNumInfo.leftNum;
            } else {
                _tempObj.imgNumber = imgNumInfo.rightNum;
            }
            singleProjectArr[cur_ProjectNumber].cardInfoArr.push(_tempObj);
        }

        

        setSingleManager(_singleManager);
        setIsOpenExtraMake(false);
    }

    // restart
    const restart_singleNoramlPrev = () => {
        //if(isClickedMake) return;
        let _singleManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
        let {
            cur_ProjectNumber,
            singleProjectArr
        } = _singleManager;
        let _tempInfo = {...defaultRestartInfo};
        
        let _infoRef = singleProjectArr[cur_ProjectNumber].restartInfo
        _infoRef.creatingStep = 1;
        _infoRef.projectName = '';
        _infoRef.oracleType = null;
        _infoRef.cardCount = null;
        _infoRef.NS_T_PreviewCard = null;
        _infoRef.NS_T_UseAutoDeck = 0;
        _infoRef.tempRanNumArr = [];
        setSingleManager(_singleManager);
        //setIsFirstOver(false);
        //setSelectOracleType(null)
    }
    const restart_singleNextHandler = () => {
        let _singleManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
        let {
            singleProjectArr,
            cur_ProjectNumber,
        } = _singleManager;
        let {restartInfo} = singleProjectArr[cur_ProjectNumber];
        
        let tempObj : IDragCardInfo = {
            oracleType : 0,
            imgNumber : 0,
            zIdx : 0,
            isInSpread : false,
            isDraged: false,
            isFlip : false,
            isRotate : false,
            isHide: false,
            newX : 0,
            newY : 0,
        }
        let _deckIdxArrItem : ISingleDeckIdxInfo = {
            startIdx : 0,
            lastIdx : 0,
            deckOracleType : null,
            isThisExtraHide : false,
        }
        let tempObjArr : IDragCardInfo[] = [];

        let _pastItem = singleProjectArr[cur_ProjectNumber];
        _pastItem.projectName = restartInfo.projectName;
        _pastItem.projectType = restartInfo.isSandbox;
        _pastItem.oracleType = restartInfo.oracleType;
        _pastItem.totalCardCount = restartInfo.cardCount;
        _pastItem.initialCardCount = restartInfo.cardCount;

        if(
            oracleType === 0 
            && restartInfo.NS_T_UseAutoDeck !== 0
        ){
            _pastItem.rem_CardCount = 0;
        } else {
            _pastItem.rem_CardCount = restartInfo.cardCount;
        }

        _deckIdxArrItem.startIdx = 0;
        _deckIdxArrItem.lastIdx = (restartInfo.cardCount - 1);
        _deckIdxArrItem.deckOracleType = restartInfo.oracleType;
        _deckIdxArrItem.isThisExtraHide = false;
        _pastItem.deckIdxArr = [_deckIdxArrItem];

        for(let i = 0; i < 2; i++){
            let _tempObj = {...tempObj};
            _tempObj.oracleType = 2;
            _tempObj.zIdx = 2 - i;
            if(i === 0){
                _tempObj.imgNumber = imgNumInfo.leftNum;
            } else {
                _tempObj.imgNumber = imgNumInfo.rightNum;
            }
            tempObjArr[i] = _tempObj;
        }
        _pastItem.cardInfoArr = tempObjArr;
        _pastItem.isRestarting = false;

        _pastItem.isHideOpen = false;
        _pastItem.isFindOpen = false;
        _pastItem.isOpenFindPannel = false;
        _pastItem.isFindModeZoom = true;
        _pastItem.findImgName = null;
        _pastItem.findImgPath = null;
        _pastItem.zoomImgName = null;
        _pastItem.zoomImgPath = null;
        
        setSingleManager(_singleManager);
    }

    const {makeBtnVar, maskVar} = DrawIChingCommon
    //console.log(imgNumInfo);
  return (
    <DrawIChingCommon.Container>
        <DrawIChingCommon.InContainer>
            <DrawIChingCommon.DesStepBox>
                <Typing 
                    text={'Make IChing cards and start'}
                    letterSpacing={0.1}
                    cursorThickness={0}
                    typeSpeed={3}
                />
            </DrawIChingCommon.DesStepBox>
            <DrawIChingCommon.IChingMakerContainer>
                <DrawIChingCommon.IChingWrapperContainer>
                <DrawIChingCommon.IChingWrapper>
                    <DrawIChingCommon.IChingBox>
                        <DrawIChingCommon.IChingMask>
                            <div>
                            {!isClickedMake &&
                            <Loader.ClockLoader
                                size={100}
                                color={'rgba(240, 147, 43, 1.0)'}
                            />
                            }
                            {(isClickedMake && !activeNextBtn) &&
                            <Loader.MoonLoader
                                size={85}
                                color={'rgba(240, 147, 43, 1.0)'}
                            />
                            }
                            {activeNextBtn &&
                            <Loader.PuffLoader
                                color={'rgba(240, 147, 43, 1.0)'} 
                                size={100} 
                            >
                            </Loader.PuffLoader>
                            }
                            </div>
                            <Typing 
                                text={
                                    !activeNextBtn
                                    ? cardText
                                    : `Card 1 - ${cardText}` 
                                }
                                letterSpacing={0.1}
                                cursorThickness={0}
                                typeSpeed={3}
                            />
                        </DrawIChingCommon.IChingMask>
                    </DrawIChingCommon.IChingBox>
                </DrawIChingCommon.IChingWrapper>
                <DrawIChingCommon.IChingWrapper>
                    <DrawIChingCommon.IChingBox>
                        <DrawIChingCommon.IChingMask>
                            <div>
                            {!isClickedMake &&
                            <Loader.ClockLoader
                                size={100}
                                color={'rgba(240, 147, 43, 1.0)'}
                            />
                            }
                            {(isClickedMake && !activeNextBtn) &&
                            <Loader.MoonLoader
                                size={85}
                                color={'rgba(240, 147, 43, 1.0)'}
                            />
                            }
                            {activeNextBtn &&
                            <Loader.PuffLoader
                                color={'rgba(240, 147, 43, 1.0)'} 
                                size={100} 
                            >
                            </Loader.PuffLoader>
                            }
                            </div>
                            <Typing 
                                text={
                                    !activeNextBtn
                                    ? cardText
                                    : `Card 2 - ${cardText}` 
                                }
                                letterSpacing={0.1}
                                cursorThickness={0}
                                typeSpeed={3}
                            />
                        </DrawIChingCommon.IChingMask>
                    </DrawIChingCommon.IChingBox>
                </DrawIChingCommon.IChingWrapper>
                </DrawIChingCommon.IChingWrapperContainer>
                <DrawIChingCommon.ControlBox>
                    <div>
                    <Typing 
                        text={stateNotice}
                        letterSpacing={0.1}
                        cursorThickness={0}
                        typeSpeed={3}
                    />
                    </div>
                    <DrawIChingCommon.IChingMakeBtn
                        variants={makeBtnVar}
                        initial={makeBtnVar.initial}
                        animate={
                            isClickedMake === false
                            ? makeBtnVar.active
                            : ""
                        }
                        whileHover={
                            isClickedMake === false
                            ? makeBtnVar.hover
                            : ""
                        }
                        onClick={onStartHandler}
                    >
                        DRAW
                    </DrawIChingCommon.IChingMakeBtn>
                </DrawIChingCommon.ControlBox>
            </DrawIChingCommon.IChingMakerContainer>
            <DrawIChingCommon.PrevBtn
                variants={makeBtnVar}
                initial={makeBtnVar.initial}
                // animate={
                //     isClickedMake === false
                //     ? makeBtnVar.active
                //     : ""
                // }
                // whileHover={
                //     isClickedMake === false
                //     ? makeBtnVar.hover
                //     : ""
                // }
                animate={makeBtnVar.active}
                whileHover={makeBtnVar.hover}
                onClick={onPrevBtnHandler}
            >
                PREV
            </DrawIChingCommon.PrevBtn>
            <DrawIChingCommon.NextBtn
                variants={makeBtnVar}
                initial={makeBtnVar.initial}
                animate={
                    activeNextBtn === true
                    ? makeBtnVar.active
                    : ""
                }
                whileHover={
                    activeNextBtn === true
                    ? makeBtnVar.hover
                    : ""
                }
                onClick={nextBtnHandler}
            >
                NEXT
            </DrawIChingCommon.NextBtn>
        </DrawIChingCommon.InContainer>
    </DrawIChingCommon.Container>
  )
}

export default React.memo(DrawIChingPannel)