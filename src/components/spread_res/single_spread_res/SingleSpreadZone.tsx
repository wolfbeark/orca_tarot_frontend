/* eslint-disable */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { HorCenterDiv, VerCenterDiv } from "common_resources/CommonStyle";
import { useRecoilState } from "recoil";
import {
  ISingleControlManagerAtom,
  ISingleRestartItem,
  singleControlManagerAtom,
} from "recoil/SingleAtom";
import DragCard from "../DragCard";
import {
  ICustomDOMPosition,
  IPositionInfo,
  PositionValueObj,
} from "common_resources/CommonInterfaces";
import { SpreadControlBtnNameArr } from "common_resources/CommonData";
import MakeExtraPannel from "./MakeExtraPannel/MakeExtraPannel";
import html2canvas from "html2canvas";
import {
  SSO_RQuestion,
  SS_Common,
  SS_RestartFirst,
} from "./SingleSpreadZone.styled";
import RestartSingleSpread from "./RestartSingle/RestartSingleSpread";
//import { ISingleRestartItem, ISingleRestartManager, singleRestartManagerAtom } from 'recoil/RestartAtom';
import { useLocation, useParams } from "react-router-dom";
import HideSingle from "./HideSingle/HideSingle";
import FindSingle from "./FindSingle/FindSingle";
import FindSingle_Second from "./FindSingle/FindSingle_Second";
interface IPreviewContainer {
  positioninfo?: IPositionInfo;
  imgsrc?: string;
}

const SingleSpreadContainer = styled(HorCenterDiv)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding-right: 0.5%;
  position: relative;
`;
const InSingleSpreadZone = styled(HorCenterDiv)`
  width: 95%;
  height: 98%;
  background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
  border-radius: ${(props) => props.theme.borders.small};
  justify-content: space-between;
  padding: 0.5%;
  //z-index: 500;
`;
const SpreadCarpet = styled(HorCenterDiv)`
  width: 80%;
  height: 100%;
  background-color: ${(props) => props.theme.spreadCarpet};
  border-radius: inherit;
  position: relative;
`;
const SpreadControl = styled(VerCenterDiv)`
  width: 19.5%;
  height: 100%;
  border-radius: inherit;
  background-color: ${(props) => props.theme.spreadCarpet};
  justify-content: space-between;
  padding: 0.5%;
`;
const CardBox = styled(HorCenterDiv)`
  width: 100%;
  height: 30%;
  background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
  border-radius: inherit;
  padding: 1%;

  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: inherit;
  }
`;
const CardWaitingZone = styled(HorCenterDiv)`
  width: 48%;
  height: 100%;
  background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
  border-radius: inherit;
  border: 2px solid rgba(24, 220, 255, 0.3);
`;
const ExtraDeckZone = styled(HorCenterDiv)`
  width: 48%;
  height: 100%;
  background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
  border-radius: inherit;
  padding: 1%;
  border: 2px solid rgba(24, 220, 255, 0.3);
`;

const CardCounterBox = styled(VerCenterDiv)`
  width: 100%;
  height: 20%;
  background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
  justify-content: space-between;
  padding: 1%;
  border-radius: ${(props) => props.theme.borders.small};

  & > div {
    justify-content: space-between;
  }
`;
const CardTotalNotice = styled(HorCenterDiv)`
  width: 100%;
  height: 49%;
  background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
  border-radius: inherit;
  border: 2px solid rgba(24, 220, 255, 0.3);

  & div {
    border-radius: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    color: beige;
  }
  & div:first-child {
    width: 50%;
    height: 100%;
    background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
    //justify-content: flex-start;
    padding-left: 2%;
  }
  & div:last-child {
    width: 48%;
    height: 100%;
    background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
  }
`;
const CardRemainNotice = styled(HorCenterDiv)`
  width: 100%;
  height: 49%;
  background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
  border-radius: inherit;
  border: 2px solid rgba(24, 220, 255, 0.3);

  & div {
    border-radius: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    color: beige;
  }
  & div:first-child {
    width: 50%;
    height: 100%;
    background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
    //justify-content: flex-start;
    padding-left: 2%;
  }
  & div:last-child {
    width: 48%;
    height: 100%;
    background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
  }
`;
const SpreadControlBtnBox = styled(VerCenterDiv)`
  width: 100%;
  height: 55%;
  background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
  justify-content: space-evenly;
  padding: 1%;
  border-radius: inherit;
  cursor: pointer;
`;
const ControlBtn = styled(HorCenterDiv)`
  width: 100%;
  height: 15%;
  background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
  border: 2px solid rgba(24, 220, 255, 0.7);
  color: rgba(255, 255, 255, 1);
  padding: 1%;
  border-radius: inherit;
  & div {
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const PreviewBox = styled(HorCenterDiv)<IPreviewContainer>`
  width: 10%;
  height: 10%;
  background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
  border: 2px solid rgba(24, 220, 255, 0.3);
  color: ${(props) => props.theme.spreadDefaultTextColor};
  border-radius: inherit;
  position: absolute;
  left: 1%;
  bottom: 7%;
  & div {
    border-radius: inherit;
  }
  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    position: relative;
    & > div {
      cursor: auto;
      width: 400%;
      height: 300%;
      background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
      position: absolute;
      left: 110%;
      bottom: -60%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5%;
      & > div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
        padding: 1%;
      }
    }
  }
`;
const PreviewCard = styled(HorCenterDiv)<IPreviewContainer>`
  width: ${(props) =>
    props.positioninfo ? `${props.positioninfo.waitingInfo.width}px` : "30%"};
  height: ${(props) =>
    props.positioninfo ? `${props.positioninfo.waitingInfo.height}px` : "100%"};
  padding: 2%;
  background-color: ${(props) => props.theme.defaultBaseOpaqueColor};
  border-radius: ${(props) => props.theme.borders.small};
  border: 2px solid rgba(24, 220, 255, 0.3);
  position: relative;
  & div:first-child {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    image-rendering: -webkit-optimize-contrast;
    background: url(${(props) => props.imgsrc});
    background-size: 100% 100%;
  }
  & div:last-child {
    width: 100%;
    height: 100%;
    //background-color: rgba(20, 20, 20, 0.2);
    background-color: black;
    position: absolute;
  }
`;
const ExtraBtnBox = styled(HorCenterDiv)<IPreviewContainer>`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.imgsrc});
  background-size: 100% 100%;
  cursor: pointer;
`;

const TestExtraBox = styled(HorCenterDiv)`
  width: 100%;
  height: 100%;
  background-color: yellow;
  position: absolute;
  opacity: 0.5;
`;
function SingleSpreadZone() {
  const location = useLocation();
  const params = useParams();
  const [singleManager, setSingleManager] = useRecoilState(
    singleControlManagerAtom
  );
  const { cur_ProjectNumber, singleProjectArr } = singleManager;

  //const [singleResManager, setSingleResManager] = useRecoilState<ISingleRestartManager>(singleRestartManagerAtom);

  const totalRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const carpetRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const waitingRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [positionInfo, setPositionInfo] = useState<IPositionInfo>({
    waitingInfo: PositionValueObj,
    carpetInfo: PositionValueObj,
    gapX: 0,
    gapY: 0,
  });
  const [previewImgSrcArr, setPreviewImgSrcArr] = useState<string[]>([]);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [refArr, setRefArr] = useState<
    React.MutableRefObject<HTMLDivElement>[]
  >([totalRef, carpetRef]);

  // 2023.02.13 수술중
  const [isOpenExtraMake, setIsOpenExtraMake] = useState<boolean>(false);
  const [isOpenFind, setIsOpenFind] = useState<boolean>(true);
  const [isOpenRestart, setIsOpenRestart] = useState<boolean>(false);
  const [isOpenHide, setIsOpenHide] = useState<boolean>(false);

  const { optionBtnVar } = SS_Common;
  //console.log(location)
  //console.log(params);

  useEffect(() => {
    if (singleProjectArr[cur_ProjectNumber].isHideOpen) {
      setIsOpenHide(true);
    }
  }, [
    singleManager.cur_ProjectNumber,
    singleManager.singleProjectArr,
    singleManager,
  ]);

  useLayoutEffect(() => {
    if (singleProjectArr[cur_ProjectNumber].NS_T_PreviewCard) {
      let _tempArr: string[] = [];
      for (let i = 0; i < 3; i++) {
        let img = new Image();
        let _num =
          singleProjectArr[cur_ProjectNumber].NS_T_PreviewCardNumArr[i];
        let path = `/images/TarotDefault/Default${_num}.png`;
        _tempArr[i] = path;
      }
      setPreviewImgSrcArr(_tempArr);
    }
  }, [singleProjectArr]);
  useEffect(() => {
    //if(singleProjectArr[cur_ProjectNumber].isRestarting === false){
    let _waiting = waitingRef?.current.getBoundingClientRect();
    let _carpet = carpetRef?.current.getBoundingClientRect();
    let _tempObj: IPositionInfo = {
      waitingInfo: {
        bottom: _waiting.bottom,
        height: _waiting.height,
        left: _waiting.left,
        right: _waiting.right,
        top: _waiting.top,
        width: _waiting.width,
        x: _waiting.x,
        y: _waiting.y,
      },
      carpetInfo: {
        bottom: _carpet.bottom,
        height: _carpet.height,
        left: _carpet.left,
        right: _carpet.right,
        top: _carpet.top,
        width: _carpet.width,
        x: _carpet.x,
        y: _carpet.y,
      },
      gapX: _waiting.x - _carpet.x,
      gapY: _waiting.y - _carpet.y,
    };
    setPositionInfo(_tempObj);
    //}
    // else{
    // setIsOpenRestart(true);
    // }
  }, [
    singleManager.cur_ProjectNumber,
    singleManager.singleProjectArr[cur_ProjectNumber].isRestarting,
  ]);

  const onPreviewOpenControl = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) return;
    setPreviewOpen(!previewOpen);
  };
  const spreadContorlBtnHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    type: number
  ) => {
    e.preventDefault();
    let _singleManager: ISingleControlManagerAtom = JSON.parse(
      JSON.stringify(singleManager)
    );
    let _singleProjectArr = _singleManager.singleProjectArr;
    let _cardInfoArr = _singleProjectArr[cur_ProjectNumber].cardInfoArr;

    if (type === 0) {
      //setIsOpenRestart(true);
      onClickRestartOptionBtn(e, 0);
      // let _tempOption : ISpreadOptionAtom = JSON.parse(JSON.stringify(spreadOption));
      // _tempOption.isOpenedOption = true;
      // _tempOption.openedOptionType = 0;
      // setSpreadOption(_tempOption);
    } else if (type === 1) {
      _singleProjectArr[cur_ProjectNumber].isHideOpen = true;
      setSingleManager(_singleManager);
    } else if (type === 2) {
      let flag = _singleProjectArr[cur_ProjectNumber].isFindOpen;
      _singleProjectArr[cur_ProjectNumber].isFindOpen = !flag;
      setSingleManager(_singleManager);
      //setIsOpenFind((prev) => !prev);
    } else if (type === 3) {
      for (let i = 0; i < _cardInfoArr.length; i++) {
        if (
          _cardInfoArr[i].isFlip === true ||
          _cardInfoArr[i].isInSpread === false
        )
          continue;
        _cardInfoArr[i].isFlip = true;
      }

      _singleManager.singleProjectArr[cur_ProjectNumber].cardInfoArr =
        _cardInfoArr;
      setSingleManager(_singleManager);
    } else if (type === 4) {
      onCaptureHandler();
    }
  };

  const optionalBtnVar = {
    initial: {
      opacity: 0,
    },
    active: {
      opacity: 1,
      borderRadius: "5px",
      backgroundColor: "rgba(20, 20, 20, 0.2)",
      color: "rgba(255, 255, 255, 1)",
      border: "2px solid rgba(24, 220, 255, 0.3)",
    },
    inactive: {
      opacity: 1,
      backgroundColor: "rgba(0, 0, 0, 0)",
      border: "0px solid rgba(24, 220, 255, 0)",
      color: "rgba(83, 92, 104,1.0)",
    },
    hover: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      borderRadius: "5px",
      color: [
        "rgba(83, 92, 104,1.0)",
        "rgba(240, 147, 43,1.0)",
        "rgba(83, 92, 104,1.0)",
      ],
      border: "2px solid rgba(24, 220, 255, 0.7)",

      transition: {
        color: {
          repeat: Infinity,
          duration: 1,
        },
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const onCaptureHandler = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);
    let dateString = year + month + day;

    let projectName = singleProjectArr[cur_ProjectNumber].projectName;
    let projectType =
      singleProjectArr[cur_ProjectNumber].projectType === false
        ? "Normal"
        : "Sandbox";
    let _id = singleProjectArr[cur_ProjectNumber].projectId;

    let tempName: string =
      dateString + "_" + projectType + _id + "_" + projectName + ".png";

    html2canvas(document.getElementById("singleSpreadZone")).then((canvas) => {
      onSaveAs(canvas.toDataURL("image/png"), tempName);
    });
  };
  const onSaveAs = (uri: any, filename: any) => {
    let link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;

    link.click();
    document.body.removeChild(link);
  };
  const onClickRestartOptionBtn = (
    e: React.MouseEvent<HTMLDivElement>,
    type: number
  ) => {
    e.preventDefault();
    if (type === 0) {
      let _tempManager: ISingleControlManagerAtom = JSON.parse(
        JSON.stringify(singleManager)
      );

      let _tempInfo: ISingleRestartItem = {
        creatingStep: 0,
        projectId: singleProjectArr[cur_ProjectNumber].projectId,
        projectName: singleProjectArr[cur_ProjectNumber].projectName,
        isSandbox: false,
        oracleType: null,
        cardCount: null,
        NS_T_PreviewCard: null,
        NS_T_UseAutoDeck: 0,
        tempRanNumArr: [],
      };
      _tempManager.singleProjectArr[cur_ProjectNumber].isRestarting = true;
      _tempManager.singleProjectArr[cur_ProjectNumber].restartInfo = {
        ..._tempInfo,
      };

      setSingleManager(_tempManager);
      setIsOpenRestart(false);
    } else if (type === 1) {
      setIsOpenRestart(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {singleManager.isExistProject &&
          singleManager.singleProjectArr[cur_ProjectNumber].isRestarting ===
            true && (
            <RestartSingleSpread
              key={`${singleProjectArr[cur_ProjectNumber].projectName}
              ${singleProjectArr[cur_ProjectNumber].projectId}
            `}
              projectId={singleProjectArr[cur_ProjectNumber].projectId}
              cur_projectNumber={singleManager.cur_ProjectNumber}
            />
          )}
      </AnimatePresence>
      <SingleSpreadContainer>
        <InSingleSpreadZone ref={totalRef} id="singleSpreadZone">
          <SpreadCarpet ref={carpetRef}>
            <AnimatePresence>
              {singleProjectArr[cur_ProjectNumber].oracleType === 0 &&
                singleProjectArr[cur_ProjectNumber].NS_T_PreviewCard && (
                  <PreviewBox positioninfo={positionInfo}>
                    <motion.div onClick={onPreviewOpenControl}>
                      Preview
                      <AnimatePresence>
                        {previewOpen && (
                          <motion.div>
                            <motion.div>
                              {previewImgSrcArr.map((a, i) => {
                                return (
                                  <AnimatePresence key={`previewCard${a}${i}`}>
                                    <PreviewCard
                                      positioninfo={positionInfo}
                                      imgsrc={`${process.env.PUBLIC_URL}${a}`}
                                    >
                                      <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1] }}
                                      ></motion.div>
                                      <motion.div
                                        initial={{ opacity: 1 }}
                                        animate={{ opacity: [1, 0] }}
                                      ></motion.div>
                                    </PreviewCard>
                                  </AnimatePresence>
                                );
                              })}
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </PreviewBox>
                )}
            </AnimatePresence>
          </SpreadCarpet>
          <SpreadControl>
            <CardBox>
              <motion.div>
                <CardWaitingZone ref={waitingRef}>
                  {singleProjectArr[cur_ProjectNumber].cardInfoArr.map(
                    (a, i) => {
                      return (
                        <DragCard
                          key={`dragCard
                                  ${i}${a.imgNumber}${a.oracleType}${singleProjectArr[cur_ProjectNumber].projectId}
                                `}
                          positioninfo={positionInfo}
                          cardNumber={i}
                          refArr={refArr}
                        />
                      );
                    }
                  )}
                </CardWaitingZone>
                <ExtraDeckZone>
                  <AnimatePresence>
                    {singleProjectArr[cur_ProjectNumber].rem_CardCount ===
                      0 && (
                      <ExtraBtnBox
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        imgsrc={`${process.env.PUBLIC_URL}/images/BackOfCards/BackOfCard0.png`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (
                            singleProjectArr[cur_ProjectNumber]
                              .rem_CardCount !== 0
                          )
                            return;
                          setIsOpenExtraMake(true);
                        }}
                      />
                    )}
                  </AnimatePresence>
                </ExtraDeckZone>
              </motion.div>
            </CardBox>
            <CardCounterBox>
              <CardTotalNotice>
                <div>Total</div>
                <div>{singleProjectArr[cur_ProjectNumber].totalCardCount}</div>
              </CardTotalNotice>
              <CardRemainNotice>
                <div>Remain</div>
                <div>{singleProjectArr[cur_ProjectNumber].rem_CardCount}</div>
              </CardRemainNotice>
            </CardCounterBox>
            <SpreadControlBtnBox>
              {SpreadControlBtnNameArr.map((a, i) => {
                return (
                  <ControlBtn
                    key={`spreadControlBtn${a}${i}`}
                    variants={optionalBtnVar}
                    animate={optionalBtnVar.active}
                    whileHover={optionalBtnVar.hover}
                    onClick={(e) => {
                      spreadContorlBtnHandler(e, i);
                    }}
                  >
                    <motion.div>{a}</motion.div>
                  </ControlBtn>
                );
              })}
            </SpreadControlBtnBox>
          </SpreadControl>
          <AnimatePresence>
            {singleProjectArr[cur_ProjectNumber].isFindOpen && (
              <FindSingle refArr={refArr} positioninfo={positionInfo} />
            )}
          </AnimatePresence>
        </InSingleSpreadZone>
        <AnimatePresence>
          {isOpenExtraMake && (
            <MakeExtraPannel setIsOpenExtraMake={setIsOpenExtraMake} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {singleProjectArr[cur_ProjectNumber].isHideOpen && <HideSingle />}
        </AnimatePresence>
        <AnimatePresence>
          {singleProjectArr[cur_ProjectNumber].isOpenFindPannel && (
            <FindSingle_Second />
          )}
        </AnimatePresence>
      </SingleSpreadContainer>
    </>
  );
}

export default React.memo(SingleSpreadZone);
