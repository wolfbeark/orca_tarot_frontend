/* eslint-disable */
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { 
    ISingleControlManagerAtom, 
    singleControlManagerAtom 
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
    const [singleManager, setSinlgeManager] = useRecoilState<ISingleControlManagerAtom>(singleControlManagerAtom);
    
    const {
        singleProjectArr
    } = singleManager;

    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    
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
            setSinlgeManager(_tempManager);
            navigate('/spread/single');
        }
        else if(type === 1){

        }
        else if(type === 2){

        }
    }

    const { optionalBtnVar, listItemVar } = SpreadTotal_Common;
    return (
        <ST_SingleList.Container>
            <ST_SingleList.ProjectListBox>
                <ST_SingleList.ListItemTypeTable>
                    <div>Num</div>
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
                    animate={optionalBtnVar.active}
                    whileHover={optionalBtnVar.hover}
                >
                    RESTART
                </ST_SingleList.InfoOptionBtn>
                <ST_SingleList.InfoOptionBtn
                    variants={optionalBtnVar}
                    initial={optionalBtnVar.initial}
                    animate={optionalBtnVar.active}
                    whileHover={optionalBtnVar.hover}
                >
                    DELETE
                </ST_SingleList.InfoOptionBtn>
            </ST_SingleList.InfoOptionBtnBox>
            </>
            }
            </ST_SingleList.ProjectInfoBox>
        </ST_SingleList.Container>
    )
}

export default React.memo(TotalSingleList)