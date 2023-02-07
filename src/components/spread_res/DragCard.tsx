/* eslint-disable */
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import styled, {css} from 'styled-components'
import {AnimatePresence, motion} from 'framer-motion'
import { HorCenterDiv } from 'common_resources/CommonStyle'
import { useRecoilState } from 'recoil';
import { ISingleControlManagerAtom, singleControlManagerAtom } from 'recoil/SingleAtom';
import { ICustomDOMPosition, IPositionInfo } from 'common_resources/CommonInterfaces';
import Draggable from 'react-draggable';
import { AutoDeckGenerator, IAutoPosItem } from 'common_resources/CommonData';
import { resourceUsage } from 'process';


// styled
interface IDragContainer {
    positioninfo : IPositionInfo,
    imgsrc? : string,
    privaterotate? : string,
}
// Props
interface IDragCard{
    positioninfo : IPositionInfo,
    cardNumber : number,
    refArr : React.MutableRefObject<HTMLDivElement>[]
}
const DragCardContainer = styled(HorCenterDiv)<IDragContainer>`
    //width: ${(props) => `${props.positioninfo.waitingInfo.width}px`};
    //height: ${(props) => `${props.positioninfo.waitingInfo.height}px`};
    //min-height: 100%;
    //min-width: 100%;
    width: ${(props) =>
    props.privaterotate === "false"
      ? `${props.positioninfo.waitingInfo.width}px`
      : `${props.positioninfo.waitingInfo.height}px`};
    height: ${(props) =>
    props.privaterotate === "false" 
      ? `${props.positioninfo.waitingInfo.height}px`
      : `${props.positioninfo.waitingInfo.width}px`};
    border-radius: ${(props) => props.theme.borders.small};
    cursor: pointer;
    position: absolute;

    padding: 0.2%;
    //user-select: none;
    & div{
        border-radius: inherit;
        z-index : 1;
        display: inherit;
        justify-content: inherit;
        align-items: inherit;
    }
    & > div:first-child{
        width: inherit;
        height: inherit;
        position: relative;
        //background-color: red;
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
        padding: 0.2%;
        & > div {
            //position: absolute;
            width: inherit;
            height: inherit;
            background: url(${(props) => props.imgsrc});
            image-rendering: -webkit-optimize-contrast;
            background-size: 100% 100%;
        /* ${(props) => {
        if (props.privaterotate === "false") {
            return css`
            transform: rotateZ(0deg);
            background-size: 100% 100%;
            
            `;
        } else {
            return css`
            transform: rotateZ(-90deg);
            background-size: 100% 100%;
            `;
        }
        }} */
        //justify-content: flex-end;
        will-change: background;
        }
    }
    /* & > div:first-child{
        display: inherit;
        justify-content: inherit;
        align-items: inherit;
        background: url(${(props) => props.imgsrc});
        image-rendering: -webkit-optimize-contrast;
        
    } */

`


function DragCard(props : IDragCard) {
    const positioninfo = props.positioninfo;
    const cardNumber = props.cardNumber;
    const {
        waitingInfo,
        carpetInfo
    } = positioninfo;
    const refArr = props.refArr;
    const [singleManager, setSingleManager] = useRecoilState(singleControlManagerAtom);
    const {
        cur_ProjectNumber,
        singleProjectArr,
    } = singleManager;
    const {
        cardInfoArr
    } = singleProjectArr[cur_ProjectNumber];

    const cardRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const [isInCarpet, setIsInCarpet] = useState<boolean>(cardInfoArr[cardNumber].isInSpread);
    //const [dragArea, setDragArea] = useState(cardInfoArr[cardNumber].isInSpread ? refArr[1] : refArr[0]);
    const [imgLoading, setImgLoading] = useState<boolean>(true);

    const [defaultCardPos, setDefaultCardPos] = useState({
        x: waitingInfo.x - carpetInfo.x,
        y: waitingInfo.y - carpetInfo.y,
    });

    const [cardPos, setCardPos] = useState({
        x : cardInfoArr[cardNumber].newX,
        y : cardInfoArr[cardNumber].newY
    })

    const [imgsrc, setImgSrc] = useState<string>('/images/BackOfCards/BackOfCard0.png');
    const [uniqueImgsrc, setUniqueImgsrc] = useState<string>(''); 
    
    const [privateRotate, setPrivateRotate] = useState<boolean>(false);
    const dragCardVar = {
        initial:{
            opacity : 1
        },
        active:{
            opacity : [0, 1],   
        },
        flipOverActive:{
            opacity : [0, 1],
        },
        exit:{
            opacity : 0
        },
        rotateActive: {
            rotateZ : -90
        }
    }    
    const maskVar = {
        isFlipFalse : {
            backgroundColor: [`rgba(20, 20, 20, 1)`, `rgba(20, 20, 20, 0.01)`],
            transition:{
                duration: 2
            }
        },
        isFlipTrue: {
            backgroundColor: [`rgba(20, 20, 20, 1)`, `rgba(20, 20, 20, 0.01)`],
            transition:{
                duration: 2
            }
        },  
    }

    useLayoutEffect(() => {
        let img = new Image();
        let uImg = new Image();
        let path = '/images/BackOfCards/BackOfCard0.png';
        let uPath;
        if(cardInfoArr[cardNumber].oracleType === 0){
            uPath = `/images/TarotDefault/Default${cardInfoArr[cardNumber].imgNumber}.png`;
        }
        else if(cardInfoArr[cardNumber].oracleType === 1){
            uPath = `/images/LenormandDefault/Default_Lenormand${cardInfoArr[cardNumber].imgNumber}.png`;
        }
        else if(cardInfoArr[cardNumber].oracleType === 2){
            uPath = `/images/IChingDefault/iching${cardInfoArr[cardNumber].imgNumber}.png`;
        }
        else if(cardInfoArr[cardNumber].oracleType === 3){
            uPath = `/images/PokerDefault/Default_Poker${cardInfoArr[cardNumber].imgNumber}.png`;
        }
        img.src = path;
        uImg.src = uPath;
        setImgSrc(path)
        setUniqueImgsrc(uPath);
        if(cardInfoArr[cardNumber].isRotate === true){
            setPrivateRotate(true);
        }

    }, [singleManager])
    // useEffect(()=>{
        
    // }, [singleManager])

    const onDragStartHandler = (e : MouseEvent) => {
        e.preventDefault();
        let alpha;
        let beta;
        alpha = -(waitingInfo.x - (e.pageX - e.offsetX));
        beta = -(waitingInfo.y - (e.pageY - e.offsetY));
        
        if(!cardInfoArr[cardNumber].isDraged) return;
        let _singleManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
        let _singleProjectArr = _singleManager.singleProjectArr;
        let _cardInfoArr = _singleProjectArr[cur_ProjectNumber].cardInfoArr;
        _cardInfoArr[cardNumber].isDraged = true;

        if(_singleProjectArr[cur_ProjectNumber].oracleType === 0
        && _singleProjectArr[cur_ProjectNumber].NS_T_UseAutoDeck !== 0    
        ){
            if(cardNumber < _singleProjectArr[cur_ProjectNumber].initialCardCount){
                _cardInfoArr[cardNumber].newX = alpha;
                _cardInfoArr[cardNumber].newY = beta;
            }
        }
        setSingleManager(_singleManager);
    }

    const onDragHandler = (e : MouseEvent) => {
        e.preventDefault();
        let posX = e.pageX;
        let posY = e.pageY;
        if(
            posX > positioninfo.carpetInfo.left &&
            posX < positioninfo.carpetInfo.right &&
            posY > positioninfo.carpetInfo.top &&
            posY < positioninfo.carpetInfo.bottom
        ){
            if(cardInfoArr[cardNumber].isInSpread) return;
            let _singleManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
            let _singleProjectArr = _singleManager.singleProjectArr;
            let _cardInfoArr = _singleProjectArr[cur_ProjectNumber].cardInfoArr;
            _singleProjectArr[cur_ProjectNumber].rem_CardCount--;
            _cardInfoArr[cardNumber].isInSpread = true;

            setSingleManager(_singleManager);
        }
    }
    const onDragEndHandler = (e : MouseEvent) => {
        let posX = e.pageX;
        let posY = e.pageY;
        let alpha;
        let beta;
        alpha = -(waitingInfo.x - (e.pageX - e.offsetX));
        beta = -(waitingInfo.y - (e.pageY - e.offsetY));

        let rotateTrueX = (waitingInfo.height - waitingInfo.width) / 2;
        let rotateTrueY = -(waitingInfo.height / 2 - waitingInfo.width / 2);

        let _singleManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
        let _singleProjectArr = _singleManager.singleProjectArr;
        let _cardInfoArr = _singleProjectArr[cur_ProjectNumber].cardInfoArr;
        let errX : number;
        let errY : number;

        if(privateRotate === false){
            alpha = -(waitingInfo.x - (e.pageX - e.offsetX));
            beta = -(waitingInfo.y - (e.pageY - e.offsetY))
        }
        else{
            let tempX = (waitingInfo.height - waitingInfo.width) / 2;
            let tempY = -(waitingInfo.height / 2 - waitingInfo.width / 2);

            alpha = tempX - (waitingInfo.x - (e.pageX - e.offsetY)); // 오케이
            beta = -(
                tempY +
                (waitingInfo.y - (e.pageY + e.offsetX - waitingInfo.height))
            );
        }

        if(
            posX > positioninfo.carpetInfo.left &&
            posX < positioninfo.carpetInfo.right &&
            posY > positioninfo.carpetInfo.top &&
            posY < positioninfo.carpetInfo.bottom
        ){
            
            _cardInfoArr[cardNumber].newX = alpha;
            _cardInfoArr[cardNumber].newY = beta;
            setSingleManager(_singleManager);
        }
    }

    const onDoubleClickHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if(cardInfoArr[cardNumber].isInSpread === false) return;
        let _flag = privateRotate;
        setPrivateRotate((prev) => !prev);
        let _singleManager = JSON.parse(JSON.stringify(singleManager));
        _singleManager.singleProjectArr[cur_ProjectNumber]
        .cardInfoArr[cardNumber].isRotate = !_flag;
        setSingleManager(_singleManager);
    }
    const setStyles = () : object => {
        let tempObj = {}
        if(singleProjectArr[cur_ProjectNumber].oracleType === 0){
            let autoDeckNum = singleProjectArr[cur_ProjectNumber].NS_T_UseAutoDeck;
            if(autoDeckNum !== 0){
                if(cardNumber < singleProjectArr[cur_ProjectNumber].initialCardCount){
                    if(!cardInfoArr[cardNumber].isDraged){
                        let _autoDeckInfo = AutoDeckGenerator(
                            singleProjectArr[cur_ProjectNumber].NS_T_UseAutoDeck,
                            {
                                x : -(carpetInfo.width / 2) -(waitingInfo.width/2),
                                y : (carpetInfo.height / 2) - (waitingInfo.height/2)
                            },
                            {width : carpetInfo.width, height : carpetInfo.height},
                            cardNumber
                        )
                        tempObj = {
                            x : _autoDeckInfo.x,
                            y : _autoDeckInfo.y,
                            zIndex: 0,
                        }
                    }
                    else{
                        tempObj = {
                            x : cardInfoArr[cardNumber].newX,
                            y : cardInfoArr[cardNumber].newY,
                            zIndex : 0
                        }
                    }
                }
                else{ // Extra

                }
            }
            else{ // Free Deck
                if(cardInfoArr[cardNumber].isInSpread === false){
                    tempObj = {
                        zIndex : cardInfoArr[cardNumber].zIdx,
                        //x : cardInfoArr[cardNumber].newX,
                        //y : cardInfoArr[cardNumber].newY,
                    }
                }
                else if(cardInfoArr[cardNumber].isInSpread === true){
                    tempObj = {
                        x : cardInfoArr[cardNumber].newX,
                        y : cardInfoArr[cardNumber].newY,
                        zIndex : 0
                    }
                }
            }
        }
        else { // Not Tarot
            if(cardInfoArr[cardNumber].isInSpread === false){
                    tempObj = {
                        zIndex : cardInfoArr[cardNumber].zIdx,
                        //x : cardInfoArr[cardNumber].newX,
                        //y : cardInfoArr[cardNumber].newY,
                    }
                }
                else if(cardInfoArr[cardNumber].isInSpread === true){
                    tempObj = {
                        x : cardInfoArr[cardNumber].newX,
                        y : cardInfoArr[cardNumber].newY,
                        zIndex : 0
                    }
                }
        }

        return tempObj;
    }

    const imgStyles = () : object => {
        let tempObj = {}
        if(privateRotate === false){
            tempObj={
                width: `${waitingInfo.width}px`,
                height: `${waitingInfo.height}px`
            }
        }
        else{
            tempObj={
                width: `${waitingInfo.height}px`,
                height: `${waitingInfo.width}px`
            }
        }

        return tempObj;
    }
    const setStyle = () : object => {
        let tempObj : object = {};
        if(isInCarpet === false){
            tempObj = {
                zIndex : cardInfoArr[cardNumber].zIdx,
                x : cardInfoArr[cardNumber].newX,
                y : cardInfoArr[cardNumber].newY,
            }
        }
        else if(isInCarpet === true){
             tempObj = {
                x : cardInfoArr[cardNumber].newX,
                y : cardInfoArr[cardNumber].newY,
                zIndex : 0
            }
        }

        return tempObj
    }


    const containerVar = {
        initial:{
            width: !privateRotate ? `${waitingInfo.width}px` : `${waitingInfo.height}px`,
            height: !privateRotate ? `${waitingInfo.height}px` : `${waitingInfo.width}px`,
            opacity: 0,
        },
        rotateFalse :{
            width: `${waitingInfo.width}px`,
            height: `${waitingInfo.height}px`,
            rotateZ : 0,
            opacity: 1,

        },
        rotateTrue :{
            width: `${waitingInfo.height}px`,
            height: `${waitingInfo.width}px`,
            opacity: 1,
        },
        hover:{
            scale: 1.05
        }
    }
    const imgContainerVar = {
        initial:{
            rotateZ : !privateRotate ? 0 : -90,
            padding: '1%',
        },
        rotateFalse :{
            width: `${waitingInfo.width}px`,
            height: `${waitingInfo.height}px`,
            rotateZ : 0,
            padding: '5%',

        },
        rotateTrue :{
            width: `${waitingInfo.width}px`,
            height: `${waitingInfo.height}px`,
            rotateZ : -90,
            padding: '2%',
        },
        hover:{
            backgroundColor: 'rgba(240, 147, 43, 0.7)'
        }
    }

  return (
    <Draggable nodeRef={cardRef}>
        <AnimatePresence>
        <DragCardContainer
            ref={cardRef}
            positioninfo={positioninfo}
            imgsrc={!cardInfoArr[cardNumber].isFlip 
                ? `${process.env.PUBLIC_URL}${imgsrc}`
                : `${process.env.PUBLIC_URL}${uniqueImgsrc}`
            }
            drag
            dragElastic={0.56}
            dragSnapToOrigin={!cardInfoArr[cardNumber].isInSpread}
            dragMomentum={false}
            dragConstraints={cardInfoArr[cardNumber].isInSpread ? refArr[1] : refArr[0]}
            style={setStyles()}
            onDragStart={onDragStartHandler}
            onDrag={onDragHandler}
            onDragEnd={onDragEndHandler}
            onClick={(e) => {
                e.preventDefault();
                // console.log(
                //     cardInfoArr[cardNumber]
                // )
            }}
            onDoubleClick={onDoubleClickHandler}
            privaterotate={privateRotate === true ? "true" : "false"}
            variants={containerVar}
            initial={containerVar.initial}
            animate={
                !privateRotate
                ? containerVar.rotateFalse
                : containerVar.rotateTrue
            }
            whileHover={
                containerVar.hover
            }
            
        >
            <AnimatePresence>
                <motion.div
                    variants={
                        imgContainerVar
                    }
                    initial={imgContainerVar.initial}
                    animate={
                        !privateRotate
                        ? imgContainerVar.rotateFalse
                        : imgContainerVar.rotateTrue
                    }
                    whileHover={
                        imgContainerVar.hover
                    }
                >
                    <motion.div
                        variants={imgContainerVar}
                        animate={{
                            width: `${waitingInfo.width - (waitingInfo.width * 0.05)}px`,
                            height: `${waitingInfo.height - (waitingInfo.width * 0.05)}px`,
                        }}
                        
                    >
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </DragCardContainer>
        </AnimatePresence>
    </Draggable> 
  )
}

export default React.memo(DragCard)