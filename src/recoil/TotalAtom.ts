import {atom} from 'recoil';

export interface ITotalManagerAtom {
    wheight : number,
    projectCount : number,
    currentTabNumber : number,
    singleNormalCount : number,
    singleSandboxCount : number,
    multiNormalCount : number,
    multiSandboxCount : number,
}

export const totalManagerAtom = atom<ITotalManagerAtom>({
    key: "totalManagerAtomManager",
    default:{
        wheight: 0,
        projectCount: 0,
        currentTabNumber : 0,
        singleNormalCount : 0,
        singleSandboxCount : 0,
        multiNormalCount : 0,
        multiSandboxCount : 0,
    }
})