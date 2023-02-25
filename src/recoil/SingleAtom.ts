/* eslint-disable */

import { atom } from "recoil";

export interface IDragCardInfo {
    oracleType : number,
    imgNumber : number,
    zIdx : number,
    isInSpread : boolean,
    isDraged : boolean,
    isFlip : boolean,
    isRotate : boolean,
    newX : number,
    newY : number,
}
export interface ISingleRestartItem {
    creatingStep : number;
    projectId : number;
    projectName : string; 
    isSandbox : boolean | null,
    oracleType : number | null,
    cardCount : number | null,
    NS_T_PreviewCard : boolean | null, // if normal, tarot, preview three cards
    NS_T_UseAutoDeck : number,
    tempRanNumArr : number[]
}
export const defaultRestartInfo : ISingleRestartItem = {
    creatingStep: 0,
    projectId: 0,
    projectName: '',
    isSandbox: null,
    oracleType: null,
    cardCount: null,
    NS_T_PreviewCard: null,
    NS_T_UseAutoDeck: 0,
    tempRanNumArr : []
}
export interface ISingleProject {
    projectId : number | null,
    projectName : string | null,
    projectType : boolean | null,
    oracleType? : number | null,
    totalCardCount : number | null,
    initialCardCount : number | null,
    rem_CardCount : number | null,
    NS_T_PreviewCard? : boolean | null, // if normal, tarot, preview three cards
    NS_T_UseAutoDeck? : number,
    NS_T_PreviewCardNumArr? : number[] | null,
    cardInfoArr : IDragCardInfo[],
    isRestarting : boolean,
    restartInfo : ISingleRestartItem | null,
}
export interface ISingleControlManagerAtom {
    isExistProject : boolean | null,
    cur_ProjectNumber : number,
    singleProjectArr : ISingleProject[],
}

export const singleControlManagerAtom = atom<ISingleControlManagerAtom>({
    key: "singleControlManagerAtom",
    default: {
        // validate Exist
        isExistProject : null,
        cur_ProjectNumber : 0,
        singleProjectArr: [],
    }
})