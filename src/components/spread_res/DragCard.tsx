/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import { HorCenterDiv } from 'common_resources/CommonStyle'
import { useRecoilState } from 'recoil';
import { singleControlManagerAtom } from 'recoil/SingleAtom';
import { ICustomDOMPosition, IPositionInfo } from 'common_resources/CommonInterfaces';
import Draggable from 'react-draggable';


// styled
interface IDragContainer {
    positioninfo : IPositionInfo,
    imgsrc? : string
}
// Props
interface IDragCard{
    positioninfo : IPositionInfo,
    cardNumber : number,
    refArr : React.MutableRefObject<HTMLDivElement>[]
}
const DragCardContainer = styled(HorCenterDiv)<IDragContainer>`
    width: ${(props) => `${props.positioninfo.waitingInfo.width}px`};
    height: ${(props) => `${props.positioninfo.waitingInfo.height}px`};
    left : ${(props) => `${props.positioninfo.gapX}px`};
    top : ${(props) => `${props.positioninfo.gapY}px`};
    
    border-radius: ${(props) => props.theme.borders.small};
    background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
    cursor: pointer;
    position: absolute;

    padding: 0.2%;
    user-select: none;

    & > div{
        width: 100%;
        height: 100%;
        background: url(${(props) => props.imgsrc});
        border-radius: inherit;
        image-rendering: -webkit-optimize-contrast;
        background-size: 100% 100%;
        justify-content: flex-end;
    }
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

    const [isInCarpet, setIsInCarpet] = useState<boolean>(false);

    const [defaultCardPos, setDefaultCardPos] = useState({
        x: waitingInfo.x - carpetInfo.x,
        y: waitingInfo.y - carpetInfo.y,
    });

    const [imgsrc, setImgSrc] = useState<string>('/images/BackOfCards/BackOfCard0.png');
    useEffect(()=> {
        if(cardInfoArr[cardNumber].oracleType === 2){
            setImgSrc(`/images/IChingDefault/iching${cardInfoArr[cardNumber].imgNumber}.png`);
        }
    }, [])
    //const imgsrc = `/images/BackOfCards/BackOfCard0.png`
    


    const onDragHandler = (e : MouseEvent) => {
        e.preventDefault();
        let posX = e.pageX;
        let posY = e.pageY;
        if(isInCarpet) return;
        if(
            posX > positioninfo.carpetInfo.left &&
            posX < positioninfo.carpetInfo.right &&
            posY > positioninfo.carpetInfo.top &&
            posY < positioninfo.carpetInfo.bottom
        ){
            setIsInCarpet(true);
        }
    }
    const onDragEndHandler = (e : MouseEvent) => {
        let posX = e.pageX;
        let posY = e.pageY;
        let alpha;
        let beta;
        alpha = -(waitingInfo.x - (e.pageX - e.offsetX));
        beta = -(waitingInfo.y - (e.pageY - e.offsetY));
    }
    const setStyle = () : object => {
        let tempObj : object = {};
        if(isInCarpet === false){
            tempObj = {
                zIndex : cardInfoArr[props.cardNumber].zIdx
            }
        }
        else if(isInCarpet === true){
            tempObj = {
                x : defaultCardPos.x,
                y : defaultCardPos.y,
                ZIndex : 0
            }
        }

        return tempObj
    }
  return (
    <Draggable nodeRef={cardRef}>
        <DragCardContainer
            ref={cardRef}
            positioninfo={positioninfo}
            imgsrc={`${process.env.PUBLIC_URL}${imgsrc}`}
            drag
            dragElastic={0.56}
            dragSnapToOrigin={
                isInCarpet === false
                ? true
                : false
            }
            dragMomentum={false}
            dragConstraints={
                isInCarpet === false
                ? refArr[0]
                : refArr[1]
            }
            style={setStyle()}
            //onDrag={(e, i) => {onDragHandler(e)}}
            onDrag={onDragHandler}
        >
            <div>
            {props.cardNumber}
            </div>
        </DragCardContainer>
    </Draggable>
  )
}

export default React.memo(DragCard)