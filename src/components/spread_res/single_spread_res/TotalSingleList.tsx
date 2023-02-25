/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
    ITotalManagerAtom,
    totalManagerAtom
} from 'recoil/TotalAtom'
import { 
    ISingleControlManagerAtom, 
    singleControlManagerAtom ,
    ISingleRestartItem
} from 'recoil/SingleAtom';

import {
    SpreadTotal_Common,
    ST_SingleList 
} from '../SpreadTotal.styled';

import { 
    DeckNameArr,
    TarotDeckTypeNameArr 
} from 'common_resources/CommonData';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


function TotalSingleList() {

    const navigate = useNavigate();
    const [totalManager, setTotalManager] = useRecoilState<ITotalManagerAtom>(totalManagerAtom)
    const [singleManager, setSingleManager] = useRecoilState<ISingleControlManagerAtom>(singleControlManagerAtom);
    const resetSingleManager = useResetRecoilState(singleControlManagerAtom);
    const {
        singleProjectArr,
    } = singleManager;
    const [projectArr, setProjectArr] = useState(singleProjectArr);

    useEffect(()=>{
        setProjectArr(singleManager.singleProjectArr);
    }, [singleManager])
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const [isClickedOption, setIsClickedOption] = useState<boolean>(false);
    const [optionType, setOptionType] = useState<number | null>(null);
    const onSelectList = (e : React.MouseEvent<HTMLDivElement>, idx : number) => {
        e.preventDefault();
        if(selectedNumber === idx) return;
        setSelectedNumber(idx);
    }
    const onClickOptionHandler = (e : React.MouseEvent<HTMLDivElement>, type : number) => {
        e.preventDefault();
        let _tempManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
        if(type === 0){
            _tempManager.cur_ProjectNumber = selectedNumber;
            setSingleManager(_tempManager);
            navigate('/spread/single');
        }
        else if(type === 1){
            if(singleProjectArr[selectedNumber].isRestarting) return;
            setIsClickedOption(true);
            setOptionType(0);
        }
        else if(type === 2){
            setIsClickedOption(true);
            setOptionType(1);
        }
    }
    const onClickRestartHanlder = (e : React.MouseEvent<HTMLDivElement>, type : boolean) => {
        e.preventDefault();
        if(type){
            if(singleProjectArr[selectedNumber].isRestarting === true) return;
            let _tempManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
            
            let _tempInfo : ISingleRestartItem = {
                creatingStep: 0,
                projectId: singleProjectArr[selectedNumber].projectId,
                projectName: singleProjectArr[selectedNumber].projectName,
                isSandbox: false,
                oracleType: null,
                cardCount: null,
                NS_T_PreviewCard: null,
                NS_T_UseAutoDeck: 0,
                tempRanNumArr: []
            }
            _tempManager.singleProjectArr[selectedNumber]
            .isRestarting = true;
            _tempManager.singleProjectArr[selectedNumber]
            .restartInfo = {..._tempInfo};
            _tempManager.cur_ProjectNumber = selectedNumber;
            
            
            setSingleManager(_tempManager);
            navigate(`/spread/single`);
        }
        else{
            setIsClickedOption(false);
            setOptionType(null)
        }
    }
    const onClickDeleteHanlder = (e : React.MouseEvent<HTMLDivElement>, type : boolean) => {
        e.preventDefault();
        if(type){
            let _totalManager : ITotalManagerAtom = JSON.parse(JSON.stringify(totalManager));
            let _tempManager : ISingleControlManagerAtom = JSON.parse(JSON.stringify(singleManager));
            let {
                singleProjectArr,
                cur_ProjectNumber
            } = _tempManager;

            if(singleProjectArr.length > 1){
                let _tempArr = singleProjectArr
                    .filter((a, i) => i !== selectedNumber);
                _tempManager.singleProjectArr = _tempArr;
                _tempManager.cur_ProjectNumber = 0;
                setSingleManager(_tempManager);
            }
            else{
                resetSingleManager();
            }
            _totalManager.singleNormalCount--;
            _totalManager.projectCount--;
            setTotalManager(_totalManager);
            setSelectedNumber(null);
            setIsClickedOption(false);
            setOptionType(null)

        }
        else{
            setIsClickedOption(false);
            setOptionType(null)
        }
    }

    const { optionalBtnVar, listItemVar } = SpreadTotal_Common;
    return (
        <ST_SingleList.Container>
            <ST_SingleList.InContainer>
            <ST_SingleList.ProjectListBox>
                <ST_SingleList.ListItemTypeTable>
                    <div>Num</div>
                    <div>State</div>
                    <div>Project Name</div>
                    <div>Project Type</div>
                </ST_SingleList.ListItemTypeTable>
                <ST_SingleList.ListItemContentTable>
                {singleProjectArr.map((a, i) => {

                    return(
                        <ST_SingleList.ListItem
                            key={`ST_Single${i}`}
                            variants={listItemVar}
                            animate={
                                selectedNumber === i
                                ? listItemVar.active
                                : listItemVar.inactive
                            }
                            onClick={(e)=> onSelectList(e, i)}
                        >
                            <div>
                            <AnimatePresence>
                            {selectedNumber === i &&
                            <ST_SingleList.RedCircle
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}} 
                                layoutId='singleListCircle'
                            />
                            }
                            </AnimatePresence>
                            {i + 1}
                            </div>
                            <div>
                            {singleProjectArr[i].isRestarting === false
                            ? "ACTIVE"
                            : "RESTARTING"
                            }
                            </div>
                            <div>
                            {a.projectName}
                            </div>
                            <div>
                            {a.projectType === false ? "Normal" : "Sandbox"}
                            </div>
                        </ST_SingleList.ListItem>
                    );
                })}
                </ST_SingleList.ListItemContentTable>
            </ST_SingleList.ProjectListBox>
            <ST_SingleList.ProjectInfoBox>
            {selectedNumber === null &&
            <ST_SingleList.Info_NotSelected>
                Is any deck doesn't selected
            </ST_SingleList.Info_NotSelected>
            }
            {selectedNumber !== null &&
            <>
            <ST_SingleList.InfoName>
            {singleProjectArr[selectedNumber].projectName}
            </ST_SingleList.InfoName>
            <ST_SingleList.InfoDetailTable>
                <ST_SingleList.InfoDetailItems>
                    <div>
                        <div>
                            project id
                        </div>
                        <div>
                            :
                        </div>
                    </div>
                    <div>
                    {singleProjectArr[selectedNumber].projectId}
                    </div>
                </ST_SingleList.InfoDetailItems>
                <ST_SingleList.InfoDetailItems>
                    <div>
                        <div>
                            Project Type
                        </div>
                        <div>
                            :
                        </div>
                    </div>
                    <div>
                    {!singleProjectArr[selectedNumber].projectType
                    ? "Normal"
                    : "Sandbox"
                    }
                    </div>
                </ST_SingleList.InfoDetailItems>
                <ST_SingleList.InfoDetailItems>
                    <div>
                        <div>
                            Oracle Type
                        </div>
                        <div>
                            :
                        </div>
                    </div>
                    <div>
                    {singleProjectArr[selectedNumber].oracleType === null
                    ? "Mix"
                    : DeckNameArr[singleProjectArr[selectedNumber].oracleType]
                    }
                    </div>
                </ST_SingleList.InfoDetailItems>
                <ST_SingleList.InfoDetailItems>
                    <div>
                        <div>
                            Preview Cards
                        </div>
                        <div>
                            :
                        </div>
                    </div>
                    <div>
                    {singleProjectArr[selectedNumber].oracleType !== 0
                    ? "Doesn't Exist"
                    : singleProjectArr[selectedNumber].NS_T_PreviewCard
                        ? "ON"
                        : "OFF"
                    }
                    </div>
                </ST_SingleList.InfoDetailItems>
                <ST_SingleList.InfoDetailItems>
                    <div>
                        <div>
                            Auto Spread
                        </div>
                        <div>
                            :
                        </div>
                    </div>
                    <div>
                    {singleProjectArr[selectedNumber].projectType === false
                    && singleProjectArr[selectedNumber].oracleType === 0
                    ? TarotDeckTypeNameArr[singleProjectArr[selectedNumber].NS_T_UseAutoDeck]
                    : "Doesn't Exist"
                    }
                    </div>
                </ST_SingleList.InfoDetailItems>
                <ST_SingleList.InfoDetailItems>
                    <div>
                        <div>
                            Total Card Count
                        </div>
                        <div>
                            :
                        </div>
                    </div>
                    <div>
                    {singleProjectArr[selectedNumber].totalCardCount}
                    </div>
                </ST_SingleList.InfoDetailItems>
                <ST_SingleList.InfoDetailItems>
                    <div>
                        <div>
                            Extra Card Count
                        </div>
                        <div>
                            :
                        </div>
                    </div>
                    <div>
                    {(singleProjectArr[selectedNumber].totalCardCount
                        - singleProjectArr[selectedNumber].initialCardCount    
                    )}
                    </div>
                </ST_SingleList.InfoDetailItems>
            </ST_SingleList.InfoDetailTable>
            <ST_SingleList.InfoOptionBtnBox>
                <ST_SingleList.InfoOptionBtn
                    variants={optionalBtnVar}
                    initial={optionalBtnVar.initial}
                    animate={optionalBtnVar.active}
                    whileHover={optionalBtnVar.hover}
                    onClick={(e) => onClickOptionHandler(e, 0)}
                >
                    MOVE
                </ST_SingleList.InfoOptionBtn>
                <ST_SingleList.InfoOptionBtn
                    variants={optionalBtnVar}
                    initial={optionalBtnVar.initial}
                    animate={
                        singleProjectArr[selectedNumber].isRestarting === false
                        ? optionalBtnVar.active
                        : optionalBtnVar.inactive
                    }
                    whileHover={
                        singleProjectArr[selectedNumber].isRestarting === false
                        ? optionalBtnVar.hover
                        : {}
                    }
                    onClick={(e) => onClickOptionHandler(e, 1)}
                >
                    RESTART
                </ST_SingleList.InfoOptionBtn>
                <ST_SingleList.InfoOptionBtn
                    variants={optionalBtnVar}
                    initial={optionalBtnVar.initial}
                    animate={optionalBtnVar.active}
                    whileHover={optionalBtnVar.hover}
                    onClick={(e) => onClickOptionHandler(e, 2)}
                >
                    DELETE
                </ST_SingleList.InfoOptionBtn>
            </ST_SingleList.InfoOptionBtnBox>
            </>
            }
            </ST_SingleList.ProjectInfoBox>
            <AnimatePresence>
            {isClickedOption &&
            <SpreadTotal_Common.QuestionOptionBox>
                <SpreadTotal_Common.InOptionBox>
                    <SpreadTotal_Common.OptionDesBox>
                    {optionType === 0
                    ? "Do you want to recreate this project?"
                    : "Are you sure you want to delete this project?"
                    }
                    </SpreadTotal_Common.OptionDesBox>
                    <SpreadTotal_Common.OptionBtnBox>
                        <SpreadTotal_Common.OptionBtn
                            variants={optionalBtnVar}
                            initial={optionalBtnVar.initial}
                            animate={optionalBtnVar.active}
                            whileHover={optionalBtnVar.hover}
                            onClick={(e) => {
                                if(optionType === 0){
                                    onClickRestartHanlder(e, true)
                                }
                                else if(optionType === 1){
                                    onClickDeleteHanlder(e, true)
                                }
                            }}
                        >
                            Yes
                        </SpreadTotal_Common.OptionBtn>
                        <SpreadTotal_Common.OptionBtn
                            variants={optionalBtnVar}
                            initial={optionalBtnVar.initial}
                            animate={optionalBtnVar.active}
                            whileHover={optionalBtnVar.hover}
                            onClick={(e) => {
                                if(optionType === 0){
                                    onClickRestartHanlder(e, false)
                                }
                                else if(optionType === 1){
                                    onClickDeleteHanlder(e, false)
                                }
                            }}
                        >
                            No
                        </SpreadTotal_Common.OptionBtn>
                    </SpreadTotal_Common.OptionBtnBox>
                </SpreadTotal_Common.InOptionBox>
            </SpreadTotal_Common.QuestionOptionBox>
            }
            </AnimatePresence>
            </ST_SingleList.InContainer>

        </ST_SingleList.Container>
    )
}

export default React.memo(TotalSingleList)