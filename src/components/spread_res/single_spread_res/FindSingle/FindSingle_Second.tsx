/* eslint-disable */

import React, { useState } from 'react'
import { 
    DeckNameArr, 
    FindTypeInfo,
    ImgPathArr,
    IOracleInfoItem
 } from 'common_resources/CommonData';
import { SS_FindSecond } from './FindSingle.styled'
import { SS_Common } from '../SingleSpreadZone.styled';
import {AnimatePresence} from 'framer-motion';
import { ISingleControlManagerAtom, singleControlManagerAtom } from 'recoil/SingleAtom';
import { useRecoilState } from 'recoil';

function FindSingle_Second() {

    const [singleManager, setSingleManager] = useRecoilState<ISingleControlManagerAtom>(singleControlManagerAtom);

    //FindTypeInfo
    const [oracleNum, setOracleNum] = useState<number | null>(null);
    const [typeNum, setTypeNum] = useState<number | null>(null);
    const [hoverNum, setHoverNum] = useState<number | null>(null);
    const [selectNum, setSelectNum] = useState<number | null>(null);

    const [detailInfo, setDetailInfo] = useState<IOracleInfoItem | null>(null);
    const [detailList, setDetailList] = useState<string[] | null>(null);
    const [detailIdxArr, setDetailIdxArr] = useState<number[] | null>(null);
    const [hoverName, setHoverName] = useState<string | null>(null);
    const [selectName, setSelectName] = useState<string | null>(null);

    const defaultPath = `/images/BackOfCards/BackOfCard0.png`;
    const [selectImg, setSelectPath] = useState<string>(defaultPath);
    const [hoverImg, setHoverPath] = useState<string>(defaultPath);
    const {optionBtnVar} = SS_Common;
    
    const onChangeOracleNum = (e : React.MouseEvent<HTMLDivElement>, idx : number) => {
        e.preventDefault();
        if(oracleNum === idx) return;
        if(typeNum !== null) setTypeNum(null);
        if(detailList !== null) setDetailList(null);
        if(detailIdxArr !== null) setDetailIdxArr(null);
        let _tempInfo = FindTypeInfo[idx];
        setHoverNum(null);
        setSelectNum(null);
        setDetailInfo(_tempInfo);
        setOracleNum(idx);
    }

    const onChangeTypeHandler = (e : React.MouseEvent<HTMLDivElement>, idx : number) => {
        e.preventDefault();
        if(typeNum === idx) return;
        let _tempArr : string[] = [];
        let _tempIdxArr : number[] = [];
        let _startNum = detailInfo.idxArr[idx].startNum;
        let _lastNum = detailInfo.idxArr[idx].lastNum;
        if(oracleNum !== 3){
            for(let i = _startNum; i <= _lastNum; i++){
                _tempArr.push(
                    detailInfo.detailNameArr[i]
                );
                _tempIdxArr.push(i);
            }
        }
        else{
            if(idx === 0){
                _tempArr.push(detailInfo.detailNameArr[_startNum]);
                _tempArr.push(detailInfo.detailNameArr[_lastNum]);
                _tempIdxArr.push(_startNum);
                _tempIdxArr.push(_lastNum);
            }
            else{
                for(let i = _startNum; i <= _lastNum; i++){
                    _tempArr.push(
                        detailInfo.detailNameArr[i]
                    );
                    _tempIdxArr.push(i);
                }
            }
        }
        setDetailList(_tempArr);
        setSelectNum(null);
        setDetailIdxArr(_tempIdxArr);
        setTypeNum(idx);
        
    }
    const onHoverHandler = (e : React.MouseEvent<HTMLDivElement>, idx : number) => {
        e.preventDefault();
        let _tempNum = detailIdxArr[idx];
        let _tempPath = ImgPathArr[oracleNum].defaultPath + _tempNum + `.png`;
        setHoverPath(_tempPath);
        setHoverNum(idx);
        setHoverName(detailList[idx]);
    }

    const onChangeDetailHandler = (e : React.MouseEvent<HTMLDivElement>, idx : number) => {
        e.preventDefault();
        let _tempNum = detailIdxArr[idx];
        let _tempPath = ImgPathArr[oracleNum].defaultPath + _tempNum + `.png`;
        setSelectPath(_tempPath);
        setSelectNum(idx);
        setSelectName(detailList[idx]);
    }

    const onSelectImgSave = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if(selectImg === defaultPath) return;
        let _tempManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
        let {
            cur_ProjectNumber,
            singleProjectArr
        } = _tempManager;
        let _name = selectName;
        singleProjectArr[cur_ProjectNumber].findImgPath = selectImg;
        singleProjectArr[cur_ProjectNumber].findImgName = _name;
        singleProjectArr[cur_ProjectNumber].isOpenFindPannel = false;
        setSingleManager(_tempManager)
    
    }

    const onBackHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        let _tempManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
        let {
            cur_ProjectNumber,
            singleProjectArr
        } = _tempManager;

        singleProjectArr[cur_ProjectNumber].isOpenFindPannel = false;
        setSingleManager(_tempManager)
    }

    const testVar = {
        initial:{
            opacity: 0.5
        },
        hover:{
            opacity: 1
        },
        hoverEnd:{
            opacity: 0.5
        }
    }
    return (
        <SS_FindSecond.Container>
            <SS_FindSecond.InContainer>
                <SS_FindSecond.ControlBox>
                    <SS_FindSecond.OracleSelectBox>
                    {DeckNameArr.map((a,i) => {
                        return(
                        <SS_FindSecond.OracleSelectItem
                            key={`find_OracleSelect${i}`}
                            variants={optionBtnVar}
                            initial={optionBtnVar.initial}
                            animate={optionBtnVar.active}
                            whileHover={optionBtnVar.hover}
                            onClick={(e) => onChangeOracleNum(e, i)}
                        >
                        {a}
                        <AnimatePresence>
                        {oracleNum === i &&
                        <SS_FindSecond.RedCircle
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                        />
                        }
                        </AnimatePresence>
                        </SS_FindSecond.OracleSelectItem>
                        );
                    })}
                    </SS_FindSecond.OracleSelectBox>
                    <SS_FindSecond.DetailSelectBox>
                        <SS_FindSecond.TypeSelectBox>
                        {oracleNum !== null &&
                            detailInfo.typeNameArr.map((a, i) => {
                                return(
                                    <SS_FindSecond.TypeSelectItem
                                        key={`find_typeSelect${i}`}
                                        onClick={(e) => onChangeTypeHandler(e, i)}
                                        variants={optionBtnVar}
                                        animate={
                                            typeNum === i
                                            ? optionBtnVar.active
                                            : optionBtnVar.inactive
                                        }
                                        whileHover={optionBtnVar.hover}
                                    >
                                        {a}
                                        <AnimatePresence>
                                        {typeNum === i &&
                                        <SS_FindSecond.RedCircle
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            exit={{opacity: 0}}
                                        />
                                        }
                                        </AnimatePresence>
                                    </SS_FindSecond.TypeSelectItem>
                                );
                            })
                        }
                        </SS_FindSecond.TypeSelectBox>
                        <SS_FindSecond.CardSelectBox>
                        {(typeNum !== null && detailList !== null) &&
                            detailList.map((a, idx) => {
                                
                                return(
                                    <SS_FindSecond.CardSelectItem
                                        key={`find_typeDetailSelect${idx}`}
                                        onClick={(e) => onChangeDetailHandler(e, idx)}
                                        onMouseEnter={(e) => onHoverHandler(e, idx)}
                                        onMouseLeave={(e) => {
                                            e.preventDefault();
                                            setHoverName(null);
                                            setHoverNum(null);
                                            setHoverPath(defaultPath);
                                        }}
                                        variants={optionBtnVar}
                                        animate={
                                            (hoverNum === idx || selectNum === idx)
                                            ? optionBtnVar.active
                                            : optionBtnVar.inactive
                                        }
                                        whileHover={optionBtnVar.hover}
                                    >
                                        {/* {oracleNum !== 2 
                                        ? a 
                                        : `${detailInfo.idxArr[typeNum].startNum + idx + 1}` + ' ' + `${a}`
                                        } */}
                                        {a}
                                        <AnimatePresence>
                                        {(hoverNum === idx || selectNum === idx) &&
                                        <SS_FindSecond.RedCircle
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            exit={{opacity: 0}}
                                        />
                                        }
                                        </AnimatePresence>
                                    </SS_FindSecond.CardSelectItem>
                                );
                            })

                        }
                        </SS_FindSecond.CardSelectBox>
                        <SS_FindSecond.OptionControlBox>
                            <SS_FindSecond.CardPreviewBox>
                                <SS_FindSecond.CardImgBox>
                                    <SS_FindSecond.CardNameDes>Preview</SS_FindSecond.CardNameDes>
                                    <SS_FindSecond.CardImg
                                        imgsrc={`${process.env.PUBLIC_URL}${hoverImg}`}
                                        variants={testVar}
                                        initial={testVar.initial}
                                        animate={
                                            hoverImg !== defaultPath
                                            ? testVar.hover
                                            : testVar.hoverEnd
                                        }
                                    >
                                        <div></div>
                                    </SS_FindSecond.CardImg>
                                </SS_FindSecond.CardImgBox>
                                <SS_FindSecond.CardImgBox>
                                    <SS_FindSecond.CardNameDes>Your Choice</SS_FindSecond.CardNameDes>
                                    <SS_FindSecond.CardImg
                                        imgsrc={`${process.env.PUBLIC_URL}${selectImg}`}
                                        variants={testVar}
                                        initial={testVar.initial}
                                        animate={
                                            selectImg !== defaultPath
                                            ? testVar.hover
                                            : testVar.hoverEnd
                                        }
                                    >
                                        <div></div>
                                    </SS_FindSecond.CardImg>
                                </SS_FindSecond.CardImgBox>
                            </SS_FindSecond.CardPreviewBox>
                            <SS_FindSecond.OptionalBox>
                                <SS_FindSecond.CardNamePreview>
                                    <span>
                                        Preview Card
                                        <span>:</span>
                                    </span>
                                    <span>
                                    {hoverName}
                                    </span>
                                </SS_FindSecond.CardNamePreview>
                                <SS_FindSecond.CardNamePreview>
                                    <span>
                                        Select Card
                                        <span>:</span>
                                    </span>
                                    <span>
                                    {selectName}
                                    </span>
                                </SS_FindSecond.CardNamePreview>
                                <SS_FindSecond.OptionalBtn
                                    variants={optionBtnVar}
                                    animate={
                                        selectNum !== null
                                        ? optionBtnVar.active
                                        : optionBtnVar.inactive
                                    }
                                    whileHover={
                                        selectNum !== null
                                        ? optionBtnVar.hover
                                        : {}
                                    }
                                    onClick={onSelectImgSave}
                                >
                                    SELECT
                                </SS_FindSecond.OptionalBtn>
                            </SS_FindSecond.OptionalBox>
                        </SS_FindSecond.OptionControlBox>
                    </SS_FindSecond.DetailSelectBox>
                </SS_FindSecond.ControlBox>
                <SS_FindSecond.BackBtn
                    variants={optionBtnVar}
                    animate={optionBtnVar.active}
                    whileHover={optionBtnVar.hover}
                    onClick={onBackHandler}
                >
                    BACK
                </SS_FindSecond.BackBtn>
            </SS_FindSecond.InContainer>
        </SS_FindSecond.Container>
    )
}

export default React.memo(FindSingle_Second)