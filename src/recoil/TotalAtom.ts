import {atom} from 'recoil';

interface ITotalManagerAtom {
    wheight : number,
    projectCount : number | null,
    singleNormalCount : number | null,
    singleSandboxCount : number | null,
    multiNormalCount : number | null,
    multiSandboxCount : number | null,
}

export const totalManagerAtom = atom<ITotalManagerAtom>({
    key: "totalManagerAtom",
    default:{
        wheight: 0,
        projectCount: null,
        singleNormalCount : null,
        singleSandboxCount : null,
        multiNormalCount : null,
        multiSandboxCount : null,
    }
})