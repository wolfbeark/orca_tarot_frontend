/* eslint-disable */

import { atom } from "recoil";

interface ISingleControlManagerAtom {
    isExistProject : boolean | null
}

export const singleControlManagerAtom = atom<ISingleControlManagerAtom>({
    key: "singleControlManagerAtom",
    default: {
        // validate Exist
        isExistProject : null
    }
})