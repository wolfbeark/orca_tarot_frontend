/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {motion, AnimatePresence} from 'framer-motion';

import { HorCenterDiv, VerCenterDiv } from 'common_resources/CommonStyle';
import { useRecoilState } from 'recoil';
import { singleControlManagerAtom } from 'recoil/SingleAtom';
import DragCard from '../DragCard';
import { ICustomDOMPosition, IPositionInfo, PositionValueObj } from 'common_resources/CommonInterfaces';
const SingleSpreadContainer = styled(HorCenterDiv)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding-right: 0.5%;
`
const InSingleSpreadZone = styled(HorCenterDiv)`
  width: 95%;
  height: 98%;
  background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
  border-radius: ${(props) => props.theme.borders.small};
  justify-content: space-between;
  padding: 0.5%;
  //z-index: 500;
`
const SpreadCarpet = styled(HorCenterDiv)`
  width: 86%;
  height: 100%;
  background-color: ${(props) => props.theme.spreadCarpet};
  border-radius: inherit;
  position: relative;
`
const SpreadControl = styled(VerCenterDiv)`
  width: 13.5%;
  height: 100%;
  border-radius: inherit;
  background-color: darkblue;
  justify-content: flex-start;
  padding: 0.5%;
`
const CardBox = styled(HorCenterDiv)`
  width: 100%;
  height: 21%;
  background-color: pink;
  padding: 1%;
  margin-bottom: 2%;
  & > div {
    width: 100%;
    height: 100%;
    background-color: gray;
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
`
const CardWaitingZone = styled(HorCenterDiv)`
  width: 48%;
  height: 100%;
  background-color: brown;
`
const ExtraDeckZone = styled(HorCenterDiv)`
  width: 48%;
  height: 100%;
  background-color: indianred;
`

const CardCounterBox = styled(VerCenterDiv)`
    width: 100%;
    height: 15%;
    background-color: olive;
    justify-content: space-between;
    padding: 1%;
    user-select: none;
    border-radius: ${(props) => props.theme.borders.small};
    & > div{
        justify-content: space-between;
    }
`
const CardTotalNotice = styled(HorCenterDiv)`
    width: 100%;
    height: 49%;
    background-color: skyblue;
    border-radius: inherit;
    & div{
        border-radius : inherit;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    & div:first-child{
        width: 30%;
        height: 100%;
        background-color: gray;
        justify-content: flex-start;
    }
    & div:last-child{
        width: 68%;
        height: 100%;
        background-color: navy;
    }
`
const CardRemainNotice = styled(HorCenterDiv)`
    width: 100%;
    height: 49%;
    background-color: orangered;
    border-radius: inherit;
    & div{
        border-radius: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    & div:first-child{
        width: 30%;
        height: 100%;
        background-color: gray;
        justify-content: flex-start;
    }
    & div:last-child{
        width: 68%;
        height: 100%;
        background-color: navy;
    }
`
function SingleSpreadZone() {

    const [singleManager, setSingleManager] = useRecoilState(singleControlManagerAtom);
    const {
        cur_ProjectNumber,
        singleProjectArr
    } = singleManager
    const totalRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const carpetRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const waitingRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const [positionInfo, setPositionInfo] = useState<IPositionInfo>({
        waitingInfo : PositionValueObj,
        carpetInfo : PositionValueObj,
        gapX : 0,
        gapY : 0,
    });
    const [refArr, setRefArr] = useState<React.MutableRefObject<HTMLDivElement>[]>([totalRef, carpetRef]);
    useEffect(() => {
        let _waiting = waitingRef?.current.getBoundingClientRect();
        let _carpet = carpetRef?.current.getBoundingClientRect();
        let _tempObj : IPositionInfo = {
            waitingInfo: {
                bottom: _waiting.bottom,
                height: _waiting.height,
                left: _waiting.left,
                right: _waiting.right,
                top: _waiting.top,
                width: _waiting.width,
                x: _waiting.x,
                y: _waiting.y
            },
            carpetInfo: {
                bottom: _carpet.bottom,
                height: _carpet.height,
                left: _carpet.left,
                right: _carpet.right,
                top: _carpet.top,
                width: _carpet.width,
                x: _carpet.x,
                y: _carpet.y
            },
            gapX : (_waiting.x - _carpet.x),
            gapY : (_waiting.y - _carpet.y),
        };
        
        setPositionInfo(_tempObj)
    }, [])
  return (
    <SingleSpreadContainer>
        <InSingleSpreadZone
            ref={totalRef}
        >
          <SpreadCarpet
            ref={carpetRef}
          >
            {
                singleProjectArr[cur_ProjectNumber].cardInfoArr.map((a, i) => {

                    return(
                        <DragCard
                            key={`dragCard${i}${a.imgNumber}${a.oracleType}`} 
                            positioninfo={positionInfo}
                            cardNumber={i}
                            refArr={refArr}
                        />
                    );
                })
            }
          </SpreadCarpet>
          <SpreadControl>
            <CardBox>
              <motion.div>
                <CardWaitingZone
                    ref={waitingRef}
                ></CardWaitingZone>
                <ExtraDeckZone></ExtraDeckZone>
              </motion.div>
            </CardBox>
            <CardCounterBox>
                <CardTotalNotice>
                    <div>Total</div>
                    <div>
                    {
                        singleProjectArr[cur_ProjectNumber].totalCardCount
                    }
                    </div>
                </CardTotalNotice>
                <CardRemainNotice>
                    <div>Remain</div>
                    <div>
                    {
                        singleProjectArr[cur_ProjectNumber].rem_CardCount
                    }
                    </div>
                </CardRemainNotice>
            </CardCounterBox>
          </SpreadControl>
        </InSingleSpreadZone>
      </SingleSpreadContainer>
  )
}

export default React.memo(SingleSpreadZone);