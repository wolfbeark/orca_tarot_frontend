
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
export const ImgPathArr = [
    {
        name : "TAROT",
        defaultPath : "/images/TarotDefault/Default" 
    },
    {
        name : "LENORMAND",
        defaultPath : "/images/LenormandDefault/Default_Lenormand", 

    },
    {
        name : "ICHING",
        defaultPath : "/images/IChingDefault/iching" 

    },
    {
        name : "POKER",
        defaultPath : "/images/PokerDefault/Default_Poker", 
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

    const tarotMenuNameArr = [
        "MAJOR",
        "WAND",
        "SWORD",
        "CUP",
        "PENTACLE"
    ];
    const lenorMenuNameArr = [
        "1 - 10",
        "11 - 20",
        "21 - 30",
        "31 - 36"
    ];
    const ichingMenuNameArr = [
        "1 - 10",
        "11 - 20",
        "21 - 30",
        "31 - 40",
        "41 - 50",
        "51 - 60",
        "61 - 64",
    ];
    const pokerMenuNameArr = [ // ??? ??? ??? ??? ??? ???
        "JOKER",
        "SPADE",
        "HEART",
        "CLOVER",
        "DIAMOND",
    ];
   

    const semiTarotNameArr = [
        "THE FOOL",
        "THE MAGICIAN",
        "THE HIGH PRIESTESS",
        "THE EMPRESS",
        "THE EMPEROR",
        "THE HIEROPHANT",
        "THE LOVERS",
        "THE CHARIOT",
        "STRENGTH",
        "THE HERMIT",
        "THE WHEEL OF FORTUNE",
        "JUSTICE",
        "THE HANGED MAN",
        "DEATH",
        "TEMPERANCE",
        "THE DEVIL",
        "THE TOWER",
        "THE STAR",
        "THE MOON",
        "THE SUN",
        "JUDGEMENT",
        "THE WORLD",
        "WAND 1",
        "WAND 2",
        "WAND 3",
        "WAND 4",
        "WAND 5",
        "WAND 6",
        "WAND 7",
        "WAND 8",
        "WAND 9",
        "WAND 10",
        "PAGE OF WANDS",
        "KNIGHT OF WANDS",
        "QUEEN OF WANDS",
        "KING OF WANDS",
        "SWORD 1",
        "SWORD 2",
        "SWORD 3",
        "SWORD 4",
        "SWORD 5",
        "SWORD 6",
        "SWORD 7",
        "SWORD 8",
        "SWORD 9",
        "SWORD 10",
        "PAGE OF SWORDS",
        "KNIGHT OF SWORDS",
        "QUEEN OF SWORDS",
        "KING OF SWORDS",
        "CUP 1",
        "CUP 2",
        "CUP 3",
        "CUP 4",
        "CUP 5",
        "CUP 6",
        "CUP 7",
        "CUP 8",
        "CUP 9",
        "CUP 10",
        "PAGE OF CUPS",
        "KNIGHT OF CUPS",
        "QUEEN OF CUPS",
        "KING OF CUPS",
        "PENTACLE 1",
        "PENTACLE 2",
        "PENTACLE 3",
        "PENTACLE 4",
        "PENTACLE 5",
        "PENTACLE 6",
        "PENTACLE 7",
        "PENTACLE 8",
        "PENTACLE 9",
        "PENTACLE 10",
        "PAGE OF PENTACLES",
        "KNIGHT OF PENTACLES",
        "QUEEN OF PENTACLES",
        "KING OF PENTACLES",
    ];
    const semiLenormandNameArr = [
        "1 RIDER",
        "2 CLOVER",
        "3 SHIP",
        "4 HOUSE",
        "5 TREE",
        "6 CLOUD",
        "7 SNAKE",
        "8 COFFIN",
        "9 BOUQUET",
        "10 SCYTHE",
        "11 WHIP",
        "12 BIRDS",
        "13 CHILD",
        "14 FOX",
        "15 BEAR",
        "16 STARS",
        "17 STORK",
        "18 DOG",
        "19 TOWER",
        "20 GARDEN",
        "21 MOUNTAIN",
        "22 PATHS",
        "23 MICE",
        "24 HEART",
        "25 RING",
        "26 BOOK",
        "27 LETTER",
        "28 MAN",
        "29 LADY",
        "30 LILY",
        "31 SUN",
        "32 MOON",
        "33 KEY",
        "34 FISH",
        "35 ANCHOR",
        "36 CROSS"
    ];
    const semiIchingNameArr = [
        "?????????", //0
        "?????????", //1
        "?????????", //2
        "?????????", //3
        "?????????", //4
        "?????????", //5
        "?????????", //6
        "?????????", //7

        "????????????", //8
        "?????????", //9
        "?????????", //10
        "?????????", //11
        "????????????", //12
        "????????????", //13
        "?????????", //14
        "?????????", //15

        "?????????", //16
        "?????????", //17
        "?????????", //18
        "?????????", //19
        "????????????", //20
        "?????????", //21
        "?????????", //22
        "?????????", //23

        "????????????", //24
        "????????????", //25
        "?????????", //26
        "????????????", //27
        "?????????", //28
        "?????????", //29
        "?????????", //30
        "?????????", //31

        "?????????", //32
        "????????????", //33
        "?????????", //34
        "????????????", //35
        "????????????", //36
        "?????????", //37
        "?????????", //38
        "?????????", //39

        "?????????", //40
        "?????????", //41
        "?????????", //42
        "?????????", //43
        "?????????", //44
        "?????????", //45
        "?????????", //46
        "?????????", //47

        "?????????", //48
        "?????????", //49
        "?????????", //50
        "?????????", //51
        "?????????", //52
        "????????????", //53
        "?????????", //54
        "?????????", //55

        "?????????", //56
        "?????????", //57
        "?????????", //58
        "?????????", //59
        "????????????", //60
        "????????????", //61
        "????????????", //62
        "????????????", //63
    ];
    const semiPokerNameArr = [
        "BLACK JOKER",

        "ACE OF SPADE",
        "TWO OF SPADES",
        "THREE OF SPADES",
        "FOUR OF SPADES",
        "FIVE OF SPADES",
        "SIX OF SPADES",
        "SEVEN OF SPADES",
        "EIGHT OF SPADES",
        "NINE OF SPADES",
        "TEN OF SPADES",
        "JACK OF SPADES",
        "QUEEN OF SPADES",
        "KING OF SPADES",

        "ACE OF HEART",
        "TWO OF HEARTS",
        "THREE OF HEARTS",
        "FOUR OF HEARTS",
        "FIVE OF HEARTS",
        "SIX OF HEARTS",
        "SEVEN OF HEARTS",
        "EIGHT OF HEARTS",
        "NINE OF HEARTS",
        "TEN OF HEARTS",
        "JACK OF HEARTS",
        "QUEEN OF HEARTS",
        "KING OF HEARTS",

        "ACE OF CLOVER",
        "TWO OF CLOVERS",
        "THREE OF CLOVERS",
        "FOUR OF CLOVERS",
        "FIVE OF CLOVERS",
        "SIX OF CLOVERS",
        "SEVEN OF CLOVERS",
        "EIGHT OF CLOVERS",
        "NINE OF CLOVERS",
        "TEN OF CLOVERS",
        "JACK OF CLOVERS",
        "QUEEN OF CLOVERS",
        "KING OF CLOVERS",

        "ACE OF DIAMOND", // ??? 13???
        "TWO OF DIAMONDS",
        "THREE OF DIAMONDS",
        "FOUR OF DIAMONDS",
        "FIVE OF DIAMONDS",
        "SIX OF DIAMONDS",
        "SEVEN OF DIAMONDS",
        "EIGHT OF DIAMONDS",
        "NINE OF DIAMONDS",
        "TEN OF DIAMONDS",
        "JACK OF DIAMONDS",
        "QUEEN OF DIAMONDS",
        "KING OF DIAMONDS",

        "RED JOKER",

    ];
    interface IIdxArrItem {
        startNum : number,
        lastNum : number,
    }
    export interface IOracleInfoItem {
        typeNameArr : string[],
        detailNameArr : string[],
        idxArr : IIdxArrItem[],
    }
    interface IFindTypeInfo {
        "find_tarotInfo" : IOracleInfoItem,
        "find_lenorInfo" : IOracleInfoItem,
        "find_ichingInfo" : IOracleInfoItem,
        "find_pokerInfo" : IOracleInfoItem,
    }
    export const FindTypeInfo : IOracleInfoItem[] = [
        {
            typeNameArr : tarotMenuNameArr,
            detailNameArr : semiTarotNameArr,
            idxArr : [
                {
                    startNum : 0,
                    lastNum : 21,
                },
                {
                    startNum : 22,
                    lastNum : 35
                },
                {
                    startNum : 36,
                    lastNum : 49,
                },
                {
                    startNum : 50,
                    lastNum : 63,
                },
                {
                    startNum : 64,
                    lastNum : 77,
                }
            ]
        },
        {
            typeNameArr : lenorMenuNameArr,
            detailNameArr : semiLenormandNameArr,
            idxArr : [
                {
                    startNum: 0,
                    lastNum : 9,
                },
                {
                    startNum : 10,
                    lastNum : 19,
                },
                {
                    startNum : 20,
                    lastNum : 29,
                },
                {
                    startNum : 30,
                    lastNum : 35,
                }
            ]
        },
        {
            typeNameArr : ichingMenuNameArr,
            detailNameArr : semiIchingNameArr,
            idxArr : [
                {
                    startNum: 0,
                    lastNum : 9,
                },
                {
                    startNum : 10,
                    lastNum : 19,
                },
                {
                    startNum : 20,
                    lastNum : 29,
                },
                {
                    startNum : 30,
                    lastNum : 39,
                },
                {
                    startNum : 40,
                    lastNum : 49,
                },
                {
                    startNum : 50,
                    lastNum : 59,
                },
                {
                    startNum : 60,
                    lastNum : 63,
                },
            ]

        },
        {
            typeNameArr : pokerMenuNameArr,
            detailNameArr : semiPokerNameArr,
            idxArr : [
                {
                    startNum: 0,
                    lastNum : 53,
                },
                {
                    startNum : 1,
                    lastNum : 13,
                },
                {
                    startNum : 14,
                    lastNum : 26,
                },
                {
                    startNum : 27,
                    lastNum : 39,
                },
                {
                    startNum : 40,
                    lastNum : 52,
                },
            ]
        },
    ]
    const semiTotalNameArr = [
        semiTarotNameArr, 
        semiLenormandNameArr,
        semiIchingNameArr,
        semiPokerNameArr,
    ];