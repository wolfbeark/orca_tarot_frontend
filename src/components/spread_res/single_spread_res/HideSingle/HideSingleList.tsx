/* eslint-disable */
import { SpreadTotal_Common } from 'components/spread_res/SpreadTotal.styled';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { EOracleType } from 'recoil/CreateAtom'
import { ISingleControlManagerAtom, ISingleDeckIdxInfo, singleControlManagerAtom } from 'recoil/SingleAtom';
import { SS_Common, SS_Hide } from '../SingleSpreadZone.styled'

interface IHideSingleListProps {
    idx: number;
    selectNum : number | null;
    setSelectNum : React.Dispatch<React.SetStateAction<number | null>>;
    deckIdxArr : ISingleDeckIdxInfo[] | null;
}
function HideSingleList({idx, setSelectNum, selectNum, deckIdxArr} : IHideSingleListProps) {
    
    const [singleManager, setSingleManager] = useRecoilState<ISingleControlManagerAtom>(singleControlManagerAtom);
    const [isHide, setIsHide] = useState<boolean>(deckIdxArr[idx].isThisExtraHide);
    let{
        cur_ProjectNumber,
        singleProjectArr
    } = singleManager;
    // useEffect(()=>{
    //     deckIdxArr[idx].isThisExtraHide
    // }, [])

    const onClickListHandler = (e : React.MouseEvent<HTMLDivElement>, num : number) => {
        e.preventDefault();
        if(selectNum === num) return;
        setSelectNum(num);
    }
    const {optionBtnVar} = SS_Common;
    const { listItemVar }= SpreadTotal_Common

    const onClickHideOrShowHandler = (e : React.MouseEvent<HTMLDivElement>, type : boolean) => {
        e.preventDefault();
        setIsHide(type);
        let _singleManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
        let {
            cur_ProjectNumber,
            singleProjectArr
        } = _singleManager;

        let {
            startIdx,
            lastIdx,
            isThisExtraHide
        } = singleProjectArr[cur_ProjectNumber].deckIdxArr[idx];
        if(type === isThisExtraHide) return;
        for(let i = startIdx; i <= lastIdx; i++){
            singleProjectArr[cur_ProjectNumber].cardInfoArr[i].isHide = type;
        }
    
        singleProjectArr[cur_ProjectNumber].deckIdxArr[idx].isThisExtraHide = type;
        setSingleManager(_singleManager);
    }
    return (
    <SS_Hide.ExtraInfoItem
        variants={listItemVar}
        animate={
            selectNum === idx
            ? listItemVar.active
            : listItemVar.inactive
        }
        onClick={(e) => onClickListHandler(e, idx)}
    >
        <AnimatePresence>
        {selectNum === idx &&
        <SS_Hide.RedCircle
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}} 
            layoutId='hideListCircle'
        />
        }
        </AnimatePresence>
        <SS_Hide.ExtraNumber>
        {idx + 1}
        </SS_Hide.ExtraNumber>
        <SS_Hide.ExtraOracle>
        {EOracleType[
            singleProjectArr[cur_ProjectNumber].deckIdxArr[idx].deckOracleType
        ]}
        </SS_Hide.ExtraOracle>
        <SS_Hide.SelectBtnBox>
            <SS_Hide.SelectBtn
                variants={optionBtnVar}
                animate={
                    isHide
                    ? optionBtnVar.active
                    : optionBtnVar.inactive
                }
                whileHover={optionBtnVar.hover}
                onClick={(e) => onClickHideOrShowHandler(e, true)}
            >
                HIDE
            </SS_Hide.SelectBtn>
            <SS_Hide.SelectBtn
                variants={optionBtnVar}
                animate={
                    !isHide
                    ? optionBtnVar.active
                    : optionBtnVar.inactive
                }
                whileHover={optionBtnVar.hover}
                onClick={(e) => onClickHideOrShowHandler(e, false)}
            >
                SHOW
            </SS_Hide.SelectBtn>
        </SS_Hide.SelectBtnBox>
    </SS_Hide.ExtraInfoItem>
  )
}

export default React.memo(HideSingleList)