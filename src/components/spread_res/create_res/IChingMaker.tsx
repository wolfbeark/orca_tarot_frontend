/*eslint-disable */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { HorCenterDiv, VerCenterDiv } from 'common_resources/CommonStyle'
import { Typing } from 'components/common_res/typing_res/Typing'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { createControlManager, ICreateControlManager } from 'recoil/CreateAtom'
import { IImgBox } from 'common_resources/CommonInterfaces'
import { IChingTranslateCodeArr } from 'common_resources/CommonData'
import { IDragCardInfo, ISingleControlManagerAtom, ISingleProject, singleControlManagerAtom } from 'recoil/SingleAtom'
import { ITotalManagerAtom, totalManagerAtom } from 'recoil/TotalAtom'

const IChingMakerContainer = styled(VerCenterDiv)`
  width: 70%;
  height: 80%;
  background-color: ${(props) => props.theme.boxColors.opaqueBlack};
  border-radius: ${(props) => props.theme.borders.small};
  padding: 0.5%;
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
    height: 15%;
    padding-left: 5%;
    justify-content: flex-start;
    font-size: 200%;
    color: ${(props) => props.theme.textColors.swanWhite};
    user-select : none;
`
const IChingMakerBox = styled(HorCenterDiv)`
    width: 100%;
    height: 85%;
    //background-color: skyblue;
    justify-content: space-evenly;
    align-items: flex-start;
    padding: 0.5%;
`
const IChingWrapper = styled(HorCenterDiv)`
    width: 30%;
    height: 88%;
    //background-color: gray;
    padding: 0.5%;
`
const IChingItem = styled(HorCenterDiv)<IImgBox>`
    width: 100%;
    height: 15%;
    //background-color: inherit;
    //background-image: url(${(props) => props.imgsrc});
    //background-size: 100% 100%;
    & div{
        width: 100%;
        height: 100%;
        background-image: url(${(props) => props.imgsrc});
        background-size: 100% 100%;
        transition: background-image 0.5s ease-in-out;
    }
`
const IChingBox = styled(VerCenterDiv)`
    width: 100%;
    height: 100%;
    justify-content: space-evenly;
    flex-direction: column-reverse;
    background-color: ${(props) => props.theme.boxColors.opaqueBlack};
    border-radius: ${(props) => props.theme.borders.small};
    padding: 2%;
    position: relative;
    
`
const ControlBox = styled(VerCenterDiv)`
    width: 25%;
    height: 88%;
    padding: 1%;
`

const IChingMakeBtn = styled(HorCenterDiv)`
    width: 60%;
    height: 20%;
    background-color: ${(props) => props.theme.boxColors.soaring};
    letter-spacing: 0.2em;
    font-size: 130%;
    color: ${(props) => props.theme.textColors.swanWhite};
    user-select: none;
    cursor: pointer;
    border-radius: ${(props) => props.theme.borders.small};
`

const IChingMask = styled(HorCenterDiv)`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: inherit;
    z-index: 2;
    border-radius: inherit;
`

const PrevBtn = styled(HorCenterDiv)`
    width: 12%;
    height: 8%;
    background-color: ${(props) => props.theme.boxColors.soaring};
    border-radius: ${(props) => props.theme.borders.small};
    color: ${(props) => props.theme.textColors.swanWhite};
    position: absolute;
    bottom: 1%;
    left: 1%;
    cursor: pointer;
`
const NextBtn = styled(HorCenterDiv)`
    width: 12%;
    height: 8%;
    background-color: ${(props) => props.theme.boxColors.soaring};
    border-radius: ${(props) => props.theme.borders.small};
    color: ${(props) => props.theme.textColors.swanWhite};
    position: absolute;
    bottom: 1%;
    right: 1%;
`
const maskVar = {
    initial:{
        scaleY : 1
    },
    start:{
        scaleY : 0,
        originY : 0
    }
}
const makeBtnVar ={
    initial:{
        color: 'rgba(240, 147, 43, 0.2)',
        opacity: 0.5,
        cursor: 'auto'
    },
    active:{
        color: ['rgba(240, 147, 43,1.0)', 'rgba(240, 147, 43, 0.2)','rgba(240, 147, 43,1.0)',],
        cursor: 'pointer',
        opacity: 1,
        transition: {
            color:{
                repeat: Infinity,
                duration: 1.5
            }
        }
    },
    hover:{
        color: 'rgba(240, 147, 43,1.0)',
        boxShadow: ' 0 0 3px 1px rgba(255, 121, 63,1.0)'
    }
}

function IChingMaker() {
    const [totalManager, setTotalManager] = useRecoilState(totalManagerAtom);
    const [createManager, setCreateManager] = useRecoilState(createControlManager);
    const resetCreateManager = useResetRecoilState(createControlManager);
    const [singleManager, setSingleManager] = useRecoilState(singleControlManagerAtom);

    const navigate = useNavigate();
    const [isClickedMake, setIsClickedMake] = useState<boolean>(false);
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

    const [isOnModal, setIsOnModal] = useState(false);

    const flagStandardArr = [false, true]; // 0, 1
    const defaultImageRoute = `${process.env.PUBLIC_URL}/images/IChingDefault/EmptyBaseBar.png`;

    const onPrevBtnHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if(isClickedMake) return;
        let _temp : ICreateControlManager = JSON.parse(JSON.stringify(createManager));
        _temp.creatingStep = 1;
        setCreateManager(_temp);
    }
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
    const setLeftCheckerRoute = (num : number, type : string) : any => {
        let _str : string;
        switch(type){
            case "First":
                if (num >= 2) {
                // true가 2개 이상.
                setFirstRoute(`/images/IChingDefault/NonDivideBlack.png`);
                _str = "1";
                } else {
                // true가 1개 이하.
                setFirstRoute(`/images/IChingDefault/DivideBlack.png`);
                _str = "0";
                }
                return _str;
            //break;
            case "Second":
                if (num >= 2) {
                setSecondRoute(`/images/IChingDefault/NonDivideBlack.png`);
                _str = "1";
                } else {
                setSecondRoute(`/images/IChingDefault/DivideBlack.png`);
                _str = "0";
                }
                return _str;
            //break;
            case "Third":
                if (num >= 2) {
                setThirdRoute(`/images/IChingDefault/NonDivideBlack.png`);
                _str = "1";
                } else {
                setThirdRoute(`/images/IChingDefault/DivideBlack.png`);
                _str = "0";
                }
                return _str;
            //break;
            case "Fourth":
                if (num >= 2) {
                setFourthRoute(`/images/IChingDefault/NonDivideBlack.png`);
                _str = "1";
                } else {
                setFourthRoute(`/images/IChingDefault/DivideBlack.png`);
                _str = "0";
                }
                return _str;
            //break;
            case "Fifth":
                if (num >= 2) {
                setFifthRoute(`/images/IChingDefault/NonDivideBlack.png`);
                _str = "1";
                } else {
                setFifthRoute(`/images/IChingDefault/DivideBlack.png`);
                _str = "0";
                }
                return _str;
            //break;
            case "Sixth":
                if (num >= 2) {
                setSixthRoute(`/images/IChingDefault/NonDivideBlack.png`);
                _str = "1";
                } else {
                setSixthRoute(`/images/IChingDefault/DivideBlack.png`);
                _str = "0";
                }
                return _str;
            //break;
            default: break;
        }
    }

    const setRightCheckerRoute = (num : number, type : string) : any => {
        let _str : string;
        switch (type) {
        case "First_R":
            if (num === 3 || num === 1) {
            // true가 3개, 1개 // 나눠진 이미지
            setRightFirstRoute(`/images/IChingDefault/DivideBlack.png`);
            _str = "0";
            } else {
            // true 2, 0 // 나눠지지 않은 이미지
            setRightFirstRoute(`/images/IChingDefault/NonDivideBlack.png`);
            _str = "1";
            }
            return _str;
        //break;
        case "Second_R":
            if (num === 3 || num === 1) {
            // true가 3개, 1개 // 나눠진 이미지
            setRightSecondRoute(`/images/IChingDefault/DivideBlack.png`);
            _str = "0";
            } else {
            // true 2, 0 // 나눠지지 않은 이미지
            setRightSecondRoute(`/images/IChingDefault/NonDivideBlack.png`);
            _str = "1";
            }
            return _str;
        //break;
        case "Third_R":
            if (num === 3 || num === 1) {
            // true가 3개, 1개 // 나눠진 이미지
            setRightThirdRoute(`/images/IChingDefault/DivideBlack.png`);
            _str = "0";
            } else {
            // true 2, 0 // 나눠지지 않은 이미지
            setRightThirdRoute(`/images/IChingDefault/NonDivideBlack.png`);
            _str = "1";
            }
            return _str;
        //break;
        case "Fourth_R":
            if (num === 3 || num === 1) {
            // true가 3개, 1개 // 나눠진 이미지
            setRightFourthRoute(`/images/IChingDefault/DivideBlack.png`);
            _str = "0";
            } else {
            // true 2, 0 // 나눠지지 않은 이미지
            setRightFourthRoute(`/images/IChingDefault/NonDivideBlack.png`);
            _str = "1";
            }
            return _str;
        //break;
        case "Fifth_R":
            if (num === 3 || num === 1) {
            // true가 3개, 1개 // 나눠진 이미지
            setRightFifthRoute(`/images/IChingDefault/DivideBlack.png`);
            _str = "0";
            } else {
            // true 2, 0 // 나눠지지 않은 이미지
            setRightFifthRoute(`/images/IChingDefault/NonDivideBlack.png`);
            _str = "1";
            }
            return _str;
        //break;
        case "Sixth_R":
            if (num === 3 || num === 1) {
            // true가 3개, 1개 // 나눠진 이미지
            setRightSixthRoute(`/images/IChingDefault/DivideBlack.png`);
            _str = "0";
            } else {
            // true 2, 0 // 나눠지지 않은 이미지
            setRightSixthRoute(`/images/IChingDefault/NonDivideBlack.png`);
            _str = "1";
            }
            return _str;
        //break;
        default:
            break ;
    }
  };
    const translateIChingCode = (str : string) : number => {
        let imgnum = 0;
        for (let i = 0; i < IChingTranslateCodeArr.length; i++) {
            if (IChingTranslateCodeArr[i] === str) {
                imgnum = i;
                break;
            }
        }
        return imgnum;
    };

    const onStartHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if(isClickedMake) return;
        setIsClickedMake(true);
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
            newX : 0,
            newY : 0,
        }
        let tempObjArr : IDragCardInfo[] = [];
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
            cardInfoArr: []
        }
        
        let first = flagChecker();
        let second = flagChecker();
        let third = flagChecker();
        let fourth = flagChecker();
        let fifth = flagChecker();
        let sixth = flagChecker();

        let leftTotalStr = "";
        let rightTotalStr = "";
        let _strArr = new Array<string>(6);
        let _strArrR = new Array<string>(6);

        let leftNum : number;
        let rightNum : number;

        // Left Image
        _strArr[0] = setLeftCheckerRoute(first, "First");
        _strArr[1] = setLeftCheckerRoute(second, "Second");
        _strArr[2] = setLeftCheckerRoute(third, "Third");
        _strArr[3] = setLeftCheckerRoute(fourth, "Fourth");
        _strArr[4] = setLeftCheckerRoute(fifth, "Fifth");
        _strArr[5] = setLeftCheckerRoute(sixth, "Sixth");

        // Right Image
        _strArrR[0] = setRightCheckerRoute(first, "First_R");
        _strArrR[1] = setRightCheckerRoute(second, "Second_R");
        _strArrR[2] = setRightCheckerRoute(third, "Third_R");
        _strArrR[3] = setRightCheckerRoute(fourth, "Fourth_R");
        _strArrR[4] = setRightCheckerRoute(fifth, "Fifth_R");
        _strArrR[5] = setRightCheckerRoute(sixth, "Sixth_R");

        for (let i = 0; i < _strArr.length; i++) {
            leftTotalStr += _strArr[i];
            rightTotalStr += _strArrR[i];
        }

        leftNum = translateIChingCode(leftTotalStr);
        rightNum = translateIChingCode(rightTotalStr);

        setFirstFlag(first);
        setSecondFlag(second);
        setThirdFlag(third);
        setFourthFlag(fourth);
        setFifthFlag(fifth);
        setSixthFlag(sixth);

        // single create
        // project 
        //tempProject
        //console.log(_singleManager.singleProjectArr.length);
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
                _tempObj.imgNumber = leftNum;
            } else {
                _tempObj.imgNumber = rightNum;
            }
            tempObjArr[i] = _tempObj;
        }
        tempProject.cardInfoArr = tempObjArr;

        _singleManager.singleProjectArr.push(tempProject);
        setSingleManager(_singleManager);
        
    }
    const nextBtnHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        let _total : ITotalManagerAtom = JSON.parse(JSON.stringify(totalManager));
        _total.projectCount++;
        _total.singleNormalCount++;
        setTotalManager(_total);
        resetCreateManager();
        navigate('/spread/single');
    }
  return (
    <IChingMakerContainer>
        <InContainer>
            <DesStepBox>
                <Typing 
                    text={'Make IChing cards and start'}
                    letterSpacing={0.1}
                    cursorThickness={0}
                    typeSpeed={3}
                />
            </DesStepBox>
            <IChingMakerBox>
                <IChingWrapper>
                    <IChingBox>
                        <IChingItem
                            imgsrc={
                                firstFlag !== 10
                                ? `${process.env.PUBLIC_URL}${firstRoute}`
                                : `${defaultImageRoute}`
                            }
                        >
                            <div></div>
                        </IChingItem>
                        <IChingItem
                            imgsrc={
                                secondFlag !== 10
                                ? `${process.env.PUBLIC_URL}${secondRoute}`
                                : `${defaultImageRoute}`
                            }
                        >
                            <div></div>
                        </IChingItem>
                        <IChingItem
                            imgsrc={
                                thirdFlag !== 10
                                ? `${process.env.PUBLIC_URL}${thirdRoute}`
                                : `${defaultImageRoute}`
                            }
                        >
                            <div></div>
                        </IChingItem>
                        <IChingItem
                            imgsrc={
                                fourthFlag !== 10
                                ? `${process.env.PUBLIC_URL}${fourthRoute}`
                                : `${defaultImageRoute}`
                            }
                        >
                            <div></div>
                        </IChingItem>
                        <IChingItem
                            imgsrc={
                                fifthFlag !== 10
                                ? `${process.env.PUBLIC_URL}${fifthRoute}`
                                : `${defaultImageRoute}`
                            }
                        >
                            <div></div>
                        </IChingItem>
                        <IChingItem
                            imgsrc={
                                sixthFlag !== 10
                                ? `${process.env.PUBLIC_URL}${sixthRoute}`
                                : `${defaultImageRoute}`
                            }
                        >
                            <div></div>
                        </IChingItem>
                        <IChingMask
                            variants={maskVar}
                            initial={maskVar.initial}
                            animate={
                                isClickedMake ? maskVar.start : ""
                            }
                        />
                    </IChingBox>
                </IChingWrapper>
                <ControlBox>
                    <IChingMakeBtn
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
                        MAKE
                    </IChingMakeBtn>
                </ControlBox>
                <IChingWrapper>
                    <IChingBox>
                        <IChingItem
                            imgsrc={
                                firstFlag !== 10
                                ? `${process.env.PUBLIC_URL}${rightFirstRoute}`
                                : `${defaultImageRoute}`
                            }
                        >
                            <div></div>
                        </IChingItem>
                        <IChingItem
                            imgsrc={
                                secondFlag !== 10
                                ? `${process.env.PUBLIC_URL}${rightSecondRoute}`
                                : `${defaultImageRoute}`
                            }
                        >
                            <div></div>
                        </IChingItem>
                        <IChingItem
                            imgsrc={
                                thirdFlag !== 10
                                ? `${process.env.PUBLIC_URL}${rightThirdRoute}`
                                : `${defaultImageRoute}`
                            }
                        >
                            <div></div>
                        </IChingItem>
                        <IChingItem
                            imgsrc={
                                fourthFlag !== 10
                                ? `${process.env.PUBLIC_URL}${rightFourthRoute}`
                                : `${defaultImageRoute}`
                            }
                        >
                            <div></div>
                        </IChingItem>
                        <IChingItem
                            imgsrc={
                                fifthFlag !== 10
                                ? `${process.env.PUBLIC_URL}${rightFifthRoute}`
                                : `${defaultImageRoute}`
                            }
                            >
                        <div></div>
                        </IChingItem>
                        <IChingItem
                            imgsrc={
                                sixthFlag !== 10
                                ? `${process.env.PUBLIC_URL}${rightSixthRoute}`
                                : `${defaultImageRoute}`
                            }
                        >
                            <div></div>
                        </IChingItem>
                        <IChingMask 
                            variants={maskVar}
                            initial={maskVar.initial}
                            animate={
                                isClickedMake ? maskVar.start : ""
                            }
                        />
                    </IChingBox>
                </IChingWrapper>
            </IChingMakerBox>
            <PrevBtn
                onClick={onPrevBtnHandler}
            >
                PREV
            </PrevBtn>
            <NextBtn
                variants={makeBtnVar}
                initial={makeBtnVar.initial}
                animate={
                    isClickedMake === true
                    ? makeBtnVar.active
                            : ""
                }
                whileHover={
                    isClickedMake === true
                    ? makeBtnVar.hover
                    : ""
                }
                onClick={nextBtnHandler}
            >
                NEXT
            </NextBtn>
        </InContainer>
    </IChingMakerContainer>
  )
}

export default React.memo(IChingMaker)