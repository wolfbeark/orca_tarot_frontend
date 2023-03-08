/* eslint-disable */
import { Typing } from 'components/common_res/typing_res/Typing';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { EOracleType } from 'recoil/CreateAtom';
import { ISingleControlManagerAtom, singleControlManagerAtom } from 'recoil/SingleAtom';
import { SS_Common, SS_Hide } from '../SingleSpreadZone.styled'
import HideSingleList from './HideSingleList';

function HideSingle() {

    const { optionBtnVar } =  SS_Common;
    const [singleManager, setSingleManager] = useRecoilState<ISingleControlManagerAtom>(singleControlManagerAtom);
    const {
        cur_ProjectNumber,
        singleProjectArr
    } = singleManager;



    const [selectNum, setSelectNum] = useState<number | null>(null);

    const onBackHandler = (e : React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        //console.log('ha')
        let _singleManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
        let {
            cur_ProjectNumber : pNum,
            singleProjectArr : pArr,
        } = _singleManager;
        pArr[pNum].isHideOpen = false;
        setSingleManager(_singleManager);
    }

    
    
  return (
    <SS_Hide.Container
        initial={{opacity : 0}}
        animate={{opacity : 1}}
        exit={{opacity : 0}}
    >
        <SS_Hide.HideBox>
            <SS_Hide.InHideBox>
                <SS_Hide.HideDesBox>
                <Typing 
                    text={'Sets whether or not deck is displayed'}
                    letterSpacing={0.1}
                    cursorThickness={0}
                    typeSpeed={3}
                />
                </SS_Hide.HideDesBox>
                <SS_Hide.HideControlBox>
                    <SS_Hide.ExtraInfoList>
                        <SS_Hide.InSingleExtraInfo>
                        {singleProjectArr[cur_ProjectNumber].deckIdxArr.map((a, i) => {

                            return(
                                <HideSingleList 
                                    key={`hideInfolist${i}`}
                                    idx={i}
                                    selectNum={selectNum}
                                    setSelectNum={setSelectNum}
                                    deckIdxArr={singleProjectArr[cur_ProjectNumber].deckIdxArr}
                                />
                            );
                        })}
                        
                        </SS_Hide.InSingleExtraInfo>
                    </SS_Hide.ExtraInfoList>
                    <SS_Hide.ControlBox>
                        <AnimatePresence>
                        <SS_Hide.ExtraInfoNoticeBox>
                        {selectNum !== null &&
                            <>
                            <div>Information {selectNum + 1}</div>
                            <SS_Hide.InfoNoticeItem>
                                <div>
                                    <div>Oracle Type</div>
                                    <div>:</div>
                                </div>
                                <div>
                                {EOracleType[
                                    singleProjectArr[cur_ProjectNumber].deckIdxArr[selectNum].deckOracleType
                                ]}
                                </div>
                            </SS_Hide.InfoNoticeItem>
                            <SS_Hide.InfoNoticeItem>
                                <div>
                                    <div>Card Count</div>
                                    <div>:</div>
                                </div>
                                <div>
                                {(singleProjectArr[cur_ProjectNumber].deckIdxArr[selectNum].lastIdx
                                - singleProjectArr[cur_ProjectNumber].deckIdxArr[selectNum].startIdx)
                                + 1
                                }
                                </div>
                            </SS_Hide.InfoNoticeItem>
                            <SS_Hide.InfoNoticeItem>
                                <div>
                                    <div>Current State</div>
                                    <div>:</div>
                                </div>
                                <div>
                                {singleProjectArr[cur_ProjectNumber].deckIdxArr[selectNum].isThisExtraHide
                                ? "HIDE"
                                : "SHOW"
                                }
                                </div>
                            </SS_Hide.InfoNoticeItem>
                            </>
                        }
                        </SS_Hide.ExtraInfoNoticeBox>
                        </AnimatePresence>
                        <SS_Hide.OptionalBtnBox>
                            <SS_Hide.BackBtn
                                variants={optionBtnVar}
                                initial={optionBtnVar.initial}
                                animate={optionBtnVar.active}
                                whileHover={optionBtnVar.hover}
                                onClick={onBackHandler}
                            >
                                BACK
                            </SS_Hide.BackBtn>
                        </SS_Hide.OptionalBtnBox>
                    </SS_Hide.ControlBox>
                </SS_Hide.HideControlBox>
            </SS_Hide.InHideBox>
        </SS_Hide.HideBox>
    </SS_Hide.Container>
  )
}

export default React.memo(HideSingle);