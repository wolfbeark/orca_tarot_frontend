
// System
export const ErrorStringArr : any[] = [
]


// Deck
// Name
interface IDeckInfoItem { 
    name : string;
    defaultImage : string
}
export const DeckInfoArr : IDeckInfoItem[] = [
    {
        name : "TAROT",
        defaultImage : "/images/TarotDefault/Default0.png" 
    },
    {
        name : "LENORMAND",
        defaultImage : "/images/LenormandDefault/Default_Lenormand0.png", 

    },
    {
        name : "ICHING",
        defaultImage : "/images/IChingDefault/iching0.png" 

    },
    {
        name : "POKER",
        defaultImage : "/images/PokerDefault/Default_Poker53.png", 
    }
]
export const DeckNameArr = [
    "TAROT",
    "LENORMAND",
    "ICHING",
    "POKER"
]

export const TarotDeckTypeNameArr = [
    "FREE DECK",
    "THREE CARDS",
    "SEVEN CARDS",
    "CELTIC CROSS"
]
export const TarotAutoDeckCountArr = [
    0,
    3,
    7,
    10
]
export const OracleCountLimitArr = [
    "1 - 78",
    "1 - 36",
    "2",
    "1 - 54"
]
export const OracleMaxLimitArr = [
    78,
    36,
    2,
    54
]
export const IChingTranslateCodeArr = [
        "111111",
        "000000",
        "100010",
        "010001",
        "111010",
        "010111",
        "010000",
        "000010",
        "111011",
        "110111",
        "111000",
        "000111",
        "101111",
        "111101",
        "001000",
        "000100",
        "100110",
        "011001",
        "110000",
        "000011",
        "100101",
        "101001",
        "000001",
        "100000",
        "100111",
        "111001",
        "100001",
        "011110",
        "010010",
        "101101",
        "001110",
        "011100",
        "001111",
        "111100",
        "000101",
        "101000",
        "101011",
        "110101",
        "001010",
        "010100",
        "110001",
        "100011",
        "111110",
        "011111",
        "000110",
        "011000",
        "010110",
        "011010",
        "101110",
        "011101",
        "100100",
        "001001",
        "001011",
        "110100",
        "101100",
        "001101",
        "011011",
        "110110",
        "010011",
        "110010",
        "110011",
        "001100",
        "101010",
        "010101",
];

export const SpreadControlBtnNameArr = ["Restart", "Hide", "Find", "Flip", "Capture"];

interface IGroundZero {
    x: number,
    y: number,
}
interface ICarpetInfo {
    width: number,
    height: number,
}
export interface IAutoPosItem {
    x : number,
    y : number,
}
export const AutoDeckGenerator = (autoDeckType : number, groundZero : IGroundZero, carpetInfo : ICarpetInfo, cardNumber : number) : IAutoPosItem | null => {
    if(autoDeckType === 0) return null;
    let tempObjArr = [];
    const threePosArr : IAutoPosItem[] = [
    {
        x : groundZero.x - carpetInfo.width * 0.2,
        y : groundZero.y,
    },
    {
        x : groundZero.x,
        y : groundZero.y,
    },
    {
        x : groundZero.x + carpetInfo.width * 0.2,
        y : groundZero.y,
    }
    ];

    const sevenPosArr : IAutoPosItem[] = [
        {
        x: groundZero.x,
        y: groundZero.y - carpetInfo.height * 0.3,
        },
        {
        x: groundZero.x + carpetInfo.width * 0.15,
        y: groundZero.y + carpetInfo.height * 0.15,
        },
        {
        x: groundZero.x - carpetInfo.width * 0.15,
        y: groundZero.y + carpetInfo.height * 0.15,
        },
        {
        x: groundZero.x,
        y: groundZero.y + carpetInfo.height * 0.3,
        },
        {
        x: groundZero.x - carpetInfo.width * 0.15,
        y: groundZero.y - carpetInfo.height * 0.15,
        },
        {
        x: groundZero.x + carpetInfo.width * 0.15,
        y: groundZero.y - carpetInfo.height * 0.15,
        },
        {
        x: groundZero.x,
        y: groundZero.y,
        },
    ];

    const celticPosArr : IAutoPosItem[] = [
        {
        x: groundZero.x - carpetInfo.width * 0.1,
        y: groundZero.y - carpetInfo.height * 0.05,
        },
        {
        x: groundZero.x - carpetInfo.width * 0.1,
        y: groundZero.y + carpetInfo.height * 0.125,
        },
        {
        x: groundZero.x - carpetInfo.width * 0.1,
        y: groundZero.y + carpetInfo.height * 0.3,
        },
        {
        x: groundZero.x - carpetInfo.width * 0.25,
        y: groundZero.y,
        },
        {
        x: groundZero.x - carpetInfo.width * 0.1,
        y: groundZero.y - carpetInfo.height * 0.3,
        },
        {
        x: groundZero.x + carpetInfo.width * 0.05,
        y: groundZero.y,
        },
        {
        x: groundZero.x + carpetInfo.width * 0.3,
        y: groundZero.y + carpetInfo.height * 0.36,
        },
        {
        x: groundZero.x + carpetInfo.width * 0.3,
        y: groundZero.y + carpetInfo.height * 0.12,
        },
        {
        x: groundZero.x + carpetInfo.width * 0.3,
        y: groundZero.y - carpetInfo.height * 0.12,
        },
        {
        x: groundZero.x + carpetInfo.width * 0.3,
        y: groundZero.y - carpetInfo.height * 0.36,
        },
    ];
    tempObjArr.push(threePosArr);
    tempObjArr.push(sevenPosArr);
    tempObjArr.push(celticPosArr);
    return tempObjArr[autoDeckType - 1][cardNumber];
}