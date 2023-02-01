/* eslint-disable */

import { atom } from "recoil";

export interface IDragCardInfo {
    oracleType : number,
    imgNumber : number,
    zIdx : number,
}
export interface ISingleProject {
    projectId : number | null,
    projectName : string | null,
    projectType : boolean | null,
    totalCardCount : number | null,
    rem_CardCount : number | null,
    cardInfoArr : IDragCardInfo[],
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