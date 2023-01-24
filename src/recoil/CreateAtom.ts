/* eslint-disable */
import {atom} from 'recoil';

export enum EOracleType {
    tarot = "TAROT",
    lenormand = "LENORMAND",
    iching = 'ICHING',
    poker = 'POKER'
}
export interface ICreateControlManager {
    isCreating: boolean,
    isLoading: boolean,
    creatingStep : number,
    projectType : boolean | null, // false : single, true : multi
    isSandbox : boolean | null, // false : normal, true : sandbox
    oracleType : EOracleType | null,
    cardCount: number | null,
    NS_T_PreviewCard : boolean | null, // if normal, tarot, preview three cards
    NS_T_UseAutoDeck : number | null
}
export const createControlManager = atom<ICreateControlManager>({
    key: "createControlManager",
    default: {
        isCreating : true,
        isLoading : false,
        creatingStep: 0,
        projectType: null,
        isSandbox : null,
        oracleType : null,
        cardCount : null,
        NS_T_PreviewCard : null,
        NS_T_UseAutoDeck : null,
    }
})

/* 
Variable Naming
Normal, Single, NS + special time + values name
ex) normal, single, only tarot : NS_T_UseAutoDeck

*/

/*
expect common values
1. isCreating : boolean
2. isLoading : boolean -> When the production is completed, false -> true
3. cardCount : number
4. oracleType : EOracleType
5.
*/


/*
expect Single, Normal flow
1. project : single, spread : normal
2. oracle type , card count
2-1 oracle type - tarot, question useAutoDeck, usePreviewCards
2-2 oracle type - iching, cardcount : 2
3. draw
3-1 oracle type - iching, -> card generator component active
4. loading and active navigate
*/

// export interface ICreateControlManager {
//     // Flow Valuables
//     // Common values
//     // 1. Single or Multi
//     // 2. Normal or Sandbox
//     firstQuestionOver : boolean,

//     // NORMAL //
//     // Independent values
//     // Spread Type Normal
//     // If spread type is normal, Question oracleType
//     // ref submitSpreadType
//     // ref submitCardCount
//     // must check oracle type iching, when type is iching cardcount must be two
//     // when type is tarot, question use Auto Deck
//     // Normal, Single, NS + special time + values name
//     // ex) normal, single, only tarot : NS_T_UseAutoDeck
//     NS_SecondQuestionOver : boolean,
//     NS_T_UseAutoDeck : boolean | null,



//     // Single, Multi
//     submitDeckType : boolean | null,
//     // Normal, Sandbox
//     submitSpreadType : boolean | null,
//     // if Single, Multi Normal use
//     submitOracleType : EOracleType | null,
//     submitCardCount : number | null,
        
//     // if oracle type is tarot
//     showPreviewThreeCard : boolean | null,
// }

// export const createControlManager = atom<ICreateControlManager>({
//     key: "createControlManager",
//     default: {
//         firstQuestionOver : false,
//         NS_SecondQuestionOver : false,
//         NS_T_UseAutoDeck : null,

//         // Single, Multi
//         submitDeckType : null,
//         // Normal, Sandbox
//         submitSpreadType : null,
//         // if Single, Multi Normal use
//         submitOracleType : null,
//         submitCardCount : 0,
        
//         // if oracle type is tarot
//         showPreviewThreeCard : null,

//     }
// })