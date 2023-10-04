/*eslint-disable */

import React, { useLayoutEffect, useRef, useState } from "react";
import { SS_FindCommon } from "./FindSingle.styled";

import Draggable from "react-draggable";
import { IPositionInfo } from "common_resources/CommonInterfaces";
import { SS_Common } from "../SingleSpreadZone.styled";
import { useRecoilState } from "recoil";
import {
  ISingleControlManagerAtom,
  singleControlManagerAtom,
} from "recoil/SingleAtom";
import { AnimatePresence } from "framer-motion";

interface IFindSingleProps {
  refArr: React.MutableRefObject<HTMLDivElement>[];
  positioninfo: IPositionInfo;
}
function FindSingle(props: IFindSingleProps) {
  const [singleManager, setSingleManager] =
    useRecoilState<ISingleControlManagerAtom>(singleControlManagerAtom);
  const { cur_ProjectNumber, singleProjectArr } = singleManager;
  const [containerInfo, setContainerInfo] = useState({ width: 0, height: 0 });
  const [isModeZoom, setisModeZoom] = useState<boolean>(true);
  const { waitingInfo, carpetInfo, gapX, gapY } = props.positioninfo;

  const findRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useLayoutEffect(() => {
    let _info = findRef.current.getBoundingClientRect();
    //console.log(_info);
    setContainerInfo({
      width: _info.width,
      height: _info.height,
    });
  }, []);
  const onModeHadler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    let _temp: ISingleControlManagerAtom = JSON.parse(
      JSON.stringify(singleManager)
    );
    let _flag = _temp.singleProjectArr[cur_ProjectNumber].isFindModeZoom;
    _temp.singleProjectArr[cur_ProjectNumber].isFindModeZoom = !_flag;
    setSingleManager(_temp);
    setisModeZoom((prev) => !prev);
  };

  const onFindHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    let _temp: ISingleControlManagerAtom = JSON.parse(
      JSON.stringify(singleManager)
    );
    _temp.singleProjectArr[cur_ProjectNumber].isOpenFindPannel = true;
    setSingleManager(_temp);
  };

  const { optionBtnVar } = SS_Common;
  return (
    // <Draggable nodeRef={findRef}>
    // </Draggable>

    <SS_FindCommon.Container
      ref={findRef}
      //drag
      //dragConstraints={props.refArr[1]}
      //dragElastic={0.56}
      //dragMomentum={false}
      // initial={{
      //     x : `${containerInfo.width}`,
      //     y : 10
      // }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        right: `${containerInfo.width + 75}px`,
        top: `${gapY + waitingInfo.y / 4}px`,
      }}
    >
      <SS_FindCommon.InContainer>
        <AnimatePresence>
          <SS_FindCommon.ImgContainer
            imgsrc={
              singleProjectArr[cur_ProjectNumber].isFindModeZoom === true
                ? singleProjectArr[cur_ProjectNumber].zoomImgPath === null
                  ? `${
                      process.env.PUBLIC_URL
                    }${`/images/BackOfCards/BackOfCard0.png`}`
                  : `${process.env.PUBLIC_URL}${singleProjectArr[cur_ProjectNumber].zoomImgPath}`
                : // isFindModeZoom === false
                singleProjectArr[cur_ProjectNumber].findImgPath === null
                ? `${
                    process.env.PUBLIC_URL
                  }${`/images/BackOfCards/BackOfCard0.png`}`
                : `${process.env.PUBLIC_URL}${singleProjectArr[cur_ProjectNumber].findImgPath}`
            }
          >
            <div
              style={
                singleProjectArr[cur_ProjectNumber].isFindModeZoom === true
                  ? singleProjectArr[cur_ProjectNumber].zoomImgPath === null
                    ? { opacity: 0.5 }
                    : { opacity: 1 }
                  : // isFindModeZoom === false
                  singleProjectArr[cur_ProjectNumber].findImgPath === null
                  ? { opacity: 0.5 }
                  : { opacity: 1 }
              }
            ></div>
          </SS_FindCommon.ImgContainer>
        </AnimatePresence>
        <SS_FindCommon.BoxForCard
          variants={optionBtnVar}
          initial={optionBtnVar.initial}
          animate={optionBtnVar.active}
        >
          {singleProjectArr[cur_ProjectNumber].isFindModeZoom === true
            ? singleProjectArr[cur_ProjectNumber].zoomImgName === null
              ? `IS ANY CARD NOT SELECTED`
              : singleProjectArr[cur_ProjectNumber].zoomImgName
            : // isFindModeZoom === false
            singleProjectArr[cur_ProjectNumber].findImgName === null
            ? `IS ANY CARD NOT SELECTED`
            : singleProjectArr[cur_ProjectNumber].findImgName}
        </SS_FindCommon.BoxForCard>
        <SS_FindCommon.BoxForCard
          variants={optionBtnVar}
          initial={optionBtnVar.initial}
          animate={optionBtnVar.active}
          whileHover={optionBtnVar.hover}
          style={{
            cursor: "pointer",
          }}
          onClick={onModeHadler}
        >
          {singleProjectArr[cur_ProjectNumber].isFindModeZoom
            ? "CURRENT : ZOOM"
            : "CURRENT : FIND"}
        </SS_FindCommon.BoxForCard>
        <SS_FindCommon.OpenFindBox
          variants={optionBtnVar}
          initial={optionBtnVar.initial}
          animate={optionBtnVar.active}
          whileHover={optionBtnVar.hover}
          onClick={onFindHandler}
        >
          FIND
        </SS_FindCommon.OpenFindBox>
      </SS_FindCommon.InContainer>
    </SS_FindCommon.Container>
  );
}

export default React.memo(FindSingle);
